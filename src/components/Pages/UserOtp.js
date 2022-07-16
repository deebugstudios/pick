import React from "react";
import "../css/signup.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import OTP from "../javascript/OTP";
import "../css/userotp.css";
import Footer from "../javascript/Footer";

export default function UserOtp() {
  return (
    <>
      <Head />
      <div className="mainBox">
        <div id="DeliveryImage">
          <p>
            Door to Door <span id="yellow">delivery</span>
            <br /> services for individuals
            <br /> and businesses.
          </p>
          <br />
          <br />
          <img src={DeliveryImage} alt="Deliver" />
        </div>

        <div id="otp-flex">
          <h2 id="join" className="otp-p">
            Phone number verification
          </h2>
          <OTP />
        </div>
      </div>
      <Footer />
    </>
  );
}
