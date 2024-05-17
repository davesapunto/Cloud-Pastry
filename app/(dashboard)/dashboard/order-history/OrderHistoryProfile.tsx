// OrderHistoryProfile.tsx
'use client'
import React from 'react';
import './OrderHistoryProfile.css';

const OrderHistoryProfile: React.FC = () => {
  return (
          <div className="order-history-container">
            <p className="order-history-name">John Doe</p>
            <div className="order-history-content-container">
              <div className="order-history-picture-container"></div>
              <div className="order-history-text-container">
                <div className="order-history-text-content">
                  <p className="order-history-product-name">Product Name</p>
                  <p className="order-history-product-info">#00</p>
                  <p className="order-history-product-price">₱0.00</p>
                </div>
              </div>
            </div>
            <div className="order-history-delivered-container">
            </div>
          </div>
  );
};

export default OrderHistoryProfile;
