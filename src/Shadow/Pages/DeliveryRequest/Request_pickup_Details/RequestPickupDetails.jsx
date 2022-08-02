import React from "react";
import { Link, Outlet } from "react-router-dom";
import { DeliverInfo } from "../../Details info/DeliverInfo";
import { DeliveryImages } from "../../Details info/DeliveryImages";
import "./requestpickupdetails.css";
import { useNavigate } from "react-router-dom";

const RequestPickupDetails = () => {
  const navigate = useNavigate();
  return (
    <section className="user-dashboard delivery-details-wrapper">
      <div className="delivery-details-wrapper-2">
        <div className="delivery-details-text">
          {/* used a table for displaying the details */}
          <DeliverInfo />
        </div>
        <div className="delivery-details-images">
          <h3>Images</h3>
          <div className="delivery-details-pictures">
            <DeliveryImages />
            <DeliveryImages />
            <DeliveryImages />
            <DeliveryImages />
            <DeliveryImages />
            <DeliveryImages />
          </div>
        </div>
        <div className="delivery-details-location">
          <table>
            <tr>
              <th>Pickup Location</th>
            </tr>
            <tr>
              <td>5 Noma Street GRA Edo State</td>
            </tr>
            <tr>
              <th>Delivery Location</th>
            </tr>
            <tr>
              <td>19 Akpakpava Road Benin City Ed..</td>
            </tr>
          </table>
          {/* <h3>Pickup Location</h3>
                    <p>5 Noma Street GRA Edo State </p>
                    <h3>Delivery Location</h3>
                    <p>19 Akpakpava Road Benin City Ed..</p> */}
        </div>
        <div className="delivery-details-amount">
          <h3>
            Estimated Delivery Fee{" "}
            <span className="amount">₦ 1,500,000.00</span>
          </h3>
        </div>
        <div className="delivery-details-btns">
          <button className="ignore">Ignore</button>
          <button
            className="accept"
            onClick={() => {
              navigate("/pendingdeliveries");
            }}
          >
            Accept
          </button>{" "}
        </div>
      </div>
    </section>
  );
};

export default RequestPickupDetails;
