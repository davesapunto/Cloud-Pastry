'use client'
import React, { useState, useEffect } from 'react';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import AddProductPopup from './AddProductPopup';
import { initFirebase, db } from '@/app/config/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './AddProduct.css'; // Import styles if needed
const app = initFirebase();

const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState(['Brownie', 'Cookie']);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [downloadedImages, setDownloadedImages] = useState([]);

    useEffect(() => {
        const fetchDownloadedImages = async () => {
            try {
                const storage = getStorage();
                const productImagesRef = ref(storage, 'products');
                const downloadedImages = await Promise.all(
                    images.map(async (file) => {
                        const fileName = file.name;
                        const imageRef = ref(productImagesRef, fileName);
                        const imageUrl = await getDownloadURL(imageRef);
                        return imageUrl;
                    })
                );
                setDownloadedImages(downloadedImages);
            } catch (error) {
                console.error('Error fetching downloaded images:', error);
            }
        };

        fetchDownloadedImages();
    }, [images]);

    const handleImageUpload = () => {
        const fileList = Array.from(event.target.files);
        const allowedTypes = ['image/png', 'image/jpeg'];

        if (fileList && fileList.length > 0) {
            if (images.length + fileList.length > 3) {
                window.alert('Too many images!');
                return;
            }

            const validFiles = fileList.filter(file => allowedTypes.includes(file.type));

            if (validFiles.length > 0) {
                setImages(prevImages => [...prevImages, ...validFiles]);
            } else {
                window.alert('Only PNG and JPEG files are allowed.');
            }
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

    const handleNameChange = (e) => setName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

    return (
        <div className="add-prod-app">
            <div className="add-prod-content">
                <div className="add-prod-input-container">
                    <p className="add-prod-label">Name of Product:</p>
                    <input type="text" className="add-prod-input" value={name} onChange={handleNameChange} />
                </div>
                <div className="add-prod-input-container">
                    <p className="add-prod-price-label">Drop the price:</p>
                    <span className="add-prod-price-sign">&#8369;</span>
                    <input type="text" className="add-prod-price-input" value={price} onChange={handlePriceChange} />
                </div>
                <p className="add-prod-upload-label">Upload Photos:</p>
                <p className="add-prod-small-text">Select photo(s) from your device</p>
                <div className="dashed-container">
                    <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload" className="add-photo-button">
                        <MdOutlineAddAPhoto style={{ color: 'black', fontSize: '100px' }} />
                    </label>
                    {images.map((image, index) => (
                        <div className="img-container" key={index}>
                            <div className="image-wrapper">
                                <img src={URL.createObjectURL(image)} alt={`Product ${index}`} className="uploaded-img" />
                                <button className="remove-img-button" onClick={() => handleRemoveImage(index)}>
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="add-prod-category-label">Select Category:</p>
                {categories.map((category, index) => (
                    <div key={index} className="category-option">
                        <input
                            type="radio"
                            id={`category-${index}`}
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor={`category-${index}`}>{category}</label>
                    </div>
                ))}
                <AddProductPopup
                    images={images}
                    name={name}
                    price={price}
                    category={selectedCategory}
                    downloadedImages={downloadedImages}
                />
            </div>
        </div>
    );
};

export default AddProduct;