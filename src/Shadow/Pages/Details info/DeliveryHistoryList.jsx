import React from "react";
import "../Pending_deliveries/Pending_delivery_pickup/pendingdeliverypickup1.css";
import icons from "../../images/instanticon.png";
import icons2 from "../../images/scheduledicon.png";
import "./pendingdeliverylist.css";
import p5 from "../../images/p5.png";
export const DeliveryHistoryList = (props) => {
  return (
    <div className="pending-delivery-pickup-details-Container">
      <div className="pending-delivery-pickup-details-wrapper">
        <div className="pending-delivery-pickup-detail">
          <div className="pending-delivery-pickup-left">
            <div className="pending-delivery-pickup-img">
              <img src={props?.deliveryimage} alt="" />
            </div>
            <div className="history-list-div">
              <h3 className="history-list-h3">
                {" "}
                Item:{" "}
                <span className="history-list-span">
                  {" "}
                  {props?.parcelname}
                </span>{" "}
              </h3>
              <h3 className="history-list-h3">
                {" "}
                Delivery ID:{" "}
                <span className="history-list-span">
                  {" "}
                  {props?.parcelcode}
                </span>{" "}
              </h3>
              <h3 className="history-list-h3">{props?.price}</h3>
            </div>
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

export const UserHistoryList = (props) => {
  return (
    <div className="pending-delivery-pickup-details-Container">
      <div className="pending-delivery-pickup-details-wrapper">
        <div className="pending-delivery-pickup-detail">
          <div className="pending-delivery-pickup-left">
            <div className="pending-delivery-pickup-img">
              <img src={props?.deliveryimage} alt="" />
            </div>
            <div className="history-list-div">
              <h3 className="history-list-h3">
                {" "}
                Item:{" "}
                <span className="history-list-span">
                  {" "}
                  {props?.parcelname}
                </span>{" "}
              </h3>
              <h3 className="history-list-h3">{props?.price}</h3>
            </div>
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
