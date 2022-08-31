import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navsignedin from "../../javascript/UserNavsignedin";
import SideBar from "../../javascript/SideBar";
import "./loggedinmainpage.css";
import { InstantDeliverySummary1 } from "./InstantDeliverySummary";
import { Outlet, useLocation } from "react-router-dom";
import UserIcon from "../../Images/user-regular.svg";

const LoggedinMainPageUser = (props) => {
  const [userDetails, setUserDetails] = useState([]);

  const fetchUserDetails = async () => {
    const res = await fetch(
      `https://ancient-wildwood-73926.herokuapp.com/user_profile/user_profile`,
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
  return (
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        <Navsignedin
          profile={
            <img src={userDetails.img !== "" ? userDetails.img : null} />
          }
        />
      </div>
      <div className="user-right-side-main">
        <div className="sider-group">
          <SideBar
            profile={
              <img src={userDetails.img !== "" ? userDetails.img : null} />
            }
            username={userDetails.fullname}
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
