import React, { useContext, useState } from "react";
import Button from "../../javascript/Button";
import "../../css/Personal.css";
import Vector from "../../Images/Vector.png";
import FormProgress from "../../Images/FormProgress.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../../css/userflowform.css";
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
  doc,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import dayjs from "dayjs";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";

export default function ScheduleForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = location.state.vehicle;
  const agentId = location.state.agentId;
  const distance = location.state.distance;
  const pickupState = location.state.pickupState;
  const pickupLocation = location.state.pickupLocation;
  const dropOffLocation = location.state.dropOffLocation;
  const price = location.state.price;
  const type = location.state.type;
  const pickup_address = location.state.pickup_address;
  const drop_off_address = location.state.drop_off_address;
  const senderName = location.state.senderName;
  const phone_no = location.state.phone_no;
  const email = location.state.email;
  const userValues = useContext(userContext);
  const { token } = userValues;

  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [expiry, setExpiry] = useState("");
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
  const [timeStampDate, setTimeStampDate] = useState(new Date());
  const [timeStampTime, setTimeStampTime] = useState(new Date());
  const [formData, setFormData] = useState({
    fullname: senderName,
    phone_no: phone_no,
    reciever_phone_no: "",
    reciever_name: "",
    parcel_name: "",
    parcel_description: 1,
  });

  const handleInstructions = (e) => {
    setInstructions(e.target.value);
  };

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

  const handleDate = (e) => {
    const newDate = dayjs(e.target.value).format("YYYY-MM-DD");
    setExpiry(newDate);
    setTimeStampDate(new Date(e.target.value));
  };
  const expiry_date = dayjs(expiry).format("DD/MM/YYYY").toString();

  const handleTime = (e) => {
    setTime(e.target.value);
  };
  //
  const timeStampYear = timeStampDate.getFullYear();
  const timeStampMonth = timeStampDate.getMonth();
  const timeStampDay = timeStampDate.getDate();
  const timeStampHour = time.slice(0, 2);
  const timeStampMinute = time.slice(3);

  // console.log(timeStampDay);
  // if()

  //It works
  // console.log(agentId);

  const timeStamp = new Date(
    timeStampYear,
    timeStampMonth,
    timeStampDay,
    timeStampHour,
    timeStampMinute
  ).getTime();
  // console.log(timeStamp);

  const dateTime = `${time} ${expiry_date}`;

  const handleType = (e) => {
    setParcelType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (deliveryFiles == []) {
      setFileError("Please Upload a Picture");
    } else setFileError("");

    if (instructions == "") {
      setInstructions("No delivery instructions set");
    }

    const validate = (data) => {
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
    bodyFormData.append("fullname", formData.fullname);
    bodyFormData.append("phone_no", formData.phone_no);
    bodyFormData.append("delivery_type", type);
    bodyFormData.append("delivery_medium", vehicle);
    bodyFormData.append("pickup_location", pickupLocation);
    bodyFormData.append("pickup_address", pickup_address);
    bodyFormData.append("drop_off_address", drop_off_address);
    bodyFormData.append("drop_off_location", dropOffLocation);
    bodyFormData.append("reciever_name", formData.reciever_name);
    bodyFormData.append(
      "reciever_phone_no",
      `+234${formData.reciever_phone_no}`
    );
    bodyFormData.append("email", email);
    bodyFormData.append("parcel_name", formData.parcel_name);
    bodyFormData.append(
      "parcel_description",
      formData.parcel_description.toString()
    );
    bodyFormData.append("delivery_instructions", instructions);
    bodyFormData.append("parcel_type", parcelType);
    bodyFormData.append("delivery_cost", price);
    bodyFormData.append("state", pickupState);
    bodyFormData.append("delivery_agent_id", agentId);
    bodyFormData.append("schParsedDateTime", dateTime);
    bodyFormData.append("scheduled_delivery_pickup_timestamp", timeStamp);
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

                navigate("/user/scheduled-summary", {
                  state: {
                    type: type,
                    price: price,
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
                    number: phone_no,
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

          <div id="time-factor">
            <p>
              Scheduled Delivery Pickup Date {asterik}{" "}
              <input
                value={expiry}
                type="date"
                className="date-field"
                placeholder="Pick Date"
                name="license-expiry"
                onChange={handleDate}
              />
            </p>
            <br />
            <br />
            <p>
              Scheduled Delivery Pickup Time {asterik}{" "}
              <input
                type="time"
                className="date-field"
                placeholder="Pick time"
                name="license-expiry"
                value={time}
                onChange={handleTime}
              />
            </p>
          </div>
          <br />

          <div className="field">
            <legend className="requiredText">
              Upload Images of Your Item {asterik}{" "}
              <span id="image-upload">(Max of 5 images)</span>
            </legend>
            <br />

            <section>
              <div className="Upload" id="vector">
                <label>
                  <img src={Vector} alt="Vector" />
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    name="selectedFile"
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

              <div className="Upload" id="uploadText">
                N/B: The Assigned agent will receive and confirm your delivery
                request if
                <br /> they're available on the specified date and time.
              </div>
            </section>
          </div>

          <Button name="Next" type="submit" />
        </form>
      </div>
    );
}
