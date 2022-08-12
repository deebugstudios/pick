import React from "react";
import Button from "../javascript/Button";
import { Head2 } from "../javascript/Head";
import Instant from "../Images/instant.png";
import Scheduled from "../Images/scheduled.png";
import "../css/deliverytype.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DeliveryType() {
  const [member, setMember] = useState("instant");
  const [bgColor, setBgColor] = useState("rgba(31, 170, 8, 0.15)");
  const [secBg, setSecBg] = useState("");
  const [vehicle, setVehicle] = useState("bike");
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const handleCheck = (e) => {
    setVehicle(e.target.value);
  };

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
    navigate("/userflow", { state: { vehicle: vehicle, member: member } });

    // useEffect(() => {
    //   const loggedInUser = localStorage.getItem("id");
    //   if (loggedInUser) {
    //     const foundUser = loggedInUser;
    //     setUser(foundUser);
    //   }
    // }, []);

    console.log(user);
    // <Navigate to="/" />;
    // if (member === "instant") {
    //   navigate("/formuser");
    // } else if (member === "schedule") {
    //   navigate("/select-a", { state: { vehicle: vehicle } });
    // }
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
          <input
            type="radio"
            value="bike"
            name="Vehicle"
            className="RadioV"
            checked={vehicle === "bike"}
            onChange={handleCheck}
          />
          <label htmlFor="Bike">
            {" "}
            <span className="vehicle-text">Bike</span>
          </label>

          <input
            type="radio"
            value="van"
            name="Vehicle"
            className="RadioV"
            checked={vehicle === "van"}
            onChange={handleCheck}
          />
          <label htmlFor="van">
            {" "}
            <span className="vehicle-text">Van</span>
          </label>

          <input
            type="radio"
            value="truck"
            name="Vehicle"
            className="RadioV"
            checked={vehicle === "truck"}
            onChange={handleCheck}
          />
          <label htmlFor="Truck">
            {" "}
            <span className="vehicle-text">Truck</span>
          </label>

          <input
            type="radio"
            value="car"
            name="Vehicle"
            className="RadioV"
            checked={vehicle === "car"}
            onChange={handleCheck}
          />
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
