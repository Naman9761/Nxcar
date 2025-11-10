from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from .routers import cars
from fastapi.staticfiles import StaticFiles
from .database import get_engine  # Only import get_engine
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
        "https://nxcar-naman.vercel.app",
        "https://nxcar-naman.vercel.app/"  # Add with trailing slash too
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with prefix
app.include_router(cars.router, prefix="/api")

# Note: Static files don't work well in Vercel serverless
# Consider using Cloudinary, AWS S3, or Vercel Blob for images
# For now, we'll skip mounting static files in production
# Mount static files directory for images (uploaded car images)
images_path = os.path.join(os.path.dirname(__file__), "static", "images")
if os.path.exists(images_path):
    app.mount("/images", StaticFiles(directory=images_path), name="images")
    logger.info(f"Car images mounted at /images from {images_path}")
else:
    logger.warning(f"Images directory not found at {images_path}")

# Mount static files directory for public assets (if needed)
public_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public")
if os.path.exists(public_path):
    app.mount("/static", StaticFiles(directory=public_path), name="static")
    logger.info(f"Static files mounted at /static from {public_path}")
else:
    logger.warning(f"Public directory not found at {public_path}")

# Exception handlers for production best practices
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Handle HTTP exceptions with proper error responses"""
    logger.error(f"HTTP exception: {exc.detail}")
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
    logger.error(f"Validation error: {exc.errors()}")
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
            "details": str(exc) if os.getenv("DEBUG") else None,
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
async def health_check():
    """
    Health check endpoint for monitoring and load balancers.
    """
    try:
        # Test MongoDB connection
        from .database import get_engine_instance
        engine = get_engine_instance()
        # Ping the database
        await engine.client.admin.command('ping')
        db_status = "connected"
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        db_status = "disconnected"

    return {
        "status": "healthy" if db_status == "connected" else "degraded",
        "service": "Used Car Listing API",
        "database": db_status
    }
