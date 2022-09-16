import React, { useState, useEffect, useContext } from "react";
import { PendingDeliveryList } from "../Details info/PendingDeliveryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./deliveryhistory.css";
import LoggedinMainPage from "./LoggedinMainPage";
import { useNavigate } from "react-router-dom";
import { HistoryList, InstantHistoryList } from "../Details info/HistoryList";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import EmptyBox from "../../Images/pendingD.png";

export default function CompletedDeliveries() {
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const [cancelledDeliveries, setCancelledDeliveries] = useState([]);
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(1);
  const [searchItems, setSearchItems] = useState("");
  const userValues = useContext(userContext);
  const { token, userId } = userValues;

  const fetchCompletedDeliveries = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_delivery/completed_history",
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
    setCompletedDeliveries(results?.deliveries);
    console.log(data);

    // pendingDeliveries.map((item) => console.log(item));
  };

  // console.log(JSON.parse(token));

  const fetchCancelledDeliveries = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_delivery/cancel_history",
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
    setCancelledDeliveries(results?.deliveries);
    // pendingDeliveries.map((item) => console.log(item));
  };

  useEffect(() => {
    fetchCompletedDeliveries();
    fetchCancelledDeliveries();
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
      <section className="user-dashboard pending-delivery specifics no-max">
        <div className="history-wrapper-2">
          <div className="pending-delivery-pickup-slides">
            {/* <br />
            <br /> */}
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

          {/* <div className="calender-container">
            <input className="calendar" type="date" />

            
          </div> */}

          {/* Local search box*/}
          {/* <div className="search-box-container">
            <input
              type="text"
              placeholder="Search Using Your Item Name"
              className="search-box-1"
              onChange={(e) => setSearchItems(e.target.value)}
            />
          </div> */}

          {toggle === true ? (
            completedDeliveries?.length > 0 ? (
              completedDeliveries
                ?.filter((value) => {
                  if (value == "") {
                    return value;
                  } else if (
                    value.parcel_name
                      ?.toLowerCase()
                      .includes(searchItems.toLowerCase())
                  ) {
                    return value;
                  }
                })
                ?.map((pObj) => (
                  <InstantHistoryList
                    // click={handleClick}
                    key={pObj?._id}
                    click={
                      pObj.delivery_type === "instant"
                        ? () => {
                            navigate("/user/user-instant", {
                              state: { id: pObj._id },
                            });
                          }
                        : pObj.delivery_type === "scheduled"
                        ? () => {
                            navigate("/user/user-schedule", {
                              state: { id: pObj._id },
                            });
                          }
                        : null
                    }
                    parcelname={pObj.parcel_name}
                    parcelcode={pObj.parcel_code}
                    deliverytype={pObj.delivery_type}
                    deliveryimage={pObj.imgs[0]}
                  />
                ))
            ) : (
              <div className="empty-box">
                <img src={EmptyBox} alt="" />
                <p>No Completed Deliveries Available</p>
              </div>
            )
          ) : cancelledDeliveries?.length > 0 ? (
            cancelledDeliveries
              ?.filter((value) => {
                if (value == "") {
                  return value;
                } else if (
                  value.parcel_name
                    ?.toLowerCase()
                    .includes(searchItems.toLowerCase())
                ) {
                  return value;
                }
              })
              ?.map((item) => (
                <InstantHistoryList
                  click={() => {
                    navigate("/user/cancelled-details", {
                      state: { id: item._id },
                    });
                  }}
                  parcelname={item.parcel_name}
                  parcelcode={item.parcel_code}
                  deliverytype={item.delivery_type}
                  deliveryimage={item.imgs[0]}
                />
              ))
          ) : (
            <div className="empty-box">
              <img src={EmptyBox} alt="" />
              <p>No Cancelled Deliveries Available</p>
            </div>
          )}

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
