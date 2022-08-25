import React, { useState } from "react";
import Instant from "../../Images/instant.png";
import Schedule from "../../Images/scheduled.png";
import Cancel from "../../Images/cancel.png";
import "../../css/userprofile.css";
import Button from "../../javascript/Button";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserIcon from "../../Images/user-regular.svg";
import { useNavigate } from "react-router-dom";

export default function UsersProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const fetchUserStats = async () => {
    const res = await fetch(
      "https://protected-temple-21445.herokuapp.com/user_profile/user_stats",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZmOWRjMTIwZjFmYzlhNjRjNzg2YjIiLCJwaG9uZV9ubyI6IjgwNjU4Njk1MDEiLCJpYXQiOjE2NjExMDY0MTh9.HJZDyNXDZqIxwgW8jni0RVJalip1jij3TtxELLy0vc8",
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setLoading(false);
    console.log(results);
    setUserStats(results?.stats);
    // pendingDeliveries.map((item) => console.log(item));
  };
  const fetchUserDetails = async () => {
    const res = await fetch(
      "https://protected-temple-21445.herokuapp.com/user_profile//user_profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZmOWRjMTIwZjFmYzlhNjRjNzg2YjIiLCJwaG9uZV9ubyI6IjgwNjU4Njk1MDEiLCJpYXQiOjE2NjExMDY0MTh9.HJZDyNXDZqIxwgW8jni0RVJalip1jij3TtxELLy0vc8",
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setLoading(false);

    // console.log(results);
    setUserDetails(results?.user);
    // console.log(userDetails);
    // pendingDeliveries.map((item) => console.log(item));
  };

  useEffect(() => {
    fetchUserStats();
    fetchUserDetails();
  }, []);
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

          <form id="user-info-form">
            <label htmlFor="fullname">Full name</label>
            <div className="user-info-div">
              <input
                name="fullname"
                value={userDetails.fullname}
                className="user-info"
                disabled={true}
              />
              <span
                className="change-prof"
                // onClick={() => {
                //   navigate("/user/change");
                // }}
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
              <input
                name="phonenumber"
                value={userDetails.phone_no}
                className="user-info"
                disabled={true}
              />
              <span
                className="change-prof"
                // onClick={() => {
                //   navigate("/user/change");
                // }}
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
