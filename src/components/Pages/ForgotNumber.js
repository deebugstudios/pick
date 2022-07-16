import React from "react";
import Head from "../javascript/Head";
import "../css/ForgotNumber.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Button from "../javascript/Button";
import Footer from "../javascript/Footer";
import { Link } from "react-router-dom";

export default function ForgotNumber() {
  const asterik = <span id="asterik">*</span>;
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

        <div id="Form-flex-forgot">
          <h2 className="side">Forgot Phone Number</h2>
          <br />
          <p className="side" id="side-p">
            Please enter the email address you used when creating an
            <br />
            account on this platform. We will send you Phone number
            <br />
            recovery instructions.
          </p>
          <br />

          <form id="i2">
            <label className="requiredText">Email{asterik}</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your Email"
              name="email"
            />
            <br />
          </form>

          <Link to="/sign">
            <Button name="Submit" />
          </Link>
          <p id="accountAlready">
            Back to <span id="loginSpan">Log in</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
