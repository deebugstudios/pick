import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Pickload from "../Images/pickload.png";
import "../css/usernavsignedin.css";
import { Link } from "react-router-dom";

const Navsignedin = () => {
  return (
    <nav className="user-nav">
      <div className="nav-wrapper-1">
        <div id="pick-div">
          <div>
            <Link to="/main">
              <img src={Pickload} alt="" />
            </Link>
          </div>
        </div>
        <div className="nav-links">
          <ul>
            <Link to="/main">
              <li>Home</li>
            </Link>
            <li>
              <Link to="/aboutUS1"> About Us </Link>
            </li>
            <li>
              <Link to="/contactUS1"> Contact Us </Link>
            </li>
            <li className="hover-me">
              My Account <FontAwesomeIcon icon={faAngleDown} />
              <div className="sub-menu">
                <ul>
                  <Link to="/pending-del">
                    <li>Pending deliveries</li>
                  </Link>
                  <Link to="/completed-del">
                    <li>Delivery History</li>
                  </Link>
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
