import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navsignedin from "../../javascript/UserNavsignedin";
import SideBar from "../../javascript/SideBar";
import "./loggedinmainpage.css";
import { InstantDeliverySummary1 } from "./InstantDeliverySummary";
import { useLocation } from "react-router-dom";

const LoggedinMainPage = (props) => {
  // const location = useLocation();
  // const Token = location.state.token;
  // console.log(Token);
  return (
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
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
            {/* <InstantDeliverySummary1 /> */}
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
