import React from "react";
import "../css/signup.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import "../css/WelcomeUser.css";
import Footer from "../javascript/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function WelcomeUser() {
  const asterik = <span id="asterik">*</span>;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/userflow");
  };

  const handleClick = (e) => {
    navigate("/forgot");
  };

  return (
    <>
      <Head />
      <div className="mainBox" id="welcome-main">
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

        <div id="Form-flex-ULogin">
          <h2 id="join">Welcome Back</h2>
          <br />

          <form
            id="User-form-ULogin"
            onSubmit={handleSubmit}
            className="sign-form"
          >
            <label className="reuiredText">Phone Number{asterik}</label>
            <input
              type="number"
              className="input-field"
              placeholder="Enter your Phone Number"
              name="PhoneNumber"
            />

            <p id="forgot" onClick={handleClick}>
              Forgot your Phone Number?
            </p>

            <br />
            <div id="center-button">
              {/* <Link to="/forgot"> */}
              <Button name="Login" />
              {/* </Link> */}
            </div>
          </form>

          <p id="accountAlready">
            Don't Have an account? <span id="loginSpan">Sign up</span>
          </p>
        </div>
      </div>
      <p id="agree-p">
        By clicking Login, you agree to our{" "}
        <span className="policy">Terms of Use </span>and our{" "}
        <span className="policy">Privacy Policy</span>.
      </p>
      <Footer />
    </>
  );
}
