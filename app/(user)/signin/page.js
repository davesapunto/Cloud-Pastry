'use client'
import Link from 'next/link';
import { initFirebase } from '../config/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Signin() {

    const app = initFirebase();
    const provider = new GoogleAuthProvider();
    const authGoogle = getAuth();
    const [user, loading] = useAuthState(authGoogle);
    const router = useRouter();
    let loginButton;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (email.trim() !== '') {
            setEmailError('');
        }
        if (password.trim() !== '') {
            setPasswordError('');
        }
    }, [email, password]);

    if (user) {
        router.push("/");
    }

    const signIn = async () => {
        const result = await signInWithPopup(authGoogle, provider);
    }

    loginButton = async (e) => {
        e.preventDefault();
        if (email.trim() === '') {
            setEmailError('Please input your email');
            return;
        }
        if (password.trim() === '') {
            setPasswordError('Please input your password');
            return;
        }
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    setPasswordError('Incorrect email or password');
                } else {
                    setPasswordError(errorMessage);
                }
            });
    }
    

    return (
        <div className="w-screen h-[150vh] md:h-[75vh]">
            <h1 className="text-2xl pt-32 text-center">Sign in</h1>

            <div className="grid grid-cols-1 justify-items-center md:flex md:justify-center gap-[8rem] pt-20 opacity-0 animate-fadeInAnimation animate-delay-100">
                <div className="">
                    <h1 className="pt-4 pb-2 text-lg">Email:</h1>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" id="1" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    <h1 className="pt-4 pb-2 text-lg">Password:</h1>
                    <input type="password" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" id="2" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    <div className="">
                        <button onClick={loginButton} className="rounded-md hover:bg-[#aa8a40] active:bg-[#977b39] bg-[#BD9A48] mt-6 p-2 text-center text-white">Sign in</button>
                        <button className="ml-4 px-2 text-lg active:bg-[#cccccc] hover:bg-[#e5e5e5] hover:rounded">Forgot Password?</button>
                        <div className=" flex flex-1 justify-center items-center mt-4">
                            <hr className='w-2/5 border-black ' />
                            <p className=" text-grayish sm:px-3 p-1 sm:text-medium text-xs sm:font-normal font-small">or</p>
                            <hr className='w-2/5 border-black' />
                        </div>
                        <button onClick={signIn} className="border border-black rounded-md active:bg-[#cccccc] hover:bg-[#e5e5e5] bg-[#FFFFFF] flex justify-center mt-2 py-2 px-4 text-center text-xl text-black shadow-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" className="mr-1">
                                <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>

                <div className=" w-96 h-[18rem] bg-[#F8F5F0] border border-[#BDBDBD] opacity-0 animate-fadeInAnimation animate-delay-100">
                    <h1 className="text-lg pl-4 pt-4">New Customer?</h1>
                    <h1 className="text-sm pl-4 pt-4">Create an account with us and you'll able to:</h1>
                    <li className="text-sm pl-4 pt-4">Check out faster</li>
                    <li className="text-sm pl-4 pt-4">Access your order history</li>
                    <li className="text-sm pl-4 pt-4 pb-6">Save items to your cart</li>
                    <Link href="/signup" className="rounded-md hover:bg-[#aa8a40] active:bg-[#977b39] bg-[#BD9A48] mt-6 ml-4 p-2 text-center text-white">Create Account</Link>
                </div>
            </div>
        </div>
    )
}
