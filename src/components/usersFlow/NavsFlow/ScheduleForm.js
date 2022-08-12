import React from "react";
import Button from "../../javascript/Button";
import "../../css/Personal.css";
import Vector from "../../Images/Vector.png";
import FormProgress from "../../Images/FormProgress.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../../css/userflowform.css";
import LoggedinMainPage from "./LoggedinMainPage";
import { Link, useNavigate } from "react-router-dom";
import Flag from "../../Images/Nigerian_flag.png";

export default function ScheduleForm() {
  return <LoggedinMainPage file={<ScheduleForm1 />} />;
}

export function ScheduleForm1() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/scheduled-summary");
  };

  const asterik = <span id="asterik">*</span>;

  return (
    <div className="white-div">
      <h2>Delivery Details</h2>
      <br />
      <div>
        <img src={FormProgress} alt="Progress" />
      </div>
      <br />
      <br />

      <form className="sign-form" onSubmit={handleSubmit}>
        <label className="requiredText">Sender's Full name{asterik}</label>
        <input
          type="text"
          className="form-fields phone-input2"
          placeholder="Enter your full name"
          name="Fullname"
        />
        <br />

        <label className="requiredText">Sender's Phone Number{asterik}</label>
        <div className="delivery-location-input">
          <img src={Flag} alt="" className="flag-icon" />
          <span className="text-icon">+234</span>
          <input
            type="text"
            className="form-fields phone-input"
            placeholder="Enter your Phone Number"
            name="PhoneNumber"
          />
        </div>
        <br />

        <label className="requiredText">Receiver's Full name{asterik}</label>
        <input
          type="text"
          className="form-fields"
          placeholder="Enter Receiver's full name"
          name="ReceiverFullname"
        />
        <br />

        <label className="requiredText">Receiver's Phone Number{asterik}</label>
        <div className="delivery-location-input">
          <img src={Flag} alt="" className="flag-icon" />
          <span className="text-icon">+234</span>
          <input
            type="text"
            className="form-fields phone-input"
            placeholder="Enter Receiver's Phone Number"
            name="ReceiverPhoneNumber"
          />
        </div>
        <br />

        <label className="requiredText">Parcel Name{asterik}</label>
        <input
          type="text"
          className="form-fields phone-input2"
          placeholder="Enter A Name For Your Item"
          name="Parcelname"
        />
        <br />

        <label className="requiredText">Parcel Type{asterik}</label>
        <select
          defaultValue="Fragile"
          className="form-fields phone-input2"
          name="ParcelType"
        >
          <option value="Fragile">Fragile</option>
          <option value="Non-Fragile">Non-Fragile</option>
        </select>
        <br />

        <label className="requiredText">Parcel Description{asterik}</label>
        <input
          type="text"
          className="form-fields phone-input2"
          placeholder="Describe your Item"
          name="ParcelDescription"
        />
        <br />

        <label className="requiredText">Delivery Instructions{asterik}</label>
        <input
          type="text"
          className="form-field-Instructions phone-input2"
          placeholder="Enter any specific Instruction for the delivery agent to note"
          name="ParcelDescription"
        />
        <br />

        <div id="time-factor">
          <p>
            Scheduled Delivery Pickup Date {asterik}{" "}
            <input
              type="date"
              className="date-field"
              placeholder="Pick Date"
              name="license-expiry"
            />
          </p>
          <br />
          <br />
          <p>
            Scheduled Delivery Pickup Time {asterik}{" "}
            <input
              type="time"
              className="date-field"
              placeholder="Pick time"
              name="license-expiry"
            />
          </p>
        </div>
        <br />

        <div className="field">
          <legend className="requiredText">
            Upload Images of Your Item {asterik}{" "}
            <span id="image-upload">(Max of 5 images)</span>
          </legend>
          <br />

          <section>
            <div className="Upload" id="vector">
              <label>
                <img src={Vector} alt="Vector" />
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif"
                  name="selectedFile"
                  // disabled=
                />
              </label>
            </div>

            <div className="Upload" id="uploadText">
              N/B: The Assigned agent will receive and confirm your delivery
              request if
              <br /> they're available on the specified date and time.
            </div>
          </section>
        </div>

        <Button name="Next" type="submit" />
      </form>
    </div>
  );
}
