import {
  faAngleLeft,
  faAngleRight,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { PendingDeliveryList } from "../../Details info/PendingDeliveryList";
import "./pendingdeliverypickup1.css";
import { useNavigate } from "react-router-dom";

const PendingDeliveryPickupAgent = () => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   {
  //     toggle ? navigate("/user-schedule") : navigate("/cancelled-details");
  //   }
  // };

  // const handleClick2 = (e) => {
  //   e.preventDefault();
  //   {
  //     toggle ? navigate("/user-instant") : navigate("/cancelled-details");
  //   }
  // };

  // let listItem = <HistoryList click={handleClick} />;
  // let listItem2 = <InstantHistoryList click={handleClick2} />;

  const firstClick = () => {
    setToggle(true);
  };

  const secondClick = () => {
    setToggle(false);
  };
  return (
    <section className="user-dashboard pending-delivery">
      <div className="pending-delivery-pickup-wrapper">
        <div className="pending-delivery-pickup-slides">
          {/* <br />
          <br /> */}
          <div className="toggle-div">
            <div
              className="first-toggle"
              onClick={firstClick}
              id={toggle ? "active" : "inactive2"}
            >
              Pick Up
            </div>
            <div
              className="second-toggle"
              onClick={secondClick}
              id={toggle ? "inactive" : "active2"}
            >
              Drop off
            </div>
          </div>
        </div>
        <PendingDeliveryList />
        <PendingDeliveryList />
        <PendingDeliveryList />
        <PendingDeliveryList />
        <PendingDeliveryList />
        <PendingDeliveryList />
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

export default PendingDeliveryPickupAgent;
