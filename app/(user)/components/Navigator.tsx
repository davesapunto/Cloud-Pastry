/* src/components/Navigator.tsx */
'use client'
import React, { useEffect, useState } from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import DropDownProfile from './DropDownProfile';
import Link from 'next/link';
import './Navigator.css';

const Navbar: React.FC = () => {
  const [scrollingDown, setScrollingDown] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(window.scrollY);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrollingDown(prevScrollPos < currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={`navbar-container ${scrollingDown ? 'scroll-up' : 'scroll-down'}`}>
      <div className="background"></div>
      <div className="content">
        <div className="left-side">
        <Link href="/Home" className="site-name">
            Paccino's
          </Link>
        </div>
        <div className="right-side">
          <ul>
            <Link href="/" className="nav-link text-white">Home</Link>
            <Link href="/products" className="nav-link text-white">Product</Link>
            <Link href="/about" className="nav-link text-white">About</Link>
            <Link href="/contacts" className="nav-link text-white">Contacts</Link>
            <button onClick={() => setOpenProfile((prev) => !prev)} className="nav-link"><FaUser style ={{color : 'white'}} />{
                        openProfile && <DropDownProfile/>
                }</button>
            <Link href="/cart" className="nav-link"><FaShoppingCart style ={{color : 'white'}} /></Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
