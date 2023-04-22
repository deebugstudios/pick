import React, { useState } from "react";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import ProgressMMM from "../Images/ProgressIII.png";
import "../css/vehicle.css";
import Vector from "../Images/Vector.png";
import Footer from "../javascript/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

export default function FleetVehicle() {
  const asterik = <span id="asterik">*</span>;
  const location = useLocation();

  const [formData, setFormData] = useState({
    fleet_name: "",
    company_name: "",
    cac_reg_no: "",
  });
  const [formErrors, setFormErrors] = useState("");
  const [fleetE, setFleetE] = useState("");
  const [cacE, setCacE] = useState("");
  const [comE, setComE] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = location.state.token;
  const id = location.state.id;
  const agent = location.state.agent;

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
    setCacE("");
    setFleetE("");
    setComE("");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(id);
    // console.log(token);
    // console.log(formData.fleet_name);
    // navigate("/account");

    if (formData.fleet_name === "") {
      setFleetE("Enter the name of your Fleet");
      setLoading(false);
      return;
    } else if (formData.company_name !== "" && formData.cac_reg_no == "") {
      setCacE("Enter Your CAC Number");
      setLoading(false);
      return;
    } else if (
      formData.company_name !== "" &&
      formData.company_name.length < 2
    ) {
      setComE("Too small");
      setLoading(false);
      return;
    } else if (formData.fleet_name.length < 2) {
      setFleetE("Too small");
      setLoading(false);
      return;
    } else
      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/signup_stage_three",
          {
            method: "POST",

            body: JSON.stringify({
              _id: id,
              token: token,
              fleet_name: formData.fleet_name,
              company_name: formData.company_name,
              cac_reg_no: formData.cac_reg_no,
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
          data.msg ===
          `Fleet manager account with fleet name "${formData.fleet_name}" already exists`
        ) {
          setFleetE(data.msg);
        }
        if (res.status === 200) {
          // setMessage("User created successfully");
          navigate("/account", {
            state: { id: id, token: token },
          });
        } else {
          setMessage("Error occured");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
  };

  return (
    <>
      <Head />
      <div id="mainsign">
        <h2>Join Pickload as an Individual Delivery agent</h2>
        <br />
        <div>
          <img src={ProgressMMM} alt="Progress" />
        </div>
        <br />
        <br />

        <form onSubmit={handleSubmit} className="sign-form">
          <label className="requiredText" htmlFor="fleet_name">
            Fleet Name{asterik}
          </label>
          <input
            value={formData.fleet_name}
            type="text"
            className="form-field edit-field phone-input3"
            placeholder="Enter Your Fleet Name"
            name="fleet_name"
            onChange={handleChange}
          />

          <p className="error-style bottom-marg">{fleetE}</p>
          {/* <br /> */}

          <label htmlFor="company_name">
            <span className="requiredText">Company Name</span>
            <br />
            <input
              value={formData.company_name}
              type="text"
              className="form-field edit-field phone-input3"
              placeholder="Enter Your Company Name"
              name="company_name"
              min={2}
              onChange={handleChange}
            />
          </label>
          <p className="error-style bottom-marg">{comE}</p>
          {/* <br /> */}

          {formData.company_name.length > 0 ? (
            <>
              <label htmlFor="cac_reg_no">
                <span className="requiredText">CAC Number{asterik}</span>
                <br />
                <input
                  value={formData.cac_reg_no}
                  type="text"
                  className="form-field edit-field phone-input3"
                  placeholder="Enter Your CAC Number"
                  name="cac_reg_no"
                  onChange={handleChange}
                />
              </label>
              <p className="error-style bottom-marg">{cacE}</p>
            </>
          ) : null}

          <div id="center-button">
            <Button name="Submit" loading={loading} />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
