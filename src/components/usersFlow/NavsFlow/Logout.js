import React from "react";
import Amico3 from "../../Images/amico3.png";
import Button, { Button3 } from "../../javascript/Button";
import "../../css/logout.css";
import { useNavigate } from "react-router-dom";
import LoggedinMainPage from "./LoggedinMainPage";

export default function Logout() {
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
                navigate(-1);
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

export function Logout2() {
  const navigate = useNavigate();

  return (
    <>
      <div id="logout-wrapper-2">
        <div id="logout-div-2">
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
                navigate(-1);
              }}
            />{" "}
            <Button
              name="Yes"
              click={() => {
                navigate("/main1");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
