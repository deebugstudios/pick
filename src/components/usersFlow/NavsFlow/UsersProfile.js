import React, { useContext, useRef, useState } from "react";
import Instant from "../../Images/instant.png";
import Schedule from "../../Images/scheduled.png";
import Cancel from "../../Images/cancel.png";
import "../../css/userprofile.css";
import Button from "../../javascript/Button";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserIcon from "../../Images/user-regular.svg";
import { useNavigate } from "react-router-dom";
import Flag from "../../Images/Nigerian_flag.png";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import { ClipLoader } from "react-spinners";

export default function UsersProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [changeActive, setChangeActive] = useState(true);
  const [userName, setUserName] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const userValues = useContext(userContext);
  const { token } = userValues;

  const inputRef = useRef();

  const fetchUserStats = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_profile/user_stats",
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
    setLoading(false);
    // console.log(results);
    setUserStats(data?.stats);
    // pendingDeliveries.map((item) => console.log(item));
  };
  const fetchUserDetails = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_profile/user_profile",
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
    setLoading(false);

    // console.log(data);
    setUserDetails(data?.user);
    setUserName(data?.user.fullname);
  };

  // ;

  // setUserName(user);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    fetchUserStats();
    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadButton(true);
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_profile/edit",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            fullname: userName,
            image: "",
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
        // navigate("/user/user-profile");
        alert("Profile Updated Successfully");
        setLoadButton(false);
      } else {
        setLoadButton(false);
        // setMessage("Error occured");
      }
    } catch (error) {
      // console.log(error);
      setLoadButton(false);
    }
  };

  if (loading === true) {
    return (
      <div className="loader-screen">
        <ClipLoader color={"#1AA803"} loading={loading} size={100} />
        <p>Loading...</p>
      </div>
    );
  } else
    return (
      <>
        <div id="user-info-back">
          <div id="profile-wrapper">
            <p>My profile</p>
            <div id="profile-picture-merge">
              <div className="user-image bottom-marg">
                <img
                  src={userDetails.img !== "" ? userDetails.img : UserIcon}
                />{" "}
              </div>
            </div>
            <label>
              Change Profile Image
              <input
                // onChange={onFileChange}
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                name="selectedFile"
                className="change-image-pro"
              />
            </label>
            <div id="img-flex">
              <div className="img-border">
                <div className="img-size-div">
                  <img src={Instant} alt="" className="img-size" />
                </div>
                <p>
                  {userStats.total_instant_deliveries} Instant
                  <br /> Deliveries
                </p>
              </div>

              <div className="img-border">
                <div className="img-size-div">
                  <img src={Schedule} alt="" className="img-size" />
                </div>
                <p>
                  {userStats.total_scheduled_deliveries} Scheduled
                  <br /> Deliveries
                </p>
              </div>

              <div className="img-border">
                <div className="img-size-div">
                  <img src={Cancel} alt="" className="img-size" />
                </div>
                <p>
                  {userStats.total_cancelled_deliveries} Cancelled
                  <br /> Deliveries
                </p>
              </div>
            </div>

            <form id="user-info-form" onSubmit={handleSubmit}>
              <label htmlFor="fullname">Full name</label>
              <div className="user-info-div bottom-marg">
                <input
                  name="fullname"
                  value={userName}
                  onChange={handleChange}
                  style={{
                    backgroundColor: changeActive ? "#ececec" : "white",
                    border: changeActive ? "none" : "1px solid black",
                  }}
                  disabled={changeActive}

                  // autoFocus
                />
                <span
                  className="change-prof"
                  onClick={() => {
                    setChangeActive(false);
                  }}
                >
                  change
                </span>
              </div>
              {/* <br /> */}

              <label htmlFor="email">Email</label>
              <div className="user-info-div bottom-marg">
                <input
                  name="email"
                  value={userDetails.email}
                  className="user-info"
                  disabled={true}
                />
              </div>
              {/* <br /> */}

              <label htmlFor="phonenumber">Phone number</label>
              <div className="user-info-div bottom-marg">
                <div className="delivery-location-input">
                  <img src={Flag} alt="" className="flag-icon" />
                  <span className="text-icon">+234</span>
                  <input
                    name="phonenumber"
                    value={userDetails.phone_no}
                    className="user-info phone-input"
                    disabled={true}
                  />
                </div>
                <span
                  className="change-prof"
                  onClick={() => {
                    navigate("/user/change", {
                      state: { phone: userDetails.phone_no },
                    });
                  }}
                >
                  change
                </span>
              </div>
              {/* <br /> */}

              <Button name="Save and Update" loading={loadButton} />
            </form>
            <br />
          </div>
        </div>
      </>
    );
}
