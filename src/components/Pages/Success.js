import React from "react";
import Animal from "../Images/animal.png";
import Button from "../javascript/Button";
import "../css/Success.css";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/welcome-agent");
  };
  return (
    <>
      <div id="mmm">
        <div id="success">
          <h2>Account Creation Successful</h2>
          <div>
            <img src={Animal} alt="Animal" />
          </div>
          <p id="successText">
            You will receive a confirmatory email and SMS after
            <br />
            your account has been approved by the Admin
          </p>
        </div>
        <br />

        <Button name="Login" click={handleClick} />
      </div>
    </>
  );
}
