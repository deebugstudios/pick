import {
  faAngleLeft,
  faAngleRight,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { PendingDeliveryList } from "../Details info/PendingDeliveryList";
import "./pendingdeliverypickup.css";
import { useNavigate } from "react-router-dom";
import { PendingDeliveryScheduled } from "../Details info/PendingDeliveryList";
import "../../css/toggle.css";

export default function PendingDeliveryPickup(props) {
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const navigate = useNavigate();

  const fetchPendingDeliveries = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_delivery/pending_delivery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pagec: 1,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBlNjdiODQ1M2EzNzIyMjc1N2I3OGMiLCJwaG9uZV9ubyI6IisyMzQ4MTU3NTQyODIwIiwiaWF0IjoxNjYxODg4NDUzfQ.ZcLApAMCMxmo17pp17Bu9nJ0d_G_vvkhfZekLrrkjis",
          user_id: "62d6fed8e58a29217b404b22",
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setLoading(false);
    setPendingDeliveries(results?.deliveries);
    console.log(results);
  };

  useEffect(() => {
    fetchPendingDeliveries();
  }, []);

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

        {pendingDeliveries.length > 0 ? (
          pendingDeliveries.map((item) =>
            toggle === true && item.delivery_type === "instant" ? (
              <PendingDeliveryList
                click={() => {
                  navigate("/user/pending-instant", {
                    state: { id: item._id },
                  });
                }}
                parcelname={item.parcel_name}
                parcelcode={item.parcel_code}
                deliveryimage={item.imgs[0]}
              />
            ) : toggle === false && item.delivery_type === "scheduled" ? (
              <PendingDeliveryScheduled
                click2={() => {
                  navigate("/user/pending-scheduled", {
                    state: { id: item._id },
                  });
                }}
                parcelname={item.parcel_name}
                parcelcode={item.parcel_code}
                deliveryimage={item.imgs[0]}
              />
            ) : null
          )
        ) : (
          <h1 className="h1-center">No Deliveries Yet</h1>
        )}
        <br />
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
