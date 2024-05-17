'use client'
import { initFirebase, db } from '../config/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import { setDoc, doc } from "firebase/firestore";

export default function Signup() {
    const app = initFirebase();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [contact, setContact] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [streetError, setStreetError] = useState('');
    const [districtError, setDistrictError] = useState('');
    const [cityError, setCityError] = useState('');
    const [contactError, setContactError] = useState('');
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    const validateInputs = () => {
        let isValid = true;
        if (firstName.trim() === '') {
            setFirstNameError('This is a required input');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (lastName.trim() === '') {
            setLastNameError('This is a required input');
            isValid = false;
        } else {
            setLastNameError('');
        }

        if (email.trim() === '') {
            setEmailError('This is a required input');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.trim() === '') {
            setPasswordError('This is a required input');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (confirmPassword.trim() === '') {
            setConfirmPasswordError('This is a required input');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (street.trim() === '') {
            setStreetError('This is a required input');
            isValid = false;
        } else {
            setStreetError('');
        }

        if (district.trim() === '') {
            setDistrictError('This is a required input');
            isValid = false;
        } else {
            setDistrictError('');
        }

        if (city.trim() === '') {
            setCityError('This is a required input');
            isValid = false;
        } else {
            setCityError('');
        }

        if (contact.trim() === '') {
            setContactError('This is a required input');
            isValid = false;
        } else {
            setContactError('');
        }

        return isValid;
    };

    const registerButton = async (e) => {
        e.preventDefault();
        const isValid = validateInputs();
        if (isValid) {
            if (password !== confirmPassword) {
                setPasswordError('Passwords do not match');
                setConfirmPasswordError('Passwords do not match');
                return;
            }
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "user", email), {
                    firstName,
                    lastName,
                    email,
                    password,
                    contact,
                    street,
                    district,
                    city
                });
            } catch (error) {
                console.error("Error registering user:", error);
            }
        }
    };

    const handleInputChange = (setState, setError) => (e) => {
        setState(e.target.value);
        setError('');
    };

    return (
        <form className="relative w-screen h-[125vh] md:h-[110vh] opacity-0 animate-fadeInAnimation animate-delay-100">
            <h1 className="text-3xl pt-20 text-center">Create an Account</h1>
            <div className="grid grid-cols-1 w-80 mx-auto">
                <h1 className="pt-8 pb-2 text-lg">First Name:</h1>
                <input type="text" className="border rounded border-[#BDBDBD]" id="1" placeholder="First Name" value={firstName} onChange={handleInputChange(setFirstname, setFirstNameError)}></input>
                {firstNameError && <p className="text-red-500 text-sm">{firstNameError}</p>}
                <h1 className="pt-8 pb-2 text-lg">Last Name:</h1>
                <input type="text" className="border rounded border-[#BDBDBD]" id="2" placeholder="Last Name" value={lastName} onChange={handleInputChange(setLastname, setLastNameError)}></input>
                {lastNameError && <p className="text-red-500 text-sm">{lastNameError}</p>}
                <h1 className="pt-8 pb-2 text-lg">Email:</h1>
                <input type="text" className="border rounded border-[#BDBDBD]" id="3" placeholder="Email" value={email} onChange={handleInputChange(setEmail, setEmailError)}></input>
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                <h1 className="pt-8 pb-2 text-lg">Password:</h1>
                <input type="password" className="border rounded border-[#BDBDBD]" id="4" placeholder="Password" value={password} onChange={handleInputChange(setPassword, setPasswordError)}></input>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                <h1 className="pt-8 pb-2 text-lg">Confirm Password:</h1>
                <input type="password" className="border rounded border-[#BDBDBD]" id="5" placeholder="Confirm Password" value={confirmPassword} onChange={handleInputChange(setConfirmPassword, setConfirmPasswordError)}></input>
                {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                <h1 className="pt-8 pb-2 text-lg">Contact No:</h1>
                <input type="text" className="border rounded border-[#BDBDBD]" id="6" placeholder="Contact No" value={contact} onChange={handleInputChange(setContact, setContactError)}></input>
                {contactError && <p className="text-red-500 text-sm">{contactError}</p>}
                <h1 className="pt-8 pb-2 text-lg">Street:</h1>
                <input type="text" className="border rounded border-[#BDBDBD]" id="7" placeholder="Street" value={street} onChange={handleInputChange(setStreet, setStreetError)}></input>
                {streetError && <p className="text-red-500 text-sm">{streetError}</p>}
                <h1 className="pt-8 pb-2 text-lg">District:</h1>
                <input type="text" className="border rounded border-[#BDBDBD]" id="8" placeholder="District" value={district} onChange={handleInputChange(setDistrict, setDistrictError)}></input>
                {districtError && <p className="text-red-500 text-sm">{districtError}</p>}
                <h1 className="pt-8 pb-2 text-lg">City:</h1>
                <input type="text" className="border rounded border-[#BDBDBD]" id="9" placeholder="City" value={city} onChange={handleInputChange(setCity, setCityError)}></input>
                {cityError && <p className="text-red-500 text-sm">{cityError}</p>}
                <button type="submit" onClick={registerButton} className="rounded-md hover:bg-[#aa8a40] active:bg-[#977b39] bg-[#BD9A48] mt-8 py-3 text-center text-xl text-white shadow-xl">Register</button>
                <p className="text-sm mt-4 text-center">By creating an account, you agree to our Terms of Use & Privacy Policy</p>
                <button className="py-2 w-64 place-self-center text-sm mt-4 text-center active:bg-[#cccccc] hover:bg-[#e5e5e5] hover:rounded-md">Already have an account? Log in</button>
            </div>
        </form>
    );
}
