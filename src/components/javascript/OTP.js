import React, { useRef } from "react";
import "../css/otp.css";
import Button from "./Button";
// import Head from "./Head";
import { Link, useNavigate } from "react-router-dom";

export default function OTP() {
  return (
    <>
      {/* <Head /> */}
      <div id="otp-div">
        <p id="otp-paragraph">Enter the OTP sent by SMS to 08067654532</p>
        <div id="otpField">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />

          <br />
          <br />
          <p id="another-code">
            We would send you another code in <span id="otpTimer">00: 45</span>
            <br />
            <br />
            <br />
            <br />
          </p>

          <Link to="/welcome">
            <Button name="DONE" />
          </Link>
        </div>
      </div>
    </>
  );
}

export function OTP2() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/individual-v");
  };

  return (
    <>
      {/* <Head /> */}
      <div id="otp-div-2">
        <p id="otp-paragraph">Enter the OTP sent by SMS to 08067654532</p>
        <div id="otpField">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />

          <br />
          <br />
          <p id="another-code-2">
            We would send you another code in <span id="otpTimer">00: 45</span>
            <br />
            <br />
            <br />
            <br />
          </p>

          <Button name="DONE" click={handleClick} />
        </div>
      </div>
    </>
  );
}

export function OTP3() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/fleet-v");
  };
  return (
    <>
      {/* <Head /> */}
      <div id="otp-div-2">
        <p id="otp-paragraph">Enter the OTP sent by SMS to 08067654532</p>
        <div id="otpField">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />

          <br />
          <br />
          <p id="another-code-2">
            We would send you another code in <span id="otpTimer">00: 45</span>
            <br />
            <br />
            <br />
            <br />
          </p>
          <Link to="/individual-v">
            <Button name="DONE" click={handleClick} />
          </Link>
        </div>
      </div>
    </>
  );
}
