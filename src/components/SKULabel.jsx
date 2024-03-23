// src/components/SKULabel.jsx
import React from 'react';
import './SKULabel.scss';

const SKULabel = ({ skuData }) => {
  if (!skuData) {
    return <p>Please generate a label.</p>;
  }

  // Replace with your label generation logic
  return (
    <div className="sku-label">
      {/* Render SKU label details here */}
      <p>SKU: {skuData.sku}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default SKULabel;