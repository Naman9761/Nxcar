from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional
from datetime import datetime

class CarBase(BaseModel):
    make: str = Field(..., min_length=2, max_length=50, description="Car manufacturer")
    model: str = Field(..., min_length=2, max_length=50, description="Car model")
    year: int = Field(..., ge=1900, le=2025, description="Manufacturing year")
    price: float = Field(..., gt=0, description="Price in currency units")
    mileage: Optional[int] = Field(None, description="Mileage in kilometers/miles")
    description: Optional[str] = Field(None, max_length=500, description="Detailed description of the car")

    @field_validator('mileage')
    @classmethod
    def validate_mileage(cls, v: Optional[int]) -> Optional[int]:
        """Validate that mileage is positive if provided"""
        if v is not None and v <= 0:
            raise ValueError('Mileage must be positive if provided')
        return v

    @field_validator('make', 'model')
    @classmethod
    def validate_string_fields(cls, v: str) -> str:
        """Validate and strip whitespace from string fields"""
        if isinstance(v, str):
            v = v.strip()
            if len(v) < 2:
                raise ValueError('Must be at least 2 characters long')
            if len(v) > 50:
                raise ValueError('Must be at most 50 characters long')
        return v

class CarCreate(CarBase):
    """Schema for creating a new car listing (POST requests)"""
    image: Optional[str] = Field(None, description="Image file path or URL")

class CarResponse(CarBase):
    """Schema for car response (GET requests)"""
    id: int
    created_at: datetime
    image_path: Optional[str] = Field(None, description="Image file path or URL")

    model_config = ConfigDict(from_attributes=True)

