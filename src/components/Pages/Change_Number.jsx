import React from "react";
// import Login_Header from "../../pages/logout/Login_Header";
import "../css/change_number.css";
import Nigerianflag from "../Images/Nigerian_flag.png";
import Flag from "../Images/Nigerian_flag.png";
import Button from "../javascript/Button";

export default function Change_Number() {
  return (
    <div className="change-number">
      {/* <Login_Header /> */}
      <div className="change-number-props">
        <div className="change-number-style">Change Phone Number</div>
        <div className="existing-number">
          <div className="old-phone-number-props">
            <label className="old-no">Existing phone number</label>
            <div className="delivery-location-input">
              <img src={Flag} alt="" className="flag-icon" />
              <span className="text-icon">+234</span>
              <input
                type="text"
                className="input-field phone-input"
                placeholder="Enter your Phone Number"
                name="phone_no"
                value=""
                maxLength={10}
                // onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="existing-number">
          <div className="new-phone-number-props">
            <label className="new-no">Existing phone number</label>
            <div className="delivery-location-input">
              <img src={Flag} alt="" className="flag-icon" />
              <span className="text-icon">+234</span>
              <input
                type="text"
                className="input-field phone-input"
                placeholder="Enter your Phone Number"
                name="phone_no"
                value=""
                maxLength={10}
                // onChange={onChange}
              />
            </div>
          </div>
        </div>

        <div id="center-button">
          <Button name="Save and update" />
        </div>
      </div>
    </div>
  );
}
