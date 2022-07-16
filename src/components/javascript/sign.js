import React, { useState } from "react";
import "../css/signup.css";
// import Select from "../Images/Select.png";
// import Selected from "../Images/SelectedTab.png";
import Button from "./Button";
import DeliveryImage from "../Images/DeliveryImage.png";
import Head from "./Head";
import Footer from "./Footer";
// import { Link } from "react-router-dom";
// import UserForm from "../Pages/UserForm";
// import SignupDelivery from "../Pages/SignupDelivery";
import { useNavigate } from "react-router-dom";

export default function Sign(props) {
  const [member, setMember] = useState(props.val);
  const [bgColor, setBgColor] = useState("rgba(31, 170, 8, 0.15)");
  const [secBg, setSecBg] = useState("");
  // const [check, setCheck] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMember(e.target.value);
    if (member === props.val) {
      setBgColor("white");
      setSecBg("rgba(31, 170, 8, 0.15)");

      // setCheck(true);
    } else if (member === props.val2) {
      setBgColor("rgba(31, 170, 8, 0.15)");
      setSecBg("white");

      // setCheck(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate("/sign");
    // <Navigate to="/" />;
    if (member === props.val) {
      navigate(props.link);
    } else if (member === props.val2) {
      navigate(props.link2);
    }
  };

  return (
    <>
      <Head />
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

        <div className="joinBox">
          <h2 id="join">{props.title}</h2>

          <form onSubmit={handleSubmit} className="sign-form">
            <div id="signFlex">
              <label htmlFor="select">
                <div
                  className="sign"
                  id="signUser"
                  style={{ backgroundColor: bgColor }}
                >
                  {/* <img
                id="selected"
                className="choose"
                src={Selected}
                alt="choose"
              /> */}

                  <input
                    id="select"
                    className="choose"
                    type="radio"
                    // name="choose"
                    value={props.val}
                    checked={member === props.val}
                    onChange={handleChange}
                  />
                  <div>
                    <img id="user_img" src={props.imageJoin} alt="User" />
                  </div>
                  <p>
                    {props.joinAs} <br /> {props.joinAs2}
                  </p>
                </div>
              </label>

              <label htmlFor="sel">
                <div
                  className="sign"
                  id="signRider"
                  style={{ backgroundColor: secBg }}
                >
                  {/* <img id="select" className="choose" src={Select} alt="choose" /> */}
                  <input
                    id="sel"
                    className="choose"
                    type="radio"
                    // name="choose"
                    value={props.val2}
                    checked={member === props.val2}
                    onChange={handleChange}
                  />
                  <div>
                    <img id="rider_img" src={props.imageJoin2} alt="Rider" />
                  </div>
                  <p>{props.secondAs}</p>
                </div>
              </label>
            </div>

            <div id="center-button">
              <Button name={props.name} type="submit" />

              <p id="accountAlready">
                Already Have an account? <span id="loginSpan">Log in</span>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
