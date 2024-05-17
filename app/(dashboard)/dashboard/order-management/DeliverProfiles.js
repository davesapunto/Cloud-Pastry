import { addDoc, getDocs, updateDoc, deleteDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { FaAngleDown } from 'react-icons/fa';
import './DeliverProfile.css';
import MoreDetailsButton from './MoreDetailsButtons';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initFirebase, db } from "@/app/config/firebase";
import { getAuth } from "firebase/auth";

const DeliveredProfile = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user, userLoading] = useAuthState(auth);
  const [deliveredDocuments, setDeliveredDocuments] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDeliveredDocuments = async () => {
    if (!user) return;

    const deliveredDocRef = collection(db, "admin", "user_checkout", "delivered");

    try {
      const querySnapshot = await getDocs(deliveredDocRef);
      const fetchedDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setDeliveredDocuments(fetchedDocs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching delivered orders:", error);
    }
  };

  const fetchImageUrls = async () => {
    if (deliveredDocuments.length === 0) return;

    const storage = getStorage(initFirebase());
    const urls = {};

    for (const doc of deliveredDocuments) {
      const productImages = doc.products.map(product => ({
        productName: product.product,
        imageUrl: ''
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

      urls[doc.id] = productImages;
    }

    setImageUrls(urls);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchDeliveredDocuments();
  }, [user]);

  useEffect(() => {
    fetchImageUrls();
  }, [deliveredDocuments]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {deliveredDocuments.map((doc) => (
            <div key={doc.id} className="deliver-orders-container h-80">
              <p className="deliver-orders-name">{doc.firstName} {doc.lastName}</p>
              <div className="deliver-content-container">
                {doc.products.map((product, index) => (
                  <div key={index} className="deliver-picture-container">
                    {imageUrls[doc.id] && imageUrls[doc.id][index]?.imageUrl && (
                      <img className = "w-32 h-32"src={imageUrls[doc.id][index].imageUrl} alt={product.product} />
                    )}
                    <div className="deliver-text-container">
                      <div className="deliver-text-content">
                        <p className="deliver-product-name mt-4">{product.product}</p>
                        <p className="pending-product-price">₱{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="deliver-delivered-container">
                <p className="deliver-delivered">DELIVERED</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DeliveredProfile;