// src/pdf/generatePDF.js
import jsPDF from 'jspdf';

export const generatePDF = (skuData) => {
  const pdf = new jsPDF();

  // Add text to your PDF with the SKU data
  pdf.text('SKU Label', 10, 10);
  pdf.text(`SKU: ${skuData.sku}`, 10, 20);
  // Add more details as needed

  // Save the PDF
  pdf.save('sku-label.pdf');
};
