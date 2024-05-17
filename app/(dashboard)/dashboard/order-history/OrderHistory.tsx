// OrderHistory.tsx

import React from 'react';
import './OrderHistory.css'; // Import styles if needed
import OrderHistoryProfile from './OrderHistoryProfiles';

const OrderHistory: React.FC = () => {

  return (
    <div className="order-history-orders-app">
      <div className="order-history-orders-content">

        <div className="order-history-custom-box">
            <OrderHistoryProfile />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;