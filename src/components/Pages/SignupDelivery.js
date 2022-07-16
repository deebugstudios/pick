import React from "react";
import Sign from "../javascript/sign";
import Rider from "../Images/rider_image.png";
import Fleet from "../Images/fleet.png";

export default function SignupDelivery() {
  return (
    <Sign
      title="What type of delivery agent?"
      joinAs="Individual Delivery"
      joinAs2="Agent"
      secondAs="Fleet Manager"
      imageJoin={Rider}
      imageJoin2={Fleet}
      val="individual"
      val2="fleet"
      link="/individual"
      link2="/fleet"
      name="Next"
    />
  );
}
