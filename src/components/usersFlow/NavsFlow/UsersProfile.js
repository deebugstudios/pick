import React, { useRef, useState } from "react";
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

export default function UsersProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [changeActive, setChangeActive] = useState(true);
  const [userName, setUserName] = useState("");
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
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBlNjdiODQ1M2EzNzIyMjc1N2I3OGMiLCJwaG9uZV9ubyI6IisyMzQ4MTU3NTQyODIwIiwiaWF0IjoxNjYxODg4NDUzfQ.ZcLApAMCMxmo17pp17Bu9nJ0d_G_vvkhfZekLrrkjis",
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
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBlNjdiODQ1M2EzNzIyMjc1N2I3OGMiLCJwaG9uZV9ubyI6IisyMzQ4MTU3NTQyODIwIiwiaWF0IjoxNjYxODg4NDUzfQ.ZcLApAMCMxmo17pp17Bu9nJ0d_G_vvkhfZekLrrkjis",
        }),
      }
    );
    const data = await res.json();
    setLoading(false);

    // console.log(results);
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

    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_profile/edit",
        {
          method: "POST",

          body: JSON.stringify({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBlNjdiODQ1M2EzNzIyMjc1N2I3OGMiLCJwaG9uZV9ubyI6IisyMzQ4MTU3NTQyODIwIiwiaWF0IjoxNjYxODg4NDUzfQ.ZcLApAMCMxmo17pp17Bu9nJ0d_G_vvkhfZekLrrkjis",
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
        navigate("/user/user-profile");
      } else {
        // setMessage("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="user-info-back">
        <div id="profile-wrapper">
          <p>My profile</p>
          <div id="profile-picture-merge">
            <div className="user-image">
              <img src={userDetails.img !== "" ? userDetails.img : UserIcon} />{" "}
            </div>
          </div>
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
            <div className="user-info-div">
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
            <br />

            <label htmlFor="email">Email</label>
            <div className="user-info-div">
              <input
                name="email"
                value={userDetails.email}
                className="user-info"
                disabled={true}
              />
            </div>
            <br />

            <label htmlFor="phonenumber">Phone number</label>
            <div className="user-info-div">
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
            <br />

            <Button name="Save and Update" />
          </form>
          <br />
        </div>
      </div>
    </>
  );
}
