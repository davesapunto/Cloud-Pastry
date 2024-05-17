// OrderManageScreen.tsx
'use client'
import React, { useState } from 'react';
import DashboardNav from '../Dashboard Nav and Head/DashboardNav';
import DashboardHeader from '../Dashboard Nav and Head/DashboardHeader';
import './OrderManageScreen.css';
import OrderManageChoices from './OrderManageChoices';
import PendingOrders from './PendingOrders';
import DeliverOrders from './DeliverOrders';
import CancelOrders from './CancelOrders';

const OrderManageScreen: React.FC = () => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState("pend");

  // Function to handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  }

  // Function to render content based on selected option
  const renderContent = () => {
    switch(selectedOption) {
      case "pend":
        return <PendingOrders />;
      case "deliver":
        return <DeliverOrders />;
      case "cancel":
        return <CancelOrders />;
    }
  }

  return (
    <div className="OrderManageScreen-app">
      <DashboardNav />
      <div className="OrderManageScreen-main-content">
        <DashboardHeader pageTitle="ORDER MANAGEMENT" />
        
        <OrderManageChoices onOptionSelect={handleOptionSelect} />
        
        {renderContent()}
        
      </div>
    </div>
  );
};

export default OrderManageScreen;
