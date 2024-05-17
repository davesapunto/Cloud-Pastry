'use client'
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "./Cart.css";
import CartProduct from "./CartProduct";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "@/app/config/firebase";

const Cart = () => {
  const [documents, setDocuments] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsToCheckout, setProductsToCheckout] = useState([]);
  const auth = getAuth();
  const [user, userLoading] = useAuthState(auth);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) {
        return; // Exit the function if no user
      }
      const colRef = collection(db, "user", user.email, "user_products");
      const querySnapshot = await getDocs(colRef);
      const fetchedDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setDocuments(fetchedDocs); // Update state with retrieved documents
    };

    if (user) {
      fetchDocuments();
    }
  }, [user]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (!documents || documents.length === 0) {
        return 0;
      }
      let total = 0;
      for (const doc of documents) {
        const price = doc.price || 0;
        const quantity = doc.quantity || 1;
        total += price * quantity;
      }
      return total;
    };
    const updatedTotalPrice = calculateTotalPrice();
    setTotalPrice(updatedTotalPrice);
  }, [documents]);

  useEffect(() => {
    if (productsToCheckout.length > 0) {
      // Perform any additional logic or send the productsToCheckout data to the server
      console.log('Products to checkout:', productsToCheckout);
    }
  }, [productsToCheckout]);

  return (
    <main className="cart-main-content">
      <div className="cart-header">Shopping Cart</div>
      <div className="cart-container">
        <div className="cart-text-one">Item</div>
        <div className="cart-text-two">Price</div>
        <div className="cart-text-two">Quantity</div>
        <div className="cart-text-three">Total</div>
      </div>
      <div className="cart-content-container">
        <CartProduct
          onDocumentsChange={setDocuments}
          handleCheckout={(productId) => {
            const productToCheckout = documents.find((doc) => doc.id === productId);
            if (productToCheckout) {
              setProductsToCheckout((prevState) => [...prevState, productToCheckout]);
              setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== productId));
            }
          }}
        />
      </div>
      <div className="cart-summary-container">
        <div className="cart-summary-header">Order Summary</div>
        <div className="cart-summary">
          <div className="cart-text-subtotal">SubTotal:</div>
          <div className="cart-text-subtotal-two">₱{totalPrice.toFixed(2)}</div>
        </div>
        {/* You can add additional sections for shipping, etc. if needed */}
        <div className="cart-summary-three">
          <div className="cart-text-grandtotal">Grand Total:</div>
          <div className="cart-text-grandtotal-two">₱{totalPrice.toFixed(2)}</div>
        </div>
        <Link href="/checkout">
          <button className="cart-checkout-button">CHECK OUT</button>
        </Link>
      </div>
    </main>
  );
};

export default Cart;