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
  const [loadButton, setLoadButton] = useState(false);
  const [profileImage, setProfileImage] = useState([]);
  // const [userDetails, setUserDetails] = useState([]);
  const [parcelType, setParcelType] = useState("fragile");
  const [status, setStatus] = useState(null);
  const [name, setName] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  // const [fileLimit, setFileLimit] = useState(false);
  const [deliveryFiles, setDeliveryFiles] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [fileLimit, setFileLimit] = useState(false);
  const [loadMessage, setLoadMessage] = useState("");
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [formData, setFormData] = useState({
    fullname: senderName,
    phone_no: number,
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

  const images = [];
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

    // for (let i = 0; i < picUploaded.length; i++) {
    //   images.push(URL.createObjectURL(picUploaded[i]));
    //   setProfileImage(images);
    // }
    // console.log(picUploaded);

    // for (let i = 0; i < picUploaded.length; i++) {
    //   (function (file) {
    //     const reader = new FileReader();
    //     reader.onload = (file) => {
    //       images.push(reader.result);
    //       setProfileImage(images);
    //     };

    //     reader.readAsDataURL(file);
    //   })(picUploaded[i]);
    // }
  };

  // const imageRemove = (file) => {};

  // console.log(profileImage);
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

  const handleType = (e) => {
    setParcelType(e.target.value);
  };

  const handleSubmit = (e) => {
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

    const bodyFormData = new FormData();
    bodyFormData.append("token", JSON.parse(token));
    bodyFormData.append("distance", distance);
    bodyFormData.append("email", email);
    bodyFormData.append("fullname", formData.fullname);
    bodyFormData.append("phone_no", formData.phone_no);
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
    bodyFormData.append("delivery_instructions", realInstructions);
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
        // console.log(response);
        if (response.status === 200) {
          // console.log(response);
          let data = response.data;
          console.log(data);
          setLoading(true);
          const deliveryID = data.delivery._id;
          const notifId = data.notification_id;

          const accepted = onSnapshot(
            doc(db, "delivery_requests", deliveryID),
            async (doc) => {
              setFireData(doc.data());
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

              setTimeout(async () => {
                accepted();
                setLoading(false);
                if (doc.data().delivery_status_is_accepted === false) {
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
                    console.log(data);

                    if (res.status === 200) {
                      //
                    } else {
                      //
                    }
                  } catch (error) {
                    console.log(error);
                  }
                  alert(
                    "Your pickup request wasn't accepted by any Delivery Agent. Please try again"
                  );
                  setLoadButton(false);
                }
              }, 120000);
            }
          );

          const fireStoreData = fireData;
          console.log(fireStoreData);
          console.log(fireData);
        } else {
          setMessage("An Error occured");
        }
      })
      .catch((error) => {
        // console.log(error);
        setLoadButton(false);
        setLoadMessage("An Error Occured, Please Try Again");
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
          {/* <div></div> */}
          <label className="requiredText">Sender's Full name{asterik}</label>
          <input
            type="text"
            className="form-fields phone-input3 bottom-marg"
            placeholder="Enter your full name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          {/* <br /> */}

          <label className="requiredText">Sender's Phone Number{asterik}</label>
          <div className="delivery-location-input">
            <img src={Flag} alt="" className="flag-icon" />
            <span className="text-icon">+234</span>
            <input
              type="text"
              className="form-fields phone-input bottom-marg"
              placeholder="Enter your Phone Number"
              name="phone_no"
              maxLength={10}
              value={formData.phone_no}
              onChange={handleChange}
            />
          </div>
          {/* <br /> */}

          <label className="requiredText">Receiver's Full name{asterik}</label>
          <input
            type="text"
            className="form-fields phone-input3"
            placeholder="Enter Receiver's full name"
            name="reciever_name"
            value={formData.reciever_name}
            onChange={handleChange}
          />
          <p className="error-style bottom-marg">{formErrors.reciever_name}</p>
          {/* <br /> */}

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
          <p className="error-style bottom-marg">
            {formErrors.reciever_phone_no}
          </p>
          {/* <br /> */}

          <label className="requiredText">Item Name{asterik}</label>
          <input
            type="text"
            className="form-fields phone-input3"
            placeholder="Enter A Name For Your Item"
            name="parcel_name"
            value={formData.parcel_name}
            onChange={handleChange}
          />
          <p className="error-style bottom-marg">{formErrors.parcel_name}</p>
          {/* <br /> */}

          <label className="requiredText">Item Type{asterik}</label>
          <select
            defaultValue={parcelType}
            className="form-fields phone-input3 bottom-marg"
            name="ParcelType"
            onChange={handleType}
            // value={parcelType}
          >
            <option value="fragile">Fragile</option>
            <option value="non-fragile">Non-Fragile</option>
          </select>
          {/* <br /> */}

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
          <p className="error-style bottom-marg">
            {formErrors.parcel_description}
          </p>
          {/* <br /> */}

          <label className="requiredText">Delivery Instructions</label>
          <textarea
            type="text"
            className="form-field-Instructions phone-input3 textarea bottom-marg"
            placeholder="Enter any specific Instruction for the delivery agent to note"
            name="delivery_instructions"
            value={instructions}
            onChange={handleInstructions}
          />
          {/* <br /> */}

          <div className="field">
            <legend className="requiredText">
              Item Images {asterik}{" "}
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
                    name="deliveryFiles"
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
              <p className="error-style bottom-marg">{fileError}</p>
            </section>

            <div className="Upload" id="uploadText">
              N/B: The closest available <span>{vehicle.toUpperCase()}</span>{" "}
              delivery agent would receive and confirm
              <br /> your request after which you'll be directed to the payment
              page.
            </div>
          </div>

          <div id="center-button">
            <Button name="Next" type="submit" loading={loadButton} />
            <p className="error-style bottom-marg">{loadMessage}</p>
          </div>
        </form>
      </div>
    );
}
