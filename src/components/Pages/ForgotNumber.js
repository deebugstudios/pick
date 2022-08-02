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
        <div className="delivery-img-forgot" id="DeliveryImage">
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
            Please enter the email address you used when
            <br className="break-ii" /> creating an
            <br className="break-i" /> account on this platform. We will
            <br className="break-ii" /> send you Phone number{" "}
            <br className="break-i" />
            recovery instructions.
          </p>
          <br />

          <form id="i2" className="sign-form">
            <label className="requiredText">Email{asterik}</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your Email"
              name="email"
            />
            <br />

            <Button name="Submit" />
            <div id="center-button">
              <p id="accountAlready">
                Back to{" "}
                <Link to="/welcome">
                  <span id="loginSpan">Log in</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
