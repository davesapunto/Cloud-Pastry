'use client'
import React, { useState, useEffect } from "react";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initFirebase, db } from "@/app/config/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Cart.css";
import "./CartProduct.css";
import Link from "next/link";

const CartProduct = ({ documents, setDocuments, selectedProductForCheckout, setSelectedProductForCheckout, handleCheckboxChange, incrementQuantity, decrementQuantity, currentPage, setCurrentPage, totalPages }) => {

  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = documents.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <main className="w-[900px] max-h-[200px] min-h-[130px] pb-10 mb-8 flex flex-wrap animate-fadeInAnimation animate-delay-100">
      {documents.length === 0 ? (
        <div className="text-black font-bold">No products in cart</div>
      ) : (
        <>
          {currentProducts.map((doc) => (
            <div key={doc.id} className="flex items-center w-full border-b border-black">
              <div className="max-w-[360px] min-w-[360px] flex items-center">
                <input
                  type="checkbox"
                  name="checkoutProduct"
                  value={doc.id}
                  checked={selectedProductForCheckout.includes(doc.id)}
                  onChange={() => handleCheckboxChange(doc.id)}
                  className="mr-4"
                />
                {doc.imageUrl && (
                  <img
                    className="animate-fadeInEmerging w-[100px] h-[100px] object-cover"
                    src={doc.imageUrl}
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                    alt={doc.product}
                  />
                )}
                <div className="text-black font-bold ml-2">{doc.product}</div>
              </div>
              <div className="max-w-[160px] min-w-[160px] flex items-center pl-2">
                <div className="text-black font-bold ml-2">₱{doc.price}</div>
              </div>
              <div className="max-w-[190px] min-w-[190px] flex items-center pl-4">
                <button
                  className="mr-2 w-10 h-10 rounded-full bg-gray-200 border-2 border-black text-lg font-bold cursor-pointer hover:bg-gray-300"
                  onClick={() => decrementQuantity(doc.id)}
                >
                  -
                </button>
                <div className="mr-2 w-12 h-10 flex items-center justify-center text-black border-2 border-black text-lg font-bold">
                  {doc.quantity || 1}
                </div>
                <button
                  className="mr-2 w-10 h-10 rounded-full bg-gray-200 border-2 border-black text-lg font-bold cursor-pointer hover:bg-gray-300"
                  onClick={() => incrementQuantity(doc.id)}
                >
                  +
                </button>
              </div>
              <div className="max-w-[185px] min-w-[185px] flex items-center pl-4">
                <div className="text-black font-bold ml-14">₱{(doc.price * (doc.quantity || 1))}</div>
              </div>
            </div>
          ))}
          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
};

const Cart = () => {
  const [documents, setDocuments] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProductForCheckout, setSelectedProductForCheckout] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsToCheckout, setProductsToCheckout] = useState([]);
  const auth = getAuth();
  const [user, userLoading] = useAuthState(auth);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) return;
      const colRef = collection(db, "user", user.email, "user_products");
      const querySnapshot = await getDocs(colRef);
      const fetchedDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setDocuments(fetchedDocs);
    };

    if (user) fetchDocuments();
  }, [user]);

  useEffect(() => {
    const fetchCheckedProducts = async () => {
      if (!user) return;
      const pendingColRef = collection(db, "user", user.email, "user_pending");
      const querySnapshot = await getDocs(pendingColRef);
      const checkedProductIds = querySnapshot.docs.map((doc) => doc.data().id);
      setSelectedProductForCheckout(checkedProductIds);
    };

    if (user) fetchCheckedProducts();
  }, [user]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = {};
      const storage = getStorage(initFirebase());

      for (const doc of documents) {
        const productName = doc.product;
        const imageRef = ref(storage, `products/${productName}.jpg`);

        try {
          const url = await getDownloadURL(imageRef);
          urls[doc.id] = url;
        } catch (error) {
          const pngRef = ref(storage, `products/${productName}.png`);
          try {
            const url = await getDownloadURL(pngRef);
            urls[doc.id] = url;
          } catch (error) {
            urls[doc.id] = '';
          }
        }
      }

      setImageUrls(urls);
      setDocuments(docs => docs.map(doc => ({ ...doc, imageUrl: urls[doc.id] })));
      setLoading(false);
    };

    if (documents.length > 0) fetchImageUrls();
  }, [documents]);

  useEffect(() => {
    const totalPagesCount = Math.ceil(documents.length / 6);
    setTotalPages(totalPagesCount);
  }, [documents]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      return documents.reduce((total, doc) => total + (doc.price * (doc.quantity || 1)), 0);
    };
    setTotalPrice(calculateTotalPrice());
  }, [documents]);

  useEffect(() => {
    if (productsToCheckout.length > 0) {
      console.log('Products to checkout:', productsToCheckout);
    }
  }, [productsToCheckout]);

  const handleCheckboxChange = async (productId) => {
    const pendingColRef = collection(db, "user", user.email, "user_pending");
    const querySnapshot = await getDocs(pendingColRef);
    const pendingDocs = querySnapshot.docs;

    setSelectedProductForCheckout((prevSelectedProducts) => {
      const isChecked = prevSelectedProducts.includes(productId);

      if (isChecked) {
        const docToRemove = pendingDocs.filter((doc) => doc.data().id === productId);
        if (docToRemove) {
          docToRemove.forEach((doc) => deleteDoc(doc.ref));
        }
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        const productDoc = documents.find((doc) => doc.id === productId);
        if (productDoc) {
          const isAlreadyPending = pendingDocs.some((doc) => doc.data().id === productId);
          if (!isAlreadyPending) {
            addDoc(pendingColRef, productDoc);
          }
          return [...prevSelectedProducts, productId];
        }
      }

      return prevSelectedProducts;
    });
  };

  const incrementQuantity = async (productId) => {
    const updatedDocuments = documents.map(doc => {
      if (doc.id === productId) {
        const newQuantity = Math.min((doc.quantity || 1) + 1, 5);
        updateDoc(doc.ref, { quantity: newQuantity });
        return { ...doc, quantity: newQuantity };
      }
      return doc;
    });
    setDocuments(updatedDocuments);
  };

  const decrementQuantity = async (productId) => {
    const updatedDocuments = documents.map(doc => {
      if (doc.id === productId) {
        const newQuantity = Math.max((doc.quantity || 1) - 1, 1);
        updateDoc(doc.ref, { quantity: newQuantity });
        return { ...doc, quantity: newQuantity };
      }
      return doc;
    });
    setDocuments(updatedDocuments);
  };

  const handleCheckoutClick = () => {
    if (selectedProductForCheckout.length === 0) {
      alert("Please select at least one product to proceed to checkout.");
    } else {
      window.location.href = "/checkout";
    }
  };

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
          documents={documents}
          setDocuments={setDocuments}
          selectedProductForCheckout={selectedProductForCheckout}
          setSelectedProductForCheckout={setSelectedProductForCheckout}
          handleCheckboxChange={handleCheckboxChange}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      <div className="cart-summary-container">
        <div className="cart-summary-header">Order Summary</div>
        <div className="cart-summary">
          <div className="cart-text-subtotal">SubTotal:</div>
          <div className="cart-text-subtotal-two">₱{totalPrice.toFixed(2)}</div>
        </div>
        <div className="cart-summary-three">
          <div className="cart-text-grandtotal">Grand Total:</div>
          <div className="cart-text-grandtotal-two">₱{(totalPrice + 40).toFixed(2)}</div>
        </div>
        <button className="cart-checkout-button" onClick={handleCheckoutClick}>CHECK OUT</button>
      </div>
    </main>
  );
};

export default Cart;
