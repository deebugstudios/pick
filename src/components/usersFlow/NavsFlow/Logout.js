import React from "react";
import Amico3 from "../../Images/amico3.png";
import Button, { Button3 } from "../../javascript/Button";
import "../../css/logout.css";
import { useNavigate } from "react-router-dom";
import LoggedinMainPage from "./LoggedinMainPage";

export default function Logout() {
  return <LoggedinMainPage file={<Logout1 />} />;
}

export function Logout1() {
  const navigate = useNavigate();

  return (
    <>
      <div id="logout-wrapper">
        <div id="logout-div">
          <div id="logout-text">
            <h2>Log out?</h2>
            <br />
            <div>
              <img src={Amico3} alt="Animal" />
            </div>
            <br />
            <p id="successText">
              Are you sure you want to logout of your account?
            </p>
          </div>
          <br />
          <div id="div-button">
            <Button3
              name="No"
              click={() => {
                navigate("/userflow");
              }}
            />{" "}
            <Button
              name="Yes"
              click={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
