import React from "react";
// import PhoneConfirm from "./PhoneConfirm";
import Head from "./Head";
import Button from "./Button";
import { Button2 } from "./Button";
import "../css/PhoneConfirm.css";

export default function ExistingNumber() {
  return (
    <div>
      <Head />
      <h2 id="elementC">Existing Phone Number?</h2>
      <p>
        This Phone number <span id="PN">08067654534</span> is already
        <br />
        linked to another account.
        <br />
      </p>
      <br />
      <Button2 name="Edit number" /> <Button name="Unlink Number" />
    </div>
  );
}
