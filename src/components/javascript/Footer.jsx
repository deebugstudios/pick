import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagramSquare,
  faLinkedin,
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../Images/pickload.png";
import "../css/footer.css";
const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-section1">
        <div className="footer-1">
          <h4>Your Ultimate Logistic Service</h4>
          <p>We off speed, safety and security of all your items.</p>
        </div>
        <div className="list-items">
          <ul>
            <li>Links</li>
            <li>Home</li>
            <li>Features</li>
            <li>FAQs</li>
            <li>Reviews Stories</li>
          </ul>
          <ul>
            <li>Privacy</li>
            <li>Privacy</li>
            <li>Policy</li>
            <li>Payment</li>
            <li>Terms</li>
          </ul>
          <div className="list-item-2">
            <ul>
              <li>Contact Us</li>
              <li>+01 234 567 8910</li>
              <li>arshakir@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-social-links">
        <div className="logo">
          <img src={logo} alt="" className="logo-footer" />
        </div>
        <div className="list-item-2-1">
          <span>
            {" "}
            <FontAwesomeIcon icon={faInstagramSquare} />{" "}
          </span>
          <span>
            <FontAwesomeIcon icon={faLinkedin} />
          </span>
          <span>
            <FontAwesomeIcon icon={faFacebookSquare} />
          </span>
          <span>
            <FontAwesomeIcon icon={faTwitterSquare} />
          </span>
        </div>
      </div>
      <div className="main-footer-rights">
        <div>
          <p>© Copyright 2022 | pickload.com | All rights reserved.</p>
        </div>
        <div>
          <ul>
            <li>Contact Us</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
