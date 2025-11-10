"""
Script to seed the database with initial car data
Run this script to populate the database with sample car listings
"""
from app.database import SessionLocal, engine, Base
from app.models import Car

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Sample car data - only fields that exist in Car model
sample_cars = [
    {
        "make": "Tesla",
        "model": "Model 3",
        "year": 2023,
        "price": 45000.0,
        "mileage": 12500,
        "description": "Low mileage Tesla Model 3 with full autopilot capabilities. Recent service, excellent condition.",
    },
    {
        "make": "BMW",
        "model": "3 Series",
        "year": 2022,
        "price": 42000.0,
        "mileage": 25000,
        "description": "Premium sedan with luxury features. Well maintained with service history.",
    },
    {
        "make": "Honda",
        "model": "Civic",
        "year": 2022,
        "price": 28000.0,
        "mileage": 35000,
        "description": "Reliable Honda Civic with good fuel economy. Perfect for daily commuting.",
    },
    {
        "make": "Toyota",
        "model": "Camry",
        "year": 2023,
        "price": 35000.0,
        "mileage": 8000,
        "description": "Efficient hybrid sedan with advanced safety features. Excellent fuel economy.",
    },
    {
        "make": "Ford",
        "model": "Mustang",
        "year": 2022,
        "price": 52000.0,
        "mileage": 18000,
        "description": "Powerful Mustang with excellent performance. Immaculate condition.",
    },
    {
        "make": "Audi",
        "model": "A4",
        "year": 2023,
        "price": 48000.0,
        "mileage": 5000,
        "description": "Luxury Audi with cutting-edge technology. Virtually brand new.",
    },
]


def seed_database():
    """Add sample cars to the database"""
    db = SessionLocal()
    try:
        # Check if cars already exist
        existing_count = db.query(Car).count()
        if existing_count > 0:
            print(f"Database already contains {existing_count} cars. Skipping seed.")
            return
        
        # Add sample cars
        for car_data in sample_cars:
            car = Car(**car_data)
            db.add(car)
        
        db.commit()
        print(f"Successfully added {len(sample_cars)} cars to the database!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("Seeding database with sample car data...")
    seed_database()
    print("Done!")

