import numpy as np
from sklearn.linear_model import LinearRegression


def predict_next_month_revenue(sales):
    """
    Predict next month's revenue using historical sales data.
    """

    if not sales:
        return {
            "current_revenue": 0,
            "predicted_revenue": 0,
            "growth_percentage": 0,
            "message": "No sales data available"
        }

    # Calculate revenue for each sale
    revenues = []

    for sale in sales:
        revenue = float(sale.total_amount or 0)
        revenues.append(revenue)

    current_revenue = sum(revenues)

    # If there is only one sale, ML prediction is not meaningful
    if len(revenues) < 2:
        return {
            "current_revenue": round(current_revenue, 2),
            "predicted_revenue": round(current_revenue, 2),
            "growth_percentage": 0,
            "message": "Add more sales records for better prediction"
        }

    # Create time sequence
    X = np.array(range(1, len(revenues) + 1)).reshape(-1, 1)

    y = np.array(revenues)

    # Create and train Linear Regression model
    model = LinearRegression()

    model.fit(X, y)

    # Predict the next sales value
    next_period = np.array([[len(revenues) + 1]])

    predicted_sale = model.predict(next_period)[0]

    # Prevent negative prediction
    predicted_sale = max(0, predicted_sale)

    # Estimate next-month revenue
    predicted_revenue = predicted_sale * len(revenues)

    if current_revenue > 0:
        growth_percentage = (
            (predicted_revenue - current_revenue)
            / current_revenue
        ) * 100
    else:
        growth_percentage = 0

    return {
        "current_revenue": round(current_revenue, 2),
        "predicted_revenue": round(predicted_revenue, 2),
        "growth_percentage": round(growth_percentage, 2),
        "message": "Prediction generated using Linear Regression"
    }