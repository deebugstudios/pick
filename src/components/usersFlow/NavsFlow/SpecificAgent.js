import React from "react";
import Arrow from "../../Images/Arrow.png";
import FormProgress from "../../Images/FormProgress2.png";
import Star from "../../Images/Star.png";
import "../../css/specific.css";

export default function SpecificAgent() {
  const Stars = <img src={Star} alt="" />;
  return (
    <div>
      <div>
        <img src={Arrow} alt="" />{" "}
      </div>

      <div id="select-agent-content">
        <h3>Scheduled Delivery</h3>
        <img src={FormProgress} alt="" />
      </div>

      <div id="profile-ratings-section">
        <div className="delivery-profile">
          <div className="driver-profile-image">
            <div className="image"></div>
          </div>
          <div className="delivery-profile-details">
            <table id="specific-table">
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

        <div className="ratings-info">
          <div className="ratings-star">
            <p>Rating</p>
            <p>4.5 {Stars}</p>
          </div>
          <div className="ratings-star">
            <p>Deliveries</p>
            <p>178</p>
          </div>
        </div>
      </div>
    </div>
  );
}
