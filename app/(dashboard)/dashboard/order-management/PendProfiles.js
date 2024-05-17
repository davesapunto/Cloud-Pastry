import { addDoc, getDocs, updateDoc, deleteDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { FaAngleDown } from 'react-icons/fa';
import './PendProfile.css';
import MoreDetailsButton from './MoreDetailsButtons';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initFirebase, db } from "@/app/config/firebase";
import { getAuth } from "firebase/auth";

const PendProfile = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user, userLoading] = useAuthState(auth);
  const [documents, setDocuments] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationHeader, setConfirmationHeader] = useState('');
  const [confirmationButtonText, setConfirmationButtonText] = useState('');
  const [confirmationButtonColor, setConfirmationButtonColor] = useState('');
  const [selectedDocId, setSelectedDocId] = useState(null);

  const handleDeliveredClick = (docId) => {
    setSelectedDocId(docId);
    setShowConfirmation(true);
    setConfirmationHeader('Product Has Been Delivered?');
    setConfirmationMessage('By pressing delivered, the status will be moved to the delivered tab.');
    setConfirmationButtonText('DELIVERED');
    setConfirmationButtonColor('hsl(128, 63%, 50%)');
  };

  const handleCancelClick = (docId) => {
    setSelectedDocId(docId);
    setShowConfirmation(true);
    setConfirmationHeader('Product Has Been Cancelled');
    setConfirmationMessage('By pressing cancel, the status will be moved to the cancelled tab.');
    setConfirmationButtonText('CANCEL');
    setConfirmationButtonColor('hsl(4, 75%, 48%)');
  };

  const handleBackClick = () => {
    setShowConfirmation(false);
  };

  const handleConfirmationButtonClick = async () => {
    if (!selectedDocId) return;

    const docRef = doc(db, "admin", "user_checkout", "pending", selectedDocId);
    const docData = await getDoc(docRef);

    if (docData.exists()) {
      const newCollectionPath = confirmationButtonText === 'DELIVERED' ? 'delivered' : 'cancelled';
      const newCollectionRef = collection(db, "admin", "user_checkout", newCollectionPath);

      try {
        await addDoc(newCollectionRef, docData.data());
        await deleteDoc(docRef); // Delete the document from the 'pending' collection
        setDocuments((prevDocs) => prevDocs.filter(doc => doc.id !== selectedDocId));
        setShowConfirmation(false);
      } catch (error) {
        console.error(`Error moving document to ${newCollectionPath}:`, error);
      }
    } else {
      console.error("Document not found!");
    }
  };

  const fetchDocuments = async () => {
    if (!user) return;

    const userDocRef = collection(db, "admin", "user_checkout", "pending");

    try {
      const querySnapshot = await getDocs(userDocRef);
      const fetchedDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setDocuments(fetchedDocs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending orders:", error);
    }
  };

  const fetchImageUrls = async () => {
    if (documents.length === 0) return;

    const storage = getStorage(initFirebase());
    const urls = {};

    for (const doc of documents) {
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
    if (user) fetchDocuments();
  }, [user]);

  useEffect(() => {
    fetchImageUrls();
  }, [documents]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {documents.map((doc) => (
            <div key={doc.id} className="h-80 pending-orders-container">
              <p className="pending-orders-name">{doc.firstName}</p>
              <div className="pending-content-container">
                {doc.products.map((product, index) => (
                  <div key={index} className="pending-item-container">
                    {imageUrls[doc.id] && imageUrls[doc.id][index]?.imageUrl && (
                      <img className="w-32 h-32" src={imageUrls[doc.id][index].imageUrl} alt={product.product} />
                    )}
                    <div className="pending-text-content">
                      <p className="pending-product-name">{product.product}</p>
                      <p className="pending-product-price">₱{product.price}</p>
                      <MoreDetailsButton docId={doc.id} imageUrls={imageUrls[doc.id] || []} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pending-button-container">
                <div className="pending-button">
                  PENDING <FaAngleDown className="arrow-icon" />
                  <div className="dropdown-content">
                    <a onClick={() => handleDeliveredClick(doc.id)}>Delivered</a>
                    <a onClick={() => handleCancelClick(doc.id)}>Cancelled</a>
                  </div>
                </div>
              </div>
              {showConfirmation && selectedDocId === doc.id && (
                <div className="confirmation-overlay">
                  <div className="confirmation-box">
                    <p className="confirmation-header">{confirmationHeader}</p>
                    <p className="confirmation-text">{confirmationMessage}</p>
                    <div className="confirmation-buttons">
                      <button className="confirmation-back-button" onClick={handleBackClick}>
                        BACK
                      </button>
                      <button
                        className="confirmation-proceed-button"
                        style={{ backgroundColor: confirmationButtonColor }}
                        onClick={handleConfirmationButtonClick}
                      >
                        {confirmationButtonText}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PendProfile;
