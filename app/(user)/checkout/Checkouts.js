'use client'
import { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { initFirebase, db } from "@/app/config/firebase";
import { addDoc, getDocs, getDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { MdLocationOn } from "react-icons/md";
import "./Checkout.css";
import './Checkoutnotif.css';
import { IoIosCheckmarkCircle } from "react-icons/io";

export const Checkout = () => {
  const app = initFirebase();
  const [documents, setDocuments] = useState([]); 
  const [imageUrls, setImageUrls] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const auth = getAuth(app);
  const [username, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [user, userLoading] = useAuthState(auth);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) {
        return; // Exit if no user is logged in
      }

      const userDocRef = doc(db, "user", user.email); // Reference the user document
      const productsColRef = collection(userDocRef, "user_pending"); // Reference the user's product collection

      try {
        const querySnapshot = await getDocs(productsColRef);
        const fetchedDocs = querySnapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
        const uniqueDocsMap = new Map();
        fetchedDocs.forEach(doc => {
          if (!uniqueDocsMap.has(doc.id)) {
            uniqueDocsMap.set(doc.id, doc);
          }
        });
        const uniqueDocs = Array.from(uniqueDocsMap.values());
        setDocuments(uniqueDocs);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    if (user) {
      fetchDocuments();
    }
  }, [user]); // Re-run on user change

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (documents.length === 0) {
        return; // Exit if no products to fetch images for
      }

      const storage = getStorage(initFirebase()); // Initialize Firebase Storage
      const urls = {};

      for (const doc of documents) {
        const productName = doc.product; // Assuming product name is a property
        const imageRef = ref(storage, `products/${productName}.jpg`); // Try JPG first

        try {
          const url = await getDownloadURL(imageRef);
          urls[doc.docId] = url;
        } catch (error) {
          // Attempt PNG if JPG fails
          const pngRef = ref(storage, `products/${productName}.png`);
          try {
            const url = await getDownloadURL(pngRef);
            urls[doc.docId] = url;
          } catch (error) {
            urls[doc.docId] = ''; // Store an empty string for broken images
          }
        }
      }

      setImageUrls(urls);
      setLoading(false); // Set loading state to false after fetching
    };

    fetchImageUrls();
  }, [documents]); // Re-run on documents change

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        return; // Exit the function if no user
      }
    
      const userDocRef = doc(db, "user", user.email); // Doc reference for user document
      const userDocSnapshot = await getDoc(userDocRef); // Use getDoc to retrieve user document data
    
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setUserData(userData); // Update state with fetched user data
      } else {
        console.log('User document does not exist');
      }
    };
  
    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      setUserName(userData.firstName + " " + userData.lastName || user.displayName);
      setPhoneNumber(userData.contact || user.contact);
      setEmail(user.email || 'insertemailhere@test.com');
      setAddress(userData.street + " " + userData.district + " " + userData.city || '151 J.P. Rizal St. Bagong Silang, Quezon City, Metro Manila, 1119');
    }
  }, [userData, user]);

  const handlePlaceOrder = async () => {
    if (!user) {
      return; // Exit if no user logged in
    }
  
    const productInfo = documents.map(doc => ({
      id: doc.id, // Ensure ID is included
      product: doc.product, // Assuming product name
      quantity: doc.quantity || 1, // Use default 1 if quantity missing
      price: doc.price,
    }));
  
    try {
      await addDoc(collection(db, "admin", "user_checkout", "pending"), { 
        products: productInfo,
        userInfo: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: user.email,
          contact: userData.contact,
          address: `${userData.street}, ${userData.district}, ${userData.city}`
        },
        totalPrice: calculateTotalPrice(documents) + 40.00 // Including shipping cost
      });
      console.log("Order placed successfully");
  
      // Delete documents from user_pending and user_products collections
      const userDocRef = doc(db, "user", user.email);
      const userPendingColRef = collection(userDocRef, "user_pending");
      const userProductsColRef = collection(userDocRef, "user_products");
  
      // Fetch all documents in user_pending to handle duplicates
      const querySnapshot = await getDocs(userPendingColRef);
      const allDocs = querySnapshot.docs;
  
      for (const docItem of documents) {
        // Find all documents in user_pending with the same ID and delete them
        const duplicateDocs = allDocs.filter(d => d.data().id === docItem.id);
        for (const duplicateDoc of duplicateDocs) {
          await deleteDoc(duplicateDoc.ref);
        }
  
        // Delete from user_products collection
        const userProductDocRef = doc(userProductsColRef, docItem.id);
        await deleteDoc(userProductDocRef);
      }
  
      // Clear local state to reflect changes
      setDocuments([]);
      setImageUrls({});
    } catch (error) {
      console.error("Error adding order or deleting documents:", error);
      // Handle error handling
    }
  };

  const calculateTotalPrice = (products) => {
    let totalPrice = 0;
    for (const product of products) {
      totalPrice += product.price * (product.quantity || 1); // Consider quantity
    }
    return totalPrice;
  };

  return (
    <div className="check-section">
      <h1 className="check-header-title">Checkout</h1>
      <div className="check-delivery">
        <MdLocationOn />
        <p className="check-bold-text">Delivery Address</p>
      </div>

      <div className="check-customer">
        <div className="check-between">
          <div className="check-customer-details">
            {userData ? ( 
              <>
                <p>{userData.firstName + " " + userData.lastName} (+63) {userData.contact}</p>
                <p>{userData.street}</p>
                <p>{userData.district + ", " + userData.city}</p>
              </>
            ) : (
              <>
                <p>Juan Dela Cruz (+63) 966 389 6043</p>
                <p>151 J.P. Rizal St.</p>
                <p>Bagong Silang, Quezon City, Metro Manila, 1119</p>
              </>
            )}
          </div>
          <p>Edit</p>
        </div>
      </div>

      {loading ? (
        <div className="text-black font-bold">Loading...</div>
      ) : documents.length === 0 ? (
        <div className="text-black font-bold">No products in cart</div>
      ) : (
        <>
          {documents.map((doc) => (
            <div key={doc.docId} className="flex items-center w-full border-b border-black">
              <div className="max-w-[360px] min-w-[360px] flex items-center">
                {imageUrls[doc.docId] && (
                  <img
                    className="animate-fadeInEmerging w-[100px] h-[100px] object-cover"
                    src={imageUrls[doc.docId]}
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'; // Hide broken images
                    }}
                    alt={doc.product}
                  />
                )}
                <div className="check-details-and-quantity">
                  <p className="check-bold-text">{doc.product}</p>
                  <div className="check-price">₱{doc.price.toFixed(2)}</div> {/* Assuming a price property */}
                </div>
              </div>

              <p className="check-gray-text">
                {doc.quantity ? `${doc.quantity}x` : '1x'}
              </p>
            </div>
          ))}
        </>
      )}
      <div className="check-shipping-details">
        <p className="check-bold-text">Shipping</p>

        <div className="check-between">
          <div className="check-shipping-subdetails">
            <p>Standard Local</p>
            <p className="check-gray-text">Received by 1 Week</p>
          </div>

          <div className="check-shipping-price">
            <p>₱40.00</p>
            <p>₱40.00</p>
          </div>
        </div>
      </div>

      <div className="check-payment-details">
        <p className="check-bold-text">Payment Details</p>
        <div className="check-between">
          <div className="check-subtotal-details">
            <p>Product Subtotal</p>
            <p>Shipping Subtotal</p>
          </div>

          <div className="check-gray-text">
            <p className="check-price">₱{calculateTotalPrice(documents).toFixed(2)}</p>
            <p>₱40.00</p>
          </div>
        </div>
      </div>

      <div className="check-total-payment-details">
        <h2>Total Payment (PHP)</h2>
        <h2>₱{(calculateTotalPrice(documents) + 40.00).toFixed(2)}</h2>
      </div>
      <button className="check-place-order-button" onClick={handlePlaceOrder}>PLACE ORDER</button>
      {/*<button className="check-place-order-button" onClick={handlePlaceOrder}>PLACE ORDER</button>*/}
    </div>
  );
};



export default Checkout;
