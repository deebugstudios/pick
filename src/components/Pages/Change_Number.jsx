import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Login_Header from "../../pages/logout/Login_Header";
import "../css/change_number.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Nigerianflag from "../Images/Nigerian_flag.png";
import Flag from "../Images/Nigerian_flag.png";
import Button from "../javascript/Button";
import Arrow from "../Images/Arrow.png";
import Popup from "../javascript/Popup";
import { auth } from "../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Popup2 } from "../javascript/Popup";
import { userContext } from "../../Shadow/Pages/Contexts/RiderContext";

export default function Change_Number() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loadOtp, setLoadOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [countDown, setCountDown] = useState(180);
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [newNo, setNewNo] = useState("");
  const [newNoError, setNewNoError] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const [loadMessage, setLoadMessage] = useState("");
  const [dataError, setDataError] = useState("");
  const userValues = useContext(userContext);
  const phone_no = location.state.phone;
  const email = sessionStorage.getItem("pickload_userEmail");
  const { token, userId } = userValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const number = "+234" + [newNo];
    if (!newNo) {
      setNewNoError("Please enter a new Phone Number");
      return;
    } else if (newNo?.length < 10) {
      setNewNoError("Please enter a valid Phone Number");
      return;
    } else
      try {
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
        console.log(email, phone_no)
        const res1 = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/user_auth/send_otp",
          {
            method: "POST",
  
            body: JSON.stringify({
              phone_no: "+234" + phone_no,
              email: email
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
          const number = "+234" + [phone_no];
  
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

    // const appVerifier = window.recaptchaVerifier;
    // // console.log(appVerifier);

    // setLoadOtp(true);
    // const interval = setInterval(() => {
    //   setCountDown((countDown) => countDown - 1);
    // }, 1000);
    // if (countDown === 0) {
    //   clearInterval(interval);
    // }
    // signInWithPhoneNumber(auth, number, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult;
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoadMessage("An Error Occured");
    //     console.log(error);
    //     setLoading(false);
    //   });
  };

  const handleFinalSubmit = async () => {
    setLoadButton(true);
    const computedNum = otpValues.join("");

    try {
      // let confirmationResult = window.confirmationResult;
      // confirmationResult
      //   .confirm(computedNum)
      //   .then(async (result) => {
      //     const user = result.user;
      //     // ...
      //     console.log("worked");

      //     // e.preventDefault();
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
          console.log("worked");

          try {
            const res = await fetch(
              "https://ancient-wildwood-73926.herokuapp.com/user_auth/change_phone_no",
              {
                method: "POST",

                body: JSON.stringify({
                  token: JSON.parse(token),
                  old_phone_no: phone_no,
                  new_phone_no: newNo,
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
              sessionStorage.setItem(
                "pickload_userNumber",
                JSON.stringify(data?.phone_no)
              );
              setMessage("Number changed successfully");
              navigate("/user/user-profile");
              setLoadOtp(false);
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
        } else {
        setLoadButton(false);
        setLoadMessage("Incorrect OTP");
      }
    } catch (err) {
      // console.log(err);
      setLoadMessage("An Error Occured");
    }
  };

  const handleChange = (e) => {
    setNewNo(e.target.value);
    setNewNoError("");
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

  const resend = () => {
    setCountDown(60);

    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    const number = "+234" + [newNo];

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

  function handleKeyDown(event) {
    const inputValue = event.target.value;
    const isBackspaceOrDelete =
      event.key === "Backspace" || event.key === "Delete";
    if (inputValue.length >= 10 && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="change_no">
        <div
          id="number-arrow-div"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={Arrow} alt="" />
        </div>

        <div className="change_no-text">Change Phone Number</div>
        <div className="nedu-form-profile">
          <form id="user-info-form" onSubmit={handleSubmit}>
            <label htmlFor="phonenumber">Exisiting phone number</label>
            <div className="nedu-info-div bottom-marg">
              <div className="delivery-location-input">
                <img src={Flag} alt="" className="flag-icon" />
                <span className="text-icon">+234</span>
                <div className="user-info-div">
                  <input
                    name="phonenumber"
                    value={phone_no}
                    className="phone-input nedu-info-div"
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            <label htmlFor="phonenumber">New phone number</label>
            <div className="nedu-info-div bottom-marg">
              <div className="delivery-location-input">
                <img src={Flag} alt="" className="flag-icon" />
                <span className="text-icon">+234</span>
                <div className="user-info-div">
                  <input
                    name="phonenumber"
                    value={newNo}
                    onChange={handleChange}
                    className="phone-input nedu-info-div"
                    type="number"
                    // pattern=""
                    onKeyDown={handleKeyDown}
                    // max={10}
                  />
                </div>
              </div>
              <p className="error-style">{newNoError}</p>
            </div>

            <div id="center-button-1">
              <Button name="Save and update" />
            </div>
          </form>
          <div id="recaptcha-container"></div>
        </div>
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
                    Enter the OTP sent by SMS to 0{newNo}
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
                        Resend Otp
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
      </div>
    </>
  );
}
