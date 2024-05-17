/* UserInfo.tsx */
'use client'
import { db } from '@/app/config/firebase';
import React, { useState, useEffect } from 'react';
import './UserInfo.css';
import {  doc, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';


const UserInfo = () => {
    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState('User');
    const [phoneNumber, setPhoneNumber] = useState('966 389 6043');
    const [email, setEmail] = useState('insertemailhere@test.com');
    const [password, setPassword] = useState('12345_/Aa*@');
    const [address, setAddress] = useState('151 J.P. Rizal St. Bagong Silang, Quezon City, Metro Manila, 1119');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [emailReminder, setEmailReminder] = useState('');
    const [passwordReminder, setPasswordReminder] = useState('');
    const [disableEditButtons, setDisableEditButtons] = useState(false);
    const auth = getAuth();
    const router = useRouter();
    
    const [user, userLoading] = useAuthState(auth);


    useEffect(() => {
      const fetchDocuments = async () => {
        if (!user) {
          router.push("/") // Exit the function if no user
        }
      
        const userDocRef = doc(db, "user", user.email); // Doc reference for user document
        const userDocSnapshot = await getDoc(userDocRef); // Use getDoc to retrieve user document data
      
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData); // Update state with fetched user data
        } else {
          console.log('User document does not exist');
        }
      };
    
        if (user) {
          fetchDocuments();
        }
      }, [user]);

    const handleEditName = () => {
      setIsEditingName(true);
      setDisableEditButtons(true);
      setInputValue(userName);
    };
  
    const handleEditPhone = () => {
      setIsEditingPhone(true);
      setDisableEditButtons(true);
      setInputValue(phoneNumber);
    };
  
    const handleEditEmail = () => {
      setIsEditingEmail(true);
      setDisableEditButtons(true);
      setInputValue(email);
    };

    const handleEditPassword = () => {
      setIsEditingPassword(true);
      setDisableEditButtons(true);
      setInputValue(password);
    };

    const handleEditAddress = () => {
        setIsEditingAddress(true);
        setDisableEditButtons(true);
        setInputValue(address);
    };
  
    const handleSaveName = () => {
      setUserName(inputValue);
      setIsEditingName(false);
      setDisableEditButtons(false);
    };

    const handleSavePhone = () => {
      setPhoneNumber(inputValue);
      setIsEditingPhone(false);
      setDisableEditButtons(false);
    };
  
    const handleSaveEmail = () => {
      setEmail(inputValue);
      setIsEditingEmail(false);
      setDisableEditButtons(false);
      setEmailReminder('');
    };

    const handleSavePassword = () => {
      if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[/@*]).{6,}$/.test(inputValue)) {
        setPassword(inputValue);
        setIsEditingPassword(false);
        setDisableEditButtons(false);
        setPasswordReminder('');
      } else {
        setPasswordReminder('Please include at least one number, one uppercase letter, one lowercase letter, and one of the following characters: /, @, *');
      }
    };

    const handleSaveAddress = () => {
        setAddress(inputValue);
        setIsEditingAddress(false);
        setDisableEditButtons(false);
    };
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      if (isEditingPassword) {
        setPasswordReminder('');
      } else {
        if (value.includes('@')) {
          setEmailReminder('');
        } else {
          setEmailReminder('Please add your email');
        }
      }
    };

    if(user){
    
    useEffect(() => {
        if (userData) {
          setUserName(userData.firstName + " " + userData.lastName || user.displayName);
          setPhoneNumber(userData.contact || user.contact);
          setEmail(user.email || 'insertemailhere@test.com');
          setPassword(userData.password || user.password);
          setAddress(userData.street + " " + userData.district + " " + userData.city || '151 J.P. Rizal St. Bagong Silang, Quezon City, Metro Manila, 1119');
        }
      }, [userData, user]);
    }
    else if(!user){

      router.push("/");

    }

  return (
        <div className="user-info-user-info-container">
          <h3 className="user-info-user-info-header">User Information</h3>
          <div className="user-info-user-info-content user-info-name-info">
            <span>Name: </span>
            <span className="space-between"></span>
            {isEditingName ? (
              <>
                <input
                    type="text"
                    value={isEditingName ? inputValue : userData?.name || 'User'}
                    onChange={handleInputChange}
                    autoFocus
                />
                <button className="user-info-save-button" onClick={handleSaveName}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="user-info-grey-text">{userName}</span>
                <button className="user-info-edit-button" onClick={handleEditName} disabled={disableEditButtons}>
                  Edit
                </button>
              </>
            )}
          </div>
          <div className="user-info-user-info-content user-info-phone-info">
            <span>Phone Number (+63): </span>
            <span className="space-between"></span>
            {isEditingPhone ? (
              <>
                <input
                    type="text"
                    value={isEditingPhone ? inputValue : userData?.phoneNumber || '966 389 6043'}
                    onChange={handleInputChange}
                    autoFocus
                />
                <button className="user-info-save-button" onClick={handleSavePhone}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="user-info-grey-text">{phoneNumber}</span>
                <button className="user-info-edit-button" onClick={handleEditPhone} disabled={disableEditButtons}>
                  Edit
                </button>
              </>
            )}
          </div>
          <div className="user-info-user-info-content user-info-email-info">
            <span>Email Address: </span>
            <span className="space-between"></span>
            {isEditingEmail ? (
              <>
                <input
                    type="text"
                    value={isEditingEmail ? inputValue : user?.email || 'insertemailhere@test.com'}
                    onChange={handleInputChange}
                    autoFocus
                />
                <button className="user-info-save-button" onClick={handleSaveEmail}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="user-info-grey-text">{email}</span>
                <button className="user-info-edit-button" onClick={handleEditEmail} disabled={disableEditButtons}>
                  Edit
                </button>
              </>
            )}
          </div>
          {emailReminder && !isEditingPassword && <div className="user-info-reminder">{emailReminder}</div>}
          <div className="user-info-user-info-content user-info-password-info">
            <span>Password: </span>
            <span className="space-between"></span>
            {isEditingPassword ? (
              <>
                <input
                    type="password"
                    value={isEditingPassword ? inputValue : userData?.password || '12345_/Aa*@'}
                    onChange={handleInputChange}
                    autoFocus
                />
                <button className="user-info-save-button" onClick={handleSavePassword}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="user-info-grey-text">{isEditingPassword ? inputValue : password.replace(/./g, '*')}</span>
                <button className="edit-button" onClick={handleEditPassword} disabled={disableEditButtons}>
                  Edit
                </button>
              </>
            )}
          </div>
          {passwordReminder && <div className="user-info-reminder">{passwordReminder}</div>}
          <div className="user-info-user-info-content user-info-address-info">
            <span>Address: </span>
            <span className="space-between"></span>
            {isEditingAddress ? (
              <>
                <input
                    type="text"
                    value={isEditingAddress ? inputValue : userData?.address || '151 J.P. Rizal St. Bagong Silang, Quezon City, Metro Manila, 1119'}
                    onChange={handleInputChange}
                    autoFocus
                />
                <button className="user-info-save-button" onClick={handleSaveAddress}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="user-info-grey-text">{address}</span>
                <button className="user-info-edit-button" onClick={handleEditAddress} disabled={disableEditButtons}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
  );
};

export default UserInfo;
