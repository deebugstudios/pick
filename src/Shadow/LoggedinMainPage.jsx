import React, { useContext, useState } from "react";
import Navsignedin from "./javascripts/Navsignedin";
import SideBar from "./javascripts/SideBar";
import NavigationBar from "./javascripts/NavigationBar";
// import map from './images/maps.png'
import "./css/loggedinmainpage.css";
import Main from "./javascripts/Main";
import { Navigate } from "react-router-dom";
import { RiderContext } from "./Pages/Contexts/RiderContext";
const LoggedinMainPage = (props) => {
  const [loggedin, setLoggedin] = useState(props.logged);
  const [sideBar, setSideBar ]= useState(false)
  
  const value = useContext(RiderContext);
  const { token } = value;


  const toggleSideBar = () => {
    setSideBar(!sideBar)
  }
  return (
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        {token ? <Navsignedin siderBar={toggleSideBar}/> : <NavigationBar />}
      </div>
      <div className="user-right-side-main">
        {token ? (
          <div className={sideBar? "sider-group-active":"sider-groups"}>
            <SideBar toggle={sideBar} toggler= {toggleSideBar}/>{" "}
          </div>
        ) : null}

      {token ? <div className="map-container1">{props.name}</div> : <Navigate to = "/main1"/>  }  
      </div>
    </section>
  );
};

export default LoggedinMainPage;

export const LoggedinMainPage1 = () => {
  return (
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        <NavigationBar />
      </div>
      <div className="user-right-side-main">
        <div className="map-container">{<Main />}</div>
      </div>
    </section>
  );
};
