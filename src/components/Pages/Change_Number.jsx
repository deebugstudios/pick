import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Login_Header from "../../pages/logout/Login_Header";
import "../css/change_number.css";
import Nigerianflag from "../Images/Nigerian_flag.png";
import Flag from "../Images/Nigerian_flag.png";
import Button from "../javascript/Button";

export default function Change_Number() {
  const location = useLocation();
  const navigate = useNavigate();

  const [newNo, setNewNo] = useState("");
  const [newNoError, setNewNoError] = useState("");

  const handleChange = (e) => {
    setNewNo(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (!newNo) {
      setNewNoError("Please enter a new Phone Number");
    }
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_auth/change_phone_no",
        {
          method: "POST",

          body: JSON.stringify({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBlNjdiODQ1M2EzNzIyMjc1N2I3OGMiLCJwaG9uZV9ubyI6IisyMzQ4MTU3NTQyODIwIiwiaWF0IjoxNjYxODg4NDUzfQ.ZcLApAMCMxmo17pp17Bu9nJ0d_G_vvkhfZekLrrkjis",
            old_phone_no: phone_no,
            new_phone_no: newNo,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        // setPopupButton(true);
        navigate("/user/user-profile");
      } else {
        // setMessage("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const phone_no = location.state.phone;
  return (
    <>
      <div className="change_no">
        <div className="change_no-text">Change Phone Number</div>
        <form id="user-info-form" onSubmit={handleSubmit}>
          <label htmlFor="phonenumber">Exisiting phone number</label>
          <div className="user-info-div-1 bottom-marg">
            <div className="delivery-location-input">
              <img src={Flag} alt="" className="flag-icon" />
              <span className="text-icon">+234</span>
              <input
                name="phonenumber"
                value={phone_no}
                className="user-info phone-input-4"
                disabled={true}
              />
            </div>
          </div>

          <label htmlFor="phonenumber">New phone number</label>
          <div className="user-info-div-1 bottom-marg">
            <div className="delivery-location-input">
              <div>
                <img src={Flag} alt="" className="flag-icon" />
                <span className="text-icon">+234</span>
                <input
                  name="phonenumber"
                  value={newNo}
                  onChange={handleChange}
                  className="user-info phone-input-4"
                  maxLength={10}
                />
              </div>
              <p className="error-style">{newNoError}</p>
            </div>
          </div>

          <div id="center-button-1">
            <Button name="Save and update" />
          </div>
        </form>
      </div>
    </>
  );
}
