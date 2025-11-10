
# ODMantic/MongoDB setup
import os
from dotenv import load_dotenv
from odmantic import AIOEngine
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

# Read MongoDB connection string from environment variable
MONGODB_URL = os.getenv("DATABASE_URL")
if not MONGODB_URL:
    raise RuntimeError("DATABASE_URL environment variable not set for MongoDB connection.")

# Create Motor client and ODMantic engine
client = AsyncIOMotorClient(MONGODB_URL)
engine = AIOEngine(client=client, database="nxcar")

# Dependency for FastAPI
async def get_engine():
    yield engine

