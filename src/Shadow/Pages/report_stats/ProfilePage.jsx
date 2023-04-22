import React, { useContext, useRef, useState, useEffect } from "react";
import "./profilepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import passportphoto from "../../images/profilepic3.jpg";
import User from "../../images/user.png";
import Button from "../../../components/javascript/Button";
import { RiderContext } from "../Contexts/RiderContext";
import { MainTop } from "./Profile_page_main_top/MainTop";
import { Outlet, useNavigate } from "react-router-dom";
import { Popup2 } from "../../../components/javascript/Popup";
import camera from "../../images/camera.png";
import ClipLoader from "react-spinners/ClipLoader";
const ProfilePage = () => {
  const value = useContext(RiderContext);
  const { token, typeAccount } = value;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [riderdata, setRiderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadOtp, setLoadOtp] = useState(false);

  // console.log(riderdata?.fullname)
  // console.log(JSON.parse(riderdata.phone_no) , riderdata.phone_no);

  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   fullname: riderdata?.fullname,
  //   address: riderdata?.address,
  //   number: parseInt(riderdata?.phone_no),
  //   state: riderdata?.state,
  //   img: riderdata?.img_url,
  // });
  const fullnameref = useRef(riderdata?.fullname);

  // fetching profile details
  const [loadDelete, setLoadDelete] = useState(false);

  const fetchDetails = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_profile/view_single_profile",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(token),
          }),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setRiderData(data?.delivery_agent);
        setLoading(false);
      } else {
        console.log("error occurred");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  const handleDelete = async () => {
    setLoadDelete(true);
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_auth/request_delete_account",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            email: riderdata?.email,
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
        sessionStorage.clear();
        setLoadDelete(false);
        alert("Request sent. Check your email to complete the process");
        navigate("/welcome-agent");
        window.location.reload();

        // setLoadButton(false);
      } else {
        setLoadDelete(false);
        // setMessage("An Error occured");
        // setLoadButton(false);
      }
    } catch (error) {
      // setLoadButton(false);
      alert("Request failed. Check your network connection and try again");
      // setLoadOtp(false);
      setLoadDelete(false);
      // console.log(error);
      // const err = error
    }
  };

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  //   console.log(formData)
  // };
  const handleChangeDisable = (e) => {
    e.preventDefault();
    navigate("/change-phone-number", {
      state: { oldPhoneNumber: riderdata?.phone_no, token: token },
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/edit-profile");
  };

  const vehcileImages = riderdata?.vehicle_details?.img_urls
    ?.slice(2, 7)
    .map((image, index) => {
      return (
        <div className="front-side skeleton" key={index}>
          <img src={image} alt="" />
        </div>
      );
    });

  // const handleSubmitChangeProfile = (e) => {
  //   e.preventDefault()
  //     const bodyFormData = new FormData();

  //     bodyFormData.append("token", JSON.parse(token));
  //     bodyFormData.append("fullname", formData.fullname);
  //     bodyFormData.append("address", formData.address);
  //     bodyFormData.append("state", formData.state);

  //        axios.post("https://ancient-wildwood-73926.herokuapp.com/delivery_agent_profile/edit_profile",
  //      bodyFormData,
  //       {
  //         headers: {
  //           "content-Type": "application/json"
  //         }
  //       }
  //       ).then(res=> {
  //         if(res.status === 200){
  //           setSuccess(res?.data?.msg)
  //           setTimeout(() => {
  //             setSuccess("")
  //             window.location.reload()
  //           }, 4000);
  //         }else {
  //           setError("some error occured")
  //           setTimeout(() => {
  //             setError("")
  //           }, 4000);
  //         }
  //       })

  //   }

  return (
    // <div className="white">
    <div className="iii">
      <div className=" profile-page-container">
        <MainTop riderdata={riderdata} />
        <div className="profile-page-bottom">
          {loading ? (
            <div style={{ height: "1000px", backgroundColor: "white" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ClipLoader color={"#1AA803"} loading={loading} size={100} />
              </div>
            </div>
          ) : (
            <>
              {/* <div id="profile-picture-merge2">
            <div className="shadow-user-image">
              <img src={riderdata?.img_url} />
              <div className="camera">
                <img src={camera} />
              </div>
              <input type="file" name="file" id="file"/>
            </div>
          </div> */}

              <div className="bottom-wrapper">
                <form className="shadow-profile-form">
                  {/* <label htmlFor="imageSelect">
          <div id="profile-picture-merge" className="shadow-image" >
            <div className="user-image profile-image-wrapper1">
              <img src={formData?.img} />
              <input type="image" src={formData} width="100%" height="100%" onChange={handleChange}/>
              <div className="camera">
                <img src={camera} />
            </div>
            </div>
          </div>
          <input type="file" id="imageSelect" name= "imageSelect" />
          </label> */}
                  <br />
                  <label htmlFor="fullname">Full name</label>
                  <br />
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    ref={fullnameref}
                    value={riderdata?.fullname}
                    disabled
                    className="shorter-form"
                    // onChange={handleChange}
                  />
                  {/* <button className="change-btn" onClick={handleChangeDisable}>
              change
            </button> */}
                  <br />
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    disabled
                    value={riderdata?.email}
                    // onChange={handleChange}
                  />
                  <br />
                  <label htmlFor="number">Phone Number</label>
                  <br />
                  <input
                    type="number"
                    name="number"
                    id="number"
                    value={parseInt(riderdata?.phone_no)}
                    disabled
                    // onChange={handleChange}
                    className="shorter-form"
                  />
                  <button className="change-btn" onClick={handleChangeDisable}>
                    change
                  </button>
                  <br />
                  <label htmlFor="address">Address</label>
                  <br />
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={riderdata?.address}
                    // onChange={handleChange}
                    disabled
                    className="shorter-form"
                  />
                  {/* <button className="change-btn" onClick={handleChangeDisable}>
              change
            </button> */}
                  <br />
                  <label htmlFor="states">States</label>
                  <br />
                  <select
                    name="state"
                    id="states"
                    value={riderdata?.state}
                    // onChange={handleChange}
                    disabled
                  >
                    <option value="Abia">Abia</option>
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
                    <option value="Tarba">Tarba</option>
                    <option value="Yobe">Yobe</option>
                    <option value="Zamfara">Zamfara</option>
                  </select>
                  <br />
                  {/* <label htmlFor="driverLicenseSelect">
            <div className="driverLicenseSelect-div">
            <div className="driverLicenseSelect">
              <img src={addFile} />
            </div>
              <span className="driverLicenseSelect-span">Upload new driver's license in the event of an expiry</span>
            </div>
            </label>
            <input type="file" id="driverLicenseSelect" name="driverLicenseSelect"  className="imageSelect" onChange={handleChange}/> */}

                  <div className="profile-confirm-btns">
                    <button className="cancel-btn" onClick={handleNext}>
                      Edit Profile
                    </button>
                    {/* <button type="submit" className="save-and-update-btn" onClick={handleSubmitChangeProfile}>
                Save and update
              </button> */}
                  </div>
                </form>
              </div>
              <div className="vechile-details">
                <h5>Vehicle registration details</h5>

                <div className="vechile-forms">
                  <form className="vechile-details-form1">
                    <label htmlFor="">Fleet ID</label> <br />
                    <input
                      type="text"
                      name="fleetID"
                      id=""
                      value={
                        riderdata?.fleet_manager_code ||
                        "Not Under A Fleet Manager"
                      }
                      disabled
                    />
                    <br />
                    <label htmlFor="">
                      {typeAccount == "Agent" ? "Vehicle type" : "CAC Reg. No."}
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      name="vehicleType"
                      id=""
                      value={
                        typeAccount == "Agent"
                          ? riderdata?.vehicle_details?.type
                          : riderdata?.cac_reg_no
                      }
                      disabled
                    />{" "}
                    <br />
                    {typeAccount == "Agent" && (
                      <>
                        <label htmlFor="">Plate number</label> <br />
                        <input
                          type="text"
                          name="plateNumber"
                          id=""
                          value={riderdata?.vehicle_details?.plate_no}
                          disabled
                        />
                      </>
                    )}
                  </form>
                  <form className="vechile-details-form2">
                    <label htmlFor="">
                      {typeAccount == "Agent" ? "Agent ID" : "Fleet name"}
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      name="agentId"
                      id=""
                      value={
                        typeAccount == "Agent"
                          ? riderdata?.delivery_agent_code
                          : riderdata?.fleet_name
                      }
                      disabled
                    />{" "}
                    <br />
                    <label htmlFor="">
                      {typeAccount == "Agent"
                        ? "Vehicle color"
                        : "Company name"}
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      name="vehicleColor"
                      id=""
                      value={
                        typeAccount == "Agent"
                          ? riderdata?.vehicle_details?.color
                          : riderdata?.company_name
                      }
                      disabled
                    />
                    <br />
                    {typeAccount == "Agent" && (
                      <>
                        <label htmlFor="">Drivers license expiry date</label>{" "}
                        <br />
                        <input
                          type="text"
                          name="driverLicense"
                          id=""
                          value={
                            riderdata?.vehicle_details
                              ?.driver_license_expiry_date
                          }
                          disabled
                        />
                      </>
                    )}
                  </form>
                </div>
                {typeAccount === "Agent" ? (
                  <div className="driver-passport-pictures">
                    <h6>
                      Passport/Selfie{" "}
                      {riderdata?.img_url ? null : "- No profile picture set"}
                    </h6>
                    <div className="driver-passport skeleton">
                      <img
                        src={riderdata?.img_url ? riderdata?.img_url : User}
                        alt="driver passport"
                      />
                    </div>
                    <h6>Drivers license</h6>
                    <div className="driver-driver-license">
                      <div className="front-side skeleton">
                        <img
                          src={riderdata?.vehicle_details?.img_urls?.[0]}
                          alt=""
                        />
                      </div>
                      <div className="back-side skeleton">
                        <img
                          src={riderdata?.vehicle_details?.img_urls?.[1]}
                          alt=""
                        />
                      </div>
                    </div>
                    <h6>Vehicle image</h6>
                    <div className="driver-driver-license">
                      {vehcileImages}
                      {/* <div className="back-side skeleton">
                <img src={riderdata?.vehicle_details[0].img_urls[1]} alt="" />
              </div>
              <div className="back-side skeleton">
                <img src={riderdata?.vehicle_details[0].img_urls[2]} alt="" />
              </div> */}
                    </div>
                  </div>
                ) : null}
              </div>
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "40px",
                  marginBottom: "30px",
                  cursor: "pointer",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                }}
                onClick={() => setLoadOtp(true)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete Account
              </div>
            </>
          )}
        </div>
        <Popup2 trigger={loadOtp} setTrigger={setLoadOtp}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "15px",
              padding: "20px 20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <FontAwesomeIcon icon={faTrash} /> Delete Account
            </p>
            <div style={{ maxWidth: "400px", textAlign: "center" }}>
              Your data cannot be recovered once deleted. We'll send you an
              email to complete the process.
            </div>
            <Button name="Proceed" click={handleDelete} loading={loadDelete} />
          </div>
        </Popup2>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
