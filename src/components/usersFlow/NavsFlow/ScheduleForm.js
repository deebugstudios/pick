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
import { useEffect } from "react";

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
  const AgentName = location.state.AgentName;
  const userValues = useContext(userContext);
  const { token } = userValues;

  const [message, setMessage] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [profileImage, setProfileImage] = useState([]);
  const [loadButton, setLoadButton] = useState(false);
  const [time, setTime] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [fileError, setFileError] = useState("");
  // const [fireData, setFireData] = useState({});
  // const [userDetails, setUserDetails] = useState([]);
  const [parcelType, setParcelType] = useState("fragile");
  const [status, setStatus] = useState(null);
  const [name, setName] = useState("");
  const [loadMessage, setLoadMessage] = useState("");
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
  const [fire, setFire] = useState(false);

  useEffect(() => {
    handleDelete();
    setFire(false);
  }, [fire === true]);

  const handleDelete = (url) => {
    // e.preventDefault();
    if (deliveryFiles.length === 5) {
      // setFileMax(4);
      setFileLimit(false);
      // setLimitExceeded(false);
    }
    let i = -1;
    const found = deliveryFiles.some((element) => {
      i++;
      return element === url;
    });
    if (found) {
      deliveryFiles.splice(i, 1);
      setFire(true);
    }
  };

  const handleInstructions = (e) => {
    setInstructions(e.target.value);
  };

  const picUploaded = [...deliveryFiles];
  const handleVehicleImage = (files) => {
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
    setIsSelected(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadButton(true);
    let realInstructions = instructions;
    if (instructions === "") {
      realInstructions = "No delivery instructions set";
    }
    if (deliveryFiles == []) {
      setFileError("Please Upload a Picture");
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

    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/stats/get_request_timeout_duration",
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
      const duration = data?.request_timeout_duration * 60000;
      // const realDuration = duration ;
      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/stats/get_payment_timeout_duration",
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
        const result = await res.json();
        const payDuration = result?.payment_timeout_duration;

        // console.log(result);
        if (res.status === 200) {
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
          bodyFormData.append("reciever_phone_no", formData.reciever_phone_no);
          bodyFormData.append("email", email);
          bodyFormData.append("parcel_name", formData.parcel_name);
          bodyFormData.append(
            "parcel_description",
            formData.parcel_description.toString()
          );
          bodyFormData.append("delivery_instructions", realInstructions);
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
                // console.log(response);
                let data = response.data;
                setLoading(true);
                const deliveryID = data.delivery._id;
                const notifId = data.notification_id;

                let fireData = {};
                const accepted = onSnapshot(
                  doc(db, "delivery_requests", deliveryID),
                  (doc) => {
                    fireData = doc.data();
                    if (fireData.delivery_status_is_accepted === true) {
                      accepted();
                      setLoading(false);
                      clearTimeout(timer);
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
                          payDuration: payDuration,
                        },
                      });
                    }
                  }
                );
                const timer = setTimeout(async () => {
                  // console.log(fireData);
                  accepted();
                  alert(
                    "Your pickup request wasn't accepted. Please try again"
                  );
                  setLoading(false);
                  if (fireData.delivery_status_is_accepted === false) {
                    try {
                      const res = await fetch(
                        "https://ancient-wildwood-73926.herokuapp.com/user_delivery/timeout_before_acceptance",
                        {
                          method: "POST",

                          body: JSON.stringify({
                            token: JSON.parse(token),
                            delivery_id: deliveryID,
                            notification_id: notifId,
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
                        navigate("/user/select-a", {
                          state: {
                            vehicle: vehicle,
                            distance: distance,
                            pickupLocation: pickupLocation,
                            pickupState: pickupState,
                            dropOffLocation: dropOffLocation,
                            price: price,
                            member: type,
                            pickup_address: pickup_address,
                            drop_off_address: drop_off_address,
                            senderName: senderName,
                            number: phone_no,
                            email: email,
                          },
                        });
                      } else {
                        //
                      }
                    } catch (error) {
                      // console.log(error);
                    }
                  }
                }, duration);
              } else {
                setMessage("An Error occured");
              }
            })
            .catch((error) => {
              setLoadButton(false);
              setLoadMessage("An Error Occured, Please Try Again");
            });
        } else {
          setLoadButton(false);
          setLoadMessage("An Error Occured, Please Try Again");
        }
      } catch {
        setLoadButton(false);
        setLoadMessage("An Error Occured, Please Try Again");
      }
    } catch (error) {
      setLoadButton(false);
      setLoadMessage("An Error Occured, Please Try Again");
    }
  };

  const asterik = <span id="asterik">*</span>;

  if (loading == true) {
    return (
      <FindingDeliveriesUser
        text={`N/B: ${AgentName} will receive your delivery request and confirm if available on the chosen date and time.`}
      />
    );
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

        <div className="nedu-form">
          <form className="nedu-sign-form" onSubmit={handleSubmit}>
            <label className="requiredText">Sender's Full name{asterik}</label>
            <div className="nedu-info-div bottom-marg">
              <input
                type="text"
                className="phone-input3 nedu-info-div"
                placeholder="Enter your full name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            {/* <br /> */}

            <label className="requiredText">
              Sender's Phone Number{asterik}
            </label>
            <div className="nedu-info-div bottom-marg">
              <div className="delivery-location-input">
                <img src={Flag} alt="" className="flag-icon" />
                <span className="text-icon">+234</span>
                <input
                  type="text"
                  className="nedu-info-div phone-input"
                  placeholder="Enter your Phone Number"
                  name="phone_no"
                  maxLength={10}
                  value={formData.phone_no}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <br /> */}

            <label className="requiredText">
              Receiver's Full name{asterik}
            </label>
            <div className="nedu-info-div">
              <input
                type="text"
                className="nedu-info-div phone-input3"
                placeholder="Enter Receiver's full name"
                name="reciever_name"
                value={formData.reciever_name}
                onChange={handleChange}
              />
            </div>
            <p className="error-style bottom-marg">
              {formErrors.reciever_name}
            </p>
            {/* <br /> */}

            <label className="requiredText">
              Receiver's Phone Number{asterik}
            </label>
            <div className="nedu-info-div">
              <div className="delivery-location-input">
                <img src={Flag} alt="" className="flag-icon" />
                <span className="text-icon">+234</span>
                <input
                  type="text"
                  className="nedu-info-div phone-input"
                  placeholder="Enter Receiver's Phone Number"
                  name="reciever_phone_no"
                  value={formData.reciever_phone_no}
                  onChange={handleChange}
                  maxLength={10}
                  minLength={10}
                />
              </div>
            </div>
            <p className="error-style bottom-marg">
              {formErrors.reciever_phone_no}
            </p>
            {/* <br /> */}

            <label className="requiredText">Item Name{asterik}</label>
            <div className="nedu-info-div">
              <input
                type="text"
                className="nedu-info-div phone-input3"
                placeholder="Enter A Name For Your Item"
                name="parcel_name"
                value={formData.parcel_name}
                onChange={handleChange}
              />
            </div>
            <p className="error-style bottom-marg">{formErrors.parcel_name}</p>
            {/* <br /> */}

            <label className="requiredText">Item Type{asterik}</label>
            <div className="nedu-info-div bottom-marg">
              <select
                value={parcelType}
                className="nedu-info-div phone-input3"
                name="ParcelType"
                onChange={handleType}
              >
                <option value="fragile">Fragile</option>
                <option value="non-fragile">Non-Fragile</option>
              </select>
            </div>
            {/* <br /> */}

            <label className="requiredText">Quantity of Items{asterik}</label>
            <div className="nedu-info-div">
              <input
                type="number"
                className="nedu-info-div phone-input3"
                placeholder="Describe your Item"
                name="parcel_description"
                value={formData.parcel_description}
                onChange={handleChange}
                min={1}
              />
            </div>
            <p className="error-style bottom-marg">
              {formErrors.parcel_description}
            </p>
            {/* <br /> */}

            <label className="requiredText">Delivery Instructions</label>
            <div className="nedu-info-div bottom-marg">
              <textarea
                type="text"
                className="form-field-Instructions phone-input3 textarea nedu-info-div"
                placeholder="Enter any specific Instruction for the delivery agent to note"
                name="delivery_instructions"
                value={instructions}
                onChange={handleInstructions}
              />
            </div>
            {/* <br /> */}

            <div id="time-factor" className="bottom-marg">
              <p className="bottom-marg">
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
              {/* <br />
            <br /> */}
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
            {/* <br /> */}

            <div className="field">
              <legend className="requiredText">
                Upload Images of Your Item {asterik}{" "}
                <span id="image-upload">(Max of 5 images)</span>
              </legend>
              <br />

              <section id="vector-sec">
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
                <div className="Selected-file-div">
                  {isSelected === true
                    ? deliveryFiles.map((item, index) => (
                        <div className="removal-button" key={index}>
                          <img src={URL.createObjectURL(item)} alt="" />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(item);
                              // e.preventDefault();
                              // setIsSelected(false);
                              // images.splice(images.indexOf(item), 1);
                              // picUploaded.splice(picUploaded.indexOf(item), 1);
                            }}
                          >
                            remove
                          </button>
                        </div>
                      ))
                    : ""}
                </div>
                <p className="error-style">{fileError}</p>
              </section>
              <div className="Upload" id="uploadText">
                N/B: <strong>{AgentName}</strong> will receive your delivery
                request and confirm if available on the chosen date and time.
              </div>
            </div>

            <div id="center-button">
              <Button name="Next" type="submit" loading={loadButton} />
              <p className="error-style bottom-marg">{loadMessage}</p>
            </div>
          </form>
        </div>
      </div>
    );
}
