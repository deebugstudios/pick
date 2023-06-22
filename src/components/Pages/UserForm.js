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
import { createUserWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { Popup2 } from "../javascript/Popup";

export default function UserForm() {
  const navigate = useNavigate();
  const asterik = <span id="asterik">*</span>;
  const [loadOtp, setLoadOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [countDown, setCountDown] = useState(180);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_no: "",
  });
  const [formErrors, setFormErrors] = useState({error: false});
  const [result, setResult] = useState({msg: "failure"});
  const [dataError, setDataError] = useState("");
  const [message, setMessage] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const [loadMessage, setLoadMessage] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (data) => {
    const errors = {error: false};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    //the former regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.fullname) {
      errors.fullname = "Full Name must be filled!";
      errors.error = true;
    }
    if (!data.email) {
      errors.email = "Email must be filled!";
      errors.error = true;
    } else if (!regex.test(data.email)) {
      errors.email = "Please enter a valid email";
      errors.error = true;
    }
    if (!data.phone_no) {
      errors.phone_no = "Phone Number must be filled!";
      errors.error = true;
    }
    return errors;
  };

  const handleFinalSubmit = async () => {
    setLoadButton(true);
    const computedNum = otpValues.join("");

    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_auth/verify_otp",
        {
          method: "POST",

          body: JSON.stringify({
            otp: computedNum,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if(res.status === 200) {
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
            // create user firebase account
            const password = "pickload_user";
            const email = formData.email;
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // User creation successful
              const user = userCredential.user;
              console.log('New user created:', user);
            })
            .catch((error) => {
              // User creation failed
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('User creation error:', errorCode, errorMessage);
            });
          } else {
            // setMessage("An Error occured");
            setLoadOtp(false);
          }
        } catch (error) {
          setLoadButton(false);
          setLoadOtp(false);
          // console.log(error);
          // const err = error
        }
        // console.log(user);
      } else if(data.msg === "Incorrect OTP") {
        setLoadMessage("Incorrect OTP");
        setLoadButton(false);
      }
    } catch (err) {
      // console.log(err);
      setLoadMessage("An Error Occured");
    }
  };

  const OtpChange = (element, index, direction) => {
    if (direction === "backspace") {
      // Handle backspace key press
      if (element.value === "") {
        // If the current input is empty, move focus to the previous input
        if (element.previousSibling) {
          element.previousSibling.focus();
          setOtpValues([
            ...otpValues.map((d, idx) =>
              idx === index - 1 ? "" : idx === index ? "" : d
            ),
          ]);
        }
      } else {
        // If the current input is not empty, clear its value
        setOtpValues([...otpValues.map((d, idx) => (idx === index ? "" : d))]);
      }
    } else {
      // Handle regular input
      if (isNaN(element.value)) return false;
      setOtpValues([
        ...otpValues.map((d, idx) => (idx === index ? element.value : d)),
      ]);
      // Focus next or previous input
      if (element.nextSibling && direction !== "prev") {
        element.nextSibling.focus();
      } else if (element.previousSibling && direction === "prev") {
        element.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validate(formData));
    if(formErrors.error === false) {
      console.log(formErrors);
      try {
        const number = "+234" + [formData.phone_no];
        console.log(number);
        // window.recaptchaVerifier = new RecaptchaVerifier(
        //   "recaptcha-container",
        //   {
        //     size: "invisible",
        //     callback: (response) => {
        //       // console.log(response);
        //       // reCAPTCHA solved, allow signInWithPhoneNumber.
        //       handleSubmit();
        //     },
        //   },
        //   auth
        // );

        // const appVerifier = window.recaptchaVerifier;
        // console.log(appVerifier);

        // setLoadOtp(true);
        // const interval = setInterval(() => {
        //   setCountDown((countDown) => countDown - 1);
        // }, 1000);
        // if (countDown === 0) {
        //   clearInterval(interval);
        // }
        // signInWithPhoneNumber(auth, number, appVerifier)
        // .then((confirmationResult) => {
        //   window.confirmationResult = confirmationResult;
        //   setLoading(false);
        // })
        // .catch((error) => {
        //   setLoadMessage("An Error Occured");
        //   setLoading(false);
        // });
      
        const res1 = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/user_auth/send_otp",
          {
            method: "POST",
  
            body: JSON.stringify({
              phone_no: number,
              email: formData.email
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const data2 = await res1.json();
        console.log(data2);
        if(res1.status === 200) {
          setLoadOtp(true);  
          const interval = setInterval(() => {
            setCountDown((countDown) => countDown - 1);
            if (countDown === 0) {
              clearInterval(interval);
            }
          }, 1000);
          setLoading(false);
        } else {
          setLoading(false);
          setLoadMessage("An Error occured");
        }

      } catch (err) {
        setLoadMessage("An error occured, please try again");
          // console.log(err);
        }      
    } else {
      setLoading(false);
      console.log(formErrors);
      return;
    }
  };

  const resend = () => {
    setCountDown(60);

    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    const number = "+234" + [formData.phone_no];

    // const interval = setInterval(() => {
    //   setCountDown((countDown) => countDown - 1);
    // }, 1000);
    // if (countDown === 0) {
    //   clearInterval(interval);
    // }
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
              <Button name="Next" loading={loading} />
              {/* <p className="error-style">{message}</p> */}
            </div>
          </form>

          <p id="accountAlready">
            Already have an account?{" "}
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
      <Popup2 trigger={loadOtp} setTrigger={setLoadOtp} setOtpValues={setOtpValues} setCountDown={setCountDown}>
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
                  Enter the OTP sent by SMS to 0{formData.phone_no}
                </p>
                <div id="otpField">
                  {otpValues.map((data, index) => {
                    return (
                      <input
                        type="text"
                        maxLength={1}
                        name="otpValues"
                        key={index}
                        value={data}
                        onChange={(e) => OtpChange(e.target, index)}
                        onKeyDown={(e) => {
                          if (e.keyCode === 8) {
                            e.preventDefault();
                            OtpChange(e.target, index, "backspace");
                          }
                        }}
                        onFocus={(e) => e.target.select()}
                      />
                    );
                  })}

                  <br />
                  <br />
                  {countDown >= 0 ? (
                    <p id="another-code">
                      We would send you another code in{" "}
                      <span id="otpTimer">00:{countDown}</span>
                      <br />
                      <br />
                      <br />
                      <br />
                    </p>
                  ) : (
                    <button onClick={resend} id="another-code">
                      Resend OTP
                    </button>
                  )}

                  <Button
                    name="DONE"
                    click={handleFinalSubmit}
                    loading={loadButton}
                  />
                  <p className="error-style">{loadMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup2>
    </>
  );
}
