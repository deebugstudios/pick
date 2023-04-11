import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
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
          <p>We offer speed, safety and security of all your items.</p>
        </div>
        <div className="list-items">
          <ul>
            <li>Links</li>
            <li>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#1FAA08" : "black",
                })}
                to="/"
                target="_self"
              >
                Home
              </NavLink>{" "}
            </li>
            <li>Features</li>
            <li>FAQs</li>
            <li>Reviews Stories</li>
          </ul>
          <ul>
            <li>Privacy</li>
            <li>Privacy</li>
            <li>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#1FAA08" : "black",
                })}
                to="/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Policy
              </NavLink>
            </li>
            <li>Payment</li>
            <li>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#1FAA08" : "black",
                })}
                to="/Termsandconditions"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Terms{" "}
              </NavLink>
            </li>
          </ul>
          <div className="list-item-2">
            <ul>
              <li>Contact Us</li>
              <li>0803 890 6338</li>
              <li>support@pickload.ng</li>
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
              rel="noreferrer"
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
              rel="noreferrer"
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
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookSquare}> </FontAwesomeIcon>{" "}
            </a>
          </span>
          <span>
            <a
              className="green-icons"
              href="https://www.twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTwitterSquare} />
            </a>
          </span>
        </div>
      </div>
      <div className="main-footer-rights">
        <div>
          <p>
            © Copyright {new Date().getFullYear()} | pickload.ng | All rights
            reserved.
          </p>
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
