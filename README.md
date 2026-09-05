# Smart Sales Record Manager

## 📌 Project Overview

Smart Sales Record Manager is a cloud-based web application designed to help businesses record, manage, analyze, and predict their sales data.

The system provides a simple dashboard where users can add sales records, view previous sales, analyze business performance, and predict future revenue using Machine Learning.

---

## 🎯 Problem Statement

Small businesses often maintain sales records manually, making it difficult to track performance, analyze revenue, and predict future sales.

Smart Sales Record Manager provides a centralized digital platform to manage sales records and generate useful business insights.

---

## 💡 Key Features

- 📊 Dashboard
- ➕ Add New Sales
- 📋 View Sales Records
- 📈 Sales Analytics
- 🤖 AI/ML Sales Prediction
- 📑 Reports
- ☁️ Cloud-based deployment
- 🔗 REST API using FastAPI

---

## 🏗️ System Architecture

User
↓
React Frontend
↓
FastAPI Backend
↓
REST API
↓
Database
↓
Sales Data
↓
Machine Learning Prediction

---

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS
- Axios

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Machine Learning
- Python
- NumPy
- Scikit-learn
- Linear Regression

### Database
- SQLite

### Deployment
- GitHub
- Render

---

## 🤖 Machine Learning

The project uses Linear Regression to predict the next month's revenue based on available sales data.

The prediction API provides:

- Current Revenue
- Predicted Revenue
- Growth Percentage
- Prediction Method

Example:

Current Revenue: ₹450000

Predicted Revenue: ₹300000

Growth Percentage: -33.33%

Prediction Method: Linear Regression

---

# 🌐 Live Application

## Frontend

Open the live application:

https://smart-sales-frontend-l5wm.onrender.com

Users can test:

- Dashboard
- Add New Sales
- Sales Records
- Analytics
- Prediction
- Reports

---

## Backend API

Backend:

https://smartsalesrecordmanager.onrender.com

API Documentation:

https://smartsalesrecordmanager.onrender.com/docs

The Swagger documentation allows users to test the backend APIs directly.

---

# 🧪 How to Test the Project

## 1. Test Frontend

Open the frontend:

https://smart-sales-frontend-l5wm.onrender.com

### Add a Sale

Go to:

Add New Sales

Enter sample information:

Product Name: Laptop

Category: Electronics

Quantity: 2

Unit Price: 50000

Customer Name: Test Customer

Payment Method: UPI

Sale Date: Today's Date

Click:

Add Sale

---

## 2. Test Sales Records

Open:

Sales Records

The newly added sale should appear in the sales table.

---

## 3. Test Analytics

Open:

Analytics

The application displays sales-related information based on the stored records.

---

## 4. Test Prediction

Open:

Prediction

The system communicates with the FastAPI backend and generates a revenue prediction using Linear Regression.

---

# 🔌 Backend API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Check backend status |
| GET | `/health` | Health check |
| POST | `/sales` | Create a new sale |
| GET | `/sales` | Get all sales |
| GET | `/predict-sales` | Generate sales prediction |

---

# 💻 Run the Project Locally

## Backend

Open the backend folder:

```bash
cd backend
