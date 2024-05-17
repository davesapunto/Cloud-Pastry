'use client'
import Link from "next/link";
import DropDownProfile from './DropDownProfile';
import React, { useEffect, useState } from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';


const Navbar:React.FC = () => {


  const [scrollingDown, setScrollingDown] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(window.scrollY);
  const [openProfile, setOpenProfile] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollPos = window.scrollY;
        setScrollingDown(prevScrollPos < currentScrollPos);
        setPrevScrollPos(currentScrollPos);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [prevScrollPos]);
  
  return (
    <div
      className={`fixed w-full top-0 z-50 transition-transform duration-300 ${
        scrollingDown ? '-translate-y-full' : 'translate-y-0'
      }`}
      > 
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-3xl">
            <Link href="/" className="text-white font-serif hover:text-amber-400 transition-colors duration-300">
              Paccino's
            </Link>
          </div>
          <ul className="flex space-x-16 text-white text-lg">
            <li>
              <Link
                href="/"
                className="relative hover:text-amber-400 transition-colors duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-amber-400 hover:before:w-full before:transition-all before:duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="../products"
                className="relative hover:text-amber-400 transition-colors duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-amber-400 hover:before:w-full before:transition-all before:duration-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="../about"
                className="relative hover:text-amber-400 transition-colors duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-amber-400 hover:before:w-full before:transition-all before:duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="../contacts"
                className="relative hover:text-amber-400 transition-colors duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-amber-400 hover:before:w-full before:transition-all before:duration-300"
              >
                Contacts
              </Link>
            </li>
            <li>
              <button 
                onClick={() => setOpenProfile((prev) => !prev)}
                className="relative hover:text-amber-400 transition-colors duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-amber-400 hover:before:w-full before:transition-all before:duration-300"
              >
                
                <FaUser />
              </button>
              {
                        openProfile && <DropDownProfile/>
                }
            </li>
            <li>
              <Link
                href="../cart"
                className="relative py-0 hover:text-amber-400 transition-colors duration-300 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-amber-400 hover:before:w-full before:transition-all before:duration-300"
              >
                <FaShoppingCart />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;