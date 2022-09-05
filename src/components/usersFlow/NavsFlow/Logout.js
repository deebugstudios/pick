import React, { useContext, useState } from "react";
import Amico3 from "../../Images/amico3.png";
import Button, { Button3 } from "../../javascript/Button";
import "../../css/logout.css";
import { useNavigate } from "react-router-dom";
import LoggedinMainPage from "./LoggedinMainPage";
import { async } from "@firebase/util";
import { RiderContext } from "../../../Shadow/Pages/Contexts/RiderContext";

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
  const [loading, setLoading] = useState(false);
  const value = useContext(RiderContext);
  const { token } = value;
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    // try {
    //   const res = await fetch("https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/logout",{
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json, text/plain, */*",
    //   },
    //   body: JSON.stringify({
    //     token: JSON.parse(token)
    //   })
    //   })
    // const data = await res.json()
    // if(res.status === 200){
    // console.log(data)
    localStorage.clear();
    navigate("/main1");
    window.location.reload(true);
    setLoading(false);
    // }else {
    // setLoading(false)
    // }

    // }catch (err) {
    // console.log(err);
    // }
  };

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
            <Button name="Yes" click={handleLogout} />
          </div>
        </div>
      </div>
    </>
  );
}
