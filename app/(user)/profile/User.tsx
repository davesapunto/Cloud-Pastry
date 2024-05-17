// src/components/User.tsx
'use client'
import React from "react";
import { FaMotorcycle } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import UserInfo from "./UserInfos";
import UserDelete from "./UserDelete";
import "./User.css";
import Link from "next/link"

const User: React.FC = () => {

  return (
    <main className="user-main-content">
      <div className="user-name-container">
          <div className="user-name">
            WELCOME, <span className="user-name-highlight"> USER</span>!
          </div>
      </div>
      <div className="user-photo-container"></div>
      <div className="user-header"></div> 
      <div className="user-button-container">

          <Link href="/to-recieve" className="user-button-receive">
              <FaMotorcycle size={120} /> 
              <div className="receive-text">To Receive</div>
          </Link>
          

          
      </div>
      
      <UserInfo />

      <UserDelete />

    </main>
  );
};

export default User;