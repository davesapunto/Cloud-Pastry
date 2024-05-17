'use client'
import React, { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mt-36 flex flex-col items-center mb-24 opacity-0 animate-fadeInAnimation animate-delay-100">
      <div className="w-full max-w-[1400px] bg-[#f5f5f5] shadow-md rounded-3xl p-5 text-center animate-emerge">
        <img
          src="public/Paccino Logo.png"
          alt="Paccinos Logo"
          className="w-64 mx-auto mt-8 opacity-0 animate-emerge animation-delay-500"
        ></img>
        <div className="text-left">
          <h2 className="text-4xl px-16 py-12 pb-8 text-black">About Us</h2>
          <div className="px-16">
            <p className="text-xl text-black mb-8">
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cum sociis natoque penatibus et magnis dis parturient montes nascetur.
            </p>
            <p className="text-xl text-black mb-8">
              Elit eget gravida cum sociis natoque penatibus et magnis dis. In est ante in nibh mauris cursus mattis molestie a.
            </p>
            <p className="text-xl text-black mb-8">
              Massa placerat duis ultricies lacus sed turpis tincidunt. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Amet justo donec enim diam vulputate ut pharetra sit.
            </p>
            <div className="flex justify-center mb-8">
              <div
                className="w-[600px] h-[500px] bg-cover bg-center mr-2 shadow-md"
                style={{
                  backgroundImage: "url('./Promo Images 7.jpg')",
                }}
              ></div>
              <div
                className="w-[600px] h-[500px] bg-cover bg-center ml-2 shadow-md"
                style={{
                  backgroundImage: "url('./Promo Images 8.jpg')",
                }}
              ></div>
            </div>
            <p className="text-xl text-black mb-8">
              Cras semper auctor neque vitae tempus quam pellentesque nec. Odio euismod lacinia at quis risus sed vulputate. Id venenatis a condimentum vitae sapien pellentesque habitant morbi. Consectetur libero id faucibus nisl tincidunt eget nullam.
            </p>
            <p className="text-xl text-black mb-8">
              Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Amet venenatis urna cursus eget nunc scelerisque viverra. Dictum varius duis at consectetur lorem donec massa. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in.
            </p>
            <div className="mb-16">
              <div
                className="w-[1220px] h-[600px] bg-cover bg-center mx-auto rounded-3xl shadow-md"
                style={{
                  backgroundImage: "url('./CEOs.png')",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;