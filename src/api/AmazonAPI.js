// src/api/AmazonAPI.js
import axios from 'axios';

// Setup your instance and export for use
const amazonApiInstance = axios.create({
  baseURL: 'https://api.amazon.com', // Replace with the actual base URL
  // ... other custom settings
});

export const getSKUDetails = async (sku) => {
  try {
    // Replace with the actual endpoint and parameters needed to get SKU details
    const response = await amazonApiInstance.get(`/path/to/sku/details/${sku}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SKU details:', error);
    throw error;
  }
};