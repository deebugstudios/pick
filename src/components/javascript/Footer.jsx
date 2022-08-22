import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import {
  faInstagramSquare,
  faLinkedin,
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../Shadow/images/pickloadlogo.png";
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
            <li>
              <Link to="/" target="_self">
                Home
              </Link>{" "}
            </li>
            <li>Features</li>
            <li>FAQs</li>
            <li>Reviews Stories</li>
          </ul>
          <ul>
            <li>Privacy</li>
            <li>Privacy</li>
            <li>
              <Link to="/privacy" target="_blank">
                Policy
              </Link>
            </li>
            <li>Payment</li>
            <li>
              <Link to="/Termsandconditions" target="_blank">
                {" "}
                Terms{" "}
              </Link>
            </li>
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
        <div className="logo-footer">
          <img src={logo} alt="" className="logo-footer" />
        </div>
        <div className="list-item-2-1">
          <span className="green-icons">
            <a
              className="green-icons"
              href="https://www.instagram.com"
              target="_blank"
            >
              {" "}
              <FontAwesomeIcon icon={faInstagramSquare} />{" "}
            </a>
          </span>
          <span>
            <a
              className="green-icons"
              href="https://www.linkedin.com"
              target="_blank"
            >
              {" "}
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </span>
          <span>
            <a
              className="green-icons"
              href="https://www.facebook.com"
              target="_blank"
            >
              <FontAwesomeIcon icon={faFacebookSquare}> </FontAwesomeIcon>{" "}
            </a>
          </span>
          <span>
            <a
              className="green-icons"
              href="https://www.twitter.com"
              target="_blank"
            >
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
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
            <Link to="/Termsandconditions" target="_blank">
              <li>Terms</li>
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
