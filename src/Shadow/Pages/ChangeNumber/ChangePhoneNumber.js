import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./changephonenumber.css";
import Flag from "../../../components/Images/Nigerian_flag.png";
import Arrow from "../../../components/Images/Arrow.png";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Popup2 } from "../../../components/javascript/Popup";
import DeliveryImage from "../../../components/Images/DeliveryImage.png";
import Button from "../../../components/javascript/Button";
import { RiderContext } from "../Contexts/RiderContext";

export default function ChangePhoneNumber() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone_no = location.state.oldPhoneNumber;

  const value = useContext(RiderContext);
  const { token, riderdata } = value;

  const [countDown, setCountDown] = useState(60);
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const [newNo, setNewNo] = useState("");
  const [message, setMessage] = useState("");
  const [newNoError, setNewNoError] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const [loadMessage, setLoadMessage] = useState("");
  const [dataError, setDataError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loadOtp, setLoadOtp] = useState(false);

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
        setMessage("An error occured, please try again");
        // console.log(err);
      }

    const appVerifier = window.recaptchaVerifier;
    // console.log(appVerifier);

    setLoadOtp(true);
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
        setLoadMessage("An Error Occured");
        console.log(error);
        setLoading(false);
      });
  };

  const handleFinalSubmit = async () => {
    setLoadButton(true);
    // console.log(`+234${newNo}`, JSON.parse(token), phone_no);
    const computedNum = otpValues.join("");

    try {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(computedNum)
        .then(async (result) => {
          const user = result.user;
          // ...
          // console.log("worked");

          // e.preventDefault();

          try {
            const res = await fetch(
              "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/change_phone_no",
              {
                method: "POST",

                body: JSON.stringify({
                  token: JSON.parse(token),
                  old_phone_no: phone_no,
                  phone_no: `+234${newNo}`,
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
              setMessage("Number changed successfully");
              navigate("/user/agent-profile");
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
        })
        .catch((error) => {
          setLoadButton(false);
          setLoadMessage("Incorrect OTP");
          alert("Change of phone number failed. Try again.");
          // console.log("error");
        });
    } catch (err) {
      // console.log(err);
      setLoadMessage("An Error Occured");
      alert("Change of phone number failed. Try again.");
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
    <div style={{ backgroundColor: "white", height: "90vh", margin: "0 10px" }}>
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
                    value={phone_no?.slice(4)}
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
                    onKeyDown={handleKeyDown}
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
    </div>
  );
}
