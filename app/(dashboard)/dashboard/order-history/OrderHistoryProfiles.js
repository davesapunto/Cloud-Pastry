"use client"
import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/config/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import './OrderHistoryProfile.css';

const OrderHistoryProfile = () => {
  const [cancelledOrders, setCancelledOrders] = React.useState([]);
  const [deliveredOrders, setDeliveredOrders] = React.useState([]);
  const [imageUrls, setImageUrls] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cancelled orders
        const cancelledCollectionRef = collection(db, 'admin', 'user_checkout', 'cancelled');
        const cancelledQuerySnapshot = await getDocs(cancelledCollectionRef);
        const fetchedCancelledOrders = cancelledQuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCancelledOrders(fetchedCancelledOrders);

        // Fetch delivered orders
        const deliveredCollectionRef = collection(db, 'admin', 'user_checkout', 'delivered');
        const deliveredQuerySnapshot = await getDocs(deliveredCollectionRef);
        const fetchedDeliveredOrders = deliveredQuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDeliveredOrders(fetchedDeliveredOrders);

        // Fetch image URLs
        const orders = [...fetchedCancelledOrders, ...fetchedDeliveredOrders];
        const storage = getStorage();
        const urls = {};
        for (const order of orders) {
          const productImages = order.products.map((product) => ({
            productName: product.product,
            imageUrl: '',
          }));

          for (const productImage of productImages) {
            const imageRef = ref(storage, `products/${productImage.productName}.jpg`);
            try {
              const url = await getDownloadURL(imageRef);
              productImage.imageUrl = url;
            } catch (error) {
              const pngRef = ref(storage, `products/${productImage.productName}.png`);
              try {
                const url = await getDownloadURL(pngRef);
                productImage.imageUrl = url;
              } catch (error) {
                productImage.imageUrl = '';
              }
            }
          }

          urls[order.id] = productImages;
        }
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {cancelledOrders.map((order) => (
        <div key={order.id} className="order-history-container">
          <p className="order-history-name">{order.firstName}</p>
          <div className="order-history-content-container">
            {order.products.map((product, index) => (
              <React.Fragment key={index}>
                <div className="order-history-picture-container">
                  {imageUrls[order.id] && imageUrls[order.id][index]?.imageUrl && (
                    <img
                      className="w-32 h-32"
                      src={imageUrls[order.id][index].imageUrl}
                      alt={product.product}
                    />
                  )}
                </div>
                <div className="order-history-text-container mr-4">
                  <div className="order-history-text-content">
                    <p className="order-history-product-name">{product.product}</p>
                    <p className="order-history-product-info">{/* Render product info */}</p>
                    <p className="order-history-product-price">₱{product.price}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="order-history-delivered-container">
            <p className = "text-red-500">Cancelled</p>
          </div>
        </div>
      ))}

      {deliveredOrders.map((order) => (
        <div key={order.id} className="order-history-container">
          <p className="order-history-name">{order.firstName}</p>
          <div className="order-history-content-container">
            {order.products.map((product, index) => (
              <React.Fragment key={index}>
                <div className="order-history-picture-container">
                  {imageUrls[order.id] && imageUrls[order.id][index]?.imageUrl && (
                    <img
                      className="w-32 h-32"
                      src={imageUrls[order.id][index].imageUrl}
                      alt={product.product}
                    />
                  )}
                </div>
                <div className="order-history-text-container mr-4">
                  <div className="order-history-text-content">
                    <p className="order-history-product-name">{product.product}</p>
                    <p className="order-history-product-info">{/* Render product info */}</p>
                    <p className="order-history-product-price">₱{product.price}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="order-history-delivered-container">
            <p className = "text-[#2fd045]">Delivered</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryProfile;