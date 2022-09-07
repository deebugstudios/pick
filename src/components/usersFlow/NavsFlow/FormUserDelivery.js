import React, { useState, useEffect, useContext } from "react";
import Button from "../../javascript/Button";
import "../../css/Personal.css";
import Vector from "../../Images/Vector.png";
import FormProgress from "../../Images/FormProgress.png";
import "../../css/userflowform.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Flag from "../../Images/Nigerian_flag.png";
import axios from "axios";
import { FindingDeliveriesUser } from "../../../Shadow/Pages/FindingDeliveries/FindingDeliveries";
import {
  collection,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";

export default function FormUserDelivery() {
  const navigate = useNavigate();
  const location = useLocation();
  const senderName = location.state.senderName;
  const number = location.state.number;
  const email = location.state.email;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [fileError, setFileError] = useState("");
  const [fireData, setFireData] = useState({});
  // const [userDetails, setUserDetails] = useState([]);
  const [parcelType, setParcelType] = useState("fragile");
  const [status, setStatus] = useState(null);
  const [name, setName] = useState("");
  // const [fileLimit, setFileLimit] = useState(false);
  const [deliveryFiles, setDeliveryFiles] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [fileLimit, setFileLimit] = useState(false);
  const [formData, setFormData] = useState({
    fullname: senderName,
    phone_no: number,
    reciever_phone_no: "",
    reciever_name: "",
    parcel_name: "",
    parcel_description: 1,
  });

  const handleInstructions = (e) => {
    setInstructions(e.target.value);
  };

  const vehicle = location.state.vehicle;
  const distance = location.state.distance;
  const pickupLocation = location.state.pickupLocation;
  const pickupState = location.state.pickupState;
  const dropOffLocation = location.state.dropOffLocation;
  const delivery_cost = location.state.price;
  const member = location.state.member;
  const pickup_address = location.state.pickup_address;
  const drop_off_address = location.state.drop_off_address;
  const userValues = useContext(userContext);
  const { token } = userValues;

  const handleVehicleImage = (files) => {
    const picUploaded = [...deliveryFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (picUploaded.findIndex((f) => f.name === file.name) === -1) {
        picUploaded.push(file);
        if (picUploaded.length === 5) setFileLimit(true);
        if (picUploaded.length > 5) {
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setDeliveryFiles(picUploaded);
  };

  const uploadMultipleFiles = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleVehicleImage(chosenFiles);
  };

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleType = (e) => {
    setParcelType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = (data) => {
      if (deliveryFiles == []) {
        setFileError("Please Upload a Picture");
      }

      if (!instructions) {
        setInstructions("No delivery instructions set");
      }
      const errors = {};
      if (!data.reciever_name) {
        errors.reciever_name = "Receiver name must be filled!";
      }
      if (!data.parcel_description) {
        errors.parcel_description = "Give an Quantity of Items";
      }
      if (!data.reciever_phone_no) {
        errors.reciever_phone_no = "Receiver Phone Number must be filled!";
      }
      if (!data.parcel_name) {
        errors.parcel_name = "Give an Item Name";
      }
      return errors;
    };
    setFormErrors(validate(formData));

    const bodyFormData = new FormData();
    bodyFormData.append("token", JSON.parse(token));
    bodyFormData.append("distance", distance);
    bodyFormData.append("email", email);
    bodyFormData.append("fullname", formData.fullname);
    bodyFormData.append("phone_no", `0${formData.phone_no}`);
    bodyFormData.append("delivery_type", member);
    bodyFormData.append("delivery_medium", vehicle);
    bodyFormData.append("pickup_location", pickupLocation);
    bodyFormData.append("pickup_address", pickup_address);
    bodyFormData.append("drop_off_address", drop_off_address);
    bodyFormData.append("drop_off_location", dropOffLocation);
    bodyFormData.append("reciever_name", formData.reciever_name);
    bodyFormData.append("reciever_phone_no", `0${formData.reciever_phone_no}`);
    bodyFormData.append("parcel_name", formData.parcel_name);
    bodyFormData.append(
      "parcel_description",
      formData.parcel_description.toString()
    );
    bodyFormData.append("delivery_instructions", instructions);
    bodyFormData.append("parcel_type", parcelType);
    bodyFormData.append("delivery_cost", delivery_cost);
    bodyFormData.append("state", pickupState);
    for (let i = 0; i < deliveryFiles.length; i++) {
      bodyFormData.append("delivery_files", deliveryFiles[i]);
    }

    axios
      .post(
        "https://ancient-wildwood-73926.herokuapp.com/user_delivery/new_delivery",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          let data = response.data;
          setLoading(true);
          const deliveryID = data.delivery._id;

          const accepted = onSnapshot(
            doc(db, "delivery_requests", deliveryID),
            async (doc) => {
              if (doc.data().delivery_status_is_accepted === true) {
                accepted();
                setLoading(false);

                navigate("/user/summary-i", {
                  state: {
                    type: member,
                    price: delivery_cost,
                    pickup_address: pickup_address,
                    drop_off_address: drop_off_address,
                    senderName: formData.fullname,
                    senderNumber: formData.phone_no,
                    reciever_name: formData.reciever_name,
                    reciever_phone_no: formData.reciever_phone_no,
                    parcelName: formData.parcel_name,
                    parcelType: parcelType,
                    Quantity: formData.parcel_description,
                    instructions: instructions,
                    deliveryMedium: vehicle,
                    deliveryID: deliveryID,
                    email: email,
                    name: senderName,
                    number: number,
                  },
                });
              }
            }
          );
        } else {
          setMessage("An Error occured");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const asterik = <span id="asterik">*</span>;
  if (loading == true) {
    return <FindingDeliveriesUser medium={vehicle} />;
  } else
    return (
      <div className="white-div">
        <h2>Delivery Details</h2>
        <br />
        <div>
          <img src={FormProgress} alt="Progress" />
        </div>
        <br />
        <br />

        <form className="sign-form" onSubmit={handleSubmit}>
          <label className="requiredText">Sender's Full name{asterik}</label>
          <input
            type="text"
            className="form-fields phone-input3"
            placeholder="Enter your full name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          <br />

          <label className="requiredText">Sender's Phone Number{asterik}</label>
          <div className="delivery-location-input">
            <img src={Flag} alt="" className="flag-icon" />
            <span className="text-icon">+234</span>
            <input
              type="text"
              className="form-fields phone-input"
              placeholder="Enter your Phone Number"
              name="phone_no"
              maxLength={10}
              value={formData.phone_no}
              onChange={handleChange}
            />
          </div>
          <br />

          <label className="requiredText">Receiver's Full name{asterik}</label>
          <input
            type="text"
            className="form-fields phone-input3"
            placeholder="Enter Receiver's full name"
            name="reciever_name"
            value={formData.reciever_name}
            onChange={handleChange}
          />
          <p className="error-style">{formErrors.reciever_name}</p>
          <br />

          <label className="requiredText">
            Receiver's Phone Number{asterik}
          </label>
          <div className="delivery-location-input">
            <img src={Flag} alt="" className="flag-icon" />
            <span className="text-icon">+234</span>
            <input
              type="text"
              className="form-fields phone-input"
              placeholder="Enter Receiver's Phone Number"
              name="reciever_phone_no"
              value={formData.reciever_phone_no}
              onChange={handleChange}
              maxLength={10}
            />
          </div>
          <p className="error-style">{formErrors.reciever_phone_no}</p>
          <br />

          <label className="requiredText">Item Name{asterik}</label>
          <input
            type="text"
            className="form-fields phone-input3"
            placeholder="Enter A Name For Your Item"
            name="parcel_name"
            value={formData.parcel_name}
            onChange={handleChange}
          />
          <p className="error-style">{formErrors.parcel_name}</p>
          <br />

          <label className="requiredText">Item Type{asterik}</label>
          <select
            defaultValue={parcelType}
            className="form-fields phone-input3"
            name="ParcelType"
            onChange={handleType}
            // value={parcelType}
          >
            <option value="fragile">Fragile</option>
            <option value="non-fragile">Non-Fragile</option>
          </select>
          <br />

          <label className="requiredText">Quantity of Items{asterik}</label>
          <input
            type="number"
            className="form-fields phone-input3"
            placeholder="Describe your Item"
            name="parcel_description"
            value={formData.parcel_description}
            onChange={handleChange}
            min={1}
          />
          <p className="error-style">{formErrors.parcel_description}</p>
          <br />

          <label className="requiredText">Delivery Instructions</label>
          <textarea
            type="text"
            className="form-field-Instructions phone-input3 textarea"
            placeholder="Enter any specific Instruction for the delivery agent to note"
            name="delivery_instructions"
            value={instructions}
            onChange={handleInstructions}
          />
          <br />

          <div className="field">
            <legend className="requiredText">Item Images {asterik}</legend>
            <br />

            <section id="vector-sec">
              <div className="Upload" id="vector">
                <label>
                  <img src={Vector} alt="Vector" />
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    name="deliveryFiles"
                    disabled={fileLimit}
                    onChange={uploadMultipleFiles}
                    multiple
                  />
                </label>
              </div>
              <div>
                {deliveryFiles
                  ? deliveryFiles.map((file, index) => (
                      <li key={index} className="img_name">
                        {file.name}
                      </li>
                    ))
                  : null}
              </div>
              <p className="error-style">{fileError}</p>
            </section>

            <div className="Upload" id="uploadText">
              N/B: The closest available <span>{vehicle.toUpperCase()}</span>{" "}
              delivery agent would receive and confirm
              <br /> your request after which you'll be directed to the payment
              page.
            </div>
          </div>

          <div id="center-button">
            <Button name="Next" type="submit" />
          </div>
        </form>
      </div>
    );
}
