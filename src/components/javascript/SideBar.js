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
import { Link } from "react-router-dom";

const SideBar = () => {
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
          <Link to="/userflow">
            <li>
              <FontAwesomeIcon icon={faHome} className="space-icons-1" />
              {sideBar ? "Request Pickup" : ""}
            </li>
          </Link>

          <Link to="/pending-del">
            <li>
              <FontAwesomeIcon icon={faBiking} className="space-icons-1" />
              {sideBar ? "Pending Deliveries" : ""}
            </li>
          </Link>

          <Link to="/completed-del">
            <li>
              <FontAwesomeIcon icon={faTimesCircle} className="space-icons-1" />
              {sideBar ? "Delivery History" : ""}
            </li>
          </Link>

          {/* <Link to="/Chatwithadminuser"> */}
          <li>
            <FontAwesomeIcon icon={faNoteSticky} className="space-icons-1" />
            {sideBar ? "Chat With Admin" : ""}
          </li>
          {/* </Link> */}
        </ul>

        <ul>
          <Link to="/user-profile">
            <li>
              {sideBar ? (
                <div className="side-bar-profile-detail-1">
                  <div className="side-bar-profile-img-1">
                    {/* <img src={} alt="" /> */}
                  </div>
                  <div className="side-bar-profile-name">
                    <h5>Angie</h5>
                    <p>View Profile</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </li>
          </Link>

          <Link to="/user-logout">
            <li>
              {" "}
              <FontAwesomeIcon icon={faSignOut} className="space-icons-1" />
              {sideBar ? "Log out" : ""}
            </li>
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
