import React, { useState, useEffect, useContext } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navsignedin from "../../javascript/UserNavsignedin";
import SideBar from "../../javascript/SideBar";
import "./loggedinmainpage.css";
import { InstantDeliverySummary1 } from "./InstantDeliverySummary";
import { Outlet, useLocation } from "react-router-dom";
import UserIcon from "../../Images/user.png";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";

const LoggedinMainPageUser = (props) => {
  const [userDetails, setUserDetails] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const userValues = useContext(userContext);
  const { token } = userValues;

  const fetchUserDetails = async () => {
    const res = await fetch(
      `https://ancient-wildwood-73926.herokuapp.com/user_profile/user_profile`,
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
    const results = await data;
    // setLoading(false);

    // console.log(results);
    setUserDetails(results?.user);
    // console.log(userDetails);
    // pendingDeliveries.map((item) => console.log(item));
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        <Navsignedin
          profile={
            <img src={userDetails.img !== "" ? userDetails.img : UserIcon} />
          }
          siderBar={toggleSideBar}
        />
      </div>
      <div className="user-right-side-main">
        <div className="sider-group">
          {/* <div className={sideBar ? "sider-group-active" : "sider-groups"}> */}
          <SideBar
            profile={
              <img src={userDetails.img !== "" ? userDetails.img : UserIcon} />
            }
            username={userDetails.fullname}
            toggle={sideBar}
            toggler={toggleSideBar}
          />
        </div>
        <div className="content-wrap">
          <div id="content-pad">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoggedinMainPageUser;

export const LoggedinMainPage2 = (props) => {
  // const location = useLocation();
  // const Token = location.state.token;
  // console.log(Token);
  return (
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        <Navsignedin />
      </div>
      <div className="user-right-side-main">
        <div className="sider-group">
          <SideBar />
        </div>
        <div className="content-wrap">
          <div id="content-pad">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};
