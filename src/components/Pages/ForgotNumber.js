import React from "react";
import Head from "../javascript/Head";
import "../css/ForgotNumber.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Button from "../javascript/Button";
import Footer from "../javascript/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Mail from "../Images/mail.png";
import { useState } from "react";

export default function ForgotNumber() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const [error, setError] = useState("");
  const type = location.state.type;
  const asterik = <span id="asterik">*</span>;

  const handleSubmit = async (e) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    e.preventDefault();
    setLoadButton(true);
    if (email == "") {
      setError("Email must be filled");
      setLoadButton(false);
      return;
    } else if (!regex.test(email)) {
      setError("Enter a valid email");
      setLoadButton(false);
      return;
    } else {
      if (type == "user") {
        try {
          const res = await fetch(
            "https://ancient-wildwood-73926.herokuapp.com/user_auth/recover_account",
            {
              method: "POST",

              body: JSON.stringify({
                email: email,
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
            alert("Password reset email sent, please check your email");
            setLoadButton(false);
          } else {
            // setMessage("An Error occured");
            setLoadButton(false);
          }
        } catch (error) {
          setLoadButton(false);
          // setLoadOtp(false);
          // console.log(error);
          // const err = error
        }
      } else if (type == "agent") {
        try {
          const res = await fetch(
            "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/recover_account",
            {
              method: "POST",

              body: JSON.stringify({
                email: email,
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
            alert("Password reset email sent, please check your email");
            setLoadButton(false);
          } else {
            // setMessage("An Error occured");
            setLoadButton(false);
          }
        } catch (error) {
          setLoadButton(false);
          // setLoadOtp(false);
          // console.log(error);
          // const err = error
        }
      }
    }
  };
  return (
    <>
      <Head />
      <div className="mainBox">
        <div className="delivery-img-forgot" id="DeliveryImage">
          <p>
            Door to Door <span id="yellow">delivery</span>
            <br /> services for individuals
            <br /> and businesses.
          </p>
          <br />
          <br />
          <img src={DeliveryImage} alt="Deliver" />
        </div>

        <div id="Form-flex-forgot">
          <h2 className="side">Forgot Phone Number</h2>
          <br />
          <p className="side" id="side-p">
            Please enter the email associated with the
            <br className="break-ii" /> account you
            <br className="break-i" /> would like to recover. We will
            <br className="break-ii" /> send you recovery{" "}
            <br className="break-i" />
            instructions via the email.
          </p>
          <br />

          <form id="i2" className="sign-form" onSubmit={handleSubmit}>
            <label className="requiredText">Email{asterik}</label>
            <div className="delivery-location-input">
              <img src={Mail} alt="" className="mail-icon" />
              <input
                type="text"
                className="input-field phone-input2"
                placeholder="Enter your Email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>
            <p className="error-style">{error}</p>
            <br />

            <Button name="Submit" loading={loadButton} />
            <div id="center-button">
              <p id="accountAlready">
                Back to{" "}
                <span
                  id="loginSpan"
                  onClick={() =>
                    navigate(type == "user" ? "/welcome" : "/welcome-agent")
                  }
                  style={{ cursor: "pointer" }}
                >
                  Log in
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
