/* PendProfile.tsx */
'use client'

import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import './PendProfile.css';
import MoreDetailsButton from './MoreDetailsButton';

const PendProfile = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationHeader, setConfirmationHeader] = useState('');
  const [confirmationButtonText, setConfirmationButtonText] = useState('');
  const [confirmationButtonColor, setConfirmationButtonColor] = useState('');

  const handleDeliveredClick = () => {
    setShowConfirmation(true);
    setConfirmationHeader('Product Has Been Delivered?');
    setConfirmationMessage('By pressing delivered, the status will be moved to the delivered tab.');
    setConfirmationButtonText('DELIVERED');
    setConfirmationButtonColor('hsl(128, 63%, 50%)');
  };

  const handleCancelClick = () => {
    setShowConfirmation(true);
    setConfirmationHeader('Product Has Been Cancelled');
    setConfirmationMessage('By pressing cancel, the status will be moved to the cancelled tab.');
    setConfirmationButtonText('CANCEL');
    setConfirmationButtonColor('hsl(4, 75%, 48%)');
  };

  const handleBackClick = () => {
    setShowConfirmation(false);
  };

  const handleConfirmationButtonClick = () => {
    // Add logic for when the confirmation button is clicked
  };

  return (
    <div className="pending-orders-container">
      <p className="pending-orders-name">John Doe</p>
      <div className="pending-content-container">
        <div className="pending-picture-container"></div>
        <div className="pending-text-container">
          <div className="pending-text-content">
            <p className="pending-product-name">Product Name</p>
            <p className="pending-product-info">#00</p>
            <p className="pending-product-price">₱0.00</p>
          </div>
        </div>
      </div>
      <div className="pending-button-container">
        <div className="pending-button">
          PENDING <FaAngleDown className="arrow-icon" />
          <div className="dropdown-content">
            <a onClick={handleDeliveredClick}>Delivered</a>
            <a onClick={handleCancelClick}>Cancelled</a>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p className="confirmation-header">{confirmationHeader}</p>
            <p className="confirmation-text">{confirmationMessage}</p>
            <div className="confirmation-buttons">
              <button className="confirmation-back-button" onClick={handleBackClick}>
                BACK
              </button>
              <button
                className="confirmation-proceed-button"
                style={{ backgroundColor: confirmationButtonColor }}
                onClick={handleConfirmationButtonClick}
              >
                {confirmationButtonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendProfile;
