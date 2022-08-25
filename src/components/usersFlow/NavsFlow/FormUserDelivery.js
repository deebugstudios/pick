import React, { useState, useEffect } from "react";
import Button from "../../javascript/Button";
import "../../css/Personal.css";
import Vector from "../../Images/Vector.png";
import FormProgress from "../../Images/FormProgress.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../../css/userflowform.css";
import LoggedinMainPage from "./LoggedinMainPage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Flag from "../../Images/Nigerian_flag.png";
import axios from "axios";
import {
  FindingDeliveries,
  FindingDeliveriesUser,
} from "../../../Shadow/Pages/FindingDeliveries/FindingDeliveries";
import {
  collection,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";

export default function FormUserDelivery() {
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [fileError, setFileError] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [parcelType, setParcelType] = useState("fragile");
  const [fileLimit, setFileLimit] = useState(false);
  const [deliveryFiles, setDeliveryFiles] = useState([]);
  const [formData, setFormData] = useState({
    reciever_phone_no: "",
    reciever_name: "",
    parcel_name: "",
    parcel_description: 1,
    delivery_instructions: "",
  });

  const vehicle = location.state.vehicle;
  const distance = location.state.distance;
  const pickupLocation = location.state.pickupLocation;
  const pickupState = location.state.pickupState;
  const dropOffLocation = location.state.dropOffLocation;
  const delivery_cost = location.state.price;
  const member = location.state.member;
  const pickup_address = location.state.pickup_address;
  const drop_off_address = location.state.drop_off_address;

  const fetchUserDetails = async () => {
    const res = await fetch(
      "https://protected-temple-21445.herokuapp.com/user_profile//user_profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZmOWRjMTIwZjFmYzlhNjRjNzg2YjIiLCJwaG9uZV9ubyI6IjgwNjU4Njk1MDEiLCJpYXQiOjE2NjExMDY0MTh9.HJZDyNXDZqIxwgW8jni0RVJalip1jij3TtxELLy0vc8",
        }),
      }
    );
    const data = await res.json();
    const results = await data;

    // console.log(results);
    setUserDetails(results?.user);
    // console.log(userDetails);
    // pendingDeliveries.map((item) => console.log(item));
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleDeliveryFiles = (files) => {
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

  const handleDeliveryFilesE = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleDeliveryFiles(chosenFiles);
  };

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleType = (e) => {
    setParcelType(e.target.value);
    console.log(parcelType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pickupLocation);

    if (!deliveryFiles) {
      setFileError("Please Upload a Picture");
    } else setFileError("");

    const validate = (data) => {
      const errors = {};
      if (!data.reciever_name) {
        errors.reciever_name = "Receiver name must be filled!";
      }
      if (!data.parcel_description) {
        errors.parcel_description = "Give a Parcel Description";
      }
      if (!data.reciever_phone_no) {
        errors.reciever_phone_no = "Receiver Phone Number must be filled!";
      }
      if (!data.parcel_name) {
        errors.parcel_name = "Give a Parcel Name";
      }
      if (!data.delivery_instructions) {
        errors.delivery_instructions = "Delivery Instructions must be filled";
      }
      return errors;
    };
    setFormErrors(validate(formData));

    const bodyFormData = new FormData();
    bodyFormData.append(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZmOWRjMTIwZjFmYzlhNjRjNzg2YjIiLCJwaG9uZV9ubyI6IjgwNjU4Njk1MDEiLCJpYXQiOjE2NjExMDY0MTh9.HJZDyNXDZqIxwgW8jni0RVJalip1jij3TtxELLy0vc8"
    );
    bodyFormData.append("distance", distance);
    bodyFormData.append("fullname", userDetails.fullname);
    bodyFormData.append("phone_no", userDetails.phone_no);
    bodyFormData.append("delivery_type", member);
    bodyFormData.append("delivery_medium", vehicle);
    bodyFormData.append("pickup_location", pickupLocation);
    bodyFormData.append("pickup_address", pickup_address);
    bodyFormData.append("drop_off_address", drop_off_address);
    bodyFormData.append("drop_off_location", dropOffLocation);
    bodyFormData.append("reciever_name", formData.reciever_name);
    bodyFormData.append("reciever_phone_no", formData.reciever_phone_no);
    bodyFormData.append("parcel_name", formData.parcel_name);
    bodyFormData.append(
      "parcel_description",
      formData.parcel_description.toString()
    );
    bodyFormData.append(
      "delivery_instructions",
      formData.delivery_instructions
    );
    bodyFormData.append("parcel_type", parcelType);
    bodyFormData.append("delivery_cost", delivery_cost);
    bodyFormData.append("state", pickupState);
    bodyFormData.append("delivery_files", "");

    axios
      .post(
        "https://protected-temple-21445.herokuapp.com/user_delivery/new_delivery",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          console.log(response);
          let data = response.data;
          setLoading(true);
          const deliveryID = data.delivery._id;
          const q = query(
            collection(db, "delivery_requests").doc(deliveryID),
            where("delivery_status_is_accepted" == true)
          );
          const accepted = onSnapshot(q, (QuerySnapshot) => {
            navigate("/user/summary-i");
          });
        } else {
          setMessage("An Error occured");
        }

        // console.log(response);
        // console.log(selectedFile);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const asterik = <span id="asterik">*</span>;
  if (loading === true) {
    return <FindingDeliveriesUser />;
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
            name="Fullname"
            value={userDetails.fullname}
            disabled={true}
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
              name="PhoneNumber"
              value={userDetails.phone_no}
              disabled={true}
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
          <p className="error-style">{formErrors.receiver_phone_no}</p>
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
            // defaultValue={parcelType}
            className="form-fields phone-input3"
            name="ParcelType"
            onChange={handleType}
            value={parcelType}
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
          />
          <p className="error-style">{formErrors.parcel_description}</p>
          <br />

          <label className="requiredText">Delivery Instructions</label>
          <textarea
            type="text"
            className="form-field-Instructions phone-input3 textarea"
            placeholder="Enter any specific Instruction for the delivery agent to note"
            name="delivery_instructions"
            value={formData.delivery_instructions}
            onChange={handleChange}
          />
          <p className="error-style">{formErrors.delivery_instructions}</p>
          <br />

          <div className="field">
            <legend className="requiredText">Parcel Images {asterik}</legend>
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
                    onChange={handleDeliveryFilesE}
                  />
                </label>
              </div>
              <div>
                {deliveryFiles.map((file) => (
                  <div className="img_name">{file.name}</div>
                ))}
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
