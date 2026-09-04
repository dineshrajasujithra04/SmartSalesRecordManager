import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Get all sales
export const getSales = async () => {
  const response = await axios.get(`${API_URL}/sales`);
  return response.data;
};

// Create a new sale
export const createSale = async (sale) => {
  const response = await axios.post(`${API_URL}/sales`, sale);
  return response.data;
};

// Get sales prediction
export const getPrediction = async () => {
  const response = await axios.get(`${API_URL}/predict-sales`);
  return response.data;
};