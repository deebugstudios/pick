import React, { useState, useContext, useEffect } from "react";
import "../css/signup.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import "../css/WelcomeUser.css";
import Footer from "../javascript/Footer";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Shadow/Pages/Contexts/RiderContext";
import Flag from "../Images/Nigerian_flag.png";
import { auth } from "../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { OTP3 } from "../javascript/OTP";
import "../css/otp.css";
import { async } from "@firebase/util";

export default function WelcomeUser(props) {
  const asterik = <span id="asterik">*</span>;

  const [phone_no, setPhone_no] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [dataError, setDataError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

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
      // setId();
      // setToken(data.token);
      // idU = data.token;

      // console.log(data);
      if (data.msg === `No user with phone no: ${phone_no} found`) {
        setDataError(data.msg);
      } else if (data.msg === "User not active") {
        setDataError(data.msg);
      }

      if (res.status === 200) {
        setMessage("User created successfully");
        // localStorage.setItem("id", data.user._id);
        console.log(data);
        setLoading(false);
        navigate("/user/type");
        // console.log(idU);
      } else {
        setLoading(false);
        setMessage("An Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  // const value = useContext(userContext);
  // const {
  //   handleLoginSubmit,
  //   message,
  //   phone_no,
  //   setPhone_no,
  //   setMessage,
  //   token,
  // } = value;

  const onChange = (e) => {
    setPhone_no(e.target.value);
  };

  const handleClick = () => {
    navigate("/forgot");
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
            <div id="center-button">
              <Button name="Login" />
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
      <Footer />
    </>
  );
}

export function WelcomeAgent() {
  const asterik = <span id="asterik">*</span>;

  const navigate = useNavigate();
  const [phone_no, setPhone_no] = useState("");
  // const [newNumber, setNewNumber] = ("")
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [dataError, setDataError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [otp, setOtp] = useState(new Array(6).fill(""))
  const [otp, setOtp] = useState("");
  // const [isOtp, setIsOtp] = useState(false)
  const [countDown, setCountDown] = useState(45);

  //   React.useEffect( () => {
  //     const update = () => {
  //         setCountDown((prev)=> prev - 1);
  //         if(countDown=== 0){
  //           return false
  //         }
  //     }

  //     const interval = setInterval(update, 1000);

  //     return () => clearInterval(interval);
  // }, []);

  const onChange = (e) => {
    setPhone_no(e.target.value);
  };

  const generate = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: (response) => {
            console.log(response);
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
  };

  useEffect(() => {
    generate();
    return () => generate();
  }, []);

  const appVerifier = window.recaptchaVerifier;

  console.log(appVerifier);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const number = "+234" + [phone_no];

    if (!phone_no) {
      setFormErrors("Phone Number must be filled!");
    } else setFormErrors("");

    try {
      setLoading(true);
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/login",
        {
          method: "POST",

          body: JSON.stringify({
            phone_no: number,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.msg == "Account not active or delivery agent does not exist") {
        setLoading(false);
        setDataError(data.msg);
        setTimeout(() => {
          setDataError("");
        }, 4000);
      }

      if (res.status === 200) {
        signInWithPhoneNumber(auth, number, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            // ...
            // setIsOtp(true)
            setLoading(false);
            console.log("auth sent");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
        console.log(data);

        localStorage.setItem("rubbish", JSON.stringify(data?.token));
        //  localStorage.setItem("id", JSON.stringify(data?.delivery_agent_id))
        setMessage("User created successfully");
        setLoading(false);
        // navigate("/deliveryhistory");
        // window.location.reload(true)
      } else {
        setMessage("An Error occured");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalSubmit = () => {
    let computedNum = otp;

    try {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(computedNum)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          // ...
          console.log("worked");
          navigate("/deliveryhistory");
          console.log(user);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...

          console.log("error");
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // const handleOtp = (event)=> {
  //   event.preventDefault()

  // }
  console.log(otp);

  const handleClick = (e) => {
    navigate("/forgot");
  };

  return (
    <>
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
                  maxLength={10}
                  value={phone_no}
                  onChange={onChange}
                  // maxLength={10}
                />
                <input type="text" onChange={(e) => setOtp(e.target.value)} />
              </div>
              <span>{message}</span>
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
            <button onClick={handleFinalSubmit}>run</button>
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
      </>
    </>
  );
}
