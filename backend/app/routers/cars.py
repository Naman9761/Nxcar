from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from ..database import get_db
from ..models import Car
from ..schemas import CarCreate, CarResponse
from ..utils import get_car_image_url

router = APIRouter(prefix="/cars", tags=["cars"])

@router.get("/", response_model=List[CarResponse], status_code=status.HTTP_200_OK)
def get_cars(
    request: Request,
    q: Optional[str] = Query(None, description="Search query for make or model (case-insensitive)"),
    db: Session = Depends(get_db)
):
    """
    Fetch all cars with optional search functionality.
    
    - **q**: Optional search query to filter cars by make or model (case-insensitive)
    - Returns empty list if database is empty (handled gracefully)
    """
    try:
        query = db.query(Car)
        
        # Apply search filter if query parameter is provided
        if q:
            search_term = f"%{q}%"
            query = query.filter(
                or_(
                    Car.make.ilike(search_term),
                    Car.model.ilike(search_term)
                )
            )
        
        cars = query.all()
        
        # Get base URL for image URLs
        base_url = str(request.base_url).rstrip('/') if request else "http://localhost:8000"
        
        # Convert cars to response format with image URLs
        car_responses = []
        for car in cars:
            car_dict = {
                "id": car.id,
                "make": car.make,
                "model": car.model,
                "year": car.year,
                "price": car.price,
                "mileage": car.mileage,
                "description": car.description,
                "created_at": car.created_at,
                "image": get_car_image_url(car.make, car.model, base_url)
            }
            car_responses.append(CarResponse(**car_dict))
        
        # Handle empty database gracefully - return empty list
        return car_responses if car_responses else []
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching cars: {str(e)}"
        )

@router.post("/", response_model=CarResponse, status_code=status.HTTP_201_CREATED)
def create_car(
    car: CarCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Create a new car listing.
    
    - **car**: CarCreate schema with all required and optional fields
    - Validates all fields using Pydantic schemas
    - Returns created car with 201 status code
    """
    try:
        # Create car instance from validated schema
        db_car = Car(**car.model_dump())
        
        # Add to database session
        db.add(db_car)
        db.commit()
        db.refresh(db_car)
        
        # Get base URL for image URL
        base_url = str(request.base_url).rstrip('/') if request else "http://localhost:8000"
        
        # Return response with image URL
        car_dict = {
            "id": db_car.id,
            "make": db_car.make,
            "model": db_car.model,
            "year": db_car.year,
            "price": db_car.price,
            "mileage": db_car.mileage,
            "description": db_car.description,
            "created_at": db_car.created_at,
            "image": get_car_image_url(db_car.make, db_car.model, base_url)
        }
        
        return CarResponse(**car_dict)
    
    except ValueError as e:
        # Handle validation errors
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Validation error: {str(e)}"
        )
    except Exception as e:
        # Handle database errors
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: Failed to create car. {str(e)}"
        )

@router.delete("/{car_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_car(
    car_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a car by ID.
    
    - **car_id**: Path parameter for the car ID to delete
    - Returns 204 No Content on success
    - Returns 404 if car not found
    """
    try:
        # Query car by ID
        db_car = db.query(Car).filter(Car.id == car_id).first()
        
        # Check if car exists
        if db_car is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Car with ID {car_id} not found"
            )
        
        # Delete car from database
        db.delete(db_car)
        db.commit()
        
        # Return 204 No Content (no response body)
        return None
    
    except HTTPException:
        # Re-raise HTTP exceptions (like 404)
        raise
    except Exception as e:
        # Handle database errors
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: Failed to delete car. {str(e)}"
        )

