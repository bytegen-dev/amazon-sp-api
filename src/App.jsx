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

  // const fetchProductMetadata = async(asin)=>{

  // }

  const handleSKUSubmit = async (sku) => {
    setLoading(true)
    setError(null)
    setSKUData(null)
    try {
      const data = await fetchProductDetails(sku);
      if(data){
        const sku = data?.sku
        const summary = data?.summaries?.length ? data?.summaries[0] : null
        const {marketplaceId, productType, itemName, fnSku, conditionType, asin, lastUpdatedDate, createdDate} = summary
        const mainImage = summary?.mainImage?.link
        const details = {
          sku, marketplaceId, productType, itemName, fnSku, conditionType, asin, lastUpdatedDate, createdDate, mainImage
        }

        console.log(details);
        setSKUData(details)
      }
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch and generate label:', error);
      setLoading(false)
      setError(error)
    }
  };

  const generatePdf = ()=>{

  }

  const closeLabel = ()=>{
    setSKUData(null)
  }

  return (
    <div className="app">
      {loading && <div className='loader'>
        <div className='circle--comp'></div>
        <p>
          Please Wait...
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
      {skuData && <SKULabel setLoading={setLoading} generatePdf={generatePdf} closeLabel={closeLabel} error={error} skuData={skuData} />}
    </div>
  );
};

export default App;
