import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import appStore from "../../../images/Appstore.png";
import playStore from "../../../images/playstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Download App Section */}
        <div className="footer__download">
          <h4 className="footer__heading">DOWNLOAD OUR APP</h4>
          <p className="footer__text">
            Download App for Android and iOS mobile phones
          </p>
          <div className="footer__app-stores">
            <img
              src={playStore}
              alt="Get it on Google Play"
              className="footer__app-img"
            />
            <img
              src={appStore}
              alt="Download on the App Store"
              className="footer__app-img"
            />
          </div>
        </div>

        {/* Brand Section */}
        <div className="footer__brand">
          <h1 className="footer__logo">ECOMMERCE</h1>
          <p className="footer__slogan">High Quality is our first priority</p>
          <p className="footer__copyright">
            Copyrights {new Date().getFullYear()} &copy; SE Jihad
          </p>
        </div>

        {/* Social Links Section */}
        <div className="footer__social">
          <h4 className="footer__heading">Follow Us</h4>
          <div className="footer__social-links">
            <a
              href="http://instagram.com/jihad639"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <FaInstagram className="footer__social-icon" /> Instagram
            </a>
            <a
              href="https://www.youtube.com/@technicaljihad7728"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <FaYoutube className="footer__social-icon" /> YouTube
            </a>
            <a
              href="https://facebook.com/jihad639"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <FaFacebook className="footer__social-icon" /> Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
