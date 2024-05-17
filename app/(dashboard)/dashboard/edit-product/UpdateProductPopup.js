// UpdateProductPopup.tsx
'use client'
import React, { useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import './UpdateProductPopup.css';

const UpdateProductPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  
  return (
    <div><button className="update-product-button" onClick={handleOpenPopup}>
      UPDATE PRODUCT</button>
      {isPopupOpen && (
        <div className="update-product-popup-container">
          <div className="update-product-popup-content">
            <div className="update-popup-header">
              <MdOutlineArrowBack className="update-back-icon" onClick={handleClosePopup} />
              </div>
                <h2 className="update-popup-title">UPDATE PRODUCT?</h2>
                <div className="update-product-info-container">
                  <div className="update-photo-container"></div>
                  <div className="update-product-info">
                    <h3 className="update-product-title">Product</h3>
                    <p className="update-product-info-text">#00</p>
                    <p className="update-product-price">₱0.00</p>
                  </div>
                </div>
            <button className="update-proceed-button">UPDATE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProductPopup;
