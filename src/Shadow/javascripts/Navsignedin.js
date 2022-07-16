import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/pickloadlogo.png";
import profileimage from "../images/profileimage.png";
import "../css/navsignedin.css";
import { Link } from "react-router-dom";
const Navsignedin = () => {
  return (
    <nav className="agent-nav">
      <div className="nav-wrapper">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="nav-links">
          <ul>
            <Link to="/">Home</Link>
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
            <li className="hover-me">
              <a href="">
                My Account <FontAwesomeIcon icon={faAngleDown} />
              </a>
              <div className="sub-menu">
                <ul>
                  <li>Pending deliveries</li>
                  <li>Delivery history</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="profile">
          <div className="profile-img">
            <img src={profileimage} alt="" />
          </div>
          <div className="notification">
            <FontAwesomeIcon icon={faBell} className="notification-bell" />
            <span>3</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navsignedin;
