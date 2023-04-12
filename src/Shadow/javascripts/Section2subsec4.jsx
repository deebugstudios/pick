import React, { useState, useEffect } from "react";
import "../css/section2subsec4.css";
import googleplay from "../images/googlePlay.png";
import appstore from "../images/appStore.png";
import mobile from "../images/mobile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import pickloadvideo from "../images/pickloadvideo.png";
import { Link } from "react-router-dom";
const Section2subsec4 = () => {
  const [selectedSrc, setSelectedSrc] = useState("");
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

          body: JSON.stringify({}),
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
      setSelectedSrc(data?.promo.thumbnail_url);
      console.log(data);
      console.log(videoId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section2subsec4">
      <div className="background-green">
        <div className="left-green-background">
          <h3>
            Get your items picked up and delivered <br /> swiftly using{" "}
            <span>PICKLOAD</span>
          </h3>
          <div className="social-btn-container">
            <a
              href="https://play.google.com/store/apps/details?id=com.pickload.pickloaduser&pli=1"
              target="_blank"
            >
              <button className="social-btn">
                <img src={googleplay} alt="" />
              </button>
            </a>
            <a
              href="https://apps.apple.com/ng/app/pickload/id1662091716"
              target="_blank"
            >
              <button className="social-btn">
                <img src={appstore} alt="" />
              </button>
            </a>
          </div>
        </div>
        <div className="right-green-background">
          <img src={mobile} alt="" className="mobile" />
        </div>
      </div>
      <div className="wrapper-second-green">
        <div className="second-green">
          <div className="first-bg-green">
            <h3>Earn some extra cash delivering items</h3>
            <div>
              <a
                href="https://play.google.com/store/apps/details?id=com.pickload.pickloaddeliveryagent"
                target="_blank"
              >
                <button className="social-btn second-btn-style ">
                  <img src={googleplay} alt="" />
                </button>
              </a>
              <a
                href="https://apps.apple.com/ng/app/pickload-agent/id1662203435"
                target="_blank"
              >
                <button className="social-btn second-btn-style ">
                  <img src={appstore} alt="" />
                </button>
              </a>
            </div>
          </div>
          <div className="second-bg">
            <div className="second-bg-text">
              <h3>
                Sign Up to become an Agent with <span> PICKLOAD </span>
              </h3>
              <button className="watch-video">
                {" "}
                <a
                  href="https://www.youtube.com/watch?v=DHyblOwXiko"
                  target="_blank"
                >
                  {" "}
                  Watch Video <FontAwesomeIcon icon={faPlay} />{" "}
                </a>
              </button>
            </div>
            <div className="second-bg-button">
              <Link to="/sign">
                <button className="signup-btn">Sign up</button>
              </Link>
            </div>
          </div>
          <div className="pickload-video-container">
            {/* <img src={pickloadvideo} alt="video on how to use pickload" /> */}
            <iframe
              src={`https://www.youtube.com/embed/${url}`}
              title="YouTube video player"
              width="100%"
              height="310"
              frameborder="0"
              poster={selectedSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2subsec4;
