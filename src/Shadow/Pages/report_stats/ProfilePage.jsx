import React, { useContext, useState } from "react";
import "./profilepage.css";
import driverlicense1 from "../../images/driverslicence.jpg";
import driverlicense2 from "../../images/driverslicence2.jpg";
import vechile1 from "../../images/lamborghini.jpg";
import vechile2 from "../../images/koenigseggagera.jpg";
import vechile3 from "../../images/hpcrizinger.jpg";
import passportphoto from "../../images/profilepic3.jpg";
import { RiderContext } from "../Contexts/RiderContext";
import { MainTop } from "./Profile_page_main_top/MainTop";
import { Outlet } from "react-router-dom";
const ProfilePage = () => {
  const value = useContext(RiderContext);
  const { riderdata } = value;
  // console.log(JSON.parse(riderdata.phone_no) , riderdata.phone_no);

  const [formData, setFormData] = useState({
    fullname: riderdata?.fullname,
    address: riderdata?.address,
    email: riderdata?.email,
    number: parseInt(riderdata?.phone_no),
    state: riderdata?.state,
  });
  // const [formData2, setFormData2] = useState({
  //   vehicleType: riderdata.vehicle_details[0].type,
  //   fleetID: "",
  //   plateNumber: riderdata.vehicle_details[0].plate_no,
  //   vehicleColor: riderdata.vehicle_details[0].color,
  //   agentId: "",
  //   driverLicense: riderdata.vehicle_details[0].driver_license_expiry_date,
  //   riderdata.vehicle_details.map((detail)=> {
  //     return {detail}
  //   })
  //   const [formData2, setFormData2] = useState({
  //     vehicleColor: detail.color
  // })

  // })

  // const [fullname, setFullname] = useState(riderdata?.fullname)

  // const [address, setAddress] = useState(riderdata?.address)
  // const [email, setEmail] = useState(riderdata?.email)
  // const [number, setNumber] = useState(riderdata?.phone_no)
  // const [state, setState] = useState(riderdata?.state)
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    e.preventDefault();
    //  setFullname( [name]=e.target.value);
    //  setNumber(e.target.value);
    //  setAddress(e.target.value);
    //  setState(e.target.value);

    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleChangeDisable = (e) => {
    e.preventDefault();
    setDisabled(false);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setDisabled(true);
  };
  // console.log(riderdata.phone_no);
  // const ridervechile = riderdata?.vehicle_details.map((details) =>
  //   details
  // )
  const vehcileImages = riderdata?.vehicle_details?.img_urls.map(
    (image, index) => {
      return (
        <div className="front-side skeleton" key={index}>
          <img src={image} alt="" />
        </div>
      );
    }
  );

  // console.log(ridervechile)
  return (
    // <div className="white">
    <div className=" profile-page-container">
      <MainTop riderdata={riderdata} />
      <div className="profile-page-bottom">
        <div className="bottom-wrapper">
          <form className="shadow-profile-form">
            <label htmlFor="fullname">Full name</label>
            <br />
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData?.fullname}
              disabled={disabled}
              required
              className="shorter-form"
              onChange={handleChange}
            />
            <button className="change-btn" onClick={handleChangeDisable}>
              change
            </button>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              disabled
              value={formData?.email}
            />
            <br />
            <label htmlFor="number">Phone Number</label>
            <br />
            <input
              type="number"
              name="number"
              id="number"
              value={formData?.number}
              disabled={disabled}
              onChange={handleChange}
              required
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
              value={formData?.address}
              onChange={handleChange}
              disabled={disabled}
              required
              className="shorter-form"
            />
            <button className="change-btn" onClick={handleChangeDisable}>
              change
            </button>
            <br />
            <label htmlFor="states">States</label>
            <br />
            <select
              name="state"
              id="states"
              value={formData?.state}
              onChange={handleChange}
            >
              <option value="Edo">Edo</option>
              <option value="Lagos">Lagos</option>
              <option value="Edo">Edo</option>
              <option value="Edo">Edo</option>
              <option value="Edo">Edo</option>
              <option value="Edo">Edo</option>
              <option value="Edo">Edo</option>
            </select>
            <br />
            <div className="profile-confirm-btns">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="save-and-update-btn">
                Save and update
              </button>
            </div>
          </form>
        </div>
        <div className="vechile-details">
          <h5>Vehicle registration details</h5>

          <div className="vechile-forms">
            <form className="vechile-details-form1">
              <label htmlFor="">Fleet ID</label> <br />
              <input type="text" name="fleetID" id="" value={"Nil"} disabled />
              <br />
              <label htmlFor="">Vehicle Type</label> <br />
              <input
                type="text"
                name="vehicleType"
                id=""
                value={riderdata?.vehicle_details?.type}
                disabled
              />{" "}
              <br />
              <label htmlFor="">Plate number</label> <br />
              <input
                type="text"
                name="plateNumber"
                id=""
                value={riderdata?.vehicle_details?.plate_no}
                disabled
              />
            </form>
            <form className="vechile-details-form2">
              <label htmlFor="">Agent ID</label> <br />
              <input
                type="text"
                name="agentId"
                id=""
                value={"56747"}
                disabled
              />{" "}
              <br />
              <label htmlFor="">Vehicle color</label> <br />
              <input
                type="text"
                name="vehicleColor"
                id=""
                value={riderdata?.vehicle_details?.color}
                disabled
              />
              <br />
              <label htmlFor="">Drivers license expiry date</label> <br />
              <input
                type="text"
                name="driverLicense"
                id=""
                value={
                  riderdata?.vehicle_details?.driver_license_expiry_date
                }
                disabled
              />
            </form>
          </div>
          <div className="driver-passport-pictures">
            <h6>Passport/Selfie</h6>
            <div className="driver-passport skeleton">
              <img src={passportphoto} alt="driver passport" />
            </div>
            <h6>Drivers license</h6>
            <div className="driver-driver-license">
              <div className="front-side skeleton">
                <img
                  src={riderdata?.vehicle_details?.img_urls?.[1]}
                  alt=""
                />
              </div>
              <div className="back-side skeleton">
                <img
                  src={riderdata?.vehicle_details?.img_urls?.[2]}
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
        </div>
      </div>
      <Outlet />
    </div>
    // </div>
  );
};

export default ProfilePage;
