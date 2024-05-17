import Link from "next/link";
import { initFirebase, db } from '../config/firebase';
import { getAuth } from "firebase/auth"
import { useAuthState} from "react-firebase-hooks/auth"
import React, { useState, useEffect } from "react";
import { getDoc, doc } from 'firebase/firestore'

const LoggedInState = () => {

    const app = initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    if(!user){
      
    }

    useEffect(() => {
      const fetchDocuments = async () => {
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
          fetchDocuments();
        }
      }, [user]);

    
     if(!user){
      return(
        <div>
          <h1 className = "absolute top-[12rem] left-[4rem] text-[4rem] text-white">WE MAKE <span className = "text-[#BD9A48]">BROWNIES</span> <br/> AND OTHER <span className = "text-[#BD9A48]">STUFFS</span></h1>
          <Link href ="/signup" className = "top-[28rem] left-[8rem] py-4 px-12 absolute z-10 border border-none rounded-md hover:bg-[#aa8a40] active:bg-[#977b39] bg-[#BD9A48] text-white">Sign up</Link>
          <Link href ="/signin" className = "top-[28rem] left-[19rem] py-4 px-14 absolute z-10 border border-1 border-[#BD9A48] rounded-md hover:bg-[#e5e5e5] active:bg-[#cccccc]  text-[#BD9A48]">Log in</Link>
        </div>
      )
    }

    if (user){
      return(
      <div>
        <h1 className = "absolute top-[20rem] left-[4rem] text-[4rem] text-white ">Welcome, <span className = "text-[#BD9A48]">{user?.displayName}{userData?.firstName + " " + userData?.lastName}</span></h1>
      </div>
      )
  }
}

export default LoggedInState;