import React from "react";
import logo from "../images/pickloadlogo.png";
import "../css/navigationBar.css";
const navigationBar = () => {
  return (
    <nav className="agent-nav">
      <div className="nav-wrapper">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="btns">
          <button className="login-btn">Log in</button>
          <button className="signup-btn">Sign up</button>
        </div>
      </div>
    </nav>
  );
};

export default navigationBar;
