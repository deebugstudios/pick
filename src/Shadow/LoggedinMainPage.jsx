import React, { useState } from "react";
import Navsignedin from "./javascripts/Navsignedin";
import SideBar from "./javascripts/SideBar";
import NavigationBar from "./javascripts/NavigationBar";
// import map from './images/maps.png'
import "./css/loggedinmainpage.css";
const LoggedinMainPage = (props) => {
  const [loggedin, setLoggedin] = useState(props.logged);
  return (
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        {loggedin ? <Navsignedin /> : <NavigationBar />}
      </div>
      <div className="user-right-side-main">
        {loggedin ? (
          <div className="sider-group">
            <SideBar />{" "}
          </div>
        ) : null}

        <div className="map-container">{props.name}</div>
      </div>
    </section>
  );
};

export default LoggedinMainPage;
