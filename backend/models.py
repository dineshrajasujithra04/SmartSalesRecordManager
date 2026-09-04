from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from database import Base


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)

    product_name = Column(String, nullable=False)

    category = Column(String, nullable=False)

    quantity = Column(Integer, nullable=False)

    unit_price = Column(Float, nullable=False)

    total_amount = Column(Float, nullable=False)

    customer_name = Column(String, nullable=True)

    payment_method = Column(String, nullable=False)

    sale_date = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )