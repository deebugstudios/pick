import React from "react";
import "../Pending_deliveries/Pending_delivery_pickup/pendingdeliverypickup1.css";
import icons from "../../images/instanticon.png";
import icons2 from "../../images/scheduledicon.png";
import "./pendingdeliverylist.css";
import p5 from "../../images/p5.png";
export const DeliveryHistoryList = (props) => {
  // console.log(props);
  return (
    <div className="pending-delivery-pickup-details-Container">
      <div className="pending-delivery-pickup-details-wrapper">
        <div className="pending-delivery-pickup-detail" key={props.index}>
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
              {props?.deliverytype == "instant" ? (
                <img src={icons} alt="instant delivery" />
              ) : (
                <img src={icons2} alt="scheduled delivery" />
              )}
            </div>
            <button className="delivery-list-btn" onClick={props.click}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
