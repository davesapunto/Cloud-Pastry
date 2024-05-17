// CancelOrders.tsx

import React from 'react';
import CancelProfile from './CancelProfiles';
import './CancelOrders.css'; // Import styles if needed

const CancelOrders: React.FC = () => {

  return (
    <div className="cancel-orders-app">
      <div className="cancel-orders-content">
        <div className="cancel-custom-box">
            <CancelProfile />
        </div>
      </div>
    </div>
  );
};

export default CancelOrders;