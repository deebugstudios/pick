import React, { useState, useEffect, useContext } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavsignedinU from "../../javascript/UserNavsignedin";
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
  const { userName, email, userNumber, userImg } = userValues;

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        <NavsignedinU
          profile={
            <img
              src={JSON.parse(userImg) !== "" ? JSON.parse(userImg) : UserIcon}
            />
          }
          siderBar={toggleSideBar}
        />
      </div>
      <div className="user-right-side-main">
        <div className="sider-group">
          {/* <div className={sideBar ? "sider-group-active" : "sider-groups"}> */}
          <SideBar
            profile={
              <img
                src={
                  JSON.parse(userImg) !== "" ? JSON.parse(userImg) : UserIcon
                }
              />
            }
            username={JSON.parse(userName)}
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
        <NavsignedinU />
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
