import React from "react";
import { DeliveryImages } from "../Details info/DeliveryImages";
import Checkout from "../../Images/checkoutprogress.png";
import "./deliveryhistorydetails.css";
import { DeliverInfo } from "../Details info/DeliverInfo";
import Button from "../../javascript/Button";
import FormProgress2 from "../../Images/FormProgress2.png";
import { Link } from "react-router-dom";
import LoggedinMainPage from "./LoggedinMainPage";

export default function ScheduledDeliverySummary() {
  return <LoggedinMainPage file={<ScheduledDeliverySummary1 />} />;
}

export function ScheduledDeliverySummary1() {
  return (
    <section className="user-dashboard pending-delivery specifics">
      <div className="history-wrapper">
        <div className="specific-details-section">
          <div id="btn-proceed">
            <h2>Delivery Summary</h2>
            <div>
              <img src={FormProgress2} alt="" />
            </div>
          </div>
          <br />
          <br />
          <br />

          <h3>Delivery Request Accepted by:</h3>
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
          <div className="delivery-history-info">
            <DeliverInfo />
          </div>
          <br />
          <br />
          <br />

          <h3>Image: </h3>
          <div className="delivery-details-pictures specifics-images images-border">
            <DeliveryImages />
            <DeliveryImages />
            <DeliveryImages />
          </div>
          <br />

          <div className="delivery-details-location">
            <div className="delivery-deatails-location-pickup">
              <div className="location-img">
                <img src={Checkout} alt="" />
              </div>
              <h3>Pickup Location </h3>
              <p>5 Noma Street GRA Edo State</p>
              <h3>Delivery loaction </h3>
              <p>19 Akpakpava Road Benin City Ed...</p>
            </div>
          </div>

          <Link to="/request-success">
            <div id="btn-proceed">
              <Button name="Proceed to Payment" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
