from sqlalchemy import String, Float, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from datetime import datetime
from typing import Optional
from .database import Base

class Car(Base):
    __tablename__ = "cars"
    
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
    make: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    model: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    year: Mapped[int] = mapped_column(nullable=False, index=True)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    mileage: Mapped[Optional[int]] = mapped_column(nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

