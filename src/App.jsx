// src/App.jsx
import React, { useState } from 'react';
import SKUForm from './components/SKUForm';
import SKULabel from './components/SKULabel';
import { fetchProductDetails } from './api/AmazonAPI';
// import { generatePDF } from './pdf/generatePDF';
import { FaAmazon, FaX } from "react-icons/fa6"
import './styles/main.scss';

const App = () => {
  const [skuData, setSKUData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSKUSubmit = async (sku) => {
    setLoading(true)
    setError(null)
    try {
      const details = await fetchProductDetails(sku);
      console.log(details);
      // setSKUData(data);
      // generatePDF(data);
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch and generate label:', error);
      setLoading(false)
      setError(error)
    }
  };

  return (
    <div className="app">
      {loading && <div className='loader'>
        <div className='circle--comp'></div>
        <p>
          Processing SKU Label...
        </p>
      </div>}
      <h1><FaAmazon /> SKU Label Generator</h1>
      <SKUForm onSubmit={handleSKUSubmit} />
      {error && <p className='error' style={{
        color: "#fff8"
      }}>
        <b style={{
          color: "#fffd"
        }}>Error:</b> {error?.message || "Error Occured"}<FaX onClick={()=>{
          setError(null)
        }} />
      </p>}
      {skuData && <SKULabel error={error} skuData={skuData} />}
    </div>
  );
};

export default App;
