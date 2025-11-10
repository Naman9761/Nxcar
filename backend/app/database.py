# ODMantic/MongoDB setup - Per-request connections for maximum reliability
import os
from dotenv import load_dotenv
from odmantic import AIOEngine
from motor.motor_asyncio import AsyncIOMotorClient
from typing import AsyncGenerator
import logging

load_dotenv()
logger = logging.getLogger(__name__)

# Read MongoDB connection string from environment variable
MONGODB_URL = os.getenv("DATABASE_URL")
if not MONGODB_URL:
    raise RuntimeError("DATABASE_URL environment variable not set for MongoDB connection.")

# Dependency for FastAPI - Creates fresh connection per request
async def get_engine() -> AsyncGenerator[AIOEngine, None]:
    """
    FastAPI dependency that creates a fresh MongoDB connection per request.
    This is the most reliable approach for serverless environments.
    """
    # Create fresh client for this request
    client = AsyncIOMotorClient(
        MONGODB_URL,
        maxPoolSize=10,  # Higher for local dev
        minPoolSize=1,
        maxIdleTimeMS=30000,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=10000,
        socketTimeoutMS=30000,
    )

    # Create engine with fresh client
    engine = AIOEngine(client=client, database="nxcar")

    try:
        logger.debug("Created MongoDB connection for request")
        yield engine
    finally:
        # Close connection after request completes
        try:
            client.close()
            logger.debug("Closed MongoDB connection")
        except Exception as e:
            logger.warning(f"Error closing MongoDB client: {e}")
