import React from "react";
import "../Pending_deliveries/Pending_delivery_pickup/pendingdeliverypickup1.css";
import icons from "../../images/instanticon.png";
import icons2 from "../../images/scheduledicon.png";
import { Link, Outlet } from "react-router-dom";
import "./pendingdeliverylist.css";
import { useNavigate } from "react-router-dom";
import p5 from "../../images/p5.png";
export const PendingDeliveryDropoffList = (props) => {
  const navigate = useNavigate();
  console.log(props);
  const handleClick = (e) => {
    e.preventDefault();
    if (props.deliverytype == "instant") {
      navigate("/pending-instant");
    } else {
      navigate("/pending-scheduled");
    }
  };

  return (
    <div className="pending-delivery-pickup-details-Container">
      <div className="pending-delivery-pickup-details-wrapper">
        <div className="pending-delivery-pickup-detail">
          <div className="pending-delivery-pickup-left">
            <div className="pending-delivery-pickup-img">
              <img src={props?.deliveryimage} alt="" />
            </div>
            <table>
              <tr>
                <th>Item Name:</th>
                <td>{props?.parcelname}</td>
              </tr>
              <tr>
                <th>Delivery ID:</th>
                <td>{props?.parcelcode}</td>
              </tr>
            </table>
          </div>
          <div className="pending-delivery-pickup-action">
            <div className="icon-img">
              <Link to="">
                {" "}
                {props?.deliverytype == "instant" ? (
                  <img src={icons} alt="instant delivery" />
                ) : (
                  <img src={icons2} alt="scheduled delivery" />
                )}
              </Link>
            </div>
            {/* <Link to="/Specificpickupdetails"> */}
            <button className="delivery-list-btn" onClick={handleClick}>
              View Details
            </button>{" "}
            {/* </Link> */}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
