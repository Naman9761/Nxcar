# Used Car Listing Platform - Backend API

A professional FastAPI backend for managing used car listings with SQLAlchemy ORM and SQLite database.

## Features

- FastAPI with async support
- SQLAlchemy ORM with SQLite database
- Pydantic v2 for data validation
- CORS enabled for Next.js frontend
- RESTful API endpoints for car listings
- Comprehensive error handling
- Auto-generated API documentation

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # SQLAlchemy database configuration
│   ├── models.py             # Database models
│   ├── schemas.py            # Pydantic schemas for validation
│   └── routers/
│       ├── __init__.py
│       └── cars.py          # Car-related API endpoints
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables
└── README.md                 # This file
```

## Setup Instructions

### 1. Create Virtual Environment

```bash
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

The `.env` file is already configured with the default SQLite database URL. You can modify it if needed:

```
DATABASE_URL=sqlite:///./cars.db
```

### 5. Run the Application

```bash
uvicorn app.main:app --reload
```

The API will be available at:
- API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Cars

- `POST /cars/` - Create a new car listing
- `GET /cars/` - Get all car listings (with optional filters)
- `GET /cars/{car_id}` - Get a specific car by ID
- `PUT /cars/{car_id}` - Update a car listing
- `DELETE /cars/{car_id}` - Delete a car listing

### Query Parameters for GET /cars/

- `skip` (int): Number of records to skip (default: 0)
- `limit` (int): Maximum number of records to return (default: 100, max: 1000)
- `make` (string): Filter by car make
- `model` (string): Filter by car model
- `min_year` (int): Minimum year filter
- `max_year` (int): Maximum year filter
- `min_price` (float): Minimum price filter
- `max_price` (float): Maximum price filter

## Example API Requests

### Create a Car Listing

```bash
curl -X POST "http://localhost:8000/cars/" \
  -H "Content-Type: application/json" \
  -d '{
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
    "price": 25000.00,
    "mileage": 30000,
    "color": "Silver",
    "fuel_type": "Petrol",
    "transmission": "Automatic",
    "description": "Well maintained, single owner",
    "location": "New York, NY",
    "contact_email": "seller@example.com",
    "contact_phone": "+1234567890"
  }'
```

### Get All Cars with Filters

```bash
curl "http://localhost:8000/cars/?make=Toyota&min_year=2018&max_price=30000"
```

### Get a Specific Car

```bash
curl "http://localhost:8000/cars/1"
```

### Update a Car

```bash
curl -X PUT "http://localhost:8000/cars/1" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 24000.00,
    "mileage": 31000
  }'
```

### Delete a Car

```bash
curl -X DELETE "http://localhost:8000/cars/1"
```

## Database Schema

The `Car` model includes the following fields:

- `id` (Integer, Primary Key)
- `make` (String, Required)
- `model` (String, Required)
- `year` (Integer, Required)
- `price` (Float, Required)
- `mileage` (Integer, Required)
- `color` (String, Optional)
- `fuel_type` (String, Optional)
- `transmission` (String, Optional)
- `description` (Text, Optional)
- `location` (String, Optional)
- `contact_email` (Email, Optional)
- `contact_phone` (String, Optional)
- `created_at` (DateTime, Auto-generated)
- `updated_at` (DateTime, Auto-updated)

## Technologies Used

- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic v2**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for running FastAPI
- **SQLite**: Lightweight database

## Development

The application uses auto-reload mode for development. Any changes to the code will automatically restart the server.

## Production Considerations

For production deployment, consider:

1. Using PostgreSQL or MySQL instead of SQLite
2. Setting up proper authentication and authorization
3. Implementing rate limiting
4. Adding request logging and monitoring
5. Using environment variables for sensitive configuration
6. Setting up database migrations with Alembic
7. Implementing proper error logging

## License

This project is open source and available for use.

