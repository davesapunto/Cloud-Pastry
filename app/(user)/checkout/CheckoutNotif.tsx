/* Checkoutnotif.tsx */

import React, { useState } from 'react';
import './Checkoutnotif.css';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';

const ToRecieveViewDeets: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showRatePopup, setShowRatePopup] = useState(false);
  const authGoogle = getAuth();
  const [user, loading] = useAuthState(authGoogle);
  const router = useRouter();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleRatePopup = () => {
    setShowRatePopup(!showRatePopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowRatePopup(false);
  };

  return (
    <div>

      <button className="check-place-order-button" onClick={togglePopup}>
        PLACE ORDER
      </button>

      {showPopup && !showRatePopup && (

        <div className="check-place-order-popup-background" onClick={handleClosePopup}>

          <div className="check-place-order-popup-container" onClick={(e) => e.stopPropagation()}>
            <IoIosCheckmarkCircle className="check-place-order-exclamation-icon" />

            <div className="check-place-order-popup-text" style={{ whiteSpace: 'pre-line' }}>
                {`You have successfully placed your order! 
                Click OK to go back to home.`}
            </div>

            <div className="check-place-order-button-container">

                    <button className="check-place-order-popup-button"onClick={handleClosePopup}>OK</button>
                
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ToRecieveViewDeets;
