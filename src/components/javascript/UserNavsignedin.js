import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Pickload from "../Images/pickload.png";
import "../css/usernavsignedin.css";
import { NavLink, Link } from "react-router-dom";
import { Notification } from "../../Shadow/Pages/Notifications/Notification";

const NavsignedinU = (props) => {
  const [open, setOpen] = useState(false);

  const handlePopUp = () => {
    setOpen(!open);
  };

  return (
    <nav className="user-nav">
      <div className="nav-wrapper-1">
        <div id="pick-div">
          <div>
            <Link to="/">
              <img src={Pickload} alt="" />
            </Link>
          </div>
        </div>
        <div className="nav-links">
          <ul>
            {/* <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/aboutUS"> About Us </Link>
            </li>
            <li>
              <Link to="/contactUS"> Contact Us </Link>
            </li> */}
            {/* <li className="hover-me">
              My Account <FontAwesomeIcon icon={faAngleDown} />
              <div className="sub-menu">
                <ul>
                  <Link to="/user/pending-del">
                    <li>Pending deliveries</li>
                  </Link>
                  <Link to="/user/completed-del">
                    <li>Delivery History</li>
                  </Link>
                </ul>
              </div>
            </li> */}
            <Link
              to="/user/user-profile"
              style={{
                color: "black",
                fontSize: "15px",
                fontWeight: "400",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // columnGap: "1px",
                  alignItems: "center",
                }}
              >
                <div className="profile-img-1">{props.profile}</div>
                <div>{props.name}</div>
              </div>
            </Link>
          </ul>
        </div>
        <div className="profile">
          {/* <Link to="/user/user-profile">
            <div className="profile-img-1">{props.profile}</div>
          </Link> */}
          <Link to="/user/notifications">
            <div className="bell-span">
              <FontAwesomeIcon icon={faBell} />
            </div>
          </Link>
          <Link to="/user/agentlist">
            <div className="bell-span2">
              <FontAwesomeIcon icon={faMessage} />
            </div>
          </Link>

          <FontAwesomeIcon
            icon={faBars}
            className="siderbar-small"
            onClick={props.siderBar}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavsignedinU;
