import {
  faAngleLeft,
  faAngleRight,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { PendingDeliveryList } from "../Details info/PendingDeliveryList";
import "./pendingdeliverypickup.css";
import LoggedinMainPage from "./LoggedinMainPage";
import { useNavigate } from "react-router-dom";
import Toggle from "../../javascript/Toggle";
import { PendingDeliveryScheduled } from "../Details info/PendingDeliveryList";
import "../../css/toggle.css";

export default function PendingDeliveryPickup() {
  return <LoggedinMainPage file={<PendingDeliveryPickup1 />} />;
}

export function PendingDeliveryPickup1(props) {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  let listItem;

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/pending-instant");
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    navigate("/pending-scheduled");
  };

  if (toggle === true) {
    listItem = <PendingDeliveryList click={handleClick} />;
  } else {
    listItem = <PendingDeliveryScheduled click2={handleClick2} />;
  }

  const firstClick = () => {
    setToggle(true);

    // navigate("/Pending-del");
  };

  const secondClick = () => {
    setToggle(false);
    // navigate("/Pending-del");
  };

  return (
    <section className="user-dashboard pending-delivery">
      <div className="pending-delivery-pickup-wrapper">
        <div className="pending-delivery-pickup-slides">
          <br />
          <br />
          <div>
            <div className="toggle-div">
              <div
                className="first-toggle"
                onClick={firstClick}
                id={toggle ? "active" : "inactive2"}
              >
                Pending Instant Delivery
              </div>
              <div
                className="second-toggle"
                onClick={secondClick}
                id={toggle ? "inactive" : "active2"}
              >
                Pending Scheduled Delivery
              </div>
            </div>
          </div>
        </div>
        <br />

        {/* <PendingDeliveryList click={navigate("/pending-instant")} />
        <PendingDeliveryList /> */}

        {listItem}
        {listItem}
        {listItem}

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
