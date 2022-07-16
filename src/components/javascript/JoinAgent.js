import React from "react";
// import { useForm } from "react-hook-form";
import Button from "./Button";
import Head from "./Head";
import ProgressM from "../Images/ProgressI.png";
import "../css/Personal.css";
import Vector from "../Images/Vector.png";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import User from "../Images/user.png";
import Mail from "../Images/mail.png";
import Locate from "../Images/locate.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { CirclePlus } from "tabler-icons-react";

export default function JoinAgent(props) {
  const asterik = <span id="asterik">*</span>;
  // const { register, handleSubmit, errors } = useForm();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(props.link);
  };
  return (
    <>
      <Head />
      <div id="mainsign">
        <h2>{props.delivery}</h2>
        <br />
        <div>
          <img src={ProgressM} alt="Progress" />
        </div>
        <br />
        <br />

        <form onSubmit={handleSubmit} className="sign-form">
          <label className="requiredText">Full name{asterik}</label>
          <div className="delivery-location-input">
            <img src={User} alt="" className="user-icon" />
            <input
              type="text"
              className="form-field edit-field"
              placeholder="Enter your full name"
              name="Fullname"
              // required={true}
            />
          </div>
          <br />

          <label className="requiredText">Email{asterik}</label>
          <div className="delivery-location-input">
            <img src={Mail} alt="" className="mail-icon" />
            <input
              type="text"
              className="form-field edit-field"
              placeholder="Enter your Email"
              name="Email"
            />
          </div>
          <br />

          <label className="requiredText">Phone Number{asterik}</label>
          <input
            type="text"
            className="form-field edit-field"
            placeholder="Enter your Phone Number"
            name="PhoneNumber"
          />
          <br />

          <div className="field" id="second">
            <label htmlFor="Address">
              <span className="requiredText">Address{asterik}</span> <br />
              <div className="delivery-location-input">
                <img src={Locate} alt="" className="locate-icon" />
                <input
                  type="text"
                  className="secondField"
                  placeholder="Enter your Address"
                  name="Address"
                />
              </div>
            </label>

            <label htmlFor="State">
              <span className="requiredText">State{asterik}</span>
              <br />
              <div className="delivery-location-input">
                <img src={Locate} alt="" className="locate-icon" />
                <input
                  type="text"
                  className="secondField"
                  placeholder="Enter your State"
                  name="State"
                />
              </div>
            </label>
          </div>

          <div className="field">
            <legend className="requiredText">Gender{asterik}</legend>
            <section id="check">
              <label className="check" htmlFor="gender">
                Male
              </label>
              <input
                id="maleCheck"
                type="checkbox"
                value="male"
                name="gender"
              />

              <label className="check" htmlFor="gender">
                Female
              </label>
              <input
                id="maleCheck"
                type="checkbox"
                value="female"
                name="gender"
              />
            </section>
          </div>

          <div className="field">
            <legend className="requiredText">
              Upload your passport or selfie{asterik}{" "}
              <span className="Upload" id="uploadText">
                {" "}
                N/B: Image must clearly show your face.
              </span>
            </legend>
            <br />

            <section id="vector-sec">
              <div className="Upload" id="vector">
                <label>
                  <img src={Vector} alt="Vector" />
                  <input type="file" accept="image/*" name="selfie" />
                </label>
              </div>
            </section>
          </div>

          <div id="center-button">
            <Button name="Next" type="submit" />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
