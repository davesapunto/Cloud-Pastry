/* UserDelete.tsx */

import React, { useState } from 'react';
import { FaArrowLeft, FaPhone, FaEnvelope, FaCheckCircle } from 'react-icons/fa'; // Importing icons
import './UserDelete.css';

const UserDelete: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reason, setReason] = useState('');

  const handleDeleteClick = () => {
    // Show the confirmation container initially
    setShowConfirmation(true);
  };

  const handleBackClick = () => {
    setShowConfirmation(false);
    setIsAccountDeleted(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value);
  };

  const handleDoneClick = () => {
    // Hide both confirmation and account-deleted containers
    setShowConfirmation(false);
    setIsAccountDeleted(false);
  };

  const handleSubmitClick = () => {
    // Switch to the account-deleted container
    setIsAccountDeleted(true);
  };

  return (
    <div>
      <button className="user-info-button" onClick={handleDeleteClick}>Delete Account</button>
      {showConfirmation && !isAccountDeleted && (
        <div className="confirmation-container">
          <div className="confirmation-content">
            <FaArrowLeft className="back-button" onClick={handleBackClick} />
            <h2 className="confirmation-header">
              <span style={{ color: 'hsl(4, 75%, 48%)' }}>DELETING</span> <span style={{ color: 'hsl(44, 63%, 50%)' }}>YOUR ACCOUNT?</span>
            </h2>
            <p className="confirmation-text">
              Deleting your account is an irreversible action, all your information will be <strong>permanently</strong> erased. Are you sure you want to continue?
            </p>
            <p className="confirmation-text">
              Please enter your password if you have made your decision.
            </p>
            <div className="password-input-container">
              <label className="password-label">Password:</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="password-input"
                style={{ width: '300px' }} // Set width for password input field
              />
            </div>
            <div className="password-input-container">
              <label className="password-label">Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="password-input"
                style={{ width: '300px' }} // Set width for confirm password input field
              />
            </div>
            <p className="reason-label">Enter the reason you want to delete your account (optional):</p>
            <textarea
              value={reason}
              onChange={handleReasonChange}
              className="reason-textarea"
              placeholder="Enter your reason..."
              style={{ width: '600px', height: '150px' }} // Set width and height for textarea
            />
            <button className="submit-button" onClick={handleSubmitClick}>DELETE ACCOUNT</button>
          </div>
        </div>
      )}
      {isAccountDeleted && (
        <div className="account-deleted-container">
          <div className="account-deleted-content">
            <FaCheckCircle className="checkmark-icon" />
            <h2 className="account-deleted-header">ACCOUNT DELETED</h2>
            <p className="deletion-sent-text">Your Deletion has been sent to our team</p>
            <p className="contact-text">If you have more concerns, contact us!</p>
            <div className="contact-info">
              <div className="phone-info">
                <FaPhone className="phone-icon" />
                <span className="phone-text">09568740011</span>
              </div>
              <div className="email-info">
                <FaEnvelope className="email-icon" />
                <span className="email-text">Paccinos2022@gmail.com</span>
              </div>
            </div>
            <button className="done-button" onClick={handleDoneClick}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDelete;
