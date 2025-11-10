from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from typing import Generator
import os
from dotenv import load_dotenv

# Load environment variables from .env (if present)
load_dotenv()

# Read DATABASE_URL from environment, fallback to sqlite file for local dev
DATABASE_URL = os.getenv("DATABASE_URL")

# Create engine; for SQLite we need check_same_thread arg
engine_kwargs = {}
if DATABASE_URL.startswith("sqlite"):
    engine_kwargs = {"connect_args": {"check_same_thread": False}}

engine = create_engine(DATABASE_URL, **engine_kwargs)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for models
class Base(DeclarativeBase):
    pass

# Dependency to get DB session
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

