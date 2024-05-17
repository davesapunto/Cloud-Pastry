'use client'
import { initFirebase, db } from "@/app/config/firebase";
import { addDoc, setDoc, doc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaPlus, FaMinus } from "react-icons/fa"
import { useState } from "react";
export default function Cookie(){

  const app = initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState('');

  if(user){
  
  }
  const incrementButton = () => {

    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 5)); 
  }
  
  const  decrementButton = () => {

    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  }

  const addToCart = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, "user", user.email, "user_products"), {
      product: 'Cookies', 
      quantity: quantity,
      price: 100
    })

  }

    return(
  
      <div className = "w-screen xl:h-[150vh]">
  
        <div className = "w-screen h-[60vh] mt-20 flex justify-center ">
          <img 
            className = "w-[24rem] h-[24rem] mt-20" 
            src = "/Cookies.png"
              alt = "Cookies">
          </img>
  
          <div className = "w-[24rem] h-[24rem] mt-20">
            <h1 className = "text-4xl mt-8 ml-8 ">Cookies </h1>
            <h1 className = "text-2xl mt-8 ml-8">₱100.00</h1>
            <div className = "mt-8 ml-8 w-[17.4rem] h-16 flex justify-center items-center">
              <button onClick = {incrementButton} className = "border-[15px] hover:border-[#dfdcd8] active:border-[#c6c4c0] outline outline-1 outline-black border-[#F8F5F0] rounded-full">
                <FaPlus />
              </button>
              <div className = "ml-8 outline outline-1 outline-black w-[2.5rem] h-[2.5rem] flex justify-center items-center ">{quantity}</div>
              <button onClick = {decrementButton} className = "ml-8 border-[15px] hover:border-[#dfdcd8] active:border-[#c6c4c0] outline outline-1 outline-black border-[#F8F5F0] rounded-full">
                <FaMinus />
              </button>
              <div id = "total-count"></div>
            </div>
            <button className = "text-white mt-8 ml-8 py-1.5 px-24 bg-[#BD9A48] shadow-2xl hover:bg-[#caae6c] active:bg-[#d7c291]">Add to cart</button>
          </div>
  
        </div>
  
        <div className = "my-20 w-screen h-[35vh] bg-[#F8F5F0] flex justify-center">
          <h1 className = "text-4xl py-20 px-20">Product <br/> Information</h1>
  
          <div className = "my-8 w-4/6 h-[25vh] border-0 border-l-2 border-black">
            <h1 className = "text-xl my-4 mx-4">Lorem ipsum dolor sit amet </h1>
            <p className = "mx-4 py-8">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
              Cum sociis natoque penatibus et magnis dis parturient montes nascetur. <br />
              Elit eget gravida cum sociis natoque penatibus et magnis dis. In est ante in nibh mauris cursus mattis molestie a. <br/>
              Massa placerat duis ultricies lacus sed turpis tincidunt. 
              Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. 
              Amet justo donec enim diam vulputate ut pharetra sit.
              </p>
          </div>
        </div>
      </div>
    )
  }