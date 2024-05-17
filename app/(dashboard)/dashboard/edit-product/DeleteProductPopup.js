'use client'
import React, { useState, useEffect } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '@/app/config/firebase';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import './DeleteProductPopup.css';

const DeleteProductPopup = ({ productName, products }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [productDocId, setProductDocId] = useState(null);

  const handleOpenPopup = async () => {
    if (!productName) {
      alert('Please enter a product name.');
      return;
    }

    setIsLoading(true);
    try {
      // Query Firestore for the product document
      const productsCollection = collection(db, 'admin', 'product', 'user_products');
      const querySnapshot = await getDocs(query(productsCollection, where('name', '==', productName)));

      if (querySnapshot.empty) {
        alert(`No product found with name "${productName}".`);
        setIsLoading(false);
        return;
      }

      const productDoc = querySnapshot.docs[0];
      setProductDocId(productDoc.id);

      // Fetch product image from Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, `products/${productName}.jpg`);
      try {
        const imageUrl = await getDownloadURL(imageRef);
        setProductImage(imageUrl);
      } catch (error) {
        const pngRef = ref(storage, `products/${productName}.png`);
        try {
          const imageUrl = await getDownloadURL(pngRef);
          setProductImage(imageUrl);
        } catch (err) {
          setProductImage(null);
        }
      }

      setIsPopupOpen(true);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error fetching product data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setProductImage(null);
  };

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      if (!productDocId) {
        alert('Product not found.');
        setIsLoading(false);
        return;
      }

      const productDocRef = doc(db, 'admin', 'product', 'user_products', productDocId);

      // Delete product document from Firestore
      await deleteDoc(productDocRef);
      
      // Delete product image from Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, `products/${productName}.jpg`);
      await deleteObject(imageRef).catch(async () => {
        const pngRef = ref(storage, `products/${productName}.png`);
        await deleteObject(pngRef);
      });

      alert(`Product "${productName}" deleted successfully.`);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product.');
    } finally {
      setIsLoading(false);
      setIsPopupOpen(false);
    }
  };

  return (
    <div>
      <button className="delete-product-button" onClick={handleOpenPopup}>
        DELETE PRODUCT
      </button>
      {isPopupOpen && (
        <div className="delete-product-popup-container">
          <div className="delete-product-popup-content">
            <div className="delete-popup-header">
              <MdOutlineArrowBack className="delete-back-icon" onClick={handleClosePopup} />
            </div>
            <h2 className="delete-popup-title">DELETE PRODUCT?</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="delete-product-info-container">
                {productImage && (
                  <div className="delete-photo-container">
                    <img src={productImage} alt="Product" className="delete-product-image" />
                  </div>
                )}
                <div className="delete-product-info">
                  <h3 className="delete-product-title">Product: {productName}</h3>
                </div>
              </div>
            )}
            <button className="delete-proceed-button" onClick={handleDeleteProduct}>
              DELETE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProductPopup;