from pydantic import BaseModel


class SaleCreate(BaseModel):
    product_name: str
    category: str
    quantity: int
    unit_price: float
    customer_name: str | None = None
    payment_method: str
    sale_date: str


class SaleResponse(BaseModel):
    id: int
    product_name: str
    category: str
    quantity: int
    unit_price: float
    total_amount: float
    customer_name: str | None
    payment_method: str
    sale_date: str

    class Config:
        from_attributes = True