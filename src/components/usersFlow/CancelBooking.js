import React, { useState } from "react";
import Request from "../javascript/Request";
import Amico from "../Images/amico.png";
import Button, { Button3 } from "../javascript/Button";
import { useNavigate } from "react-router-dom";
import CancelReason from "./CancelReason";
import Popup from "../javascript/Popup";

export default function CancelBooking(props) {
  const navigate = useNavigate();
  const [popupButton, setPopupButton] = useState(false);
  return (
    <>
      <div id="mmm-1">
        <div id="success-1">
          <h2>Cancel this Delivery Booking?</h2>
          <br />
          <div>
            <img src={Amico} alt="Animal" />
          </div>
          <br />
          <p id="successText-1">
            Are you sure you want to cancel this delivery booking? You will be
            <br />
            refunded only {props.percent}% of your initial payment after 21 working days.
          </p>
        </div>
        <br />
        <div id="div-button">
          <Button3 name="No" click={props.click} />{" "}
          <Button
            name="Yes"
            click={() => {
              setPopupButton(true);
            }}
          />{" "}
        </div>
        <Popup trigger={popupButton} setTrigger={setPopupButton}>
          <CancelReason delivery_id={props.delivery_id} />
        </Popup>
      </div>
    </>
  );
}
