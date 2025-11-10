"""
Utility functions for the car listing API
"""
from typing import Optional

# Image mapping for cars (make + model -> image filename)
IMAGE_MAP = {
    ("Tesla", "Model 3"): "tesla-model-3.png",
    ("BMW", "3 Series"): "bmw-3-series.png",
    ("Honda", "Civic"): "honda-civic.png",
    ("Toyota", "Camry"): "toyota-camry-car.jpg",
    ("Ford", "Mustang"): "ford-mustang-car.jpg",
    ("Audi", "A4"): "audi-a4-car.jpg",
}

def get_car_image_url(make: str, model: str, base_url: str = "http://localhost:8000") -> Optional[str]:
    """
    Get the image URL for a car based on make and model.
    
    Args:
        make: Car manufacturer
        model: Car model
        base_url: Base URL for the API (default: http://localhost:8000)
    
    Returns:
        Image URL or None if no image found
    """
    key = (make, model)
    image_filename = IMAGE_MAP.get(key)
    
    if image_filename:
        return f"{base_url}/static/{image_filename}"
    return None

