import React from "react";
import { Head2 } from "../javascript/Head";
import Validated from "../Images/Validated.png";
import "../css/Payment.css";
import Button from "../javascript/Button";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <>
      <Head2 />
      <div id="payment-div">
        <h2>Payment Successful</h2>
        <br />
        <div>
          <img src={Validated} alt="validated" />
        </div>
        <p>
          Parcel ID : <span id="parcel-id">678843</span>
        </p>
        <br />
        <p id="payment-p">
          N/B: Please write this number on your Parcel <br />
          before handing over to the delivery agent
        </p>
        <br />

        <Link to="/pending-del">
          <Button name="Go to Pending Deliveries" />
        </Link>
      </div>
    </>
  );
}
