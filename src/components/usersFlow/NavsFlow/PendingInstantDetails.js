import React from "react";
import "./pendingdeliveryspecifics.css";
import map from "../../Images/map.png";
import { DeliveryImages } from "../Details info/DeliveryImages";
import { DeliverInfo2 } from "../Details info/DeliverInfo";
import locationimg from "../../Images/checkoutprogress.png";
import Flag from "../../Images/flag.png";
import Arrow from "../../Images/Arrow.png";
import GoogleMap from "../../../Shadow/javascripts/GoogleMap";
import LoggedinMainPage from "./LoggedinMainPage";
import { useNavigate } from "react-router-dom";

export default function PendingInstantDetails() {
  return <LoggedinMainPage file={<PendingInstantDetails1 />} />;
}

export function PendingInstantDetails1() {
  const navigate = useNavigate();

  return (
    <section className="user-dashboard pending-delivery specifics">
      <div className="pending-delivery-specifics-wrapper">
        <div className="pending-delivery-pickup-slides">
          <div
            id="arrow-div-instant"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={Arrow} alt="" />
          </div>
        </div>
        <div className="specifics-map-container">
          {/* <img src={map} alt="" /> */}
          <GoogleMap />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="specific-details-section">
          <h3>Instant Delivery ID: 7805097 </h3>
          <div className="delivery-details-pictures specifics-images">
            <DeliveryImages />
            <DeliveryImages />
            <DeliveryImages />
          </div>
          <br />
          <h3>Delivery status</h3>
          <div className="delivery-details-location">
            <div className="delivery-deatails-location-pickup">
              <div className="location-img">
                <img src={locationimg} alt="" />
              </div>
              <h3>Parcel Received by Delivery Agent </h3>
              <p>Thursday March 25th at 9:30pm</p>
              <h3>Parcel in Transit </h3>
            </div>
            {/* <table>
                        <tr>
                            <th>Arrived Pickup Location</th>
                        </tr>
                        <tr>
                            <td>Thursday March 25th at 9:30pm</td>
                        </tr>
                    </table> */}
          </div>
          <div className="estimatedtime">
            <h2>
              Your Parcel will arrive at your Location in Approximately 10
              minutes
            </h2>
          </div>
          <br />
          <br />

          <h3>Delivery Details</h3>
          <br />
          <br />

          <div className="delivery-profile">
            <div className="driver-profile-image">
              <div className="image"></div>
            </div>
            <div className="delivery-profile-details">
              <table>
                <tr>
                  <th>Delivery Agent :</th>
                  <td>Peter Robinson</td>
                </tr>
                <tr>
                  <th>Vehicle Type :</th>
                  <td>Tesla Cyber Truck</td>
                </tr>
                <tr>
                  <th>Vehicle Color :</th>
                  <td>Army Green</td>
                </tr>
                <tr>
                  <th>Agent ID :</th>
                  <td>6788</td>
                </tr>
                <tr>
                  <th>Plate Number :</th>
                  <td>LSR4KMJ</td>
                </tr>
                <tr>
                  <th>Phone Number :</th>
                  <td>09087614543</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="specific-info delivery-history-info">
            <DeliverInfo2 />
          </div>
          <br />

          <div className="report-user">
            <div>
              <img src={Flag} alt="" />
            </div>
            <p
              onClick={() => {
                navigate("/report");
              }}
            >
              Report this Delivery
            </p>
          </div>
          <br />
        </div>
      </div>
    </section>
  );
}
