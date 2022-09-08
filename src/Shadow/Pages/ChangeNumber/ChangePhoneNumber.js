import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./changephonenumber.css";
import Flag from "../../../components/Images/Nigerian_flag.png";
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {auth} from "../../../utils/firebase"
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Popup2 } from "../../../components/javascript/Popup";
import DeliveryImage from "../../../components/Images/DeliveryImage.png";
import Button from "../../../components/javascript/Button";
import { RiderContext } from "../Contexts/RiderContext";



export default function ChangePhoneNumber() {
  const location = useLocation();
  const navigate = useNavigate();

    const value = useContext(RiderContext);
    const {token, riderdata} = value

  const [newNo, setNewNo] = useState("");
  const [newNoError, setNewNoError] = useState("");
  const [loading, setLoading] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [countDown, setCountDown] = useState(60)

  const handleChange = (e) => {
    setNewNo(e.target.value);
  };

const computedNumber = "+234" + newNo
useEffect(()=> {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("reCAPTCH working", response)
      }
    }, auth);
}, [computedNumber])

const appVerifier = window.recaptchaVerifier;

const handleChangePhoneNumber = (e) => {
    e.preventDefault()
    setLoading(true)
    signInWithPhoneNumber(auth, computedNumber, appVerifier)
    .then((confirmationResult) => {
    setLoading(false)
      setOpenModel(true)
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log(error.message)
      setLoading(false)
    });
}



const handleFinalSubmit = () => {
    const confirmationResult = window.confirmationResult
    confirmationResult.confirm(otpCode).then((result) => {
    // User signed in successfully.
    const user = result.user;
    console.log(result)
    handleSubmit()
    // ...
    }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    console.log(error.message)
    // ...
    });
    }



  const handleSubmit = async (e) => {
    setLoading(true)
    

    if (!newNo) {
      setNewNoError("Please enter a new Phone Number");
      setTimeout(()=> {
            setNewNoError("")
      }, 2000)
    }
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/change_phone_no",
        {
          method: "POST",

          body: JSON.stringify({
            token: token,
            old_phone_no: phone_no,
            new_phone_no: computedNumber,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        // setPopupButton(true);
        console.log(data)
        setLoading(false)
        navigate(-1);
      } else {
        // setMessage("Error occured");
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const slicedNum = riderdata?.phone_no;
const phone_no = slicedNum?.slice(4)
  return (
    <>
    <section className="shadow-change-bgc">
      <div className="shadow-change-number">
        <div className="shadow-no-text">Change Phone Number</div>
        <form className="shadow-info-form" onSubmit={handleChangePhoneNumber}>
          <label htmlFor="phonenumber">Exisiting phone number</label>
          <div className="shadow-info-div-1">
            <div className="delivery-location-input">
              <img src={Flag} alt="" className="flag-icon shadow-flag-top" />
              <span className="text-icon shadow-top">+234</span>
              <input
                name="phonenumber"
                value={location && phone_no}
                className="shadow-info-phone-input-4"
                disabled={true}
              />
            </div>
          </div>

          <label htmlFor="phonenumber">New phone number</label>
          <div className="shadow-info-div-1">
            <div className="delivery-location-input">
              <div>
                <img src={Flag} alt="" className="flag-icon shadow-flag-top" />
                <span className="text-icon shadow-top">+234</span>
                <input
                  name="phonenumber"
                  value={newNo}
                  onChange={handleChange}
                  className="shadow-info-phone-input-4"
                  maxLength={10}
                />
              </div>
              <p className="error-style">{newNoError}</p>
            </div>
          </div>
            <div id="sign-in-button"></div>
          <div className="shadow-btn-container">
          <button className="change-btn-otp" disabled={loading} >   {loading ? <ClipLoader color={"black"} loading={loading} size={30} />  :  "Save and update"} </button>
          </div>


        {openModel && <Popup2 trigger={openModel} setTrigger={setOpenModel}>
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
                  Enter the OTP sent by SMS to {computedNumber}
                </p>
                <div id="otpField">
                  <input
                    type="text"
                    maxLength={1}
                    name="one"
                    // value={otpValues.one}
                    // onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="two"
                    // value={otpValues.two}
                    // onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="three"
                    // value={otpValues.three}
                    // onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="four"
                    // value={otpValues.four}
                    // onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    name="five"
                    // value={otpValues.five}
                    // onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="six"
                    // value={otpValues.six}
                    // onChange={OtpChange}
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
        }



        </form>
      </div>
      </section>
    </>
  );
}
