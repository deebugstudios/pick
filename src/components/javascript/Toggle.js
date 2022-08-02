import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/toggle.css";
import {
  PendingDeliveryList,
  PendingDeliveryScheduled,
} from "../usersFlow/Details info/PendingDeliveryList";

export default function Toggle(props) {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  let listItem;

  const firstClick = () => {
    setToggle(true);
    // props.listItem = <PendingDeliveryList />;
    // navigate("/Pending-del");
  };

  const secondClick = () => {
    setToggle(false);
    // props.listItem = <PendingDeliveryScheduled />;
    // navigate("/Pending-del");
  };

  return (
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
  );
}
