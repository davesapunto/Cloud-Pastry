import { useState, useEffect } from 'react';
import { getDoc, doc, collection } from 'firebase/firestore';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './MoreDetailsButton.css';
import { db } from "@/app/config/firebase";

const MoreDetailsButton = ({ docId, imageUrls, collectionType }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [docData, setDocData] = useState(null);

  const fetchDocumentData = async (id) => {
    const docRef = doc(collection(db, "admin", "user_checkout", collectionType), id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDocData(docSnap.data());
    } else {
      console.error("No such document!");
    }
  };

  useEffect(() => {
    if (showDetails) {
      fetchDocumentData(docId);
    }
  }, [showDetails, docId, collectionType]);

  const handleDetailsClick = () => {
    setShowDetails(true);
  };

  const handleCloseClick = () => {
    setShowDetails(false);
  };

  return (
    <div>
      <button className="more-details-button" onClick={handleDetailsClick}>
        MORE DETAILS
      </button>
      {showDetails && docData && (
        <div className="confirmation-overlay">
          <div className="details-box">
            <div className="delivery-header">
              <FaMapMarkerAlt className="location-icon" />
              <span>Delivery Address</span>
            </div>
            <p>{docData.userInfo.firstName} | {docData.userInfo.contact}</p>
            <p>{docData.userInfo.address}</p>
            <hr className="divider" />
            <h2>{docData.userInfo.firstName} {docData.userInfo.lastName}</h2>
            <div className="photos-container">
              {imageUrls.map((image, index) => (
                <img key={index} src={image.imageUrl} alt={image.productName} />
              ))}
            </div>
            <div className="product-details">
              {docData.products.map((product, index) => (
                <div key={index}>
                  <h3>{product.product}</h3>
                  <p>₱{product.price}</p>
                  <p><span className="grey-text">X{product.quantity}</span></p>
                </div>
              ))}
            </div>
            <button className="close-button" onClick={handleCloseClick}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreDetailsButton;
