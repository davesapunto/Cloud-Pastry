import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import './CancelProfile.css';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initFirebase, db } from "@/app/config/firebase";
import { getAuth } from "firebase/auth";

const CancelProfile = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user, userLoading] = useAuthState(auth);
  const [cancelledDocuments, setCancelledDocuments] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCancelledDocuments = async () => {
    if (!user) return;

    const cancelledDocRef = collection(db, "admin", "user_checkout", "cancelled");

    try {
      const querySnapshot = await getDocs(cancelledDocRef);
      const fetchedDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCancelledDocuments(fetchedDocs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cancelled orders:", error);
    }
  };

  const fetchImageUrls = async () => {
    if (cancelledDocuments.length === 0) return;

    const storage = getStorage(initFirebase());
    const urls = {};

    for (const doc of cancelledDocuments) {
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
    if (user) fetchCancelledDocuments();
  }, [user]);

  useEffect(() => {
    fetchImageUrls();
  }, [cancelledDocuments]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-8">
          {cancelledDocuments.map((doc) => (
            <div key={doc.id} className="cancel-orders-container h-96 bg-white shadow-md p-4 rounded-lg">
              <p className="cancel-orders-name font-bold text-xl">{doc.firstName} {doc.lastName}</p>
              <div className="cancel-content-container grid grid-cols-2 gap-4">
                {doc.products.map((product, index) => (
                  <div key={index} className="cancel-item-container flex flex-col items-center">
                    {imageUrls[doc.id] && imageUrls[doc.id][index]?.imageUrl && (
                      <img className="h-32 w-32 mb-2" src={imageUrls[doc.id][index].imageUrl} alt={product.product} />
                    )}
                    <div className="cancel-text-content text-center">
                      <p className="cancel-product-name font-semibold">{product.product}</p>
                      <p className="cancel-product-info text-sm text-gray-500">#{index + 1}</p>
                      <p className="pending-product-price text-lg text-red-500">₱{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cancel-cancel-container mt-4">
                <p className="cancel-cancel text-lg font-bold text-red-500">CANCELLED</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CancelProfile;
