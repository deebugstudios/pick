import React from "react";
import Button from "../../javascript/Button";
import "../../css/Personal.css";
import Vector from "../../Images/Vector.png";
import FormProgress from "../../Images/FormProgress.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../../css/userflowform.css";
import { Link, useNavigate } from "react-router-dom";
import Flag from "../../Images/Nigerian_flag.png";

export default function ScheduleForm() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/user/scheduled-summary");
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
          className="form-fields phone-input3"
          placeholder="Enter your full name"
          name="Fullname"
          // value={userDetails.fullname}
          // disabled={true}
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
            // value={userDetails.phone_no}
            // disabled={true}
          />
        </div>
        <br />

        <label className="requiredText">Receiver's Full name{asterik}</label>
        <input
          type="text"
          className="form-fields phone-input3"
          placeholder="Enter Receiver's full name"
          name="reciever_name"
          // value={formData.reciever_name}
          // onChange={handleChange}
        />
        {/* <p className="error-style">{formErrors.reciever_name}</p> */}
        <br />

        <label className="requiredText">Receiver's Phone Number{asterik}</label>
        <div className="delivery-location-input">
          <img src={Flag} alt="" className="flag-icon" />
          <span className="text-icon">+234</span>
          <input
            type="text"
            className="form-fields phone-input"
            placeholder="Enter Receiver's Phone Number"
            name="reciever_phone_no"
            // value={formData.reciever_phone_no}
            // onChange={handleChange}
            maxLength={10}
          />
        </div>
        {/* <p className="error-style">{formErrors.receiver_phone_no}</p> */}
        <br />

        <label className="requiredText">Item Name{asterik}</label>
        <input
          type="text"
          className="form-fields phone-input3"
          placeholder="Enter A Name For Your Item"
          name="parcel_name"
          // value={formData.parcel_name}
          // onChange={handleChange}
        />
        {/* <p className="error-style">{formErrors.parcel_name}</p> */}
        <br />

        <label className="requiredText">Item Type{asterik}</label>
        <select
          defaultValue="fragile"
          className="form-fields phone-input3"
          name="ParcelType"
          // onChange={handleType}
          // value={parcelType}
        >
          <option value="fragile">Fragile</option>
          <option value="non-fragile">Non-Fragile</option>
        </select>
        <br />

        <label className="requiredText">Quantity of Items{asterik}</label>
        <input
          type="number"
          className="form-fields phone-input3"
          placeholder="Describe your Item"
          name="parcel_description"
          // value={formData.parcel_description}
          // onChange={handleChange}
        />
        {/* <p className="error-style">{formErrors.parcel_description}</p> */}
        <br />

        <label className="requiredText">Delivery Instructions</label>
        <textarea
          type="text"
          className="form-field-Instructions phone-input3 textarea"
          placeholder="Enter any specific Instruction for the delivery agent to note"
          name="delivery_instructions"
          // value={formData.delivery_instructions}
          // onChange={handleChange}
        />
        {/* <p className="error-style">{formErrors.delivery_instructions}</p> */}
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
