// AddProductScreen.tsx
'use client'
import React, { useState } from 'react';
import DashboardNav from '../Dashboard Nav and Head/DashboardNav';
import DashboardHeader from '../Dashboard Nav and Head/DashboardHeader';
import AddProductChoices from './AddProductChoices';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import './AddProductScreen.css';

const AddProductScreen: React.FC = () => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState("add");

  // Function to handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  }

  // Function to render content based on selected option
  const renderContent = () => {
    switch(selectedOption) {
      case "add":
        return <AddProduct />;
      case "update":
        return <UpdateProduct />;
      case "delete":
        return <DeleteProduct />;
    }
  }

  return (
    <div className="AddProductScreen-app">
      <DashboardNav />
      <div className="AddProductScreen-main-content">
        <DashboardHeader pageTitle="EDIT PRODUCT" />
        
        {/* AddProductChoices component with option selection handler */}
        <AddProductChoices onOptionSelect={handleOptionSelect} />
        
        {/* Render content based on selected option */}
        {renderContent()}

      </div>
    </div>
  );
};

export default AddProductScreen;
