import React from "react";
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

const Main = () => {
  return (
    <section className="main-first">
      <div className="scroll-main">
        <img src={reddots} alt="" className="red-dots" />
        <img src={greendots} alt="" className="green-dots" />
        <div className="main-container" style={{backgroundColor:"white"}}>
          <div className="main-left-side">
            <div className="left-side-container">
              <div className="header-text">
                <h3 className="main-text">
                  Door to Door <span>delivery</span> services for individuals
                  and businesses
                </h3>
              </div>
              <form className="main-form">
                <div className="pickup-location-input">
                  <img src={pickupicon} alt="" className="left-icon" />
                  {/* <Autocomplete> */}
                  <input
                    type="text"
                    placeholder="Enter Pickup Location"
                    className="input-main"
                  />
                  {/* </Autocomplete> */}
                  <img src={locator} alt="" className="right-icon" />
                </div>
                <div className="delivery-location-input">
                  <img src={dropofficon} alt="" className="left-icon" />
                  {/* <Autocomplete> */}
                  <input
                    type="text"
                    placeholder="Enter Delivery Location"
                    className="input-main"
                  />
                  {/* </Autocomplete> */}
                </div>
                <div className="pickup-btn">
                  <Link to="/join">
                    <button className="pickup-btn" type="submit">
                      Request Pickup
                    </button>
                  </Link>
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
