// PendingOrders.tsx

import React from 'react';
import PendProfile from './PendProfiles';
import './PendingOrders.css'; // Import styles if needed

const PendingOrders: React.FC = () => {

  return (
    <div className="pending-orders-app">
      <div className="pending-orders-content">
        <div className="pending-custom-box">
            <PendProfile />
        </div>
      </div>
    </div>
  );
};

export default PendingOrders;