import React, { useContext, useRef, useState } from "react";
import Instant from "../../Images/instant.png";
import Schedule from "../../Images/scheduled.png";
import Cancel from "../../Images/cancel.png";
import "../../css/userprofile.css";
import Button from "../../javascript/Button";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserIcon from "../../Images/user.png";
import { useNavigate } from "react-router-dom";
import Flag from "../../Images/Nigerian_flag.png";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default function UsersProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [changeActive, setChangeActive] = useState(true);
  const [userName, setUserName] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSrc, setSelectedSrc] = useState("");
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

    sessionStorage.setItem(
      "pickload_userName",
      JSON.stringify(data?.user.fullname)
    );
    sessionStorage.setItem("pickload_userImg", JSON.stringify(data?.user.img));
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

    const bodyFormData = new FormData();
    bodyFormData.append("fullname", userName);
    bodyFormData.append("image", selectedFile);
    bodyFormData.append("token", JSON.parse(token));

    axios
      .post(
        "https://ancient-wildwood-73926.herokuapp.com/user_profile/edit",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      .then((response) => {
        if (response.status === 200) {
          fetchUserDetails();
          alert("Profile Updated Successfully");
          setLoadButton(false);
          setChangeActive(true);

          window.location.reload(true);
        } else {
          setLoadButton(false);
        }
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
        setLoadButton(false);
      });
  };

  const onFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        setSelectedSrc(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setIsSelected(true);
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
                  src={
                    isSelected
                      ? selectedSrc
                      : userDetails.img !== ""
                      ? userDetails.img
                      : UserIcon
                  }
                />{" "}
              </div>
            </div>
            <button style={{ border: "none" }}>
              <label>
                Change Profile Image
                <input
                  onChange={onFileChange}
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif"
                  name="selectedFile"
                  className="change-image-pro"
                />
              </label>
            </button>
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

            <div className="nedu-form-profile">
              <form id="user-info-form" onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full name</label>
                <div className="nedu-info-div">
                  <div className="user-info-div bottom-marg">
                    <input
                      name="fullname"
                      value={userName}
                      className="nedu-info-div"
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
                </div>
                {/* <br /> */}

                <label htmlFor="email">Email</label>
                <div className="nedu-info-div bottom-marg">
                  <div className="user-info-div">
                    <input
                      name="email"
                      value={userDetails.email}
                      className="user-info nedu-info-div"
                      disabled={true}
                    />
                    <span className="change-prof-hidden">change</span>
                  </div>
                </div>
                {/* <br /> */}

                <label htmlFor="phonenumber">Phone number</label>
                <div className="nedu-info-div bottom-marg">
                  <div className="delivery-location-input">
                    <img src={Flag} alt="" className="flag-icon" />
                    <span className="text-icon">+234</span>
                    <div className="user-info-div">
                      <input
                        name="phonenumber"
                        value={userDetails.phone_no}
                        className="phone-input nedu-info-div"
                        disabled={true}
                      />
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
                  </div>
                </div>
                {/* <br /> */}

                <Button name="Save and Update" loading={loadButton} />
              </form>
            </div>
            <br />
          </div>
        </div>
      </>
    );
}
