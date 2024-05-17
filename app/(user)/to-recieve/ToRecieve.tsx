// src/components/ToRecieve.tsx

import React from "react";
import "./ToRecieve.css";
import ToRecieveProfile from "./ToRecieveProfile";

const ToRecieve: React.FC = () => {

  return (
    <main className="recieve-main-content">
      <div className="recieve-header">To Recieve</div>
      <div className="recieve-custom-box">
        <ToRecieveProfile />
      </div>
    </main>
  );
};

export default ToRecieve;