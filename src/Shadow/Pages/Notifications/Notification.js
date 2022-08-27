import React, { useEffect } from "react";
import "./notification.css";
import bell from "../../images/notificationbell.png";
import { useState } from "react";

export const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // const fetchData = async () => {
  //     const res = await fetch( "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_notification/view_notifications",
  //         {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json, text/plain, */*",
  //         },
  //         body: JSON.stringify({
  //             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUyOWU1N2I2MzVjYWI4NDJiMjI5MGMiLCJwaG9uZV9ubyI6IisyMzQ5MDM3NzkxNjM3IiwiaWF0IjoxNjU5MDE4ODM5fQ.AdParFVgCDIKuHyD79zYVtLzT6Ny3Bbfa__AYs9bm-Q",
  //             "pagec": 1
  //         })
  //     })
  //     const resdata = res.json()
  //     setLoading(false)
  //     console.log(data)
  //     if (res.status === 200) {
  //         console.log('data fetched successfully');
  //         setData(resdata.notifications)
  //         console.log(data)
  //         // console.log(idU);
  //       } else {
  //         console.log('some error occurred')
  //       }
  //     }
  // https://ancient-wildwood-73926.herokuapp.com/delivery_agent_notification/view_notifications

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_notification/view_notifications",
        {
          method: "POST",

          body: JSON.stringify({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9ubyI6IisyMzQ4MTMwNDM5ODM0IiwiX2lkIjoiNjMwMjllOGJkNzMyNWNjMWMzZjFmYWE0IiwiaWF0IjoxNjYxMzM0NzIyfQ.lJqklLaU1XWNjHGc105Iy724DEnLcV64ADbpPSzQlbw",
            pagec: 1,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      setLoading(false);

      if (res.status === 200) {
        console.log("User created successfully");
        console.log(data);
        setData(data?.notifications);
        // console.log(data)
      } else {
        console.log("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const msg = data.map((obj, index) => (
    <div className="notification-message not-read-messages" key={index}>
      <p>{obj?.content}</p>
      <p className="notification-message-time">{obj?.timestamp}</p>
    </div>
  ));
  console.log(msg);

  return (
    <section className="notification">
      <div className="notification-wrapper">
        <p className="cancel-notification">X</p>
        <h3>Notifications</h3>
        <div className="notifcation-messages-container">
          <div className="notfication-date">
            <h5>Today</h5>
            <h5 className="clear-all">Clear All</h5>
          </div>

          {loading ? <h1>loading...</h1> : msg}
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
