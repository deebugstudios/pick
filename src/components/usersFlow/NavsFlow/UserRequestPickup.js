import React from "react";
import "./requestpickup.css";
import LoggedinMainPage from "./LoggedinMainPage";
import { Link } from "react-router-dom";
import GoogleMap from "../../../Shadow/javascripts/GoogleMap";

export default function UserRequestPickup() {
  return <LoggedinMainPage file={<UserRequestPickup1 />} />;
}

export function UserRequestPickup1() {
  return (
    <section className="user-dashboard">
      <div className="user-right-side-1">
        <div className="map-container-1">
          <GoogleMap />
        </div>
      </div>
      <div className="set-location-pickup-1">
        <div className="location-form">
          <div className="location-form-input" id="location-form-input-1">
            <label htmlFor="Pickup Location">Pickup Location</label>
            <input
              name="Pickup Location"
              placeholder="5 Noma Street GRA Edo State "
            />
          </div>

          <div className="location-form-input" id="location-form-input-2">
            <label htmlFor="Delivery Location">Delivery Location</label>
            <input
              name="Delivery Location"
              placeholder="19 Akpakpava Road Benin City Ed.."
            />
          </div>
        </div>
        <div id="price-div">
          <p>Delivery Fee </p>
          <p id="price-p">N 1500</p>
        </div>

        <Link to="/type">
          <button className="set-location-btn-1">Next</button>
        </Link>
      </div>
    </section>
  );
}
