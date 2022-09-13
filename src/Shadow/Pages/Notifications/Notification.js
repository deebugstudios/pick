import React, { useContext, useEffect } from "react";
import "./notification.css";
import bell from "../../images/notificationbell.png";
import { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../Contexts/RiderContext";
import { ClipLoader } from "react-spinners";

export const Notification = () => {
  // console.log(popUpNotifi)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const userValues = useContext(userContext);
  const { token } = userValues;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_notification/notifications",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            pagec: pageCount,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      // console.log(res);

      if (res.status === 200) {
        // console.log("User created successfully");
        // console.log(data);
        setData(result?.notifications);
        setLoading(false);

        //
      } else {
        console.log("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(data);
  useEffect(() => {
    fetchData();
  }, [pageCount]);

  const msg = data?.map((obj, index) => (
    <div className="not-read-messages" key={index}>
      {obj?.noti_type === "system_message" ? (
        <h5 className="system-message">System Message</h5>
      ) : null}
      <div className="notification-message">
        <p>{obj?.content}</p>
        <p className="notification-message-time">
          <ReactTimeAgo date={obj?.timestamp} locale="en-US" />
        </p>
      </div>
    </div>
  ));

  const minusPagec = () => {
    if (pageCount <= 1) {
      return;
    } else {
      setPageCount((prev) => prev - 1);
    }
  };
  const addPagec = () => {
    if (data?.length !== 10) {
      return;
    } else {
      setPageCount((prev) => prev + 1);
    }
  };

  // console.log(pageCount, data);

  return (
    <div className="notification-main-wrapper">
      <section className="notification">
        <div className="notification-wrapper">
          {/* <p className="cancel-notification">X</p> */}
          <h3>Notifications</h3>
          <div className="notifcation-messages-container">
            <div className="notfication-date">
              <h5>
                {pageCount === 1 ? "recent" : pageCount > 1 ? "Older" : ""}
              </h5>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "flex-end",
                  gap: "20px",
                  // position: "absolute",
                  // bottom: "3%",
                }}
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className={pageCount <= 1 ? "icon-space-less" : "icon-space"}
                  onClick={minusPagec}
                />{" "}
                <h6>
                  1 to {data?.length} of {pageCount}
                </h6>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={
                    data?.length !== 10 ? "icon-space-less" : "icon-space"
                  }
                  onClick={addPagec}
                />
              </div>
              {/* <h5 className="clear-all">{data?.length ? "clear all" : ""}</h5> */}
            </div>

            {loading ? (
              <div className="loader-screen">
                <ClipLoader color={"#1AA803"} loading={loading} size={100} />
                <p>Loading...</p>
              </div>
            ) : (
              msg
            )}
            {/* <div className="notification-message not-read-messages">
                    <p>Mira Sarah has arrived the drop off location</p>
                    <p className='notification-message-time'>Now</p>
                </div>
                <div className="notification-message not-read-messages">
                    <p>Mira shadow has arrived the pick up location</p>
                    <p className='notification-message-time'>3 mins</p>
                </div>
                <div className="notfication-date">
                    <h5>older</h5>
                </div>
                <div className="notification-message read-messages">
                    <p>light shadow has arrived the pick up location</p>
                    <p className='notification-message-time'>5 mins</p>
                </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export const NoNotification = () => {
  return (
    <section className="notification">
      <div className="notification-wrapper">
        <p className="cancel-notification">X</p>
        <h3>Notifications</h3>
        <div className="no-notification-wrapper">
          <div className="no-notification-bell">
            <img src={bell} alt="No Notification" />
          </div>
          <div className="no-notification-text-wrapper">
            <p>You have no notifications. New notifications will appear here</p>
          </div>
        </div>
      </div>
    </section>
  );
};
