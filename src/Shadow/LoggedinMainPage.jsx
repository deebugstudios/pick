import React, { useContext, useState, useEffect } from "react";
import Navsignedin from "./javascripts/Navsignedin";
import NavsignedinU from "../components/javascript/UserNavsignedin";
import SideBar from "./javascripts/SideBar";
import SideBarU from "../components/javascript/SideBar";
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
  const [side, setSide] = useState(false);
  const userValues = useContext(userContext);
  const { userName, email, userNumber, userImg } = userValues;
  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {
    function handleResize() {
      if (document.documentElement.clientWidth <= 1000) {
        setSide(true);
      } else {
        setSide(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
            name={JSON.parse(userName)}
          />
        ) : (
          <NavigationBar />
        )}
      </div>
      <div className="user-right-side-main">
        {side ? (
          typeAccount == "Agent" || typeAccount == "Fleet" ? (
            <div className={sideBar ? "sider-group-active" : "sider-groups"}>
              <SideBar toggle={sideBar} toggler={toggleSideBar} />
            </div>
          ) : typeAccount == "user" ? (
            <div className={sideBar ? "sider-group-active" : "sider-groups"}>
              <SideBarU
                profile={
                  <img
                    src={
                      JSON.parse(userImg) !== ""
                        ? JSON.parse(userImg)
                        : UserIcon
                    }
                  />
                }
                username={JSON.parse(userName)}
                toggle={sideBar}
                toggler={toggleSideBar}
              />
            </div>
          ) : (
            <null />
          )
        ) : null}
        <div className="map-container">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
