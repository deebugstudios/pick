import React, { useState } from "react";
import "../../usersFlow/NavsFlow/requestpickup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Instant from "../../Images/instant.png";
import Schedule from "../../Images/scheduled.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const PendingDeliveryList = (props) => {
  // const [select, setSelect] = useState(false);
  // const navigate = useNavigate();

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   setSelect(true);
  //   navigate("/pending-instant");
  // };

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
                <th>Parcel Name:</th>
                <td>{props?.parcelname}</td>
              </tr>
              <tr>
                <th>Delivery ID:</th>
                <td>{props?.parcelcode}</td>
              </tr>
            </table>
          </div>
          <div className="pending-delivery-pickup-actions">
            <div id="type-div-w">
              <img src={Instant} alt="" />
            </div>
            {/* <FontAwesomeIcon icon={faTimesCircle} /> */}
            {/* <Link to="/pending-instant"> */}
            <button onClick={props.click}>View Details</button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PendingDeliveryScheduled = (props) => {
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
                <th>Parcel Name:</th>
                <td>{props?.parcelname}</td>
              </tr>
              <tr>
                <th>Delivery ID:</th>
                <td>{props?.parcelcode}</td>
              </tr>
            </table>
          </div>
          <div className="pending-delivery-pickup-actions">
            <div id="type-div-w">
              <img src={Schedule} alt="" />
            </div>
            {/* <FontAwesomeIcon icon={faTimesCircle} /> */}
            <button onClick={props.click2}>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};
