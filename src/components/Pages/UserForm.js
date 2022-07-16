import React, { useEffect, useState } from "react";
import "../css/signup.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import "../css/UserForm.css";
import "../css/Personal.css";
import Footer from "../javascript/Footer";
import { Link } from "react-router-dom";
import User from "../Images/user.png";
import Mail from "../Images/mail.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function UserForm() {
  // const eelement = <FontAwesomeIcon icon={faUser} />;
  const asterik = <span id="asterik">*</span>;
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    // console.log(formData);
    // setFormData({ fullName: "", email: "", phoneNumber: "" });
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  const validate = (data) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.fullname) {
      errors.fullname = "Full Name must be filled!";
    }
    if (!data.email) {
      errors.email = "Email must be filled!";
    } else if (!regex.test(data.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!data.phoneNumber) {
      errors.phoneNumber = "Phone Number must be filled!";
    }
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formErrors]);
  return (
    <>
      <Head />
      {/* <pre>{JSON.stringify(formData, undefined, 2)}</pre> */}
      <div className="mainBox">
        <div id="DeliveryImage">
          <p>
            Door to Door <span id="yellow">delivery</span>
            <br /> services for individuals
            <br /> and businesses.
          </p>
          <br />
          <br />
          <img src={DeliveryImage} alt="Deliver" />
        </div>

        <div id="Form-flex">
          <h2 id="join">Create account</h2>

          <form id="User-form" onSubmit={handleSubmit}>
            <label htmlFor="fullname" className="requiredText">
              Full name{asterik}
            </label>
            <div className="delivery-location-input">
              <img src={User} alt="" className="user-icon" />
              <input
                value={formData.fullname}
                onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
                name="fullname"
                className="input-field"
                // required={true}
              />
            </div>
            <p>{formErrors.fullname}</p>
            <br />

            <label className="requiredText" htmlFor="email">
              Email{asterik}
            </label>
            <div className="delivery-location-input">
              <img src={Mail} alt="" className="mail-icon" />
              <input
                value={formData.email}
                onChange={handleChange}
                type="text"
                className="input-field"
                placeholder="Enter your Email"
                name="email"
                // required={true}
              />
            </div>
            <p>{formErrors.email}</p>
            <br />

            <label className="requiredText">Phone Number{asterik}</label>
            <input
              value={formData.phoneNumber}
              onChange={handleChange}
              type="text"
              className="input-field"
              placeholder="Enter your Phone Number"
              name="phoneNumber"
              // required={true}
            />
            <p>{formErrors.phoneNumber}</p>
            <br />

            <div id="center-button">
              <Link to="/confirm">
                <Button name="Next" />
              </Link>
            </div>
          </form>

          <p id="accountAlready">
            Already Have an account? <span id="loginSpan">Log in</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
// &#xf0e0
