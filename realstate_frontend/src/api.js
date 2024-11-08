// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Adjust if your backend runs on a different port or URL

// Get all properties
export const fetchProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
};

// Upload a new property
export const uploadProperty = async (propertyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/properties/`,
      propertyData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading property:", error);
  }
};
