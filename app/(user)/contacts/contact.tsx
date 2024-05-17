'use client'
import React, { useEffect } from "react";
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

const Contacts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mt-36 flex flex-col items-center mb-24">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl pb-16 text-center text-black opacity-0 animate-fadeInAnimation">
          We're a call away!
        </h2>

        <div className="flex justify-between opacity-0 animate-fadeInAnimation animate-delay-100">
          <div className="w-1/2 bg-[#f5f5f5] shadow-xl rounded-lg p-16 mb-16 mx-4 flex flex-col items-center">
            <p className="text-xl text-black font-bold text-center">
              Shoot us a message at one of our socials!
            </p>
            <div className="flex items-center mt-8 text-2xl">
              <FaFacebook className="text-black mr-2" />
              <p className="text-black text-xl font-bold flex items-center">
                <a
                  href="https://www.facebook.com/Pacci nos2022"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Paccino's2022
                </a>
              </p>
            </div>

            <div className="flex items-center mt-8 text-2xl">
              <FaInstagram className="text-black mr-2" />
              <p className="text-black text-xl font-bold flex items-center">
                <a
                  href="https://www.instagram.com/paccinos2022/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Paccino's2022
                </a>
              </p>
            </div>
          </div>
          <div className="w-1/2 bg-[#f5f5f5] shadow-xl rounded-lg p-16 mb-16 mx-4 flex flex-col items-center">
            <p className="text-xl text-black font-bold text-center">
              Contact us!
            </p>
            <div className="flex flex-col">
              <div className="flex items-center mt-8 text-2xl">
                <FaPhone className="text-black mr-2" />
                <p className="text-black text-xl font-bold flex items-center">
                  <a href="tel:+09568740011">09568740011</a>
                </p>
              </div>
              <div className="flex items-center mt-8 text-2xl">
                <FaEnvelope className="text-black mr-2" />
                <p className="text-black text-xl font-bold flex items-center">
                  <a href="mailto:Paccinos2022@gmail.com">
                    Paccinos2022@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-4xl pb-16 text-center text-black opacity-0 animate-fadeInAnimation animate-delay-300">
          Our Locations
        </h2>

        <div className="bg-[#f5f5f5] flex justify-center items-center flex-wrap shadow-xl rounded-3xl opacity-0 animate-fadeInAnimation animate-delay-500">
          <div
            className="w-1/2 h-96 bg-cover bg-center rounded-tl-3xl"
            style={{ backgroundImage: "url('./Promo Images 9.jpg')" }}
          ></div>
          <div
            className="w-1/2 h-96 bg-cover bg-center rounded-tr-3xl"
            style={{ backgroundImage: "url('./Location Image.PNG')" }}
          ></div>
          <p className="p-16 text-xl text-black text-center">
            Blk 7 Lot 16 Soldiers Home Batasan Hills 1126 Quezon City, Philippines
          </p>
        </div>
      </div>
    </main>
  );
};

export default Contacts;