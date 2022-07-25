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
          <li className="active">
            <Link to="/userflow">
              <FontAwesomeIcon icon={faHome} className="space-icons-1" />
              {sideBar ? "Request Pickup" : ""}
            </Link>
          </li>

          <li>
            <Link to="/pending">
              <FontAwesomeIcon icon={faBiking} className="space-icons-1" />
              {sideBar ? "Pending Deliveries" : ""}
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faTimesCircle} className="space-icons-1" />
            {sideBar ? "Delivery History" : ""}
          </li>
          <li>
            <FontAwesomeIcon icon={faNoteSticky} className="space-icons-1" />
            {sideBar ? "Report" : ""}
          </li>
        </ul>

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
        <ul>
          <li>
            {" "}
            <FontAwesomeIcon icon={faSignOut} className="space-icons-1" />
            {sideBar ? "Log out" : ""}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
