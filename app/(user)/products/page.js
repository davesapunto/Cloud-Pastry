'use client'
import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, initFirebase } from '@/app/config/firebase';
import {getAuth} from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";
import Link from 'next/link';
import { FaPlus, FaMinus } from 'react-icons/fa';  // Import icons for increment/decrement buttons

initFirebase();

const ProductDisplay = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [products, setProducts] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [quantities, setQuantities] = useState({});  // To store quantities of each product


  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const colRef = collection(db, 'admin', 'product', 'user_products');
        const querySnapshot = await getDocs(colRef);
        const fetchedProducts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const urls = {};
      for (const product of products) {
        const productName = product.name;
        let imageUrl = '';
        try {
          const imageRef = ref(storage, `products/${productName}.jpg`);
          imageUrl = await getDownloadURL(imageRef);
        } catch (error) {
          try {
            const pngRef = ref(storage, `products/${productName}.png`);
            imageUrl = await getDownloadURL(pngRef);
          } catch (err) {
            console.error('Error fetching image for', productName, ':', err);
            imageUrl = '/placeholder.png'; // Use a placeholder image if not found
          }
        }
        urls[product.id] = imageUrl;
      }
      setImageUrls(urls);
    };
    if (products.length > 0) {
      fetchImages();
    }
  }, [products]);

  const filteredProducts = selectedCategories.length > 0
    ? products.filter((product) => selectedCategories.includes(product.category))
    : products;

  const incrementButton = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.min((prevQuantities[id] || 1) + 1, 5)
    }));
  };

  const decrementButton = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1)
    }));
  };

  const addToCart = async (e, product) => {
    e.preventDefault();
    await addDoc(collection(db, "user", user.email, "user_products"), {
      product: product.name,
      quantity: quantities[product.id] || 1,
      price: product.price
    });
  };

  return (
    <div className="w-screen h-[475vh] md:h-[250vh] xl:h-[150vh] grid grid-cols-1 justify-items-center">
      <h1 className="text-3xl my-4">Products</h1>
      <div className="w-5/6 h-[400vh] md:h-[200vh] xl:w-5/6 xl:h-[100vh] border-0 border-black border-t-2 grid grid-cols-1 justify-items-center xl:flex xl:justify-center">
        <div className="w-[14rem] h-[14rem] mt-0 xl:mr-32 py-8 grid grid-cols-1 border-0 border-b-2 border-black">
          <h1 className="ml-4 text-2xl">Search Filter</h1>
          <h1 className="ml-4 text-sm py-4 font-bold">By Category</h1>
          {Array.from(new Set(products.map((product) => product.category))).map((category) => (
            <label key={category} className="ml-4">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="checkmark"></span> {category}
            </label>
          ))}
        </div>
        <div className="xl:my-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[2rem] md:gap-[8rem] xl:gap-[8rem] opacity-0 animate-fadeInAnimation animate-delay-100">
          {filteredProducts.map(product => (
            <div key={product.id} className="flip-card w-[16rem] h-[24rem]">
              <div className="flip-card-inner">
                <div className="flip-card-front hover:bg-[#dfdcd8] active:bg-[#c6c4c0] content-start shadow-2xl h-full w-full bg-[#F8F5F0]">
                  <img className="w-[16rem] h-[16rem]" src={imageUrls[product.id] || '/placeholder.png'} alt={product.name} />
                  <h1 className="text-bottom text-center py-4">{product.name}</h1>
                  <h1 className="ml-4 mt-2 text-sm">₱{product.price.toFixed(2)}</h1>
                </div>
                <div className="flip-card-back bg-[#F8F5F0] flex flex-col items-center justify-center h-full w-full">
                  <div className="increment-decrement flex items-center justify-center">
                    <button onClick={() => incrementButton(product.id)} className="border-2 p-2 rounded-full">
                      <FaPlus />
                    </button>
                    <div className="mx-4 outline outline-1 outline-black w-[2.5rem] h-[2.5rem] flex justify-center items-center">
                      {quantities[product.id] || 1}
                    </div>
                    <button onClick={() => decrementButton(product.id)} className="border-2 p-2 rounded-full">
                      <FaMinus />
                    </button>
                  </div>
                  <button onClick={(e) => addToCart(e, product)} className="add-to-cart text-white mt-4 py-1.5 px-24 bg-[#BD9A48] shadow-2xl hover:bg-[#caae6c] active:bg-[#d7c291]">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
