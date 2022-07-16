import React from "react";
import Button from "../javascript/Button";
import { Head2 } from "../javascript/Head";
import Instant from "../Images/instant.png";
import Scheduled from "../Images/scheduled.png";
import "../css/deliverytype.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DeliveryType() {
  const [member, setMember] = useState("instant");
  const [bgColor, setBgColor] = useState("rgba(31, 170, 8, 0.15)");
  const [secBg, setSecBg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMember(e.target.value);
    if (member === "instant") {
      setBgColor("white");
      setSecBg("rgba(31, 170, 8, 0.15)");
    } else if (member === "schedule") {
      setBgColor("rgba(31, 170, 8, 0.15)");
      setSecBg("white");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate("/sign");
    // <Navigate to="/" />;
    if (member === "instant") {
      navigate("/formuser");
    } else if (member === "schedule") {
      navigate("/select-a");
    }
  };

  return (
    <>
      <Head2 />
      <form id="typeFlex" onSubmit={handleSubmit}>
        <h2>Select a Delivery Type</h2>
        <div id="signFlex">
          <label htmlFor="select">
            <div
              className="sign type"
              id="signUser"
              style={{ backgroundColor: bgColor }}
            >
              <input
                id="select"
                className="choose"
                type="radio"
                name="choose"
                value="instant"
                checked={member === "instant"}
                onChange={handleChange}
              />
              <div>
                <img id="user_img" src={Instant} alt="User" />
              </div>
              <br />
              <p>Instant Delivery</p>
            </div>
          </label>

          <label htmlFor="sel">
            <div
              className="sign type"
              id="signRider"
              style={{ backgroundColor: secBg }}
            >
              <input
                id="sel"
                className="choose"
                type="radio"
                name="choose"
                value="schedule"
                checked={member === "schedule"}
                onChange={handleChange}
              />
              <div>
                <img id="rider_img" src={Scheduled} alt="Rider" />
              </div>
              <br />
              <p>Scheduled Delivery</p>
            </div>
          </label>
        </div>

        <h2>Select a Delivery Medium</h2>
        <br />
        <div id="Radio-div">
          <input type="radio" value="Bike" name="Vehicle" className="RadioV" />
          <label htmlFor="Bike">
            {" "}
            <span className="vehicle-text">Bike</span>
          </label>

          <input type="radio" value="Bus" name="Vehicle" className="RadioV" />
          <label htmlFor="Bus">
            {" "}
            <span className="vehicle-text">Bus</span>
          </label>

          <input type="radio" value="Truck" name="Vehicle" className="RadioV" />
          <label htmlFor="Truck">
            {" "}
            <span className="vehicle-text">Truck</span>
          </label>

          <input type="radio" value="Car" name="Vehicle" className="RadioV" />
          <label htmlFor="Car">
            <span className="vehicle-text">Car</span>
          </label>
        </div>
        <br />

        <Button name="Next" />
      </form>
      <div id="ButtonDiv"></div>
    </>
  );
}
