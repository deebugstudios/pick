import React, { useEffect, useState } from "react";
import Button from "./Button";
import Head from "./Head";
import ProgressM from "../Images/ProgressI.png";
import "../css/Personal.css";
import Vector from "../Images/Vector.png";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import User from "../Images/user.png";
import Mail from "../Images/mail.png";
import Locate from "../Images/locate.png";
import Flag from "../Images/Nigerian_flag.png";
import axios from "axios";
import DeliveryImage from "../Images/DeliveryImage.png";
import { auth } from "../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Popup2 } from "../javascript/Popup";

export default function JoinAgent(props) {
  const asterik = <span id="asterik">*</span>;

  const [loadOtp, setLoadOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpValues, setOtpValues] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });
  const [countDown, setCountDown] = useState(60);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_no: "",
    nin: "",
    city: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [dataError, setDataError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [genderError, setGenderError] = useState("");
  const [fileError, setFileError] = useState("");
  const [residentState, setResidentState] = useState("Abia");

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleState = (e) => {
    setResidentState(e.target.value);
  };

  const handleCheck = (e) => {
    setGender(e.target.value);
  };

  const handleFinalSubmit = async () => {
    const computedNum = `${otpValues.one}${otpValues.two}${otpValues.three}${otpValues.four}${otpValues.five}${otpValues.six}`;

    try {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(computedNum)
        .then(async (result) => {
          const user = result.user;
          // ...
          console.log("worked");

          try {
            const res = await fetch(
              "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/signup_stage_two",
              {
                method: "POST",

                body: JSON.stringify({
                  phone_no: `+234${formData.phone_no}`,
                  _id: id,
                  token: token,
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
              // setMessage("User created successfully");
              navigate(
                agent === "delivery agent" ? "/individual-v" : "/fleet-v",
                {
                  state: { id: id, token: token, agent: agent },
                }
              );
            } else {
              // setMessage("Error occured");
              console.log("error");
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log("error");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsSelected(true);
    console.log(selectedFile);
  };

  const navigate = useNavigate();

  const agent = props.agent;
  console.log(agent);

  const OtpChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    setOtpValues({ ...otpValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gender) {
      setGenderError("Please Select Your Gender");
    } else setGenderError("");

    if (!selectedFile) {
      setFileError("Please Upload a Picture");
    } else setFileError("");

    const validate = (data) => {
      const errors = {};
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!data.fullname) {
        errors.fullname = "Full Name must be filled!";
      }
      if (!data.email) {
        errors.email = "Email must be filled!";
      } else if (!regex.test(data.email)) {
        errors.email = "Please enter a valid email";
      }
      if (!data.phone_no) {
        errors.phone_no = "Phone Number must be filled!";
      }
      if (!data.nin) {
        errors.nin = "Enter your National Identification Number";
      }
      if (!data.address) {
        errors.address = "Please Enter an Address";
      }
      if (!data.city) {
        errors.city = "Please Enter a City Name";
      }
      return errors;
    };
    setFormErrors(validate(formData));

    // navigate(props.link);
    const bodyFormData = new FormData();
    bodyFormData.append("fullname", formData.fullname);
    bodyFormData.append("phone_no", `+234${formData.phone_no}`);
    bodyFormData.append("email", formData.email);
    bodyFormData.append("delivery_agent_type", agent);
    bodyFormData.append("address", formData.address);
    bodyFormData.append("nin", formData.nin);
    bodyFormData.append("state", residentState);
    bodyFormData.append("city", formData.city);
    bodyFormData.append("gender", gender);
    bodyFormData.append("profile_img", selectedFile);

    axios
      .post(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/signup_stage_one",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          console.log(response);
          let data = response.data;
          const userToken = data.token;
          const userId = data.delivery_agent._id;
          // const phone = ;
          setToken(data.token);
          setId(data.delivery_agent._id);

          const number = "+234" + [formData.phone_no];

          try {
            window.recaptchaVerifier = new RecaptchaVerifier(
              "recaptcha-container",
              {
                size: "invisible",
                callback: (response) => {
                  // console.log(response);
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                  handleSubmit();
                },
              },
              auth
            );
          } catch (err) {
            console.log("can't send Otp");
            console.log(err);
          }

          const appVerifier = window.recaptchaVerifier;
          console.log(appVerifier);

          setLoadOtp(true);
          const interval = setInterval(() => {
            setCountDown((countDown) => countDown - 1);
          }, 1000);
          if (countDown === 0) {
            clearInterval(interval);
          }
          signInWithPhoneNumber(auth, number, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });

          // navigate(props.link, {
          //   state: {
          //     id: userId,
          //     token: userToken,
          //     phone: phone,
          //     agent: agent,
          //   },
          // });
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

  const resend = () => {
    setCountDown(60);
    // try {
    //   window.recaptchaVerifier = new RecaptchaVerifier(
    //     "recaptcha-container",
    //     {
    //       size: "invisible",
    //       callback: (response) => {
    //         // console.log(response);
    //         // reCAPTCHA solved, allow signInWithPhoneNumber.
    //         handleSubmit();
    //       },
    //     },
    //     auth
    //   );
    // } catch (err) {
    //   console.log("can't send Otp");
    //   console.log(err);
    // }

    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    const number = "+234" + [formData.phone_no];

    const interval = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
    if (countDown === 0) {
      clearInterval(interval);
    }
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Head />
      <div id="mainsign">
        <h2>{props.delivery}</h2>
        <br />
        <div className="mainsign-prog">
          <img src={ProgressM} alt="Progress" />
        </div>
        <br />
        <br />

        <form
          onSubmit={handleSubmit}
          className="sign-form"
          encType="multipart/form-data"
        >
          <label className="requiredText">Full name{asterik}</label>
          <div className="delivery-location-input">
            <img src={User} alt="" className="user-icon" />
            <input
              minLength={3}
              value={formData.fullname}
              onChange={handleChange}
              type="text"
              className="form-field edit-field phone-input2"
              placeholder="Enter your full name"
              name="fullname"
              // required={true}
            />
          </div>
          <p className="error-style">{formErrors.fullname}</p>
          <br />

          <label className="requiredText">Email{asterik}</label>
          <div className="delivery-location-input">
            <img src={Mail} alt="" className="mail-icon" />
            <input
              value={formData.email}
              onChange={handleChange}
              type="text"
              className="form-field edit-field phone-input2"
              placeholder="Enter your Email"
              name="email"
            />
          </div>
          <p className="error-style">{formErrors.email}</p>
          <br />

          <label className="requiredText">Phone Number{asterik}</label>
          <div className="delivery-location-input">
            <img src={Flag} alt="" className="flag-icon" />
            <span className="text-icon">+234</span>
            <input
              value={formData.phone_no}
              onChange={handleChange}
              maxLength={10}
              type="text"
              className="form-field edit-field phone-input"
              placeholder="Enter your Phone Number"
              name="phone_no"
              // required={true}
            />
          </div>
          <p className="error-style">{formErrors.phone_no}</p>
          <br />

          <label className="requiredText">
            National Identification Number (NIN){asterik}
          </label>
          <input
            value={formData.nin}
            onChange={handleChange}
            type="number"
            className="form-field edit-field phone-input3"
            placeholder="Enter your National Identification Number"
            name="nin"
            maxLength={11}
          />
          <p className="error-style">{formErrors.nin}</p>
          <br />

          <label className="requiredText">Address{asterik}</label>
          <div className="delivery-location-input">
            <img src={Locate} alt="" className="locate-icon" />
            <input
              value={formData.address}
              onChange={handleChange}
              type="text"
              className="form-field edit-field phone-input2"
              placeholder="Enter your Address"
              name="address"
            />
          </div>
          <p className="error-style">{formErrors.address}</p>
          <br />

          <div className="field" id="second">
            <label htmlFor="city">
              <span className="requiredText">City of Operation{asterik}</span>{" "}
              <br />
              <div className="delivery-location-input">
                <img src={Locate} alt="" className="locate-icon" />
                <input
                  minLength={3}
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  className="secondField phone-input2"
                  placeholder="Enter your City"
                  name="city"
                />
              </div>
              <p className="error-style">{formErrors.city}</p>
            </label>

            <label htmlFor="resident_state">
              <span className="requiredText">State of Operation{asterik}</span>
              <br />
              <div className="delivery-location-input">
                <img src={Locate} alt="" className="locate-icon" />
                <select
                  defaultValue={residentState}
                  className="secondField phone-input2"
                  name="ParcelType"
                  onChange={handleState}
                >
                  <option value="Abia">Abia</option>
                  <option value="Federal Capital Territory">Abuja</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwa Ibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross River">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nasarawa">Nasarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                </select>
              </div>
              <p className="error-style">{formErrors.resident_state}</p>
            </label>
          </div>

          <div className="field">
            <legend className="requiredText">Gender{asterik}</legend>
            <section id="check">
              <label className="check" htmlFor="gender">
                Male
              </label>
              <input
                id="maleCheck"
                type="checkbox"
                value="male"
                name="gender"
                checked={gender === "male"}
                onChange={handleCheck}
              />

              <label className="check" htmlFor="gender">
                Female
              </label>
              <input
                id="maleCheck"
                type="checkbox"
                value="female"
                name="gender"
                checked={gender === "female"}
                onChange={handleCheck}
              />
            </section>
            <p className="error-style">{genderError}</p>
          </div>

          <div className="field">
            <legend className="requiredText">
              Upload your passport or selfie{asterik}{" "}
              <span className="Upload" id="uploadText">
                {" "}
                <br className="upload-hide" />
                N/B: Image must clearly show your face.
              </span>
            </legend>
            <br />

            <section id="vector-sec">
              <div className="Upload" id="vector">
                <label>
                  <img src={Vector} alt="Vector" />
                  <input
                    onChange={onFileChange}
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    name="selectedFile"
                    // disabled=
                  />
                </label>
              </div>

              {isSelected ? <p>{selectedFile.name}</p> : null}
            </section>
            <p className="error-style">{fileError}</p>
          </div>

          <div id="center-button">
            <Button name="Next" type="submit" />
          </div>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      <div id="recaptcha-container"></div>
      <Footer />
      <Popup2 trigger={loadOtp} setTrigger={setLoadOtp}>
        <div>
          <div className="mainBox-1">
            <div className="delivery-img-otp" id="DeliveryImage">
              <p>
                Door to Door <span id="yellow">delivery</span>
                <br /> services for individuals
                <br /> and businesses.
              </p>
              <br id="otp-hide" />
              <br />
              <img src={DeliveryImage} alt="Deliver" />
            </div>

            <div id="otp-flex">
              <h2 id="join" className="otp-p">
                Phone number verification
              </h2>
              <div id="otp-div">
                <p id="otp-paragraph">
                  Enter the OTP sent by SMS to 0{formData.phone_no}
                </p>
                <div id="otpField">
                  <input
                    type="text"
                    maxLength={1}
                    name="one"
                    value={otpValues.one}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="two"
                    value={otpValues.two}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="three"
                    value={otpValues.three}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="four"
                    value={otpValues.four}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    name="five"
                    value={otpValues.five}
                    onChange={OtpChange}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    name="six"
                    value={otpValues.six}
                    onChange={OtpChange}
                  />

                  <br />
                  <br />
                  {countDown >= 0 ? (
                    <p id="another-code">
                      We would send you another code in{" "}
                      <span id="otpTimer">00:{countDown}</span>
                      <br />
                      <br />
                      <br />
                      <br />
                    </p>
                  ) : (
                    <button onClick={resend} id="another-code">
                      Resend Otp
                    </button>
                  )}
                  <Button name="DONE" click={handleFinalSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup2>
    </>
  );
}
