import {
  faAngleLeft,
  faAngleRight,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useContext } from "react";
import { PendingDeliveryList } from "../Details info/PendingDeliveryList";
import "./pendingdeliverypickup.css";
import { useNavigate } from "react-router-dom";
import { PendingDeliveryScheduled } from "../Details info/PendingDeliveryList";
import { DeliveryHistoryList } from "../../../Shadow/Pages/Details info/DeliveryHistoryList";
import "../../css/toggle.css";
import { ClipLoader } from "react-spinners";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import EmptyBox from "../../Images/pendingD.png";

export default function PendingDeliveryPickup(props) {
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [pendingInstant, setPendingInstant] = useState([]);
  const navigate = useNavigate();
  const userValues = useContext(userContext);
  const { token, userId } = userValues;

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
          token: JSON.parse(token),
          user_id: JSON.parse(userId),
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setLoading(false);
    const pDeliveries = results?.deliveries;
    // setPendingDeliveries(results?.deliveries);
    let pInstant = [];
    let pScheduled = [];
    pDeliveries.forEach((item) =>
      item.delivery_type === "instant"
        ? pInstant.push(item)
        : item.delivery_type === "scheduled"
        ? pScheduled.push(item)
        : null
    );
    setPendingInstant(pInstant);
    setPendingDeliveries(pScheduled);
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

  if (loading === true) {
    return (
      <div className="loader-screen">
        <ClipLoader color={"#1AA803"} loading={loading} size={100} />
        <p>Loading...</p>
      </div>
    );
  } else
    return (
      <section className="user-dashboard pending-delivery no-max">
        <div className="pending-delivery-pickup-wrapper">
          <div className="pending-delivery-pickup-slides">
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

          {toggle === true ? (
            pendingInstant?.length > 0 ? (
              pendingInstant.map((item) => (
                <DeliveryHistoryList
                  click={() => {
                    navigate("/user/pending-instant", {
                      state: { id: item._id },
                    });
                  }}
                  parcelname={item.parcel_name}
                  parcelcode={item.parcel_code}
                  deliveryimage={item.imgs[0]}
                  deliverytype="instant"
                />
              ))
            ) : (
              <div className="empty-box">
                <img src={EmptyBox} alt="" />
                <p>No Pending Instant Deliveries Available.</p>
              </div>
            )
          ) : toggle === false ? (
            pendingDeliveries?.length > 0 ? (
              pendingDeliveries.map((item) => (
                <DeliveryHistoryList
                  click={() => {
                    navigate("/user/pending-scheduled", {
                      state: { id: item._id },
                    });
                  }}
                  parcelname={item.parcel_name}
                  parcelcode={item.parcel_code}
                  deliveryimage={item.imgs[0]}
                  deliverytype="scheduled"
                />
              ))
            ) : (
              <div className="empty-box">
                <img src={EmptyBox} alt="" />
                <p>No Pending Scheduled Deliveries Available.</p>
              </div>
            )
          ) : null}
          {/* ) : toggle === false && item.delivery_type === "scheduled" ? (
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
            ) : (
              
            )
          )} */}
          <br />
          <div className="pending-delivery-pickup-entries">
            <h6>
              Showing <span>1</span> to <span>10</span> of <span>30</span>{" "}
              entries
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
