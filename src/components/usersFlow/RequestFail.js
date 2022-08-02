import React from "react";
import { Button2 } from "../javascript/Button";
import { Request2 } from "../javascript/Request";
import Amico2 from "../Images/amico2.png";

export default function RequestFail() {
  return (
    <>
      <Request2
        pickup="Pickup Request Failed"
        jpg={Amico2}
        First="Sorry, John Williams is unavailable at this time and date."
        Second="Please select another Delivery agent."
        button={<Button2 name="Select another Delivery Agent" />}
      />
    </>
  );
}
