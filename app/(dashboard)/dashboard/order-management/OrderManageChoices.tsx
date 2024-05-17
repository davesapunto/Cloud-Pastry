// OrderManageChoices.tsx

import React, { useState } from 'react';
import './OrderManageChoices.css';

interface OrderManageChoicesProps {
  onOptionSelect: (option: string) => void;
}

const OrderManageChoices: React.FC<OrderManageChoicesProps> = ({ onOptionSelect }) => {
  const [activeOption, setActiveOption] = useState(""); // State to track active option

  // Function to handle option click
  const handleOptionClick = (option: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default navigation behavior
    setActiveOption(option); // Set active option
    onOptionSelect(option); // Call the onOptionSelect function with the selected option
  };

  return (
    <div className="OrderManageChoices">
      {/* Add onClick handlers to prevent default behavior */}
      <a
        href="/pending-orders"
        className={`OrderManageChoices-option ${activeOption === "pend" ? 'active' : ''}`}
        onClick={(e) => handleOptionClick("pend", e)}
      >
        PENDING ORDERS
      </a>
      <span className="OrderManageChoices-divider">|</span>
      <a
        href="/delivered-orders"
        className={`OrderManageChoices-option ${activeOption === "deliver" ? 'active' : ''}`}
        onClick={(e) => handleOptionClick("deliver", e)}
      >
        DELIVERED ORDERS
      </a>
      <span className="OrderManageChoices-divider">|</span>
      <a
        href="/cancelled-orders"
        className={`OrderManageChoices-option ${activeOption === "cancel" ? 'active' : ''}`}
        onClick={(e) => handleOptionClick("cancel", e)}
      >
        CANCELLED ORDERS
      </a>
    </div>
  );
};

export default OrderManageChoices;
