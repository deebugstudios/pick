import React, {useContext} from "react";
import "../css/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBiking,
  faTimesCircle,
  faNoteSticky,
  faSignOut,
  faCreditCard,
  faCreditCardAlt,
} from "@fortawesome/free-solid-svg-icons";
import bikeicon from '../images/bikeicon.png'
import cashicon from '../images/cashicon.png'
import historyicon from '../images/historyicon.png'
import reporticon from '../images/reporticon.png'
import { Link, NavLink, Outlet } from "react-router-dom";
import profileimage from "../images/profileimage.png";
import { RiderContext } from "../Pages/Contexts/RiderContext";
import ClipLoader from "react-spinners/ClipLoader";

const SideBar = (props) => {
  const value = useContext(RiderContext);
  const { riderdata, loading } = value;
  return (
    <section className={props.toggle? "sider-group-active" :"side-bar"}>
    
      <div className="side-bar-links">
        <ul>
          {/* <Link to="/Deliveryrequest">
            <li>
              <FontAwesomeIcon icon={faHome} className="space-icons " />
              Delivery Request
            </li>{" "}
          </Link>
          <Link to="/pendingdeliveries">
            <li>
              <img src={bikeicon} className="sidebar-icons space-icons " />
             
              Pending Deliveries
            </li>
          </Link> */}
              {/* <li> */}
              <NavLink style={({isActive})=>({ backgroundColor: isActive ? "#E8F4E3" : "white" })} to="/deliveryhistory" onClick={props.toggler}>
                <li>
                    <img src={historyicon} className="sidebar-icons space-icons" />
                        Delivery History
                </li>

              </NavLink>
              {/* </li> */}
              {/* <li> */}
                <NavLink style={({isActive})=>({ backgroundColor: isActive ? "#E8F4E3" : "white" })} to="/agent-profile" onClick={props.toggler}>
                <div className="side-bar-profile-details">
                    <div className="side-bar-profile-img skeleton">
                     {loading ?   <ClipLoader color={"#1AA803"} loading={loading} cssOverride={{margin:"10px 10px"}} size={30} /> : <img src={riderdata?.img_url}  /> }  
                    </div>
                    <div className="side-bar-profile-name">
                      <h5>{riderdata?.fullname}</h5>
                      <p>View Profile</p>
                    </div>
                </div>
                </NavLink>
              {/* </li> */}
          {/* <Link to="/Chatwithadmin">
            <li>
              <img src={reporticon} className="sidebar-icons space-icons" />
              
              Chat with Admin
            </li>
          </Link> */}
        {/* </ul>

        <ul> */}
              {/* <li>
              <Link to="/agent-profile">
          <div className="side-bar-profile-details" onClick={props.toggler}>
            <div className="side-bar-profile-img skeleton">
                <img src={riderdata?.img_url} alt="profile image" />
            </div>
                <div className="side-bar-profile-name">
                  <h5>{riderdata?.fullname}</h5>
                  <p>View Profile</p>
                </div>
          </div>
            </Link>
              </li> */}

              {/* <li>
                <NavLink style={({isActive})=>({ backgroundColor: isActive ? "#E8F4E3" : "white" })} to="/agent-profile">
                <div className="side-bar-profile-details" onClick={props.toggler}>
                    <div className="side-bar-profile-img skeleton">
                        <img src={riderdata?.img_url} alt="profile image" />
                    </div>
                    <div className="side-bar-profile-name">
                      <h5>{riderdata?.fullname}</h5>
                      <p>View Profile</p>
                    </div>
                </div>
                </NavLink>
              </li> */}




              {/* <li> */}
              <NavLink style={({isActive})=>({ backgroundColor: isActive ? "#E8F4E3" : "white" })} to="/payment-details"  onClick={props.toggler}>
                  <li>
                
                      <img src={cashicon} className="sidebar-icons space-icons" />
                      Payment details
                  </li>
              </NavLink>
              {/* </li> */}
          

                {/* <li> */}
              <NavLink style={({isActive})=>({ backgroundColor: isActive ? "#E8F4E3" : "white" })} to="/agent-logout" onClick={props.toggler}>
                  <li >
                      <FontAwesomeIcon icon={faSignOut} className="space-icons" />
                        Log out
                  </li>
              </NavLink>
                {/* </li> */}
          {/* <Link to="/agent-logout">
            
            <li onClick={props.toggler}>
             
              <FontAwesomeIcon icon={faSignOut} className="space-icons" />
              Log out
            </li>
          </Link> */}
        </ul>
        {/* <Outlet /> */}
      </div>
    </section>
  );
};

export default SideBar;
