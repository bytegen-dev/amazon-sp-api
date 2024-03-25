// src/components/SKULabel.jsx
import React, { useEffect, useRef, useState } from 'react';
import './SKULabel.scss';
import { FaChevronDown, FaCopy, FaWandMagicSparkles, FaX } from 'react-icons/fa6';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';

// const details = {
//   sku, marketplaceId, productType, itemName, fnSku, conditionType, asin, lastUpdatedDate, createdDate, mainImage
// }

const SKULabel = ({ skuData, setLoading, closeLabel }) => {
  const [dropMap, setDropMap] = useState(false)

  const sku = skuData?.sku

  const fnSku = skuData.fnSku

  const [ isNew, setIsNew ] = useState(false)

  useEffect(()=>{
    const conditionTypeLower = skuData?.conditionType?.toLowerCase()
    if(conditionTypeLower?.includes("new")){
      setIsNew(true)
    }
  },[skuData?.conditionType])

  const barcodeRef = useRef(null)

  useEffect(() => {
    if(sku){
      JsBarcode(barcodeRef.current, fnSku, { format: "CODE128" });
    }
  }, [sku]);

  const description = "axax"

  const generatePdf = () => {
    setLoading(true)
    html2canvas(document.querySelector("#skuLabel")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`SKULabel-for-${sku}.pdf`);
      setTimeout(()=>{
        setLoading(false)
      },2000)
    });
  };

  const copyValue = (value) => {
    // Check if the clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
      // Attempt to copy the text to the clipboard
      navigator.clipboard.writeText(value)
        .then(() => {
          alert('copied to clipboard successfully!');
        })
        .catch((err) => {
          console.error('Failed to copy text to clipboard:', err);
        });
    } else {
      // Fallback method for browsers without clipboard API support
      // Create a temporary text area element
      const textArea = document.createElement('textarea');
      textArea.value = value;
      // Avoid scrolling to bottom of page in MS Edge
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
  
      try {
        // Attempt to execute the copy command
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
  
      // Clean up the temporary element
      document.body.removeChild(textArea);
    }
  };
  

  const details  = [
    {
      property: "Marketplace Id",
      value: skuData?.marketplaceId,
    },
    {
      property: "Item Name",
      value: skuData?.itemName,
    },
    {
      property: "fnSku",
      value: skuData?.fnSku,
    },
    {
      property: "Product Type",
      value: skuData?.productType,
    },
    {
      property: "ASIN",
      value: skuData?.asin,
    },
    {
      property: "Created Date",
      value: skuData?.createdDate,
    },
    {
      property: "Last Updated Date",
      value: skuData?.lastUpdatedDate,
    },
    {
      property: "Condition Type",
      value: skuData?.conditionType,
    },
  ]
  // Replace with your label generation logic
  return (
    <>
      <div className="sku-label">
        <button className='back-btn' onClick={closeLabel}>
          <FaX />
        </button>
        {/* Render SKU label details here */}
        <p className='sku'>SKU: <b>{skuData.sku}</b></p>
        <div className='img-holder'>
          <img src={skuData?.mainImage} width={300} height={500} alt='' />
        </div>
        <div className='generate btn-holder'>
          <button className='btn fancy' onClick={()=>{
            generatePdf()
          }}>
            Generate SKU Label PDF <FaWandMagicSparkles />
          </button>
        </div>
        <div className={`details-drop ${dropMap ? "show" : ""}`}>
          <button className='heading' onClick={()=>{
            setDropMap(!dropMap)
          }}>
            <p>
              Product Details
            </p>
            <FaChevronDown />
          </button>
          <div className='map'>
            {
              details?.map((detail, index)=>{
                return (
                  <div className='detail' key={index}>
                    <p className='property'>
                      {detail?.property}
                    </p>
                    <div className='value'>
                      <p>
                        {detail?.value}
                      </p>
                    </div>
                    <button className='copy' onClick={()=>{
                      copyValue(detail?.value)
                    }}>
                      <FaCopy />
                    </button>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* Add more details as needed */}
      </div>

      <div id="skuLabel" style={{ width: '210mm', minHeight: '297mm', backgroundColor: 'white', padding: '10mm' }}>
        <div className='label'>
          <svg ref={barcodeRef}></svg>
          <p className='name'>{skuData?.itemName}</p>
          {/* <div>Description: {description}</div> */}
          {isNew && <div className='new'>New</div>}
          {/* Add the rest of your label design here */}
        </div>
        <div className='label'></div>
        <div className='label'></div>

        <div className='label'></div>
        <div className='label'></div>
        <div className='label'></div>
        
        <div className='label'></div>
        <div className='label'></div>
        <div className='label'></div>
        
        <div className='label'></div>
        <div className='label'></div>
        <div className='label'></div>
        
        <div className='label'></div>
        <div className='label'></div>
        <div className='label'></div>
        
        <div className='label'></div>
        <div className='label'></div>
        <div className='label'></div>
        
        <div className='label'></div>
        <div className='label'></div>
        <div className='label'></div>
        
        <div className='label'></div>
        <div className='label'></div>
        <div className='label'></div>

      </div>
    </>
  );
};

export default SKULabel;
