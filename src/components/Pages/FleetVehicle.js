import React from "react";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import ProgressMMM from "../Images/ProgressIII.png";
import "../css/vehicle.css";
import Vector from "../Images/Vector.png";
import Footer from "../javascript/Footer";
import { Link } from "react-router-dom";

export default function FleetVehicle() {
  const asterik = <span id="asterik">*</span>;

  return (
    <>
      <Head />
      <div id="mainsign">
        <h2>Join Pickload as a Fleet agent</h2>
        <br />
        <div>
          <img src={ProgressMMM} alt="Progress" />
        </div>
        <br />
        <br />

        <form className="sign-form" id="vehicle-i">
          <p className="requiredText">
            {asterik} Please select the delivery medium you want to register
            <br />
          </p>

          <section className="Radio vehicle-rad" id="Radio-1">
            <input
              type="radio"
              value="Bike"
              name="Vehicle"
              className="RadioV"
            />
            <label htmlFor="Bike">
              {" "}
              <span className="vehicle-text">Bike</span>
            </label>

            <input type="radio" value="van" name="Vehicle" className="RadioV" />
            <label htmlFor="van">
              {" "}
              <span className="vehicle-text">Van</span>
            </label>
          </section>
          <br />

          <section className="Radio vehicle-rad" id="Radio-2">
            <input type="radio" value="Car" name="Vehicle" className="RadioV" />
            <label htmlFor="Car">
              <span className="vehicle-text">Car</span>
            </label>

            <input
              type="radio"
              value="Truck"
              name="Vehicle"
              className="RadioV"
              id="truck-rad"
            />
            <label htmlFor="Truck">
              {" "}
              <span className="vehicle-text">Truck</span>
            </label>
          </section>
          <br />

          <p className="requiredText">Bike</p>
          <br />

          <label htmlFor="Manufacturer">
            <span className="requiredText">
              Name of Manufacturer and model/ Type
            </span>
            <br />
            <input
              type="text"
              className="form-field edit-field"
              placeholder="Eg Toyota Corolla"
              name="Manufacturer"
            />
          </label>
          <br />

          <label htmlFor="Color">
            <span className="requiredText">Vehicle color</span>
            <br />
            <input
              type="text"
              className="form-field edit-field"
              placeholder="Eg Red"
              name="Color"
            />
          </label>
          <br />

          <label htmlFor="Vehicle Plate Number">
            <span className="requiredText">Vehicle Plate Number</span>
            <br />
            <input
              type="text"
              className="form-field edit-field"
              placeholder="Eg LST 678KJ"
              name="Vehicle Plate Number"
            />
          </label>
          <br />

          <label htmlFor="license-expiry">
            <span className="requiredText">Drivers license expiry date</span>
            <br />
            <input
              type="date"
              className="date-field"
              placeholder="Pick Date"
              name="license-expiry"
            />
          </label>
          <br />

          <div className="uploadFlex">
            <div className="uploadPad">
              <legend className="requiredText">
                {asterik} Upload Your Photo/Passport{" "}
                <span className="Upload" id="uploadText-2">
                  (Please provide a clear potrait photo which shows
                  <br />
                  clearly your face in front view with your eyes open. NOT A
                  FULL BODY PHOTO)
                </span>
              </legend>
              <br />

              <section>
                <div className="Upload" id="vector">
                  <img src={Vector} alt="Vector" />
                </div>
              </section>
            </div>
            <br />

            <div className="uploadPad">
              <legend className="requiredText">
                {asterik} Upload Your Driver's License{" "}
                <span className="Upload" id="uploadText">
                  N/B: Front and Back Image.
                </span>
              </legend>
              <br />

              <section>
                <div className="Upload" id="vector">
                  <img src={Vector} alt="Vector" />
                </div>
              </section>
              <br />
            </div>

            <div className="uploadPad" id="pad-vec">
              <legend className="requiredText">
                {asterik} Upload an image of your Vehicle showing your plate
                number
                <br />
                <span className="Upload" id="uploadText">
                  N/B: Max of 5 images allowed.
                </span>
              </legend>
              <br />

              <section>
                <div className="Upload" id="vector">
                  <img src={Vector} alt="Vector" />
                </div>
              </section>
            </div>
          </div>

          <div id="center-button">
            <Link to="/account">
              <Button name="Submit" />
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
