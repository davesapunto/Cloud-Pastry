import Link from "next/link";
import { initFirebase } from '../config/firebase';
import { getAuth } from "firebase/auth"
import { useAuthState} from "react-firebase-hooks/auth"
import React, { useState } from "react";


const DropDownProfile = () => {

    const app = initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const handleLoginClick = () => {
        setShowLoginPopup(true);
    };

    const closeLoginPopup = () => {
        setShowLoginPopup(false);
    };
  
    if(!user){
        return(
            <div className="z-10 mt-4 ml-2 bg-white flex flex-col absolute py-2 px-2 border rounded-md border-black">
            <Link href= "/signin" onClick={handleLoginClick} className="text-black py-2 px-2 hover:bg-neutral-400 hover:rounded-md">
                Sign in
            </Link>
            </div>
        )
    }
    else if (user){
        return(
        <div className = "z-10 mt-4 ml-2 bg-white flex flex-col absolute py-2 px-2 border rounded-md border-black">
        <Link href = "/profile" className = "text-black text-md py-2 px-2 hover hover:bg-neutral-400 hover:rounded-md">Profile</Link>
        <button onClick = {() => auth.signOut()} className = "text-black py-2 px-2 hover:bg-neutral-400 hover:rounded-md">Logout</button>
        </div>
        )
    }
}
export default DropDownProfile;