
"""
Script to seed the MongoDB database with initial car data using ODMantic
Run this script to populate the database with sample car listings
"""
import shutil
import os
import asyncio
from app.database import engine
from app.models import Car

# Sample car data with image paths
sample_cars = [
    {
        "make": "Tesla",
        "model": "Model 3",
        "year": 2023,
        "price": 45000.0,
        "mileage": 12500,
        "description": "Low mileage Tesla Model 3 with full autopilot capabilities. Recent service, excellent condition.",
        "image_path": "tesla-model-3.png"
    },
    {
        "make": "BMW",
        "model": "3 Series",
        "year": 2022,
        "price": 42000.0,
        "mileage": 25000,
        "description": "Premium sedan with luxury features. Well maintained with service history.",
        "image_path": "bmw-3-series.png"
    },
    {
        "make": "Honda",
        "model": "Civic",
        "year": 2022,
        "price": 28000.0,
        "mileage": 35000,
        "description": "Reliable Honda Civic with good fuel economy. Perfect for daily commuting.",
        "image_path": "honda-civic.png"
    },
    {
        "make": "Toyota",
        "model": "Camry",
        "year": 2023,
        "price": 35000.0,
        "mileage": 8000,
        "description": "Efficient hybrid sedan with advanced safety features. Excellent fuel economy.",
        "image_path": "toyota-camry-car.jpg"
    },
    {
        "make": "Ford",
        "model": "Mustang",
        "year": 2022,
        "price": 52000.0,
        "mileage": 18000,
        "description": "Powerful Mustang with excellent performance. Immaculate condition.",
        "image_path": "ford-mustang-car.jpg"
    },
    {
        "make": "Audi",
        "model": "A4",
        "year": 2023,
        "price": 48000.0,
        "mileage": 5000,
        "description": "Luxury Audi with cutting-edge technology. Virtually brand new.",
        "image_path": "audi-a4-car.jpg"
    }
]



async def seed_database():
    """Add sample cars to MongoDB and copy their images"""
    # Create images directory if it doesn't exist
    images_dir = os.path.join("app", "static", "images")
    os.makedirs(images_dir, exist_ok=True)

    # Copy sample images from public directory to static/images
    public_dir = os.path.join("public")
    if os.path.exists(public_dir):
        for car_data in sample_cars:
            src_path = os.path.join(public_dir, car_data["image_path"])
            if os.path.exists(src_path):
                dst_path = os.path.join(images_dir, car_data["image_path"])
                shutil.copy2(src_path, dst_path)
                print(f"Copied image: {car_data['image_path']}")

    # Add sample cars to MongoDB
    cars = [Car(**car_data) for car_data in sample_cars]
    try:
        await engine.save_all(cars)
        print(f"Successfully added {len(sample_cars)} cars to MongoDB!")
    except Exception as e:
        print(f"Error seeding MongoDB: {e}")
        raise


if __name__ == "__main__":
    print("Seeding MongoDB with sample car data...")
    asyncio.run(seed_database())
    print("Done!")

