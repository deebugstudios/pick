import React from "react";
import Sign from "../javascript/sign";
import Rider from "../Images/rider_image.png";
import User from "../Images/user_image.png";

export default function LoginAs() {
  return (
    <>
      <Sign
        title="Login as a?"
        joinAs="User"
        secondAs=" Delivery Agent"
        imageJoin={User}
        imageJoin2={Rider}
        name="Next"
        val="user"
        val2="agent"
        link="/welcome"
        link2="/welcome-agent"
        in="Sign Up"
        inLink="/join"
      />
    </>
  );
}
