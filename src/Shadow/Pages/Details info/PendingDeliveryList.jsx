import React from "react";
import "../Pending_deliveries/Pending_delivery_pickup/pendingdeliverypickup1.css";
import icons from "../../images/instanticon.png";
import { Link, Outlet } from "react-router-dom";
import "./pendingdeliverylist.css";
import p5 from "../../images/p5.png";
export const PendingDeliveryList = () => {
  return (
    <div className="pending-delivery-pickup-details-Container">
      <div className="pending-delivery-pickup-details-wrapper">
        <div className="pending-delivery-pickup-detail">
          <div className="pending-delivery-pickup-left">
            <div className="pending-delivery-pickup-img">
              <img src={p5} alt="" />
            </div>
            <table>
              <tr>
                <th>Parcel Name:</th>
                <td>Grocceries</td>
              </tr>
              <tr>
                <th>Delivery ID:</th>
                <td>7805097</td>
              </tr>
            </table>
          </div>
          <div className="pending-delivery-pickup-action">
            <div className="icon-img">
              {/* <Link to=""> */} <img src={icons} alt="icon" />{" "}
              {/* </Link> */}
            </div>
            <Link to="/Specificpickupdetails">
              <button className="delivery-list-btn">View Details</button>{" "}
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
