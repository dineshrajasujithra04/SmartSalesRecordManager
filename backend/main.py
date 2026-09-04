from fastapi import FastAPI, Depends
from prediction import predict_next_month_revenue
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import Sale
from schemas import SaleCreate, SaleResponse


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="Smart Sales Record Manager API",
    description="Backend API for managing sales records and sales prediction",
    version="1.0.0"
)


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://smart-sales-frontend-l5wm.onrender.com"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------------
# HOME
# -----------------------------------------
@app.get("/")
def home():
    return {
        "message": "Smart Sales Record Manager Backend is running!"
    }


# -----------------------------------------
# HEALTH CHECK
# -----------------------------------------
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# -----------------------------------------
# CREATE A NEW SALE
# -----------------------------------------
@app.post("/sales", response_model=SaleResponse)
def create_sale(
    sale: SaleCreate,
    db: Session = Depends(get_db)
):
    total_amount = sale.quantity * sale.unit_price

    new_sale = Sale(
        product_name=sale.product_name,
        category=sale.category,
        quantity=sale.quantity,
        unit_price=sale.unit_price,
        total_amount=total_amount,
        customer_name=sale.customer_name,
        payment_method=sale.payment_method,
        sale_date=sale.sale_date
    )

    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)

    return new_sale


# -----------------------------------------
# GET ALL SALES
# -----------------------------------------
@app.get("/sales", response_model=list[SaleResponse])
def get_sales(
    db: Session = Depends(get_db)
):
    sales = db.query(Sale).order_by(
        Sale.id.desc()
    ).all()

    return sales


# -----------------------------------------
# SALES PREDICTION
# -----------------------------------------
@app.get("/predict-sales")
def predict_sales(
    db: Session = Depends(get_db)
):
    sales = db.query(Sale).all()

    result = predict_next_month_revenue(sales)

    return result