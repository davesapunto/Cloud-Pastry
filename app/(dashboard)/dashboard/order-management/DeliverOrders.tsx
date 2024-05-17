// DeliverOrders.tsx

import React from 'react';
import DeliverProfile from './DeliverProfiles';
import './DeliverOrders.css'; // Import styles if needed

const DeliverOrders: React.FC = () => {

  return (
    <div className="deliver-orders-app">
      <div className="deliver-orders-content">
        <div className="deliver-custom-box">
            <DeliverProfile />
        </div>
      </div>
    </div>
  );
};

export default DeliverOrders;