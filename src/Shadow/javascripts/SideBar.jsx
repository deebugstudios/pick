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
import { Link, Outlet } from "react-router-dom";
import profileimage from "../images/profileimage.png";
import { RiderContext } from "../Pages/Contexts/RiderContext";

const SideBar = () => {
  const value = useContext(RiderContext);
  const { riderdata, loading } = value;
  return (
    <section className="side-bar">
      <div className="side-bar-links">
        <ul>
          <Link to="/Deliveryrequest">
            <li>
              <FontAwesomeIcon icon={faHome} className="space-icons " />
              Delivery Request
            </li>{" "}
          </Link>

          <Link to="/pendingdeliveries">
            <li>
              <img src={bikeicon} className="sidebar-icons space-icons " />
              {/* <FontAwesomeIcon icon={faBiking} className="space-icons" /> */}
              Pending Deliveries
            </li>
          </Link>

          <Link to="/deliveryhistory">
            <li>
              <img src={historyicon} className="sidebar-icons space-icons" />
              {/* <FontAwesomeIcon icon={faTimesCircle} className="space-icons" /> */}
              Delivery History
            </li>
          </Link>

          <Link to="/Chatwithadmin">
            <li>
              <img src={reporticon} className="sidebar-icons space-icons" />
              {/* <FontAwesomeIcon icon={faNoteSticky} className="space-icons" /> */}
              Chat with Admin
            </li>
          </Link>
        </ul>

        <ul>
          <li>
            <Link to="/agent-profile">
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
            </Link>
          </li>

          <Link to="/payment-details">
            <li>
              <img src={cashicon} className="sidebar-icons space-icons" />
              {/* <FontAwesomeIcon icon={faCreditCard} className="space-icons" /> */}
              Payment details
            </li>
          </Link>

          <Link to="/agent-logout">
            {" "}
            <li>
              {" "}
              <FontAwesomeIcon icon={faSignOut} className="space-icons" />
              Log out
            </li>
          </Link>
        </ul>
        {/* <Outlet /> */}
      </div>
    </section>
  );
};

export default SideBar;
