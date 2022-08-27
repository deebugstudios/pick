import React, { useState } from "react";
import "./pendingdeliveryspecifics.css";
import map from "../../../images/maps.png";
import { DeliveryImages } from "../../Details info/DeliveryImages";
import { DeliverInfo } from "../../Details info/DeliverInfo";
import locationimg from "../../../images/checkoutprogress.png";
import GoogleMap from "../../../javascripts/GoogleMap";
import { useNavigate } from "react-router-dom";

const PendingDeliveryspecificsAgent = () => {
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
    <section className="user-dashboard pending-delivery specifics">
      <div className="pending-delivery-specifics-wrapper">
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
        <div className="specifics-map-container">
          <GoogleMap />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="specifics-details-section">
          <h3>Instant Delivery ID: 7805097 </h3>
          <div className="delivery-details-pictures specifics-images">
            <DeliveryImages />
            <DeliveryImages />
            <DeliveryImages />
          </div>
          <h3>Delivery status</h3>
          <div className="delivery-details-location">
            <div className="delivery-deatails-location-pickup">
              <div className="location-img">
                <img src={locationimg} alt="" />
              </div>
              <h3>
                Arrived Pickup Location{" "}
                <input type="checkbox" className="checkbox" checked />
              </h3>
              <p>Thursday March 25th at 9:30pm</p>
              <h3>
                Collect Item and in transit{" "}
                <input type="checkbox" className="checkbox" />
              </h3>
            </div>
            {/* <table>
                        <tr>
                            <th>Arrived Pickup Location</th>
                        </tr>
                        <tr>
                            <td>Thursday March 25th at 9:30pm</td>
                        </tr>
                    </table> */}
            <table>
              <tr>
                <th>Sender's Contact:</th>
                <td>0906340334</td>
              </tr>
            </table>
          </div>
          <h2 className="estimatedtime">
            <h2>Estimated time to pickup Location is 15 mins </h2>
          </h2>
          <div className="specific-info">
            <DeliverInfo />
          </div>
          <div className="specific-btn">
            <button>Next</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendingDeliveryspecificsAgent;
