import React from "react";
import "../css/section2subsec4.css";
import googleplay from "../images/googlePlay.png";
import appstore from "../images/appStore.png";
import mobile from "../images/mobile.png";
import pickloadvideo from "../images/pickloadvideo.png";
import { Link } from "react-router-dom";
const Section2subsec4 = () => {
  return (
    <section className="section2subsec4">
      <div className="background-green">
        <div className="left-green-background">
          <h3>
            Get your items Picked up and Delivered <br /> Swiftly using{" "}
            <span>PICKLOAD</span>
          </h3>
          <div className="social-btn-container">
            <button className="social-btn">
              <img src={googleplay} alt="" />
            </button>
            <button className="social-btn">
              <img src={appstore} alt="" />
            </button>
          </div>
        </div>
        <div className="right-green-background">
          <img src={mobile} alt="" className="mobile" />
        </div>
      </div>
      <div className="wrapper-second-green">
        <div className="second-green">
          <div className="first-bg-green">
            <h3>Earn some extra cash Delivering items</h3>
            <div>
              <button className="social-btn second-btn-style ">
                <img src={googleplay} alt="" />
              </button>
              <button className="social-btn second-btn-style ">
                <img src={appstore} alt="" />
              </button>
            </div>
          </div>
          <div className="second-bg">
            <div className="second-bg-text">
              <h3>
                Sign Up to become a Rider with <span> PICKLOAD </span>
              </h3>
            </div>
            <div className="second-bg-button">
              <Link to="/sign">
                <button className="signup-btn">Sign up</button>
              </Link>
            </div>
          </div>
          <div className="pickload-video-container">
            {/* <img src={pickloadvideo} alt="video on how to use pickload" /> */}
            <iframe  src="https://www.youtube.com/embed/rwbeLBwExD8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2subsec4;
