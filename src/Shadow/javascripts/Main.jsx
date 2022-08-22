import React, { useState, useRef } from "react";
import greendots from "../images/circlegreendesign.png";
import reddots from "../images/circlereddesign.png";
// import backgroundimg1 from '../images/rightsidebackground.png'
import image1 from "../images/girlPickingPackage.png";
import image2 from "../images/girlPickingPackagesmall.png";
import pickupicon from "../images/pickupicon.png";
import dropofficon from "../images/dropofficon.png";
import locator from "../images/locator.png";
import "../css/main.css";
// import NavigationBar from './NavigationBar';
import Section2 from "./Section2";
import { Link } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import LoggedinMainPage from "../../components/usersFlow/NavsFlow/LoggedinMainPage";

const Main = () => {
  const [distance, setDistance] = useState("");
  const [direction, setDirection] = useState(null);
  const [duration, setDuration] = useState("");

  /**@type React.MutableRefObject<HTMLInputElement> */
  const pickupRef = useRef();
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const calculateRoute = async (e) => {
    e.preventDefault();
    if (pickupRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionService = new google.maps.DirectionsService(); // eslint-disable-line
    const results = await directionService.route({
      origin: pickupRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING, // eslint-disable-line
    });
    const geocoder = new google.maps.Geocoder(); // eslint-disable-line
    const pickupLatLng = await geocoder.geocode(
      { address: pickupRef.current.value },
      function (results, status) {
        if (status == "OK") {
          console.log(results[0].address_components[6].long_name);
          console.log(results[0].geometry.location.toString());
        }
      }
    );
    setDirection(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    // console.log(results);
    // console.log(duration);
  };

  return (
    <section className="main-first">
      <div className="scroll-main">
        <img src={reddots} alt="" className="red-dots" />
        <img src={greendots} alt="" className="green-dots" />
        <div className="main-container">
          <div className="main-left-side">
            <div className="left-side-container">
              <div className="header-text">
                <h3 className="main-text">
                  Door to Door <span>delivery</span> services for individuals
                  and businesses
                </h3>
              </div>
              <form className="main-form" onSubmit={calculateRoute}>
                <Autocomplete
                  options={{
                    componentRestrictions: { country: "ng" },
                  }}
                >
                  <div className="pickup-location-input">
                    <img src={pickupicon} alt="" className="left-icon" />

                    <input
                      type="text"
                      placeholder="Enter Pickup Location"
                      className="input-main"
                      ref={pickupRef}
                    />

                    <img src={locator} alt="" className="right-icon" />
                  </div>
                </Autocomplete>

                <Autocomplete
                  options={{
                    componentRestrictions: { country: "ng" },
                  }}
                >
                  <div className="delivery-location-input">
                    <img src={dropofficon} alt="" className="left-icon" />
                    <input
                      type="text"
                      placeholder="Enter Delivery Location"
                      className="input-main"
                      ref={destinationRef}
                    />
                  </div>
                </Autocomplete>

                <div className="pickup-btn">
                  {/* <Link to="/join"> */}
                  <button className="pickup-btn" type="submit">
                    Request Pickup
                  </button>
                  {/* </Link> */}
                </div>
              </form>
              <img src={greendots} alt="" className="green-dots2" />
            </div>
          </div>
          <div className="main-right-side">
            <div className="delivery-picture">
              <img src={image1} alt="" className="big-img" />
              <img src={image2} className="small-img" />
            </div>
            <img src={reddots} alt="" className="red-dots2 " />
          </div>
        </div>
        <Section2 />
      </div>
    </section>
  );
};

export default Main;

export const Main1 = () => {
  return <LoggedinMainPage file={<Main2 />} />;
};

export const Main2 = () => {
  const [distance, setDistance] = useState("");
  const [direction, setDirection] = useState(null);
  const [duration, setDuration] = useState("");

  /**@type React.MutableRefObject<HTMLInputElement> */
  const pickupRef = useRef();
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const calculateRoute = async (e) => {
    e.preventDefault();
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
  };

  return (
    <section className="main-first">
      <div className="scroll-main">
        <img src={reddots} alt="" className="red-dots" />
        <img src={greendots} alt="" className="green-dots" />
        <div className="main-container2">
          <div className="main-left-side">
            <div className="left-side-container">
              <div className="header-text">
                <h3 className="main-text">
                  Door to Door <span>delivery</span> services for individuals
                  and businesses
                </h3>
              </div>
              <form className="main-form" onSubmit={calculateRoute}>
                <Autocomplete>
                  <div className="pickup-location-input">
                    <img src={pickupicon} alt="" className="left-icon" />

                    <input
                      type="text"
                      placeholder="Enter Pickup Location"
                      className="input-main"
                      ref={pickupRef}
                    />

                    <img src={locator} alt="" className="right-icon" />
                  </div>
                </Autocomplete>

                <Autocomplete>
                  <div className="delivery-location-input">
                    <img src={dropofficon} alt="" className="left-icon" />
                    <input
                      type="text"
                      placeholder="Enter Delivery Location"
                      className="input-main"
                      ref={destinationRef}
                    />
                  </div>
                </Autocomplete>

                <div className="pickup-btn">
                  {/* <Link to="/join"> */}
                  <button className="pickup-btn" type="submit">
                    Request Pickup
                  </button>
                  {/* </Link> */}
                </div>
              </form>
              <img src={greendots} alt="" className="green-dots2" />
            </div>
          </div>
          <div className="main-right-side">
            <div className="delivery-picture">
              <img src={image1} alt="" className="big-img" />
              <img src={image2} className="small-img" />
            </div>
            <img src={reddots} alt="" className="red-dots2 " />
          </div>
        </div>
        <Section2 />
      </div>
    </section>
  );
};
