import React, { useContext } from "react";
import "../css/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBiking,
  faTimesCircle,
  faNoteSticky,
  faSignOut,
  faCreditCard,
  faCreditCardAlt,
} from "@fortawesome/free-solid-svg-icons";
import bikeicon from "../images/bikeicon.png";
import cashicon from "../images/cashicon.png";
import historyicon from "../images/historyicon.png";
import reporticon from "../images/reporticon.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import profileimage from "../images/profileimage.png";
import { RiderContext } from "../Pages/Contexts/RiderContext";

const SideBar = () => {
  const value = useContext(RiderContext);
  const { riderdata, loading } = value;
  return (
    <section className="side-bar">
      <div className="side-bar-links">
        <ul>
          <NavLink
            to="/Deliveryrequest"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <FontAwesomeIcon icon={faHome} className="space-icons " />
              Delivery Request
            </li>{" "}
          </NavLink>

          <NavLink
            to="/pendingdeliveries"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <img src={bikeicon} className="sidebar-icons space-icons " />
              {/* <FontAwesomeIcon icon={faBiking} className="space-icons" /> */}
              Pending Deliveries
            </li>
          </NavLink>

          <NavLink
            to="/deliveryhistory"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <img src={historyicon} className="sidebar-icons space-icons" />
              {/* <FontAwesomeIcon icon={faTimesCircle} className="space-icons" /> */}
              Delivery History
            </li>
          </NavLink>

          <NavLink
            to="/Chatwithadmin"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <img src={reporticon} className="sidebar-icons space-icons" />
              {/* <FontAwesomeIcon icon={faNoteSticky} className="space-icons" /> */}
              Chat with Admin
            </li>
          </NavLink>
        </ul>

        <ul>
          <NavLink
            to="/agent-profile"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <div className="side-bar-profile-details">
                <div className="side-bar-profile-img skeleton">
                  <img src={riderdata?.img_url} alt="profile image" />
                  {/* </Link> */}
                </div>
                {/* <Link to="/agent-profile"> */}
                <div className="side-bar-profile-name">
                  <h5>{riderdata?.fullname}</h5>
                  <p>View Profile</p>
                </div>
              </div>
            </li>
          </NavLink>

          <NavLink
            to="/payment-details"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            <li>
              <img src={cashicon} className="sidebar-icons space-icons" />
              {/* <FontAwesomeIcon icon={faCreditCard} className="space-icons" /> */}
              Payment details
            </li>
          </NavLink>

          <NavLink
            to="/agent-logout"
            style={({ isActive }) => {
              return {
                background: isActive ? "#e8f4e3" : "",
                marginBottom: "20px",
              };
            }}
          >
            {" "}
            <li>
              {" "}
              <FontAwesomeIcon icon={faSignOut} className="space-icons" />
              Log out
            </li>
          </NavLink>
        </ul>
        {/* <Outlet /> */}
      </div>
    </section>
  );
};

export default SideBar;
