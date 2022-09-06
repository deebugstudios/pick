import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBars } from "@fortawesome/free-solid-svg-icons";
import "../css/navsignedin.css";
import { Link } from "react-router-dom";
import Pickload from "../../components/Images/pickload.png";
import { RiderContext } from "../Pages/Contexts/RiderContext";
import ClipLoader from "react-spinners/ClipLoader";

const Navsignedin = (props) => {
  const value = useContext(RiderContext);
  const { riderdata, loading } = value;
  
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
            <Link to="/">Home</Link>
            <li>
              <Link to="/aboutUS"> About Us </Link>
            </li>
            <li>
              <Link to="/contactUS"> Contact Us </Link>
            </li>
            <li className="hover-me">
              <a href="">
                My Account <FontAwesomeIcon icon={faAngleDown} />
              </a>
              <div className="sub-menu">
                <ul>
                  {/* <li>Pending deliveries</li> */}
                  <Link to="/deliveryhistory">
                  <li>Delivery history</li>
                  </Link>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="profile">
        <Link to="/agent-profile">
        <div className="profile-img skeleton">
        {loading ?   <ClipLoader color={"#1AA803"} loading={loading} cssOverride={{margin:"5px 5px"}} size={25} /> : <img src={riderdata?.img_url}  /> }
          </div>
          </Link>
          {/* <div className="notification"> */}
            {/* <FontAwesomeIcon icon={faBell} className="notification-bell" /> */}
            {/* <li className="siderbar-small" onClick={props.siderBar}>X</li> */}
            <FontAwesomeIcon icon={faBars} className="siderbar-small" onClick={props.siderBar}/>
            {/* <span>3</span> */}
          {/* </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navsignedin;
