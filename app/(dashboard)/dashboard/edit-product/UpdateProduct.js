// UpdateProduct.tsx
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineAddAPhoto } from 'react-icons/md'; // Import add circle icon
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './UpdateProduct.css'; // Import styles if needed
import UpdateProductPopup from './UpdateProductPopup';

const UpdateProduct = () => {
  const [images, setImages] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['Brownie', 'Cookie']);
  const [description, setDescription] = useState('');
  const quillRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          const addedNode = mutation.addedNodes[0];
          if (addedNode.nodeType === Node.TEXT_NODE) {
            console.log('Text node inserted:', addedNode.textContent);
          }
        }
      });
    });

    const quillNode = quillRef.current?.editor?.root;
    if (quillNode) {
      observer.observe(quillNode, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      if (images.length + fileList.length > 3) {
        window.alert('Too many images!');
        return;
      }
      const urls = Array.from(fileList).map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...urls]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories(prevCategories => [...prevCategories, newCategory]);
      setNewCategory('');
    }
  };

  return (
    <div className="up-prod-app">
      <div className="up-prod-content">

        {/* Container for product ID */}
        <div className="up-prod-input-container">
          {/* Text "Drop the price:" */}
          <p className="up-prod-id">Product ID:</p>
          {/* Grey colored peso sign */}
          <span className="up-prod-number-sign">#</span>
          {/* Input field for entering the price */}
          <input type="text" className="up-prod-number-input" />
        </div>

        {/* Container for label and input */}
        <div className="up-prod-input-container">
          {/* Text "Name of Product:" */}
          <p className="up-prod-label">Name of Product:</p>
          {/* Input field for entering the name of the product */}
          <input type="text" className="up-prod-input" />
        </div>
        {/* Container for price label and input */}
        <div className="up-prod-input-container">
          {/* Text "Drop the price:" */}
          <p className="up-prod-price-label">Drop the price:</p>
          {/* Grey colored peso sign */}
          <span className="up-prod-price-sign">&#8369;</span>
          {/* Input field for entering the price */}
          <input type="text" className="up-prod-price-input" />
        </div>
        {/* Text "Upload Photos:" */}
        <p className="up-prod-upload-label">Upload Photos:</p>
        {/* Text "Select photo(s) from your device" */}
        <p className="up-prod-small-text">Select photo(s) from your device</p>
        <div className="dashed-container">
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            style={{ display: 'none' }}
          />
          <label htmlFor="file-upload" className="up-photo-button">
            <MdOutlineAddAPhoto style={{ color: 'black', fontSize: '100px' }} />
          </label>
          {images.map((imageUrl, index) => (
            <div className="img-container" key={index}>
              <div className="image-wrapper">
                <img src={imageUrl} alt={`Product ${index}`} className="uploaded-img" />
                <button className="remove-img-button" onClick={() => handleRemoveImage(index)}>
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Category selection */}
        <p className="up-prod-category-label">Select Category:</p>
        {categories.map((category, index) => (
          <div key={index} className="category-option">
            <input type="radio" id={`category-${index}`} name="category" value={category} />
            <label htmlFor={`category-${index}`}>{category}</label>
          </div>
        ))}
        <UpdateProductPopup />
      </div>
    </div>
  );
};

export default UpdateProduct;
