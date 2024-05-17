// CancelProfile.tsx

import React from 'react';
import './CancelProfile.css';
import MoreDetailsButton from './MoreDetailsButtons';

const CancelProfile: React.FC = () => {
  return (
          <div className="cancel-orders-container">
            <p className="cancel-orders-name">John Doe</p>
            <div className="cancel-content-container">
              <div className="cancel-picture-container"></div>
              <div className="cancel-text-container">
                <div className="cancel-text-content">
                  <p className="cancel-product-name">Product Name</p>
                  <p className="cancel-product-info">#00</p>
                  <p className="pending-product-price">₱0.00</p>
                </div>
              </div>
            </div>
            <div className="cancel-cancel-container">
              <p className="cancel-cancel">CANCELLED</p>
            </div>
          </div>
  );
};

export default CancelProfile;
