# ODMantic/MongoDB setup - Optimized for Vercel serverless
import os
import asyncio
from dotenv import load_dotenv
from odmantic import AIOEngine
from motor.motor_asyncio import AsyncIOMotorClient
from typing import AsyncGenerator
import logging

load_dotenv()
logger = logging.getLogger(__name__)

MONGODB_URL = os.getenv("DATABASE_URL")
if not MONGODB_URL:
    raise RuntimeError("DATABASE_URL environment variable not set for MongoDB connection.")

# Global client and engine (reused across warm requests)
_client = None
_engine = None
_event_loop_id = None

def get_current_loop_id():
    """Get unique identifier for current event loop"""
    try:
        loop = asyncio.get_event_loop()
        return id(loop)
    except RuntimeError:
        return None

def create_client():
    """Create a new MongoDB client optimized for Vercel"""
    return AsyncIOMotorClient(
        MONGODB_URL,
        maxPoolSize=1,
        minPoolSize=0,
        maxIdleTimeMS=45000,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=10000,
        socketTimeoutMS=45000,
        retryWrites=True,
        retryReads=True,
    )

async def get_engine() -> AsyncGenerator[AIOEngine, None]:
    """
    FastAPI dependency that provides ODMantic engine.
    Reuses connections when safe, recreates on event loop changes.
    """
    global _client, _engine, _event_loop_id
    
    current_loop_id = get_current_loop_id()
    needs_new_client = False
    
    # Check if we need to recreate client
    if _client is None:
        logger.info("No existing client - creating new one")
        needs_new_client = True
    elif _event_loop_id != current_loop_id:
        logger.warning(f"Event loop changed - recreating client")
        needs_new_client = True
        try:
            _client.close()
        except Exception as e:
            logger.error(f"Error closing old client: {e}")
    
    # Create new client if needed
    if needs_new_client:
        _client = create_client()
        _engine = AIOEngine(client=_client, database="nxcar")
        _event_loop_id = current_loop_id
        logger.info("Created new MongoDB client and engine")
    
    try:
        # Verify connection is alive
        await _client.admin.command('ping')
        yield _engine
    except Exception as e:
        logger.error(f"MongoDB connection error: {e} - recreating client")
        # Connection failed, recreate everything
        _client = create_client()
        _engine = AIOEngine(client=_client, database="nxcar")
        _event_loop_id = current_loop_id
        yield _engine
