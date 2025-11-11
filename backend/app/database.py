import os
from dotenv import load_dotenv
from odmantic import AIOEngine
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGODB_URL = os.getenv("DATABASE_URL")
if not MONGODB_URL:
    raise RuntimeError("DATABASE_URL environment variable not set for MongoDB connection.")

# ✅ Create a SINGLE global client and engine at startup (optimized for production)
client = AsyncIOMotorClient(MONGODB_URL)
engine = AIOEngine(client=client, database="nxcar")

def get_engine_instance() -> AIOEngine:
    """Return the existing engine instance (no recreation per request)."""
    return engine

# ✅ Only use this dependency if you absolutely need FastAPI DI
async def get_engine():
    yield engine
