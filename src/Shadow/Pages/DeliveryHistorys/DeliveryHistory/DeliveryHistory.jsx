import React from "react";
import { PendingDeliveryList } from "../../Details info/PendingDeliveryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./deliveryhistory.css";
const DeliveryHistory = () => {
  return (
    <section className="user-dashboard pending-delivery specifics">
      <div className="history-wrapper">
        <div className="calender-container">
          <button className="calender">JULY 19, 2021</button>
        </div>
        <div className="search-box-container">
          <input type="text" placeholder="Nike Boots" className="search-box" />
        </div>
        <PendingDeliveryList />
        <PendingDeliveryList />
        <PendingDeliveryList />
        <PendingDeliveryList />
        <div className="pending-delivery-pickup-entries">
          <h6>
            Showing <span>1</span> to <span>10</span> of <span>30</span> entries
          </h6>
          <div>
            <FontAwesomeIcon icon={faAngleLeft} className="icon-space" />{" "}
            <h6>View more</h6>
            <FontAwesomeIcon icon={faAngleRight} className="icon-space" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryHistory;
