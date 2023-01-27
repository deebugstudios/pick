import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Login_Header from "../../pages/logout/Login_Header";
import "../css/change_number.css";
import Nigerianflag from "../Images/Nigerian_flag.png";
import Flag from "../Images/Nigerian_flag.png";
import Button from "../javascript/Button";
import Arrow from "../Images/Arrow.png";
import { userContext } from "../../Shadow/Pages/Contexts/RiderContext";

export default function Change_Number() {
  const location = useLocation();
  const navigate = useNavigate();

  const [newNo, setNewNo] = useState("");
  const [newNoError, setNewNoError] = useState("");
  const userValues = useContext(userContext);
  const { token, userId } = userValues;

  const handleChange = (e) => {
    setNewNo(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (!newNo) {
      setNewNoError("Please enter a new Phone Number");
    }
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_auth/change_phone_no",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            old_phone_no: phone_no,
            new_phone_no: newNo,
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
        // setPopupButton(true);
        navigate("/user/user-profile");
      } else {
        // setMessage("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const phone_no = location.state.phone;
  return (
    <>
      <div className="change_no">
        <div
          id="number-arrow-div"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={Arrow} alt="" />
        </div>

        <div className="change_no-text">Change Phone Number</div>
        <div className="nedu-form-profile">
          <form id="user-info-form" onSubmit={handleSubmit}>
            <label htmlFor="phonenumber">Exisiting phone number</label>
            <div className="nedu-info-div bottom-marg">
              <div className="delivery-location-input">
                <img src={Flag} alt="" className="flag-icon" />
                <span className="text-icon">+234</span>
                <div className="user-info-div">
                  <input
                    name="phonenumber"
                    value={phone_no}
                    className="phone-input nedu-info-div"
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            <label htmlFor="phonenumber">New phone number</label>
            <div className="nedu-info-div bottom-marg">
              <div className="delivery-location-input">
                <img src={Flag} alt="" className="flag-icon" />
                <span className="text-icon">+234</span>
                <div className="user-info-div">
                  <input
                    name="phonenumber"
                    value={newNo}
                    onChange={handleChange}
                    className="phone-input nedu-info-div"
                    type="number"
                    // pattern=""
                    maxLength="10"
                    // max={10}
                  />
                </div>
              </div>
              <p className="error-style">{newNoError}</p>
            </div>

            <div id="center-button-1">
              <Button name="Save and update" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
