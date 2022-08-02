import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      {/* <div> */}
      <div className="footer-columns">
        <p>splitzy</p>
        <div className="splitzy-footer-links">
          <NavLink to="/about-us">About Us</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </div>
      </div>
      <div className="footer-columns">
        <p>Technologies Used</p>
        <div className="tech-footer-links">

        </div>
      </div>
      <div className="footer-columns">
        <p>Contact Us</p>
        <div className="contact-footer-links">

        </div>
      </div>
      {/* </div> */}
    </footer>
  );
}

export default Footer;
