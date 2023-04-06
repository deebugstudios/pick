import React, { useContext, useState } from "react";
import Navsignedin from "./javascripts/Navsignedin";
import NavsignedinU from "../components/javascript/UserNavsignedin";
import SideBar from "./javascripts/SideBar";
import NavigationBar from "./javascripts/NavigationBar";
import UserIcon from "../components/Images/user.png";
// import map from './images/maps.png'
import "./css/loggedinmainpage.css";
import { Outlet } from "react-router-dom";
import Main from "./javascripts/Main";
import { Navigate } from "react-router-dom";
import { RiderContext } from "./Pages/Contexts/RiderContext";
import { userContext } from "./Pages/Contexts/RiderContext";
const LoggedinMainPage = (props) => {
  const [loggedin, setLoggedin] = useState(props.logged);
  const [sideBar, setSideBar] = useState(false);

  const value = useContext(RiderContext);
  const { token } = value;

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };
  return (
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        {token ? <Navsignedin siderBar={toggleSideBar} /> : <NavigationBar />}
      </div>
      <div className="user-right-side-main">
        {token ? (
          <div className={sideBar ? "sider-group-active" : "sider-groups"}>
            <SideBar toggle={sideBar} toggler={toggleSideBar} />{" "}
          </div>
        ) : null}

        <div className="map-container1">{props.name}</div>
      </div>
    </section>
  );
};

export default LoggedinMainPage;

export const LoggedinMainPage1 = (props) => {
  const value = useContext(RiderContext);
  const { typeAccount } = value;
  const [sideBar, setSideBar] = useState(false);
  const userValues = useContext(userContext);
  const { userName, email, userNumber, userImg } = userValues;
  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };
  return (
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        {typeAccount == "Agent" || typeAccount == "Fleet" ? (
          <Navsignedin siderBar={toggleSideBar} />
        ) : typeAccount == "user" ? (
          <NavsignedinU
            profile={
              <img
                src={
                  JSON.parse(userImg) !== "" ? JSON.parse(userImg) : UserIcon
                }
              />
            }
            siderBar={toggleSideBar}
          />
        ) : (
          <NavigationBar />
        )}
      </div>
      <div className="user-right-side-main">
        <div className="map-container">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
