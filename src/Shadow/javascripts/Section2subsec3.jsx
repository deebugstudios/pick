import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import "../css/section2subsec3.css";
import map from "../images/maps.png";
import logo from "../images/pickloadlogo.png";
import Footer from "./Footer";
const Section2subsec3 = () => {
  return (
    <section className="subsec3-wrapper">
      <section className="subsec3">
        <div className="subsec3-left">
          <img src={map} alt="" />
        </div>
        <div className="subsec3-right">
          <h3>
            You can reach us via any of the following medium or pay us a vist at
            our office.Our support center is available 24/7
          </h3>
          <div className="info-wrapper">
            <div className="home-office">
              <h4>Main Office</h4>
              <p>11 Akpakpava St, opp. WEMA Bank, Avbiama 300102, Benin City</p>
            </div>
            <div className="contact-details">
              <h4>Contact</h4>
              <p>Mobile : 0803 890 6338</p>
              <p>Email : pickload1@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="footer">
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
                <li>pickload1@gmail.com</li>
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
      </section> */}
      {/* <Footer/> */}
    </section>
  );
};

export default Section2subsec3;
