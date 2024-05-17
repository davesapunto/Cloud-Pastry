'use client'
import React, { useState } from 'react';
import { FaExclamationCircle, FaPhone, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import './ToRecieveCancel.css';

const ToRecieveCancel = ({ onCancel }) => {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmissionCompleted(false); // Reset submission completed state
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextareaChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = () => {
    onCancel(reason);  // Pass the reason for cancellation
    setSubmissionCompleted(true);
  };

  return (
    <div>
      <button className="cancel-order-text" onClick={openModal}>Cancel Order?</button>
      {showModal && !submissionCompleted && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <h1 className="modal-header">
                Cancel Order? <FaExclamationCircle className="exclamation-icon" />
              </h1>
              <p className="modal-text">You are about to cancel your order, please select a reason why below:</p>
              <div className="options-container">
                <div className="radio-container">
                  <input
                    type="radio"
                    id="different-product"
                    value="Found a different product"
                    checked={selectedOption === "Found a different product"}
                    onChange={handleOptionChange}
                  />
                  <label className="radio-label" htmlFor="different-product">Found a different product</label>
                </div>
                <div className="radio-container">
                  <input
                    type="radio"
                    id="unsatisfied-product"
                    value="Unsatisfied with the product"
                    checked={selectedOption === "Unsatisfied with the product"}
                    onChange={handleOptionChange}
                  />
                  <label className="radio-label" htmlFor="unsatisfied-product">Unsatisfied with the product</label>
                </div>
                <div className="radio-container">
                  <input
                    type="radio"
                    id="technical-issues"
                    value="Technical Issues"
                    checked={selectedOption === "Technical Issues"}
                    onChange={handleOptionChange}
                  />
                  <label className="radio-label" htmlFor="technical-issues">Technical Issues</label>
                </div>
                <div className="radio-container">
                  <input
                    type="radio"
                    id="others"
                    value="Others"
                    checked={selectedOption === "Others"}
                    onChange={handleOptionChange}
                  />
                  <label className="radio-label" htmlFor="others">Others (write down a reason below)</label>
                </div>
              </div>
              {selectedOption === "Others" && (
                <textarea
                  className="reason-textarea"
                  placeholder="State your reason here!"
                  value={reason}
                  onChange={handleTextareaChange}
                />
              )}
              <div className="cancel-button-container">
                <button className="cancel-cancel-button" onClick={closeModal}>Cancel</button>
                <button className="cancel-submit-button" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {submissionCompleted && (
        <div className="account-deleted-container" onClick={closeModal}>
          <div className="account-deleted-content" onClick={(e) => e.stopPropagation()}>
            <FaCheckCircle className="checkmark-icon" />
            <h2 className="account-deleted-header">ORDER CANCELLED</h2>
            <p className="deletion-sent-text">Your cancellation has been sent to our team</p>
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
            <button className="done-button" onClick={closeModal}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToRecieveCancel;
