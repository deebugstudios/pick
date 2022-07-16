import React from "react";
import "../css/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBiking,
  faTimesCircle,
  faNoteSticky,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import profileimage from "../images/profileimage.png";

const SideBar = () => {
  return (
    <section className="side-bar">
      <div className="side-bar-links">
        <ul>
          <Link to="Deliveryrequest">
            <li>
              <FontAwesomeIcon icon={faHome} className="space-icons" />
              Delivery Request
            </li>{" "}
          </Link>
          <Link to="/Pendingdeliveries">
            <li className="active">
              <FontAwesomeIcon icon={faBiking} className="space-icons" />
              Pending Deliveries
            </li>
          </Link>

          <Link to="/Deliveryhistory">
            <li>
              <FontAwesomeIcon icon={faTimesCircle} className="space-icons" />
              Delivery History
            </li>
          </Link>

          <Link to="/Chatwithadmin">
            <li>
              <FontAwesomeIcon icon={faNoteSticky} className="space-icons" />
              Chat with Admin
            </li>
          </Link>
        </ul>

        <div className="side-bar-profile-details">
          <div className="side-bar-profile-img">
            <img src={profileimage} alt="profile image" />
          </div>
          <div className="side-bar-profile-name">
            <h5>Angie</h5>
            <p>View Profile</p>
          </div>
        </div>
        <ul>
          <Link to="">
            {" "}
            <li>
              {" "}
              <FontAwesomeIcon icon={faSignOut} className="space-icons" />
              Log out
            </li>
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
