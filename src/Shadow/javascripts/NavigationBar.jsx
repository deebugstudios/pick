import React from "react";
import "../css/navigationBar.css";
import { Link, useNavigate } from "react-router-dom";
import Pickload from "../../components/Images/pickload.png";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="agent-nav">
      <div className="nav-wrapper">
        <div id="pick-div">
          <Link to="/">
            <img src={Pickload} alt="" />
          </Link>
        </div>
        <div className="nav-links">
          <ul>
            <Link to="/">
              <li>
                <a href="">Home</a>
              </li>
            </Link>
            <li>
              <Link to="/aboutUS"> About Us </Link>
            </li>
            <li>
              <Link to="/contactUS"> Contact Us </Link>
            </li>
          </ul>
        </div>
        <div className="btns">
          <Link to="/login-as">
            <button className="login-btn">Log in</button>
          </Link>
          <Link to="/join">
            <button className="signup-btn">Sign up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
