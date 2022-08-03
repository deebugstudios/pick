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

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsSelected(true);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(props.link);
    //   try {
    //     const res = await fetch(
    //       "https://guarded-falls-60982.herokuapp.com/delivery_agent_auth/signup_stage_one",
    //       {
    //         method: "POST",

    //         body: JSON.stringify({
    //           fullname: formData.fullname,
    //           phone_no: formData.phone_no,
    //           email: formData.email,
    //           delivery_agent_type: "Individual",
    //           address: formData.address,
    //           state: formData.resident_state,
    //           city: formData.city,
    //           gender: "Male",
    //           profile_img: selectedFile,
    //         }),
    //         headers: {
    //           "Content-Type": "application/json",
    //           Accept: "application/json, text/plain, */*",
    //         },
    //       }
    //     );

    //     const data = await res.json();
    //     console.log(data);

    //     if (res.status === 200) {
    //       // setName("");
    //       // setEmail("");
    //       setMessage("User created successfully");
    //       navigate(props.link);
    //     } else {
    //       setMessage("Error occured");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log(formData);
    // };
  };

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

        <form onSubmit={handleSubmit} className="sign-form">
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
                    maxLength={1}
                    onChange={onFileChange}
                    type="file"
                    accept="image/*"
                    name="selectedFile"
                  />
                </label>
              </div>
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
