import React, { useState } from "react";
import "../css/usersidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBiking,
  faTimesCircle,
  faNoteSticky,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

const SideBar = (props) => {
  const [sideBar, setSideBar] = useState(true);
  const show = () => {
    setSideBar(!sideBar);
  };

  return (
    <section className={sideBar ? "side-bar-1" : "not-side-bar"}>
      <div className="side-bar-links-1">
        <ul>
          <li className="toggle-sidebar" onClick={show}>
            X
          </li>
          <NavLink
            to="/user/type"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <FontAwesomeIcon icon={faHome} className="space-icons-1" />
              {sideBar ? "Request Pickup" : ""}
            </li>
          </NavLink>

          <NavLink
            to="/user/pending-del"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <FontAwesomeIcon icon={faBiking} className="space-icons-1" />
              {sideBar ? "Pending Deliveries" : ""}
            </li>
          </NavLink>

          <NavLink
            to="/user/completed-del"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <FontAwesomeIcon icon={faTimesCircle} className="space-icons-1" />
              {sideBar ? "Delivery History" : ""}
            </li>
          </NavLink>

          <NavLink
            to="/user/chatwithadminuser"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <FontAwesomeIcon icon={faNoteSticky} className="space-icons-1" />
              {sideBar ? "Chat With Admin" : ""}
            </li>
          </NavLink>
          {/* </ul> */}

          {/* <ul> */}
          <NavLink
            to="/user/user-profile"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "10px",
              };
            }}
          >
            <li>
              {sideBar ? (
                <div className="side-bar-profile-detail-1">
                  <div className="side-bar-profile-img-1">{props.profile}</div>
                  <div className="side-bar-profile-name">
                    <h5>{props.username}</h5>
                    <p>View Profile</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </li>
          </NavLink>

          <NavLink
            to="/user/user-logout"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <FontAwesomeIcon icon={faSignOut} className="space-icons-1" />
              {sideBar ? "Log out" : ""}
            </li>
          </NavLink>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
