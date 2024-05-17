'use client'
import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import './DeleteProduct.css';
import DeleteProductPopup from './DeleteProductPopup';
import { initFirebase, db } from '@/app/config/firebase';
import { getDocs, collection } from 'firebase/firestore'

initFirebase();

const DeleteProduct = () => {
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const colRef = collection(db, 'admin', 'product', 'user_products');
      const querySnapshot = await getDocs(colRef);
      const fetchedProducts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div className="del-prod-app">
      <div className="del-prod-content">
        <div className="del-prod-input-container">
          <p className="del-prod-id">Product Name: </p>
          <input type="text" className="del-prod-input" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <DeleteProductPopup productName={productName} products={products} />
      </div>
    </div>
  );
};

export default DeleteProduct;