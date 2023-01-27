import React from "react";
import Button from "../javascript/Button";
import { Head2 } from "../javascript/Head";
import Instant from "../Images/instant.png";
import Scheduled from "../Images/scheduled.png";
import "../css/deliverytype.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../Shadow/Pages/Contexts/RiderContext";
import { ClipLoader } from "react-spinners";

export default function DeliveryType() {
  const [member, setMember] = useState("instant");
  const [bgColor, setBgColor] = useState("rgba(31, 170, 8, 0.15)");
  const [secBg, setSecBg] = useState("");
  const [vehicle, setVehicle] = useState("bike");
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState({});

  const [user, setUser] = useState();
  const userValues = useContext(userContext);
  const { token } = userValues;
  const navigate = useNavigate();

  const handleCheck = (e) => {
    setVehicle(e.target.value);
  };

  const handleChange = (e) => {
    setMember(e.target.value);
    if (member === "instant") {
      setBgColor("white");
      setSecBg("rgba(31, 170, 8, 0.15)");
    } else if (member === "scheduled") {
      setBgColor("rgba(31, 170, 8, 0.15)");
      setSecBg("white");
    }
  };

  // const disabled = { bike: true, car: true, truck: false, van: true };
  const checkVehicles = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/stats/get_delivery_medium_states",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(token),
        }),
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      setLoading(false);
      setDisabled(data.active_delivery_mediums);
    }

    // console.log(data.active_delivery_mediums);
  };
  // const fetchDeliveryDetails = async () => {
  //   const res = await fetch(
  //     "https://ancient-wildwood-73926.herokuapp.com/stats/get_refund_percent",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         token: JSON.parse(token),
  //       }),
  //     }
  //   );
  //   const data = await res.json();

  //   console.log(data);
  // };

  useEffect(() => {
    checkVehicles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/user/userflow", { state: { vehicle: vehicle, member: member } });

    // console.log(user);
  };

  if (loading === true) {
    return (
      <div className="loader-screen">
        <ClipLoader color={"#1AA803"} loading={loading} size={100} />
        <p>Loading...</p>
      </div>
    );
  } else
    return (
      <>
        <div className="typeFlex">
          <div id="typeFlex">
            <form onSubmit={handleSubmit}>
              <h2>Select a Delivery Type</h2>
              <div id="signFlex-type" className="bottom-marg">
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
                      value="scheduled"
                      checked={member === "scheduled"}
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

              <h2 className="bottom-marg">Select a Delivery Medium</h2>
              {/* <br /> */}
              <div id="Radio-div" className="bottom-marg">
                <div id="Radio-div">
                  <input
                    type="radio"
                    value="bike"
                    name="Vehicle"
                    className="RadioV"
                    checked={vehicle === "bike"}
                    onChange={handleCheck}
                    disabled={disabled.bike === false}
                  />
                  <label htmlFor="Bike">
                    {" "}
                    <span className="vehicle-text">Bike</span>
                  </label>
                </div>

                <div id="Radio-div">
                  <input
                    type="radio"
                    value="car"
                    name="Vehicle"
                    className="RadioV"
                    checked={vehicle === "car"} //{true}
                    onChange={handleCheck}
                    disabled={disabled.car === false}
                    // disabled={true}
                  />
                  <label htmlFor="Car">
                    <span className="vehicle-text">Car</span>
                  </label>
                </div>

                <div id="Radio-div">
                  <input
                    type="radio"
                    value="van"
                    name="Vehicle"
                    className="RadioV"
                    checked={vehicle === "van"} //{true}
                    onChange={handleCheck}
                    disabled={disabled.van === false}
                    // disabled={true}
                  />
                  <label htmlFor="van">
                    {" "}
                    <span className="vehicle-text">Van</span>
                  </label>
                </div>

                <div id="Radio-div">
                  <input
                    type="radio"
                    value="truck"
                    name="Vehicle"
                    className="RadioV"
                    checked={vehicle === "truck"}
                    onChange={handleCheck}
                    disabled={disabled.truck === false}
                    id="truck"
                  />
                  <label htmlFor="Truck">
                    {" "}
                    <span className="vehicle-text">Truck</span>
                  </label>
                </div>
              </div>
              {/* <br /> */}

              <Button name="Next" />
            </form>
            <div id="ButtonDiv"></div>
          </div>
        </div>
      </>
    );
}
