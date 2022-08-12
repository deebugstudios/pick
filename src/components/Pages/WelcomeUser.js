import React, { useState, useContext, useId } from "react";
import "../css/signup.css";
import DeliveryImage from "../Images/DeliveryImage.png";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import "../css/WelcomeUser.css";
import Footer from "../javascript/Footer";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Shadow/Pages/Contexts/RiderContext";

export default function WelcomeUser(props) {
  const asterik = <span id="asterik">*</span>;

  const [phone_no, setPhone_no] = useState("");
  const [message, setMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://guarded-falls-60982.herokuapp.com/user_auth/login",
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

      if (res.status === 200) {
        setMessage("User created successfully");
        localStorage.setItem("id", data.user._id);
        navigate("/type");
        // console.log(idU);
      } else {
        setMessage("Error occured");
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
            <input
              type="text"
              className="input-field phone-input2"
              placeholder="Enter your Phone Number"
              name="phone_no"
              value={phone_no}
              onChange={onChange}
            />

            <p id="forgot" onClick={handleClick}>
              Forgot your Phone Number?
            </p>

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
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setPhone_no(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://guarded-falls-60982.herokuapp.com/delivery_agent_auth/login",
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

      if (res.status === 200) {
        setMessage("User created successfully");
        navigate("/Deliveryrequest");
      } else {
        setMessage("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
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
            onSubmit={handleSubmit}
            className="sign-form"
          >
            <label className="requiredText">Phone Number{asterik}</label>
            <input
              type="text"
              className="input-field phone-input2"
              placeholder="Enter your Phone Number"
              name="phone_no"
              value={phone_no}
              onChange={onChange}
            />

            <p id="forgot" onClick={handleClick}>
              Forgot your Phone Number?
            </p>

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
