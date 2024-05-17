// OrderHistoryScreen.tsx

import React from 'react';
import DashboardNav from '../Dashboard Nav and Head/DashboardNav';
import DashboardHeader from '../Dashboard Nav and Head/DashboardHeader';
import './OrderHistoryScreen.css';
import OrderHistory from './OrderHistory';

const OrderHistoryScreen: React.FC = () => {

  return (
    <div className="OrderHistoryScreen-app">
      <DashboardNav />
      <div className="OrderHistoryScreen-main-content">
        <DashboardHeader pageTitle="ORDER HISTORY" />
            <OrderHistory />
      </div>
    </div>
  );
};

export default OrderHistoryScreen;
