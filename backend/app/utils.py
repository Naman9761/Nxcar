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


def get_car_image_url(image_path: Optional[str], make: str = None, model: str = None, base_url: str = "http://localhost:8000") -> Optional[str]:
    """
    Get the image URL for a car. Prefer uploaded image_path, else fallback to static mapping.
    Args:
        image_path: Path to uploaded image (relative to /images)
        make: Car manufacturer (optional, for fallback)
        model: Car model (optional, for fallback)
        base_url: Base URL for the API (default: http://localhost:8000)
    Returns:
        Image URL or None if no image found
    """
    if image_path:
        return f"{base_url}/images/{image_path}"
    if make and model:
        key = (make, model)
        image_filename = IMAGE_MAP.get(key)
        if image_filename:
            return f"{base_url}/static/{image_filename}"
    return None


# Helper to save uploaded image file
import os
import uuid
from fastapi import UploadFile

def save_uploaded_image(upload_file: UploadFile, upload_dir: str) -> str:
    """
    Save uploaded image to disk and return the filename.
    Args:
        upload_file: FastAPI UploadFile object
        upload_dir: Directory to save the image
    Returns:
        The saved filename (relative to upload_dir)
    """
    ext = os.path.splitext(upload_file.filename)[1]
    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(upload_dir, unique_name)
    with open(file_path, "wb") as f:
        f.write(upload_file.file.read())
    return unique_name

