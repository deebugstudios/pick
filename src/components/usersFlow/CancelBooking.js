import React from "react";
import Request from "../javascript/Request";
import Amico from "../Images/amico.png";
import Button, { Button3 } from "../javascript/Button";
import { useNavigate } from "react-router-dom";

export default function CancelBooking() {
  const navigate = useNavigate();
  return (
    <>
      <Request
        pickup="Cancel this Delivery Booking?"
        jpg={Amico}
        First="Are you sure you want to cancel this delivery booking? You will be"
        Second="refunded only 20% of your initial  payment after 21 working days."
        button3={
          <Button3
            name="No"
            click={() => {
              navigate(-1);
            }}
          />
        }
        button={
          <Button
            name="Yes"
            click={() => {
              navigate("/cancel-reason");
            }}
          />
        }
      />
    </>
  );
}
