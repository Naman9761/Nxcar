from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException
from .database import engine, Base
from .routers import cars
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Used Car Listing API",
    description="A professional FastAPI backend for managing used car listings",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend-domain.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with prefix
app.include_router(cars.router, prefix="/api")

# Mount static files directory for images
public_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public")
if os.path.exists(public_path):
    app.mount("/static", StaticFiles(directory=public_path), name="static")
    logger.info(f"Static files mounted at /static from {public_path}")
else:
    logger.warning(f"Public directory not found at {public_path}")

# Startup event: Create database tables
@app.on_event("startup")
async def startup_event():
    """Create database tables on application startup"""
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {str(e)}")
        raise

# Exception handlers for production best practices
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Handle HTTP exceptions with proper error responses"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.detail,
            "status_code": exc.status_code
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors with detailed error messages"""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": True,
            "message": "Validation error",
            "details": exc.errors()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions in production"""
    logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": True,
            "message": "Internal server error",
            "status_code": 500
        }
    )

@app.get("/", tags=["Root"])
def root():
    """
    Root endpoint returning API status and documentation links.
    """
    return {
        "message": "Used Car Listing API",
        "status": "running",
        "version": "1.0.0",
        "documentation": {
            "swagger_ui": "/docs",
            "redoc": "/redoc"
        },
        "endpoints": {
            "health": "/health",
            "cars": "/api/cars"
        }
    }

@app.get("/health", tags=["Health"])
def health_check():
    """
    Health check endpoint for monitoring and load balancers.
    Returns API health status.
    """
    return {
        "status": "healthy",
        "service": "Used Car Listing API"
    }

