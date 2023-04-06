import React, { useContext, useState } from "react";
import { RiderContext } from "../Contexts/RiderContext";
import axios from "axios";
import addFile from "../../images/addfile.png";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const value = useContext(RiderContext);
  const { token, riderdata } = value;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [file, setFile] = useState(riderdata?.img_url);
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    state: "",
    city: "",
    img: "",
    driver_license_expiry_date: "",
    plate_no: "",
    profile_img: "",
  });

  console.log(formData);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log(formData);
  };

  // const handleChangeDisable = (e) => {
  //     e.preventDefault();
  //     setDisabled(false);
  //   };
  const handleCancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleSubmitChangeProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    // if(formData.address === formData.address || formData.fullname === formData.fullname || formData.state === formData.state) {
    //   setDisabled(true)
    //   return
    // }else{
    // console.log("fetching")
    // console.log(token)
    // console.log(JSON.parse(token))
    // console.log(formData.state)
    const bodyFormData = new FormData();

    bodyFormData.append("token", JSON.parse(token));
    bodyFormData.append("fullname", formData.fullname);
    bodyFormData.append("address", formData.address);
    bodyFormData.append("state", formData.state);
    bodyFormData.append("city", formData.city);
    bodyFormData.append("plate_no", formData.plate_no);
    bodyFormData.append("profile_img", file);

    axios
      .post(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_profile/edit_profile",
        bodyFormData,
        {
          headers: {
            "content-Type": "application/json",
          },
          // body :  JSON.stringify(bodyFormData),
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSuccess(res?.data?.msg);
          setLoading(false);
          console.log(res?.data);
          setTimeout(() => {
            setSuccess("");
            navigate("/agent-profile");
            window.location.reload();
          }, 4000);
        } else {
          setError("some error occured");
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 4000);
        }
      });
    // const formRes = await res.json()
    //   console.log(formRes)
    //   console.log(token)
    // if (res.status === 200){
    //   console.log(formRes)
    // }else{
    //   console.log('error occurred')
    // }

    // }
  };

  const onImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <div className="profile-page-bottom pad">
      <div className="bottom-wrapper">
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {" "}
          <span className="red-message">{error}</span>{" "}
          <span className="green-message">{success}</span>
        </p>
        <form className="shadow-profile-form">
          <br />
          <label htmlFor="fullname">Full name</label>
          <br />
          <input
            type="text"
            name="fullname"
            id="fullname"
            required
            className="shorter-form"
            onChange={handleChange}
          />
          {/* <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            /> */}
          <br />
          <label htmlFor="address">Address</label>
          <br />
          <input
            type="text"
            name="address"
            id="address"
            onChange={handleChange}
            required
            className="shorter-form"
          />
          <br />
          <label htmlFor="states">States</label>
          <br />
          <select
            name="state"
            id="states"
            onChange={handleChange}
            value={formData.state}
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
          <label htmlFor="city">city</label>
          <br />
          <input type="text" name="city" id="city" onChange={handleChange} />
          <br />
          <label htmlFor="driver_license_expiry_date">
            driver_license_expiry_date
          </label>
          <br />
          <input
            type="date"
            name="driver_license_expiry_date"
            id="driver_license_expiry_date"
            onChange={handleChange}
            required
            className="shorter-form"
          />
          <br />
          <br />
          <label htmlFor="plate_no">plate_no</label>
          <br />
          <input
            type="text"
            name="plate_no"
            id="plate_no"
            onChange={handleChange}
            required
            className="shorter-form"
          />
          <label htmlFor="profile_img">
            <div className="driverLicenseSelect-div">
              <div className="driverLicenseSelect">
                <img src={profileImage ? profileImage : addFile} />
              </div>
              <span className="driverLicenseSelect-span">
                {profileImage ? profileImage.name : "Upload New Profile Image"}
              </span>
              {/* <img src={profileImage} style={{width: "150px", height: "150px"}}/> */}
            </div>
          </label>
          {/* <input type="file" id="profile_img" name="profile_img"  className="imageSelect" accept='image/*' onChange={(e)=> setProfileImage(e.target.files[0])}/> */}
          <input
            type="file"
            id="profile_img"
            name="profile_img"
            className="imageSelect"
            accept="image/*"
            onChange={onImageChange}
          />
          <br />
          <div className="profile-confirm-btns">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="save-and-update-btn"
              onClick={handleSubmitChangeProfile}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color={"black"} loading={loading} size={15} />
              ) : (
                "Save and update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
