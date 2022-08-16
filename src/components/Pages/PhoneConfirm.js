import React from "react";
// import Head from "./Head";
import Button, { Button4 } from "../javascript/Button";
import "../css/PhoneConfirm.css";
import Head from "../javascript/Head";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PhoneConfirm() {
  const location = useLocation();
  const phone_no = location.state.phone_no;
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
          <span id="PN">+234{phone_no}</span>. Is this okay or would you like to
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
