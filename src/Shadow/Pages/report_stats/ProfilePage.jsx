import React, { useContext } from "react";
import "./profilepage.css";
import personprofileicon from "../../images/profilepersonicon.png";
import staricon from "../../images/staricon.png";
import driverlicense1 from "../../images/driverslicence.jpg";
import driverlicense2 from "../../images/driverslicence2.jpg";
import vechile1 from "../../images/lamborghini.jpg";
import vechile2 from "../../images/koenigseggagera.jpg";
import vechile3 from "../../images/hpcrizinger.jpg";
import passportphoto from "../../images/profilepic3.jpg";
import { RiderContext } from "../Contexts/RiderContext";
const ProfilePage = () => {
  const value = useContext(RiderContext);
  const { riderdata, loading } = value;
  console.log(riderdata.phone_no);
  // const ridervechile = riderdata?.vehicle_details.map((details) =>
  //   details
  // )
  // console.log(ridervechile)
  return (
    <div className=" profile-page-container">
      <div className="profile-page-top">
        <div className="pages">
          <h3>PROFILE INFORMATION</h3>
          <div className="profile-icons">
            <div className="half-circle green-color"></div>
            <img src={personprofileicon} alt="icon" />
          </div>
        </div>
        <div className="pages">
          <h3>FLEET EARNINGS</h3>
          <div className="profile-icons">
            <div className="half-circle yellow-color"></div>
            <img src={personprofileicon} alt="icon" />
          </div>
        </div>
        <div className="pages">
          <h3>FLEET STATISTICS</h3>
          <div className="profile-icons">
            <div className="half-circle gray-color"></div>
            <img src={personprofileicon} alt="icon" />
          </div>
        </div>
        <div className="pages">
          <h3>MY RATING </h3>
          <span>4.5</span>
          <div className="profile-icons">
            <div className="half-circle green-color"></div>
            <img src={staricon} alt="icon" />
          </div>
        </div>
        <div className="pages span-two">
          <h3>MY FLEET</h3>
          <div className="profile-icons">
            <div className="half-circle yellow-color"></div>
            <img src={personprofileicon} alt="icon" />
          </div>
          <div className="transportations">
            <ul>
              <li>25 Bikes</li>
              <li>12 Cars</li>
            </ul>
            <ul>
              <li>5 Buses</li>
              <li>0 Trucks</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="profile-page-bottom">
        <div className="bottom-wrapper">
          <form className="shadow-profile-form">
            <label htmlFor="fullname">Full name</label>
            <br />
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={riderdata.fullname}
              disabled
              required
              className="shorter-form"
            />
            <button className="change-btn">change</button>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              disabled
              value={"James Usifoh@gmail.com"}
            />
            <br />
            <label htmlFor="number">Phone Number</label>
            <br />
            <input
              type="number"
              name="number"
              id="number"
              value={riderdata.phone_no}
              disabled
              required
              className="shorter-form"
            />
            <button className="change-btn">change</button>
            <br />
            <label htmlFor="address">Address</label>
            <br />
            <input
              type="text"
              name="address"
              id="address"
              value={riderdata.address}
              disabled
              required
              className="shorter-form"
            />
            <button className="change-btn">change</button>
            <br />
            <label htmlFor="states">States</label>
            <br />
            <select name="state" id="states" value={riderdata?.state}>
              <option value="Edo">Edo</option>
              <option value="Lagos">Lagos</option>
              <option value="Edo">Edo</option>
              <option value="Edo">Edo</option>
              <option value="Edo">Edo</option>
              <option value="Edo">Edo</option>
              <option value="Edo">Edo</option>
            </select>{" "}
            <br />
            <div className="profile-confirm-btns">
              <button className="cancel-btn">Cancel</button>
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
              <input type="text" name="" id="" value={"Nil"} disabled />
              <br />
              <label htmlFor="">Vehicle Type</label> <br />
              <input
                type="text"
                name=""
                id=""
                value={"Toyota Corolla"}
                disabled
              />{" "}
              <br />
              <label htmlFor="">Plate number</label> <br />
              <input type="text" name="" id="" value={"LSR686KJ"} disabled />
            </form>
            <form className="vechile-details-form2">
              <label htmlFor="">Agent ID</label> <br />
              <input type="text" name="" id="" value={"56747"} disabled />{" "}
              <br />
              <label htmlFor="">Vehicle color</label> <br />
              <input type="text" name="" id="" value={"White"} disabled />{" "}
              <br />
              <label htmlFor="">Drivers license expiry date</label> <br />
              <input type="text" name="" id="" value={"12/09/2024"} disabled />
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
                <img src={driverlicense1} alt="" />
              </div>
              <div className="back-side skeleton">
                <img src={driverlicense2} alt="" />
              </div>
            </div>
            <h6>Vehicle image</h6>
            <div className="driver-driver-license">
              <div className="front-side skeleton">
                <img src={vechile1} alt="" />
              </div>
              <div className="back-side skeleton">
                <img src={vechile2} alt="" />
              </div>
              <div className="back-side skeleton">
                <img src={vechile3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
