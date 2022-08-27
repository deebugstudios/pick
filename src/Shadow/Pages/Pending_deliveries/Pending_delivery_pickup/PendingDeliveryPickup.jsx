import {
  faAngleLeft,
  faAngleRight,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
// import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { PendingDeliveryList } from "../../Details info/PendingDeliveryList";
import { PendingDeliveryDropoffList } from "../../Details info/PendingDeliveryDropoffList";
import "./pendingdeliverypickup1.css";
import { useNavigate } from "react-router-dom";

const PendingDeliveryPickupAgent = () => {
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [pendingDropoff, setPendingDropoff] = useState([]);
  // const [pageNumber, setPageNumber] = useState(1)

  const navigate = useNavigate();

  const fetchPendingDeliveries = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_delivery/view_pending_pickup_deliveries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pagec: 1,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNWZjYWU5ZDdkYTk1MzA4ZjI4YTgiLCJwaG9uZV9ubyI6IisyMzQ5MTUzNTQwMDIzIiwiaWF0IjoxNjU4NzQwNjgyfQ.Lf1I9AZLNRuY5Q3w7uOqQSGDRoKb5yUUe61LNpdQMUU",
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setLoading(false);
    setPendingDeliveries(results?.deliveries);
  };

  useEffect(() => {
    fetchPendingDeliveries();
  }, []);

  // this is the fetch for the pending drop off deliveries from the backend server

  const fetchPendingDropoff = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_delivery/view_pending_drop_off_deliveries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pagec: 1,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNWZjYWU5ZDdkYTk1MzA4ZjI4YTgiLCJwaG9uZV9ubyI6IisyMzQ5MTUzNTQwMDIzIiwiaWF0IjoxNjU4NzQwNjgyfQ.Lf1I9AZLNRuY5Q3w7uOqQSGDRoKb5yUUe61LNpdQMUU",
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setLoading(false);
    setPendingDropoff(results?.deliveries);
  };

  useEffect(() => {
    fetchPendingDropoff();
  }, []);

  // const displayDeliveries = pendingDeliveries.slice(pagesVisted, pagesVisted * displayPerPage).map((pObj, index)=> {
  //   return (
  //         <PendingDeliveryList parcelname={pObj.parcel_name} parcelcode={pObj.parcel_code} deliverytype={pObj.delivery_type} deliveryimage={pObj.imgs[0]} />
  //       )
  // })

  // const deliveryList = pendingDeliveries.map(list => list._id)
  // const newList = deliveryList.map(newList => newList)
  // console.log(deliveryList)
  // console.log(newList);
  // console.log(pendingDeliveries);
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
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/pending-instant");
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    navigate("/pending-scheduled");
  };

  let listItem;
  if (toggle === true) {
    listItem = pendingDeliveries.map((pObj) => (
      <PendingDeliveryList
        parcelname={pObj.parcel_name}
        parcelcode={pObj.parcel_code}
        deliverytype={pObj.delivery_type}
        deliveryimage={pObj.imgs[0]}
      />
    ));
  } else {
    listItem = pendingDropoff.map((pObj) => (
      <PendingDeliveryDropoffList
        parcelname={pObj.parcel_name}
        parcelcode={pObj.parcel_code}
        deliverytype={pObj.delivery_type}
        deliveryimage={pObj.imgs[0]}
      />
    ));
  }
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
        {/* {pendingDeliveries.map(pObj=> (
        <PendingDeliveryList parcelname={pObj.parcel_name} parcelcode={pObj.parcel_code} deliverytype={pObj.delivery_type} deliveryimage={pObj.imgs[0]} />
        ))} */}
        {/* {displayDeliveries} */}
        {/* {deliveryList} */}

        {listItem}
        <div className="pending-delivery-pickup-entries">
          <h6>
            Showing <span>1</span> to <span>4</span> of <span>30</span> entries
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
