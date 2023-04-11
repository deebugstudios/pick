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

export default function UpgradeV() {
  const asterik = <span id="asterik">*</span>;
  const location = useLocation();

  const [formData, setFormData] = useState({
    fleet_name: "",
    company_name: "",
    cac_reg_no: "",
  });
  const [formErrors, setFormErrors] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = location.state.token;
  const id = location.state.id;
  const agent = location.state.agent;

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // navigate("/account");

    const validate = (data) => {
      const errors = {};
      if (!data.fleet_name) {
        errors.fleet_name = "Enter the name of your Fleet";
      }
      if (!data.company_name) {
        errors.company_name = `Enter Your Company Name`;
      }
      if (!data.cac_reg_no) {
        errors.cac_reg_no = `Enter Your CAC Number`;
      }

      return errors;
    };
    setFormErrors(validate(formData));

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
      // console.log(data);

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
      // console.log(error);
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

          <p className="error-style bottom-marg">{formErrors.fleet_name}</p>
          {/* <br /> */}

          <label htmlFor="company_name">
            <span className="requiredText">Company Name{asterik}</span>
            <br />
            <input
              value={formData.company_name}
              type="text"
              className="form-field edit-field phone-input3"
              placeholder="Enter Your Company Name"
              name="company_name"
              onChange={handleChange}
            />
          </label>
          <p className="error-style bottom-marg">{formErrors.company_name}</p>
          {/* <br /> */}

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
          <p className="error-style bottom-marg">{formErrors.cac_reg_no}</p>
          {/* <br /> */}

          <div id="center-button">
            <Button name="Submit" loading={loading} />
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
}
