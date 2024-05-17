'use client'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaPlusCircle, FaSearch, FaHistory, /*FaUsers,*/ FaDoorOpen } from 'react-icons/fa';
import './DashboardNav.css';
import Link from 'next/link';

const options = [
  { icon: <FaTachometerAlt />, text: 'DASHBOARD', link: '../dashboard' },
  { icon: <FaPlusCircle />, text: 'EDIT PRODUCT', link: '../dashboard/edit-product' },
  { icon: <FaSearch />, text: 'ORDER MANAGEMENT', link: '../dashboard/order-management' },
  { icon: <FaHistory />, text: 'ORDER HISTORY', link: '../dashboard/order-history' },
  //{ icon: <FaUsers />, text: 'ADD STAFF', link: '#' }
];

const DashboardNav: React.FC = () => {
  
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    const storedOption = sessionStorage.getItem('selectedOption');
    if (storedOption && location.pathname === storedOption) {
      setSelectedOption(storedOption);
    } else {
      setSelectedOption('');
    }
  }, [location.pathname]);

  const handleOptionClick = (link: string) => {
    setSelectedOption(link);
    sessionStorage.setItem('selectedOption', link);
  };

  return (
    <div className="dashboard-navbar">
      <div className="background-image"></div>
      <div className="options-menu">
        {options.map((option, index) => (
          <Link
            href={option.link}
            key={index}
            className={`option ${selectedOption === option.link ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option.link)}
          >
            <div className="option-container">
              {option.icon}
              <span className="option-text">{option.text}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="logout-side">
        <div className="nav-divider-line"></div>
        <Link href="/" className="logout-option">
          <FaDoorOpen className="option-icon" />
          <span className="option-text">LOG OUT</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardNav;
