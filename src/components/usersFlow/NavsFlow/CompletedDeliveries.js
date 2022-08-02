import React, { useState } from "react";
import { PendingDeliveryList } from "../Details info/PendingDeliveryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./deliveryhistory.css";
import LoggedinMainPage from "./LoggedinMainPage";
import { useNavigate } from "react-router-dom";
import { HistoryList, InstantHistoryList } from "../Details info/HistoryList";

export default function CompletedDeliveries() {
  return <LoggedinMainPage file={<CompletedDeliveries2 />} />;
}

export const CompletedDeliveries2 = () => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    {
      toggle ? navigate("/user-schedule") : navigate("/cancelled-details");
    }
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    {
      toggle ? navigate("/user-instant") : navigate("/cancelled-details");
    }
  };

  let listItem = <HistoryList click={handleClick} />;
  let listItem2 = <InstantHistoryList click={handleClick2} />;

  const firstClick = () => {
    setToggle(true);
  };

  const secondClick = () => {
    setToggle(false);
  };

  return (
    <section className="user-dashboard pending-delivery specifics">
      <div className="history-wrapper">
        <div className="pending-delivery-pickup-slides">
          <br />
          <br />
          <div className="toggle-div">
            <div
              className="first-toggle"
              onClick={firstClick}
              id={toggle ? "active" : "inactive2"}
            >
              Completed Deliveries
            </div>
            <div
              className="second-toggle"
              onClick={secondClick}
              id={toggle ? "inactive" : "active2"}
            >
              Cancelled Deliveries
            </div>
          </div>
        </div>

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
};
