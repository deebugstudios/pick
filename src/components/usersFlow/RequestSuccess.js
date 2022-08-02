import React from "react";
import Request from "../javascript/Request";
import Amico from "../Images/amico.png";
import Button from "../javascript/Button";
import { Link } from "react-router-dom";

export default function RequestSuccess() {
  return (
    <>
      <Request
        pickup="Pickup Request Successful"
        jpg={Amico}
        First="This Pickup Request was successful"
        Second="The Agent will contact you and be available to pickup your Parcel"
        button={
          <Link to="/pending-del">
            <Button name="Done" />
          </Link>
        }
      />
    </>
  );
}
