import React, { useContext, useRef, useState } from "react";
import "./requestpickup.css";
import LoggedinMainPage from "./LoggedinMainPage";
import { Link, useNavigate } from "react-router-dom";
import Map from "../../../Shadow/javascripts/Map";
// import GoogleMap from "../../../Shadow/javascripts/GoogleMap";
import { useLocation } from "react-router-dom";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import { Autocomplete } from "@react-google-maps/api";
import Locate from "../../Images/locate.png";

export default function UserRequestPickup() {
  return <LoggedinMainPage file={<UserRequestPickup1 />} />;
}

export function UserRequestPickup1() {
  const [distance, setDistance] = useState("");
  const [direction, setDirection] = useState(null);
  const [duration, setDuration] = useState("");
  const [buttonName, setButtonName] = useState("Calculate Route");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const vehicle = location.state.vehicle;

  const navigate = useNavigate();

  /**@type React.MutableRefObject<HTMLInputElement> */
  const pickupRef = useRef();
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const calculateRoute = async () => {
    if (pickupRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionService = new google.maps.DirectionsService(); // eslint-disable-line
    const results = await directionService.route({
      origin: pickupRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING, // eslint-disable-line
    });
    setDirection(results);

    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    console.log(distance);
    console.log(duration);
    const userDistance = results.routes[0].legs[0].distance.text;
    const realDistance = parseFloat(userDistance);
    console.log(destinationRef.current.value, pickupRef.current.value, vehicle);
    try {
      const res = await fetch(
        "https://guarded-falls-60982.herokuapp.com/user_delivery//delivery_price",
        {
          method: "POST",

          body: JSON.stringify({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ2ZmVkOGU1OGEyOTIxN2I0MDRiMjIiLCJwaG9uZV9ubyI6IjgwNzI1ODk2NjQiLCJpYXQiOjE2NTgyNTcxMTJ9.bj4YL5kI9rpWJ7CTbMNiKcT1b26x1S33IPH8R-dc9rw",
            pickup_location: pickupRef.current.value,
            drop_off_location: destinationRef.current.value,
            distance: realDistance,
            delivery_medium: vehicle,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );

      const data = await res.json();
      if (res.status === 200) {
        console.log(data.price);
        setPrice(parseInt(data.price));
        // console.log(price);
      } else {
        setMessage("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
    setButtonName("Clear Route");
  };

  const clearRoute = () => {
    setDirection(null);
    setDistance("");
    setDuration("");
    pickupRef.current.value = "";
    destinationRef.current.value = "";
    setButtonName("Calculate Route");
    setPrice("");
  };

  const handleNavigate = () => {
    if (buttonName === "Clear Route") {
      member === "instant" ? navigate("/formuser") : navigate("/select-a");
    }
  };

  const member = location.state.member;

  const handleRoute = () => {
    buttonName === "Calculate Route" ? calculateRoute() : clearRoute();
  };

  return (
    <section className="user-dashboard">
      <div className="user-right-side-1">
        <div className="map-container-1">
          <Map direct={direction} />
        </div>
      </div>
      <div className="set-location-pickup-1">
        <div className="location-form">
          <Autocomplete>
            <div className="location-form-input" id="location-form-input-1">
              <label htmlFor="Pickup Location">Pickup Location</label>
              <div className="delivery-location-input">
                <img src={Locate} alt="" className="locate-icon" />
                <input
                  name="Pickup Location"
                  placeholder="5 Noma Street GRA Edo State "
                  className="phone-input2"
                  ref={pickupRef}
                />
              </div>
            </div>
          </Autocomplete>

          <Autocomplete>
            <div className="location-form-input" id="location-form-input-2">
              <label htmlFor="Delivery Location">Delivery Location</label>
              <div className="delivery-location-input">
                <img src={Locate} alt="" className="locate-icon" />
                <input
                  name="Delivery Location"
                  placeholder="19 Akpakpava Road Benin City Ed.."
                  className="phone-input2"
                  ref={destinationRef}
                />
              </div>
            </div>
          </Autocomplete>
        </div>
        <div id="price-div">
          <p>Delivery Fee </p>
          <p id="price-p">&#8358; {price}</p>
        </div>

        <div id="div-button">
          <button className="set-location-btn-1" onClick={handleRoute}>
            {buttonName}
          </button>

          <button
            className={
              buttonName === "Calculate Route"
                ? "set-location-btn-2"
                : "set-location-btn-1"
            }
            onClick={handleNavigate}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
