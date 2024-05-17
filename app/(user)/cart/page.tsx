// src/components/CartScreen.tsx
'use client'
import React from "react";
import "./CartScreen.css"; 
import Cart from "./CartProduct"; 
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import { getAuth } from "firebase/auth";


const CartScreen: React.FC = () => {
  const authGoogle = getAuth();
  const [user, loading] = useAuthState(authGoogle);
  const router = useRouter();
  if (loading) {
    return (
      <div>
        {/* Display a loading indicator or message */}
        <p>Loading...</p>
      </div>
    );
  }
  else if(!user){
    router.push("/")
  }
  return (
    <div>

      {/* Main Content */}
      <Cart />


    </div>
  );
};

export default CartScreen;
