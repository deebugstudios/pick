import React from "react";
// import Head from "./Head";
import Button, { Button4 } from "../javascript/Button";
import "../css/PhoneConfirm.css";
import Head from "../javascript/Head";
import { Link } from "react-router-dom";

export default function PhoneConfirm() {
  return (
    <>
      <Head />
      <div id="PhoneConfirm">
        <h2 id="elementC">Confirm Phone Number?</h2>
        <br />
        <br />
        <p>
          We would be verifying this Phone number
          <br />
          <span id="PN">08067654534</span>. Is this okay or would you like to
          <br />
          edit the number?
        </p>
        <br />
        <Link to="/confirm">
          <Button4 name="Edit number" />{" "}
        </Link>
        <Link to="/otp">
          <Button name="Okay" />
        </Link>
      </div>
    </>
  );
}
