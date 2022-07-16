import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import logo from "../Images/pickload.png";
import "../css/usernavsignedin.css";

const Navsignedin = () => {
  return (
    <nav className="user-nav">
      <div className="nav-wrapper-1">
        <div className="logo">
          <div>
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <a href="">Home</a>
            </li>
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
                  <li>Delivery History</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="profile">
          <div className="profile-img">{/* <img src={} alt="" /> */}</div>
          <FontAwesomeIcon icon={faBell} />
        </div>
      </div>
    </nav>
  );
};

export default Navsignedin;
