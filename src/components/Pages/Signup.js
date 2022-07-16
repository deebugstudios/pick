import React from "react";
import Sign from "../javascript/sign";
import Rider from "../Images/rider_image.png";
import User from "../Images/user_image.png";
import Footer from "../javascript/Footer";

export default function Signup() {
  return (
    <>
      <Sign
        title="Join PickLoad as a:"
        joinAs="User"
        secondAs=" Delivery Agent"
        imageJoin={User}
        imageJoin2={Rider}
        name="Next"
        // link="/member"
        val="user"
        val2="agent"
        link="/userform"
        link2="/sign"
      />
    </>
  );
}
