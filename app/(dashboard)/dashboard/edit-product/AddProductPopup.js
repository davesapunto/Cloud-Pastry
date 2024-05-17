import React, { useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import './AddProductPopup.css';
import { initFirebase, db } from '@/app/config/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const app = initFirebase();

const AddProductPopup = ({ images, name, price, category }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      // Check if any field is missing
      if (!images.length || !name || !price || !category) {
        window.alert('Please fill in all fields before adding the product.');
        return;
      }
  
      // Upload images to Firebase Storage
      const storage = getStorage();
      const productImagesRef = ref(storage, 'products');
      const uploadedImages = await Promise.all(
        images.map(async (file) => {
          const fileName = `${name}.${file.name.split('.').pop()}`; // Use the product name and index as the file name
          const imageRef = ref(productImagesRef, fileName);
          const fileType = file.type;
          const snapshot = await uploadBytes(imageRef, file, { contentType: fileType });
          const imageUrl = await getDownloadURL(snapshot.ref);
          return imageUrl;
        })
      );
  
      // Upload product data to Firestore
      const productData = {
        name,
        price: parseFloat(price),
        category,
        images: uploadedImages,
      };
      await addDoc(collection(db, 'admin', 'product', 'user_products'),  productData);

      alert(`Product "${productName}" added successfully.`);
      console.log('Product uploaded successfully!');
    } catch (error) {
      alert('Error adding product.');
    }
  };

  return (
    <div>
      <button className="add-product-button" onClick={handleOpenPopup}>
        ADD PRODUCT
      </button>
      {isPopupOpen && (
        <div className="add-product-popup-container">
          <div className="add-product-popup-content">
            <div className="popup-header">
              <MdOutlineArrowBack className="back-icon" onClick={handleClosePopup} />
              <h2 className="popup-title">ADD PRODUCT?</h2>
            </div>
            <div className="product-info-container">
              <div className="photo-container">
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Product ${index}`}
                      className="uploaded-img"
                    />
                  ))
                ) : (
                  <p>No images uploaded yet.</p>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-title">{name}</h3>
                <p className="product-info-text">{category}</p>
                <p className="product-price">₱{price}</p>
              </div>
            </div>
            <button className="proceed-button" onClick={handleUpload}>
              ADD
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductPopup;