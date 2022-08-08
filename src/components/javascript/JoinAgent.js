import React, { useEffect, useState } from "react";
import Button from "./Button";
import Head from "./Head";
import ProgressM from "../Images/ProgressI.png";
import "../css/Personal.css";
import Vector from "../Images/Vector.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import User from "../Images/user.png";
import Mail from "../Images/mail.png";
import Locate from "../Images/locate.png";
import Flag from "../Images/Nigerian_flag.png";
import axios from "axios";
import AsIndividual from "../Pages/AsIndividual";

export default function JoinAgent(props) {
  const asterik = <span id="asterik">*</span>;

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_no: "",
    city: "",
    address: "",
    resident_state: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheck = (e) => {
    setGender(e.target.value);
  };

  // const handleCheck2 = (e) => {
  //   setIsFemale(!isFemale);
  //   if (isFemale) {
  //     setIsMale(false);
  //   }
  // };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsSelected(true);
    console.log(selectedFile);
  };

  const navigate = useNavigate();

  let agent = props.agent;

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate(props.link);
    const bodyFormData = new FormData();
    bodyFormData.append("fullname", formData.fullname);
    bodyFormData.append("phone_no", formData.phone_no);
    bodyFormData.append("email", formData.email);
    bodyFormData.append("delivery_agent_type", agent);
    bodyFormData.append("address", formData.address);
    bodyFormData.append("state", formData.resident_state);
    bodyFormData.append("city", formData.city);
    bodyFormData.append("gender", gender);
    bodyFormData.append("profile_img", selectedFile);

    axios
      .post(
        "https://guarded-falls-60982.herokuapp.com/delivery_agent_auth/signup_stage_one",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        // if (response.status === 200) {
        //   navigate(props.link);
        // } else {
        //   setMessage("Error occured");
        // }
        navigate(props.link);
        console.log(bodyFormData);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const _id = "62ed9fa9ef8d4752b2e1b9e2";
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmVkOWZhOWVmOGQ0NzUyYjJlMWI5ZTIiLCJwaG9uZV9ubyI6IjgxNTc1NDI4MjAiLCJpYXQiOjE2NTk3NDAwNzN9.mT3i4DgZA_B4kEd-VuKFpa9k4bmkBdIm-ve6JPd2yYQ";

  return (
    <>
      <Head />
      <div id="mainsign">
        <h2>{props.delivery}</h2>
        <br />
        <div className="mainsign-prog">
          <img src={ProgressM} alt="Progress" />
        </div>
        <br />
        <br />

        <form
          onSubmit={handleSubmit}
          className="sign-form"
          encType="multipart/form-data"
        >
          <label className="requiredText">Full name{asterik}</label>
          <div className="delivery-location-input">
            <img src={User} alt="" className="user-icon" />
            <input
              minLength={3}
              value={formData.fullname}
              onChange={handleChange}
              type="text"
              className="form-field edit-field phone-input2"
              placeholder="Enter your full name"
              name="fullname"
              // required={true}
            />
          </div>
          <br />

          <label className="requiredText">Email</label>
          <div className="delivery-location-input">
            <img src={Mail} alt="" className="mail-icon" />
            <input
              value={formData.email}
              onChange={handleChange}
              type="text"
              className="form-field edit-field phone-input2"
              placeholder="Enter your Email"
              name="email"
            />
          </div>
          <br />

          <label className="requiredText">Phone Number{asterik}</label>
          <div className="delivery-location-input">
            <img src={Flag} alt="" className="flag-icon" />
            <span className="text-icon">+234</span>
            <input
              value={formData.phone_no}
              onChange={handleChange}
              maxLength={10}
              type="text"
              className="form-field edit-field phone-input"
              placeholder="Enter your Phone Number"
              name="phone_no"
              // required={true}
            />
          </div>
          <br />

          <label className="requiredText">Address{asterik}</label>
          <div className="delivery-location-input">
            <img src={Locate} alt="" className="locate-icon" />
            <input
              value={formData.address}
              onChange={handleChange}
              type="text"
              className="form-field edit-field phone-input2"
              placeholder="Enter your Address"
              name="address"
            />
          </div>
          <br />

          <div className="field" id="second">
            <label htmlFor="city">
              <span className="requiredText">City{asterik}</span> <br />
              <div className="delivery-location-input">
                <img src={Locate} alt="" className="locate-icon" />
                <input
                  minLength={3}
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  className="secondField phone-input2"
                  placeholder="Enter your City"
                  name="city"
                />
              </div>
            </label>

            <label htmlFor="resident_state">
              <span className="requiredText">State{asterik}</span>
              <br />
              <div className="delivery-location-input">
                <img src={Locate} alt="" className="locate-icon" />
                <input
                  minLength={3}
                  value={formData.resident_state}
                  onChange={handleChange}
                  type="text"
                  className="secondField phone-input2"
                  placeholder="Enter your State"
                  name="resident_state"
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
                checked={gender === "male"}
                onChange={handleCheck}
              />

              <label className="check" htmlFor="gender">
                Female
              </label>
              <input
                id="maleCheck"
                type="checkbox"
                value="female"
                name="gender"
                checked={gender === "female"}
                onChange={handleCheck}
              />
            </section>
          </div>

          <div className="field">
            <legend className="requiredText">
              Upload your passport or selfie{asterik}{" "}
              <span className="Upload" id="uploadText">
                {" "}
                <br className="upload-hide" />
                N/B: Image must clearly show your face.
              </span>
            </legend>
            <br />

            <section id="vector-sec">
              <div className="Upload" id="vector">
                <label>
                  <img src={Vector} alt="Vector" />
                  <input
                    onChange={onFileChange}
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    name="selectedFile"
                    // disabled=
                  />
                </label>
              </div>

              {isSelected ? <p>{selectedFile.name}</p> : null}
            </section>
            <div className="message"></div>
          </div>

          <div id="center-button">
            <Button name="Next" type="submit" />
          </div>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      <Footer />
    </>
  );
}
