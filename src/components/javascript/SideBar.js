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
  // const [sideBar, setSideBar] = useState(true);
  // const show = () => {
  //   setSideBar(!sideBar);
  // };

  return (
    // <section className={sideBar ? "side-bar-1" : "not-side-bar"}>
    <section className={props.toggle? "sider-group-active" :"user-side-bar"}>
      <div className="side-bar-links-1">
        <ul>
          {/* <li className="toggle-sidebar" onClick={show}>
            X
          </li> */}
          <NavLink
            to="/user/type"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
            onClick={props.toggler}
          >
            <li>
              <FontAwesomeIcon icon={faHome} className="space-icons-1" />
              {/* {props.sideBar ? "Request Pickup" : ""} */}
              Request Pickup
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
            onClick={props.toggler}
          >
            <li>
              <FontAwesomeIcon icon={faBiking} className="space-icons-1" />
              {/* {props.sideBar ? "Pending Deliveries" : ""} */}
              Pending Deliveries
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
            onClick={props.toggler}
          >
            <li>
              <FontAwesomeIcon icon={faTimesCircle} className="space-icons-1" />
              {/* {props.sideBar ? "Delivery History" : ""} */}
              Delivery History
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
            onClick={props.toggler}
          >
            <li>
              <FontAwesomeIcon icon={faNoteSticky} className="space-icons-1" />
              {/* {props.sideBar ? "Chat With Admin" : ""} */}
              Chat With Admin
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
                marginLeft: "10px"
              };
            }}
            onClick={props.toggler}
          >
            {/* <li>
              {props.sideBar ? (
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
            </li> */}
            <div className="side-bar-profile-detail-1">
                  <div className="side-bar-profile-img-1">{props.profile}</div>
                  <div className="side-bar-profile-name">
                    <h5>{props.username}</h5>
                    <p>View Profile</p>
                  </div>
                </div>
          </NavLink>

          <NavLink
            to="/user/user-logout"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
            onClick={props.toggler}
          >
            <li>
              <FontAwesomeIcon icon={faSignOut} className="space-icons-1" />
              {/* {props.sideBar ? "Log out" : ""} */}
              Log out
            </li>
          </NavLink>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
