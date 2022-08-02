import React from "react";
import map from "../../../images/maps.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "./resquestlocation.css";
import { Link, Outlet } from "react-router-dom";
import GoogleMap from "../../../javascripts/GoogleMap";
const RequestLocation = () => {
  return (
    <section className="user-dashboard">
      <div className="user-right-side">
        <div>
          {/* <img src={map} alt="" /> */}
          <GoogleMap />
        </div>
      </div>
      <div className="set-location">
        <h3>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="space-icons green"
          />
          Delivery Request
        </h3>
        <p className="estimated-fee">
          Estimated Delivery Fee <span className="amount">₦ 1,500,000.00</span>
        </p>
        <h4>
          Parcel Name: <span className="lower-case-words"> Nike Boots</span>
        </h4>
        <div className="location-drops">
          <h4>Pickup Location</h4>
          <p>Uniben Ugbowo Campus</p>
          <h4>Drop Off Location</h4>
          <p>Deebug Institute</p>
        </div>
        <div className="set-location-2-btn">
          <Link to="/request-details">
            {" "}
            <button className="set-location-slide2-btn">
              View Request Details
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RequestLocation;
