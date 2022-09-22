import React from "react";
import { Head2 } from "../javascript/Head";
import Validated from "../Images/Validated.png";
import "../css/Payment.css";
import Button from "../javascript/Button";
import { Link, useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();
  const itemId = location.state.itemId;
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
          Item ID : <span id="parcel-id">{itemId}</span>
        </p>
        <br />
        <p id="payment-p">
          N/B: Please write this number on your Item <br />
          before handing over to the delivery agent
        </p>
        <br />

        <Link to="/user/pending-del">
          <Button name="Go to Pending Deliveries" />
        </Link>
      </div>
    </>
  );
}
