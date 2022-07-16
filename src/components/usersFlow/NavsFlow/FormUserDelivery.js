import React from "react";
import Button from "../../javascript/Button";
import "../../css/Personal.css";
import Vector from "../../Images/Vector.png";
import FormProgress from "../../Images/FormProgress.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../../css/userflowform.css";
import LoggedinMainPage from "./LoggedinMainPage";
import { Link } from "react-router-dom";

export default function FormUserDelivery() {
  return <LoggedinMainPage file={<FormUserDelivery1 />} />;
}

export function FormUserDelivery1() {
  const asterik = <span id="asterik">*</span>;
  const eelement = (
    <span>
      {" "}
      <FontAwesomeIcon icon={faUser} /> Enter your full name{" "}
    </span>
  );

  return (
    <div className="white-div">
      <h2>Delivery Details</h2>
      <br />
      <div>
        <img src={FormProgress} alt="Progress" />
      </div>
      <br />
      <br />

      <form className="sign-form">
        <label className="requiredText">Sender's Full name{asterik}</label>
        <input
          type="text"
          className="form-fields"
          placeholder="Enter your full name"
          name="Fullname"
          required={true}
        />
        <br />

        <label className="requiredText">Sender's Phone Number{asterik}</label>
        <input
          type="text"
          className="form-fields"
          placeholder="Enter your Phone Number"
          name="PhoneNumber"
        />
        <br />

        <label className="requiredText">Receiver's Full name{asterik}</label>
        <input
          type="text"
          className="form-fields"
          placeholder="Enter Receiver's full name"
          name="ReceiverFullname"
          required={true}
        />
        <br />

        <label className="requiredText">Receiver's Phone Number{asterik}</label>
        <input
          type="text"
          className="form-fields"
          placeholder="Enter Receiver's Phone Number"
          name="ReceiverPhoneNumber"
        />
        <br />

        <label className="requiredText">Parcel Name{asterik}</label>
        <input
          type="text"
          className="form-fields"
          placeholder="Enter A Name For Your Item"
          name="Parcelname"
          required={true}
        />
        <br />

        <label className="requiredText">Parcel Type{asterik}</label>
        <select
          defaultValue="Fragile"
          className="form-fields"
          name="ParcelType"
          required={true}
        >
          <option value="Fragile">Fragile</option>
          <option value="Non-Fragile">Non-Fragile</option>
        </select>
        <br />

        <label className="requiredText">Parcel Description{asterik}</label>
        <input
          type="text"
          className="form-fields"
          placeholder="Describe your Item"
          name="ParcelDescription"
          required={true}
        />
        <br />

        <label className="requiredText">Delivery Instructions{asterik}</label>
        <input
          type="text"
          className="form-field-Instructions"
          placeholder="Enter any specific Instruction for the delivery agent to note"
          name="ParcelDescription"
          required={true}
        />
        <br />

        <div className="field">
          <legend className="requiredText">
            Delivery Instructions {asterik}
          </legend>
          <br />

          <section>
            <div className="Upload" id="vector">
              <img src={Vector} alt="Vector" />
            </div>

            <div className="Upload" id="uploadText">
              N/B: The closest available <span>BIKE</span> delivery agent would
              receive and confirm
              <br /> your request after which you'll be directed to the payment
              page.
            </div>
          </section>
        </div>
        <Link to="/summary-i">
          <Button name="Next" type="submit" />
        </Link>
      </form>
    </div>
  );
}
