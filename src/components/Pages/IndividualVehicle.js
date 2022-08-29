import React, { useState } from "react";
import Button from "../javascript/Button";
import Head from "../javascript/Head";
import ProgressMMM from "../Images/ProgressIII.png";
import "../css/vehicle.css";
import Vector from "../Images/Vector.png";
import Footer from "../javascript/Footer";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function IndividualVehicle() {
  const asterik = <span id="asterik">*</span>;
  const location = useLocation();

  const token = location.state.token;
  const id = location.state.id;
  const agent = location.state.agent;

  // console.log(id);

  const [formData, setFormData] = useState({
    fleet_id: "",
    color: "",
    vehicle_name: "",
    plate_no: "",
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

  const handleFullPicture = (files) => {
    const picUploaded = [...fullPicture];
    let limitExceeded = false;
    files.some((file) => {
      if (picUploaded.findIndex((f) => f.name === file.name) === -1) {
        picUploaded.push(file);
        if (picUploaded.length === 1) setFileLimit(true);
        if (picUploaded.length > 1) {
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setFullPicture(picUploaded);
  };

  const handleFullPictureE = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFullPicture(chosenFiles);
  };

  const handleLicense = (files) => {
    const picUploaded = [...license];
    let limitExceeded = false;
    files.some((file) => {
      if (picUploaded.findIndex((f) => f.name === file.name) === -1) {
        picUploaded.push(file);
        if (picUploaded.length === 2) setFileLimit2(true);
        if (picUploaded.length > 2) {
          setFileLimit2(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setLicense(picUploaded);
  };

  const handleLicenseE = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleLicense(chosenFiles);
  };

  const handleVehicleImage = (files) => {
    const picUploaded = [...vehicleImage];
    let limitExceeded = false;
    files.some((file) => {
      if (picUploaded.findIndex((f) => f.name === file.name) === -1) {
        picUploaded.push(file);
        if (picUploaded.length === 5) setFileLimit3(true);
        if (picUploaded.length > 5) {
          setFileLimit3(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setVehicleImage(picUploaded);
  };

  const handleVehicleImageE = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleVehicleImage(chosenFiles);
  };

  const handleDate = (e) => {
    const newDate = dayjs(e.target.value).format("YYYY-MM-DD");
    setExpiry(newDate);
  };
  const expiry_date = dayjs(expiry).format("DD-MM-YYYY").toString();

  const handleRadio = (e) => {
    setType(e.target.value);
  };

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const formImage = [fullPicture, license, vehicleImage];

    e.preventDefault();
    // navigate("/account");

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

      if (!data.color) {
        errors.color = `Enter Your ${type} Color`;
      }
      if (!data.vehicle_name) {
        errors.vehicle_name = `Enter The Name of Your ${type} Manufacturer`;
      }
      if (!data.plate_no) {
        errors.plate_no = `Enter Your ${type} Plate Number`;
      }

      return errors;
    };
    setFormErrors(validate(formData));

    const bodyFormData = new FormData();
    bodyFormData.append("_id", id);
    bodyFormData.append("token", token);
    bodyFormData.append("fleet_manager_code", formData.fleet_id);
    bodyFormData.append("color", formData.color);
    bodyFormData.append("vehicle_name", formData.vehicle_name);
    bodyFormData.append("vehicle_type", type);
    bodyFormData.append("plate_no", formData.plate_no);
    bodyFormData.append("vehicle_details_imgs", formImage);
    bodyFormData.append("driver_license_expiry_date", expiry_date);

    // bodyFormData.append("delivery_agent_type", agent);

    // console.log(bodyFormData.json());
    // console.log(formImage);
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
          navigate("/account", { state: { id: id, token: token } });
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
          <label className="requiredText">
            Fleet ID{" "}
            <span className="Upload" id="uploadText-2">
              (Fill this only if you are under a Fleet Manager and a code has
              been given
              <br />
              to you)
            </span>{" "}
          </label>
          <input
            value={formData.fleet_id}
            type="text"
            className="form-field edit-field phone-input3"
            placeholder="Enter Your Fleet ID"
            name="fleet_id"
            onChange={handleChange}
          />
          <br />

          <p className="requiredText">
            {asterik} Please select the delivery medium you want to register
            <br />
          </p>

          <section className="Radio" id="Radio-1">
            <input
              type="radio"
              value="bike"
              name="Vehicle"
              className="RadioV"
              checked={type === "bike"}
              onChange={handleRadio}
            />
            <label htmlFor="bike">
              {" "}
              <span className="vehicle-text">Bike</span>
            </label>

            <input
              type="radio"
              value="van"
              checked={type === "van"}
              name="Vehicle"
              className="RadioV"
              onChange={handleRadio}
            />
            <label htmlFor="van">
              {" "}
              <span className="vehicle-text">Van</span>
            </label>
          </section>
          <br />

          <section className="Radio" id="Radio-2">
            <input
              type="radio"
              value="car"
              checked={type === "car"}
              name="Vehicle"
              className="RadioV"
              onChange={handleRadio}
            />
            <label htmlFor="car">
              <span className="vehicle-text">Car</span>
            </label>

            <input
              type="radio"
              value="truck"
              name="Vehicle"
              checked={type === "truck"}
              className="RadioV"
              id="truck-rad"
              onChange={handleRadio}
            />
            <label htmlFor="truck">
              {" "}
              <span className="vehicle-text">Truck</span>
            </label>
          </section>
          <br />

          <p>{type.toLocaleUpperCase()}</p>
          <br />

          <label htmlFor="Manufacturer">
            <span className="requiredText">
              Name of Manufacturer and model/ Type
            </span>
            <br />
            <input
              value={formData.vehicle_name}
              type="text"
              className="form-field edit-field phone-input3"
              placeholder="Eg Toyota Corolla"
              name="vehicle_name"
              onChange={handleChange}
            />
          </label>
          <p className="error-style">{formErrors.vehicle_name}</p>
          <br />

          <label htmlFor="Color">
            <span className="requiredText">Vehicle color</span>
            <br />
            <input
              value={formData.color}
              type="text"
              className="form-field edit-field phone-input3"
              placeholder="Eg Red"
              name="color"
              onChange={handleChange}
            />
          </label>
          <p className="error-style">{formErrors.color}</p>
          <br />

          <label htmlFor="Vehicle Plate Number">
            <span className="requiredText">Vehicle Plate Number</span>
            <br />
            <input
              value={formData.plate_no}
              type="text"
              className="form-field edit-field phone-input3"
              placeholder="Eg LST 678KJ"
              name="plate_no"
              onChange={handleChange}
            />
          </label>
          <p className="error-style">{formErrors.plate_no}</p>
          <br />

          <label htmlFor="license-expiry">
            <span className="requiredText">Drivers license expiry date</span>
            <br />
            <input
              value={expiry}
              type="date"
              className="date-field"
              placeholder="Pick Date"
              name="license-expiry"
              onChange={handleDate}
            />
          </label>
          <p className="error-style">{noDate}</p>
          <br />

          <div className="uploadFlex">
            <div className="uploadPad">
              <legend className="requiredText">
                {asterik} Upload Your Driver's License{" "}
                <span className="Upload" id="uploadText">
                  N/B: Front and Back Image.
                </span>
              </legend>
              <br />

              <section>
                <div className="Upload" id="vector">
                  <label>
                    <img src={Vector} alt="Vector" />
                    <input
                      onChange={handleLicenseE}
                      type="file"
                      multiple
                      accept=".png, .jpg, .jpeg, .gif"
                      name="license"
                      disabled={fileLimit2}
                    />
                  </label>
                </div>
                <div>
                  {license.map((file) => (
                    <div className="img_name">{file.name}</div>
                  ))}
                </div>
                <p className="error-style">{image2Errors}</p>
              </section>
              <br />
            </div>

            <div className="uploadPad" id="pad-vec">
              <legend className="requiredText">
                {asterik} Upload an image of your Vehicle showing your plate
                number
                <br />
                <span className="Upload" id="uploadText">
                  N/B: Max of 5 images allowed.
                </span>
              </legend>
              <br />

              <section>
                <div className="Upload" id="vector">
                  <label>
                    <img src={Vector} alt="Vector" />
                    <input
                      onChange={handleVehicleImageE}
                      type="file"
                      multiple
                      accept=".png, .jpg, .jpeg, .gif"
                      name="vehicleImage"
                      disabled={fileLimit3}
                    />
                  </label>
                </div>
                <div>
                  {vehicleImage.map((file) => (
                    <div className="img_name">{file.name}</div>
                  ))}
                </div>
                <p className="error-style">{image3Errors}</p>
              </section>
            </div>
          </div>

          <div id="center-button">
            <Button name="Submit" />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

// Abia',
//     'Abuja',
//     'Adamawa',
//     'Akwa Ibom',
//     'Anambra',
//     'Bauchi',
//     'Bayelsa',
//     'Benue',
//     'Borno',
//     'Cross River',
//     'Delta',
//     'Ebonyi',
//     'Edo',
//     'Ekiti',
//     'Enugu',
//     'Gombe',
//     'Imo',
//     'Jigawa',
//     'Kaduna',
//     'Kano',
//     'Katsina',
//     'Kebbi',
//     'Kogi',
//     'Kwara',
//     'Lagos',
//     'Nasarawa',
//     'Niger',
//     'Ogun',
//     'Ondo',
//     'Osun',
//     'Oyo',
//     'Plateau',
//     'Rivers',
//     'Sokoto',
//     'Taraba',
//     'Yobe',
//     'Zamfara',
