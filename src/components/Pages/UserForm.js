import React, { useEffect, useState } from "react";
import "../css/signup.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import "../css/UserForm.css";
import "../css/Personal.css";
// import Footer from "../javascript/Footer";
import { Link, useNavigate } from "react-router-dom";
import User from "../Images/user.png";
import Mail from "../Images/mail.png";
import Flag from "../Images/Nigerian_flag.png";
import Footer from "../../Shadow/javascripts/Footer";
import { auth } from "../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Popup2 } from "../javascript/Popup";

export default function UserForm() {
  const navigate = useNavigate();
  const asterik = <span id="asterik">*</span>;
  const [loadOtp, setLoadOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpValues, setOtpValues] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });
  const [countDown, setCountDown] = useState(60);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_no: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [dataError, setDataError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFinalSubmit = async () => {
    const computedNum = `${otpValues.one}${otpValues.two}${otpValues.three}${otpValues.four}${otpValues.five}${otpValues.six}`;

    try {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(computedNum)
        .then(async (result) => {
          const user = result.user;
          // ...
          console.log("worked");
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
            if (!data.phone_no) {
              errors.phone_no = "Phone Number must be filled!";
            }
            return errors;
          };
          setFormErrors(validate(formData));

          try {
            const res = await fetch(
              "https://ancient-wildwood-73926.herokuapp.com/user_auth/signup",
              {
                method: "POST",

                body: JSON.stringify({
                  fullname: formData.fullname,
                  phone_no: formData.phone_no,
                  email: formData.email,
                }),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json, text/plain, */*",
                },
              }
            );
            const data = await res.json();
            console.log(data);
            if (
              data.msg === "An account with this phone number already exists"
            ) {
              setDataError(data.msg);
              setLoadOtp(false);
            }

            if (res.status === 200) {
              setMessage("User created successfully");
              navigate("/welcome");
              setLoadOtp(false);
            } else {
              // setMessage("An Error occured");
              setLoadOtp(false);
            }
          } catch (error) {
            // console.log(error);
            // const err = error
          }
          console.log(user);
        })
        .catch((error) => {
          console.log("error");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const OtpChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setOtpValues({ ...otpValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const number = "+234" + [formData.phone_no];

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // console.log(response);
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            handleSubmit();
          },
        },
        auth
      );
    } catch (err) {
      console.log("can't send Otp");
      console.log(err);
    }

    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);

    setLoadOtp(true);
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Head />
      <div className="mainBox">
        <div className="delivery-img-form" id="DeliveryImage">
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
                minLength={3}
                value={formData.fullname}
                onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
                name="fullname"
                className="input-field phone-input2"
                // required={true}
              />
            </div>
            <p className="error-style">{formErrors.fullname}</p>
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
                className="input-field phone-input2"
                placeholder="Enter your Email"
                name="email"
                // required={false}
              />
            </div>
            <p className="error-style">{formErrors.email}</p>
            <br />

            <label className="requiredText">Phone Number{asterik}</label>
            <div className="delivery-location-input">
              <img src={Flag} alt="" className="flag-icon" />
              <span className="text-icon">+234</span>
              <input
                value={formData.phone_no.toString()}
                onChange={handleChange}
                maxLength={10}
                type="number"
                className="input-field phone-input"
                placeholder="Enter your Phone Number"
                name="phone_no"
                // required={true}
              />
            </div>
            <p className="error-style">{formErrors.phone_no}</p>
            <p className="error-style">{dataError}</p>
            <br />

            <div id="center-button">
              <Button name="Next" />
            </div>
          </form>

          <p id="accountAlready">
            Already Have an account?{" "}
            <Link to="/welcome">
              <span id="loginSpan">Log in</span>
            </Link>
          </p>

          <div className="message-text">
            {message ? <p>{message}</p> : null}
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
      <Footer />
      <Popup2 trigger={loadOtp} setTrigger={setLoadOtp}>
        <div>
          <div className="mainBox-1">
            <div className="delivery-img-otp" id="DeliveryImage">
              <p>
                Door to Door <span id="yellow">delivery</span>
                <br /> services for individuals
                <br /> and businesses.
              </p>
              <br id="otp-hide" />
              <br />
              <img src={DeliveryImage} alt="Deliver" />
            </div>

            <div id="otp-flex">
              <h2 id="join" className="otp-p">
                Phone number verification
              </h2>
              <div id="otp-div">
                <p id="otp-paragraph">
                  Enter the OTP sent by SMS to 08067654532
                </p>
                <div id="otpField">
                  <input
                    type="text"
                    maxLength={1}
                    name="one"
                    value={otpValues.one}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="two"
                    value={otpValues.two}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="three"
                    value={otpValues.three}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="four"
                    value={otpValues.four}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    name="five"
                    value={otpValues.five}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="six"
                    value={otpValues.six}
                    onChange={OtpChange}
                  />

                  <br />
                  <br />
                  <p id="another-code">
                    We would send you another code in{" "}
                    <span id="otpTimer">00:{countDown}</span>
                    <br />
                    <br />
                    <br />
                    <br />
                  </p>

                  <Button name="DONE" click={handleFinalSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup2>
    </>
  );
}
