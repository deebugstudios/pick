import React from "react";
import Instant from "../../Images/instant.png";
import Schedule from "../../Images/scheduled.png";
import Cancel from "../../Images/cancel.png";
import "../../css/userprofile.css";
import Button from "../../javascript/Button";
import LoggedinMainPage from "./LoggedinMainPage";

export default function UsersProfile() {
  return <LoggedinMainPage file={<UsersProfile1 />} />;
}

export function UsersProfile1() {
  return (
    <>
      <div id="user-info-back">
        <div id="profile-wrapper">
          <p>My profile</p>
          <div id="profile-picture-merge">
            <div className="user-image"></div>
          </div>
          <div id="img-flex">
            <div className="img-border">
              <div className="img-size-div">
                <img src={Instant} alt="" className="img-size" />
              </div>
              <p>
                156 Instant
                <br /> Deliveries
              </p>
            </div>

            <div className="img-border">
              <div className="img-size-div">
                <img src={Schedule} alt="" className="img-size" />
              </div>
              <p>
                23 Scheduled
                <br /> Deliveries
              </p>
            </div>

            <div className="img-border">
              <div className="img-size-div">
                <img src={Cancel} alt="" className="img-size" />
              </div>
              <p>
                156 Cancelled
                <br /> Deliveries
              </p>
            </div>
          </div>

          <form id="user-info-form">
            <label htmlFor="fullname">Full name</label>
            <div className="user-info-div">
              <input
                name="fullname"
                value="James Usifoh"
                className="user-info"
              />
              <span>change</span>
            </div>
            <br />

            <label htmlFor="email">Email</label>
            <div className="user-info-div">
              <input
                name="email"
                value="Jamesusifoh@gmail.com"
                className="user-info"
              />
            </div>
            <br />

            <label htmlFor="phonenumber">Phone number</label>
            <div className="user-info-div">
              <input
                name="phonenumber"
                value="8197648392"
                className="user-info"
              />
              <span>change</span>
            </div>
            <br />

            <Button name="Save and update" />
          </form>
          <br />
        </div>
      </div>
    </>
  );
}
