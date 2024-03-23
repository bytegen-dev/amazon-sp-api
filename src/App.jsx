// src/App.jsx
import React, { useState } from 'react';
import SKUForm from './components/SKUForm';
import SKULabel from './components/SKULabel';
import { getSKUDetails } from './api/AmazonAPI';
import { generatePDF } from './pdf/generatePDF';
import './styles/main.scss';

const App = () => {
  const [skuData, setSKUData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSKUSubmit = async (sku) => {
    setLoading(true)
    try {
      const data = await getSKUDetails(sku);
      setSKUData(data);
      generatePDF(data);
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch and generate label:', error);
      setLoading(false)
      setError(error?.message)
    }
  };

  return (
    <div className="app">
      <h1>SKU Label Generator</h1>
      <SKUForm onSubmit={handleSKUSubmit} />
      <SKULabel error={error} skuData={skuData} />
    </div>
  );
};

export default App;
