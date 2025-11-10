
from fastapi import APIRouter, Depends, HTTPException, Query, Request, status, File, UploadFile, Form
from typing import List, Optional
from odmantic import AIOEngine, ObjectId
from ..database import get_engine
from ..models import Car
from ..schemas import CarCreate, CarResponse
from ..utils import get_car_image_url, save_uploaded_image

router = APIRouter(prefix="/cars", tags=["cars"])

@router.get("/", response_model=List[CarResponse], status_code=status.HTTP_200_OK)
async def get_cars(
    request: Request,
    q: Optional[str] = Query(None, description="Search query for make or model (case-insensitive)"),
    engine: AIOEngine = Depends(get_engine)
):
    """
    Fetch all cars with optional search functionality.
    """
    try:
        if q:
            # Case-insensitive search for make or model
            cars = await engine.find(
                Car,
                {
                    "$or": [
                        {"make": {"$regex": q, "$options": "i"}},
                        {"model": {"$regex": q, "$options": "i"}}
                    ]
                }
            )
        else:
            cars = await engine.find(Car)

        base_url = str(request.base_url).rstrip('/') if request else "http://localhost:8000"
        car_responses = []
        for car in cars:
            car_dict = {
                "id": str(car.id),
                "make": car.make,
                "model": car.model,
                "year": car.year,
                "price": car.price,
                "mileage": car.mileage,
                "description": car.description,
                "created_at": car.created_at,
                "image_path": car.image_path
            }
            car_responses.append(CarResponse(**car_dict))
        return car_responses
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching cars: {str(e)}"
        )

@router.post("/", response_model=CarResponse, status_code=status.HTTP_201_CREATED)
async def create_car(
    request: Request,
    make: str = Form(...),
    model: str = Form(...),
    year: int = Form(...),
    price: float = Form(...),
    mileage: Optional[int] = Form(None),
    description: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    engine: AIOEngine = Depends(get_engine)
):
    """
    Create a new car listing with optional image upload.
    Accepts multipart/form-data with car fields and image file.
    """
    try:
        image_path = None
        if image:
            upload_dir = "app/static/images"
            image_path = save_uploaded_image(image, upload_dir)

        car = Car(
            make=make,
            model=model,
            year=year,
            price=price,
            mileage=mileage,
            description=description,
            image_path=image_path
        )
        await engine.save(car)

        base_url = str(request.base_url).rstrip('/') if request else "http://localhost:8000"
        car_dict = {
            "id": str(car.id),
            "make": car.make,
            "model": car.model,
            "year": car.year,
            "price": car.price,
            "mileage": car.mileage,
            "description": car.description,
            "created_at": car.created_at,
            "image_path": car.image_path
        }
        return CarResponse(**car_dict)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Validation error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: Failed to create car. {str(e)}"
        )

@router.delete("/{car_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_car(
    car_id: str,
    engine: AIOEngine = Depends(get_engine)
):
    """
    Delete a car by MongoDB ObjectId.
    """
    try:
        # ✅ Convert the string ID to ObjectId
        try:
            obj_id = ObjectId(car_id)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid car ID format: {car_id}"
            )

        car = await engine.find_one(Car, Car.id == obj_id)
        if car is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Car with ID {car_id} not found"
            )

        await engine.delete(car)
        return None

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: Failed to delete car. {str(e)}"
        )
