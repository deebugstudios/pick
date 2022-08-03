import React, { useState } from "react";
import { PendingDeliveryList } from "../Details info/PendingDeliveryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./deliveryhistory.css";
import { useNavigate } from "react-router-dom";
import { HistoryList, InstantHistoryList } from "../Details info/HistoryList";

export default function CompletedDeliveriesAgent() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  let listItem = (
    <HistoryList
      click={() => {
        navigate("/scheduledhistorydetails");
      }}
    />
  );
  let listItem2 = (
    <InstantHistoryList
      click={() => {
        navigate("/deliveryhistorydetails");
      }}
    />
  );

  const firstClick = () => {
    setToggle(true);
  };

  const secondClick = () => {
    setToggle(false);
  };

  return (
    <section className="user-dashboard pending-delivery specifics-1">
      <div className="history-wrapper">
        <div className="calender-container">
          <input className="calendar" type="date" />

          {/* </input> */}
        </div>
        <div className="search-box-container">
          <input
            type="text"
            placeholder="Nike Boots"
            className="search-box-1"
          />
        </div>
        {listItem}
        {listItem2}
        {listItem}
        {listItem2}
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
}
