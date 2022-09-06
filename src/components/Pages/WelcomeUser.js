import React, { useState, useContext, useEffect } from "react";
import "../css/signup.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import "../css/WelcomeUser.css";
import Footer from "../javascript/Footer";
import { Link, useNavigate } from "react-router-dom";
import { RiderContext } from "../../Shadow/Pages/Contexts/RiderContext";
import Flag from "../Images/Nigerian_flag.png";
import { auth } from "../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { OTP3 } from "../javascript/OTP";
import { Popup2 } from "../javascript/Popup";
export default function WelcomeUser(props) {
  const asterik = <span id="asterik">*</span>;

  const [phone_no, setPhone_no] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [dataError, setDataError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [loadOtp, setLoadOtp] = useState(false);
  const [otpValues, setOtpValues] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });
  const [countDown, setCountDown] = useState(60);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // console.log(response);
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            handleLoginSubmit();
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

    if (!phone_no) {
      setFormErrors("Phone Number must be filled!");
    } else setFormErrors("");
    try {
      setLoading(true);
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_auth/login",
        {
          method: "POST",

          body: JSON.stringify({
            phone_no: phone_no,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();

      console.log(data);
      if (data.msg === `No user with phone no: ${phone_no} found`) {
        setLoading(false);
        setDataError(data.msg);

        setTimeout(() => {
          setDataError("");
        }, 4000);
      }

      if (res.status === 200) {
        setLoadOtp(true);
        const number = "+234" + [phone_no];

        const interval = setInterval(() => {
          setCountDown((countDown) => countDown - 1);
        }, 1000);
        if (countDown === 0) {
          clearInterval(interval);
        }
        signInWithPhoneNumber(auth, number, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });

        localStorage.setItem("input", JSON.stringify(data?.token));
        setLoading(false);

        // console.log(idU);
      } else {
        setLoading(false);
        setMessage("An Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // window.
  const onChange = (e) => {
    setPhone_no(e.target.value);
  };

  const handleClick = () => {
    navigate("/forgot");
  };

  const resend = () => {
    setCountDown(60);
    // try {
    //   window.recaptchaVerifier = new RecaptchaVerifier(
    //     "recaptcha-container",
    //     {
    //       size: "invisible",
    //       callback: (response) => {
    //         // console.log(response);
    //         // reCAPTCHA solved, allow signInWithPhoneNumber.
    //         handleLoginSubmit();
    //       },
    //     },
    //     auth
    //   );
    // } catch (err) {
    //   console.log("can't send Otp");
    //   console.log(err);
    // }

    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    const number = "+234" + [phone_no];

    const interval = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
    if (countDown === 0) {
      clearInterval(interval);
    }
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

  const handleFinalSubmit = () => {
    const computedNum = `${otpValues.one}${otpValues.two}${otpValues.three}${otpValues.four}${otpValues.five}${otpValues.six}`;

    try {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(computedNum)
        .then((result) => {
          const user = result.user;
          // ...
          console.log("worked");
          navigate("/user/type");
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

  return (
    <>
      <Head />

      <div className="mainBox" id="welcome-main">
        <div className="delivery-img-welcome" id="DeliveryImage">
          <p>
            Door to Door <span id="yellow">delivery</span>
            <br /> services for individuals
            <br /> and businesses.
          </p>
          <br />
          <br />
          <img src={DeliveryImage} alt="Deliver" />
        </div>

        <div id="Form-flex-ULogin">
          <h2 id="join">Welcome Back</h2>
          <br />

          <form
            id="User-form-ULogin"
            onSubmit={handleLoginSubmit}
            className="sign-form"
          >
            <label className="requiredText">Phone Number{asterik}</label>
            <div className="delivery-location-input">
              <img src={Flag} alt="" className="flag-icon" />
              <span className="text-icon">+234</span>
              <input
                type="text"
                className="input-field phone-input"
                placeholder="Enter your Phone Number"
                name="phone_no"
                value={phone_no}
                maxLength={10}
                onChange={onChange}
                disabled={loading}
              />
            </div>
            <p className="error-style">{formErrors}</p>
            <p className="error-style">{dataError}</p>

            <p id="forgot" onClick={handleClick}>
              Forgot your Phone Number?
            </p>

            <br />
            <br />
            <div className="center-button">
              <Button name="Login" loading={loading} />
            </div>
          </form>

          <p id="accountAlready">
            Don't Have an account?{" "}
            <Link to="/join">
              <span id="loginSpan">Sign up</span>
            </Link>
          </p>
        </div>
        {/* <div className="message-text">{message ? <p>{message}</p> : null}</div> */}
      </div>
      <p id="agree-p">
        By clicking Login, you agree to our{" "}
        <span className="policy">Terms of Use </span>and our{" "}
        <span className="policy">Privacy Policy</span>.
      </p>
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
                  Enter the OTP sent by SMS to {phone_no}
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
                      Resend Otp
                    </button>
                  )}

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

export function WelcomeAgent() {
  const asterik = <span id="asterik">*</span>;
  const [countDown, setCountDown] = useState(60);
  const [otpValues, setOtpValues] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });

  const value = useContext(RiderContext);
  const {
    token,
    setOtp,
    formErrors,
    setPhone_no,
    isOtp,
    message,
    loading,
    handleOtp,
    handleSubmit,
    phone_no,
    dataError,
    loadOtp,
    setLoadOtp,
    setLoading,
  } = value;

  const handleFinalSubmit = () => {
    const computedNum = `${otpValues.one}${otpValues.two}${otpValues.three}${otpValues.four}${otpValues.five}${otpValues.six}`;

    try {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(computedNum)
        .then((result) => {
          const user = result.user;
          // ...
          console.log("worked");
          navigate("/deliveryhistory");
          // console.log(user);
        })
        .catch((error) => {
          console.log("error");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  // useEffect(() => {
  //   if (token) {
  //     //
  //   }
  // }, [token]);
  // console.log(token);
  const onChange = (e) => {
    setPhone_no(e.target.value);
  };

  const OtpChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setOtpValues({ ...otpValues, [name]: value });
  };

  //   const generate = () => {
  //     try {
  //       window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
  //         'size': 'invisible',
  //         'callback': (response) => {
  //           console.log(response)
  //           // reCAPTCHA solved, allow signInWithPhoneNumber.
  //           handleSubmit();
  //         }
  //       }, auth);

  //     } catch (err) {
  //       console.log("can't send Otp")
  //       console.log(err)
  //     }

  //   }

  // useEffect(()=> {
  //     generate()
  //     return ()=> generate()
  //   },[])

  //   const appVerifier = window.recaptchaVerifier;

  // console.log(appVerifier)

  const handleClick = (e) => {
    navigate("/forgot");
  };

  const resend = () => {
    setCountDown(60);
    // try {
    //   window.recaptchaVerifier = new RecaptchaVerifier(
    //     "recaptcha-container",
    //     {
    //       size: "invisible",
    //       callback: (response) => {
    //         // console.log(response);
    //         // reCAPTCHA solved, allow signInWithPhoneNumber.
    //         handleLoginSubmit();
    //       },
    //     },
    //     auth
    //   );
    // } catch (err) {
    //   console.log("can't send Otp");
    //   console.log(err);
    // }

    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    const number = "+234" + [phone_no];

    const interval = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
    if (countDown === 0) {
      clearInterval(interval);
    }
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
      <div className="mainBox" id="welcome-main">
        <div className="delivery-img-welcome" id="DeliveryImage">
          <p>
            Door to Door <span id="yellow">delivery</span>
            <br /> services for individuals
            <br /> and businesses.
          </p>
          <br />
          <br />
          <img src={DeliveryImage} alt="Deliver" />
        </div>

        <div id="Form-flex-ULogin">
          <h2 id="join">Welcome Back</h2>
          <br />

          <form
            id="User-form-ULogin"
            onSubmit={handleSubmit}
            className="sign-form"
          >
            <label className="requiredText">Phone Number{asterik}</label>
            <div className="delivery-location-input">
              <img src={Flag} alt="" className="flag-icon" />
              <span className="text-icon">+234</span>
              <input
                type="text"
                className="input-field phone-input"
                placeholder="Enter your Phone Number"
                name="phone_no"
                value={phone_no}
                onChange={onChange}
                // maxLength={10}
              />
            </div>
            <p className="error-style">{formErrors}</p>
            <p className="error-style">{dataError}</p>

            <p id="forgot" onClick={handleClick}>
              Forgot your Phone Number?
            </p>

            <br />
            <br />
            <div id="center-button">
              <Button name="Login" loading={loading} />
            </div>
          </form>

          <p id="accountAlready">
            Don't Have an account?{" "}
            <Link to="/join">
              <span id="loginSpan">Sign up</span>
            </Link>
          </p>
        </div>
        {/* <div className="message-text">{message ? <p>{message}</p> : null}</div> */}
      </div>
      <p id="agree-p">
        By clicking Login, you agree to our{" "}
        <Link to="/Termsandconditions" target="_blank">
          <span className="policy">Terms of Use </span>
        </Link>
        and our{" "}
        <Link to="/privacy" target="_blank">
          <span className="policy">Privacy Policy</span>
        </Link>
      </p>
      <div id="sign-in-button"></div>
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
                  Enter the OTP sent by SMS to {phone_no}
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
                      Resend Otp
                    </button>
                  )}

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
