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
  const [type, setType] = useState("bike");
  const [expiry, setExpiry] = useState("");
  const [fullPicture, setFullPicture] = useState([]);
  const [license, setLicense] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [fileLimit2, setFileLimit2] = useState(false);
  const [fileLimit3, setFileLimit3] = useState(false);
  const [vehicleImage, setVehicleImage] = useState([]);
  const [formErrors, setFormErrors] = useState("");
  const [noDate, setNoDate] = useState("");
  const [image1Errors, setImage1Errors] = useState("");
  const [image2Errors, setImage2Errors] = useState("");
  const [image3Errors, setImage3Errors] = useState("");
  const [dataError, setDataError] = useState("");
  const [message, setMessage] = useState("");
  const token = location.state.token;
  const id = location.state.id;
  const agent = location.state.agent;

  const handleDate = (e) => {
    const newDate = dayjs(e.target.value).format("YYYY-MM-DD");
    setExpiry(newDate);
  };
  let expiry_date = dayjs(expiry).format("DD-MM-YYYY").toString();

  const handleRadio = (e) => {
    setType(e.target.value);
  };

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const formImages = [fullPicture, license, vehicleImage];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate("/account");
    if (fullPicture.length === 0) {
      setImage1Errors(`Upload Your Photo/Passport`);
    } else setImage1Errors("");
    if (license.length === 0) {
      setImage2Errors(`Upload Photo of Your Driver's License`);
    } else setImage2Errors("");
    if (vehicleImage.length === 0) {
      setImage3Errors(`Upload Image(s) of Your Vehicle`);
    } else setImage3Errors("");

    if (!expiry) {
      setNoDate(`Select Your Driver's License Expiry Date`);
    } else setNoDate("");

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

    const bodyFormData = new FormData();
    bodyFormData.append("_id", id);
    bodyFormData.append("token", token);
    bodyFormData.append("fleet_name", formData.fleet_name);
    bodyFormData.append("company_name", formData.company_name);
    bodyFormData.append("cac_reg_no", formData.cac_reg_no);

    axios
      .post(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/signup_stage_three",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/account", {
            state: { id: id, token: token },
          });
          // navigate(props.link);
        } else {
          setMessage("Error occured");
        }

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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

          <p className="error-style">{formErrors.fleet_name}</p>
          <br />

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
          <p className="error-style">{formErrors.company_name}</p>
          <br />

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
          <p className="error-style">{formErrors.cac_reg_no}</p>
          <br />

          <div id="center-button">
            <Button name="Submit" />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
