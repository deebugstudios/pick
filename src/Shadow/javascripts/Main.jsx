import React, { useContext, useEffect, useState } from "react";
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
import Section2subsec2 from "./Section2subsec2";
import Section2subsec1 from "./Section2subsec1";
import OurServices from "./OurServices";
import BecomeAgent from "./BecomeAgent";
import Testimonials from "./Testimonials";
import Section2subsec4 from "./Section2subsec4";
import { Autocomplete } from "@react-google-maps/api";
import Footer from "./Footer";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userContext, RiderContext } from "../Pages/Contexts/RiderContext";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const userValues = useContext(userContext);
  const { token } = userValues;
  const userToken = token;
  const navigate = useNavigate();
  const value = useContext(RiderContext);
  const { typeAccount } = value;

  const goToChat = () => {
    userToken ? navigate("/user/chat") : navigate("/guest");
    // navigate("/guest");
  };

  const [url, setUrl] = useState("");

  useEffect(() => {
    viewUrl();
  }, []);
  const viewUrl = async () => {
    try {
      const response = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/admin_upload_promo/view_clip",
        {
          method: "POST",

          body: JSON.stringify({ doc_type: "user" }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      // getData(await response.json());
      const data = await response.json();
      const value = data?.promo.clip_url;
      let videoId = "";

      if (value.includes("youtube.com")) {
        videoId = value.substring(
          value.indexOf("v=") + 2,
          value.indexOf("&") !== -1 ? value.indexOf("&") : value.length
        );
      } else if (value.includes("youtu.be")) {
        videoId = value.substring(value.lastIndexOf("/") + 1);
      }
      setUrl(videoId);
      // setSelectedSrc(data?.promo.thumbnail_url);
      console.log(data);
      console.log(videoId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="wrapper-main">
        <div className="wrapper-main-container">
          <section className="main-first">
            <div className="scroll-main">
              <img src={reddots} alt="" className="red-dots" />
              <img src={greendots} alt="" className="green-dots" />
              <div
                className="main-container"
                style={{ backgroundColor: "white" }}
              >
                <div className="main-left-side">
                  <div className="left-side-container">
                    <div className="header-text">
                      <h3 className="main-text">
                        Door to Door <span>delivery</span> services for
                        individuals and businesses
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
                        {typeAccount == "Agent" || typeAccount == "Fleet" ? (
                          <button
                            className="pickup-btn"
                            type="button"
                            disabled
                            style={{ backgroundColor: "grey", opacity: "1" }}
                          >
                            Request Pickup
                          </button>
                        ) : typeAccount == "user" ? (
                          <button
                            className="pickup-btn"
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/user/type");
                            }}
                          >
                            Request Pickup
                          </button>
                        ) : (
                          <Link to="/join">
                            <button className="pickup-btn" type="submit">
                              Request Pickup
                            </button>
                          </Link>
                        )}
                      </div>
                    </form>
                    <div className="align-main">
                      <p>
                        <strong>Watch how to use the Pickload user app</strong>
                      </p>
                      <div className="pickload-video-container">
                        {/* <img src={pickloadvideo} alt="video on how to use pickload" /> */}
                        <iframe
                          src={`https://www.youtube.com/embed/${url}`}
                          title="Pickload"
                          width="100%"
                          height="310"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
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
              <div className="whats-app" onClick={goToChat}>
                <FontAwesomeIcon
                  icon={faMessage}
                  className="space-icons-1 my-float"
                />
                <p className="help-text">Say Hello</p>
              </div>
              <Section2 />
              <Section2subsec1 />
              <OurServices />
              <BecomeAgent />
              <Testimonials />
              <Section2subsec4 />
              <Section2subsec2 />
              <Footer />
            </div>
          </section>
        </div>
      </div>
      {/* <div style={{backgroundColor: "white", position: "absolute", bottom: "0", right: "0", left: "0"}}>
    <div className="main-footer-rights">
        <div>
          <p>© Copyright 2022 | pickload.ng | All rights reserved.</p>
        </div>
        <div>
          <ul>
            <li>Contact Us</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
      </div> */}
      {/* <Footer/> */}
    </>
  );
};

export default Main;
