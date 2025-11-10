
from odmantic import Model, Field
from datetime import datetime
from typing import Optional

class Car(Model):
    make: str
    model: str
    year: int
    price: float
    mileage: Optional[int] = None
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    image_path: Optional[str] = None

