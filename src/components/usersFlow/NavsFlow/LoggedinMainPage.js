import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navsignedin from "../../javascript/UserNavsignedin";
import SideBar from "../../javascript/SideBar";
import "./loggedinmainpage.css";

const LoggedinMainPage = (props) => {
  return (
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
    <section className="user-dashboard-main">
      <div className="user-left-side-main">
        <Navsignedin />
      </div>
      <div className="user-right-side-main">
        <SideBar />
        <div className="content-wrap">
          <div id="content-pad">
            {props.file}
            {/* <Routes> */}
            {/* <Route path="/" element={<UsersProfile />} /> */}
            {/* </Routes> */}
          </div>
        </div>
      </div>
    </section>
    // </BrowserRouter>
  );
};

export default LoggedinMainPage;
