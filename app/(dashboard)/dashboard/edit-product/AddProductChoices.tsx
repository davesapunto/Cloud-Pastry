// AddProductChoices.tsx

import React, { useState } from 'react';
import './AddProductChoices.css';

interface AddProductChoicesProps {
  onOptionSelect: (option: string) => void;
}

const AddProductChoices: React.FC<AddProductChoicesProps> = ({ onOptionSelect }) => {
  const [activeOption, setActiveOption] = useState(""); // State to track active option

  // Function to handle option click
  const handleOptionClick = (option: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default navigation behavior
    setActiveOption(option); // Set active option
    onOptionSelect(option); // Call the onOptionSelect function with the selected option
  };

  return (
    <div className="AddProductChoices">
      {/* Add onClick handlers to prevent default behavior */}
      <a
        href="/add-product"
        className={`AddProductChoices-option ${activeOption === "add" ? 'active' : ''}`}
        onClick={(e) => handleOptionClick("add", e)}
      >
        ADD PRODUCT
      </a>
      <span className="AddProductChoices-divider">|</span>
      <a
        href="/delete-product"
        className={`AddProductChoices-option ${activeOption === "delete" ? 'active' : ''}`}
        onClick={(e) => handleOptionClick("delete", e)}
      >
        DELETE PRODUCT
      </a>
    </div>
  );
};

export default AddProductChoices;
