'use client'
import LoggedInState from './components/loggedInState.js';
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';


const MainContent: React.FC = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const independentContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const checkVisibility = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        const distanceFromTop = ref.current.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (distanceFromTop < screenHeight - 50) {
          ref.current.classList.add('visible');
        }
      }
    };

    checkVisibility(contentContainerRef);
    checkVisibility(independentContainerRef);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <header className="bg-gradient-to-r from-black to-transparent bg-cover bg-center text-white text-left py-80 box-border w-screen relative font-['Readex Pro'] shadow-xl opacity-0 animate-fadeInAnimation animate-delay-100">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 0.1) 40%), url('./Promo Images 1.jpg')",
          }}
        ></div>
        {
          <LoggedInState />
        }
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-115px] w-[230px] h-[230px] bg-cover bg-center"
          style={{
            backgroundImage: "url('./Paccino Logo.png')",
          }}
        ></div>
      </header>

      <div className="mt-8 flex flex-col items-center mb-24">

        <div
          className="flex items-start w-[200%] max-w-[1350px] h-[400px] mt-20 mr-12 bg[#f5f5f5] shadow-xl rounded-3xl opacity-0 animate-fadeInEmerging"
          ref={contentContainerRef}
        >
          <div
            className="w-[400px] h-full mr-10 bg-cover bg-center rounded-l-3xl"
            style={{
              backgroundImage: "url('./Classic Brownies.jpg')",
            }}
          ></div>
          <div className="w-[65%]">
            <h1 className="mt-5 text-3xl font-bold text-black mb-24">BROWNIES</h1>
            <p className="text-xl text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <div
          className="flex items-start w-[200%] max-w-[1350px] h-[400px] mt-24 mr-12 bg[#f5f5f5] shadow-xl rounded-3xl opacity-0 animate-fadeInEmerging"
          ref={independentContainerRef}
        >
          <div className="w-[65%] pl-10">
            <h1 className="mt-5 text-3xl font-bold text-black mb-24">COOKIES</h1>
            <p className="text-xl text-black">
              New brownies description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div
            className="w-[400px] h-full ml-auto bg-cover bg-center rounded-r-3xl"
            style={{
              backgroundImage: "url('./Cookies.png')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;