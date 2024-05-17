/* src/components/Footer.tsx */

import "./Footer.css"
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="parent-footer">
      <div className="container">

        <div className="divider">

          <div className="left">
            <Link href="/Dashboard" className="dashboard-link"><h1 className="footer-heading">READY TO <span className="order-text">ORDER?</span></h1></Link>
            {/*<h1 className="footer-heading">READY TO <span className="order-text">ORDER?</span></h1>*/}

            <div className="socials">
              <div className="social-container">
                <FaPhone />
                <p>09568740011</p>
              </div>

              <div className="social-container">
                <IoMdMail />
                <p>Paccinos2022@gmail.com</p>
              </div>

              <div className="social-container">
                <FaLocationDot />
                <p>Bagong Silang Quezon City</p>
              </div>

              <div className="social-container">

                <img src="assets/Images/Cloud Pastries Base White.png"
                  className="logo-size"
                  alt=""
                />
                <p>Made by Cloud Pastries</p>
              </div>
            </div>

          </div>

          <div className="right">

            <div className="social-icons">
            <a href="https://www.facebook.com/Paccinos2022" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/paccinos2022/" target="_blank" rel="noopener noreferrer" className="icon-link">
              <PiInstagramLogoFill />
            </a>
            </div>

            <div className="data-content">
              <Link href="/PrivacyPolicy" className="Link-name">
               Privacy • Policy
            </Link>
            <Link href="/TermsOfService" className="Link-name">
              Terms of Service
            </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;