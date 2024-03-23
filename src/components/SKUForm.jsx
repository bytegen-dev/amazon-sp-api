// src/components/SKUForm.jsx
import React, { useState } from 'react';
import './SKUForm.scss';

const SKUForm = ({ onSubmit }) => {
  const [sku, setSKU] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sku);
  };

  return (
    <form className="sku-form" onSubmit={handleSubmit}>
      <label htmlFor="sku">Enter SKU:</label>
      <input
        id="sku"
        type="text"
        value={sku}
        placeholder="Your SKU value"
        required
        onChange={(e) => setSKU(e.target.value)}
      />
      <button type="submit">Generate Label</button>
    </form>
  );
};

export default SKUForm;