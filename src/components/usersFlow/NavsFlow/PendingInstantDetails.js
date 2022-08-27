import React, { useState, useEffect } from "react";
import "./pendingdeliveryspecifics.css";
import map from "../../Images/map.png";
import { DeliveryImages } from "../Details info/DeliveryImages";
import { DeliverInfo2 } from "../Details info/DeliverInfo";
import locationimg from "../../Images/checkoutprogress.png";
import Flag from "../../Images/flag.png";
import Arrow from "../../Images/Arrow.png";
import GoogleMap from "../../../Shadow/javascripts/GoogleMap";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "../../javascript/Popup";
import ReportReason from "../ReportReason";

export default function PendingInstantDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [pickDate, setPickDate] = useState(Number);
  // const [popupButton, setPopupButton] = useState(false);
  // const [time, setTime] = useState({});

  const Delivery_id = location.state.id;

  const fetchDeliveryDetails = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_delivery/single_delivery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ2ZmVkOGU1OGEyOTIxN2I0MDRiMjIiLCJwaG9uZV9ubyI6IjgwNzI1ODk2NjQiLCJpYXQiOjE2NTgyNTcxMTJ9.bj4YL5kI9rpWJ7CTbMNiKcT1b26x1S33IPH8R-dc9rw",
          delivery_id: Delivery_id,
        }),
      }
    );
    const data = await res.json();
    const results = data;
    setLoading(false);
    setDeliveryDetails(results?.delivery);
    console.log(data);
    setPickDate(deliveryDetails?.pickup_time);
    // console.log(pickDate);
  };
  // const dateField = new Date(deliveryDetails?.pickup_time);
  const dateField = new Date(pickDate);
  const dateString = dateField.toDateString();
  const time = dateField.toTimeString();
  const timeString = time.slice(0, -40);

  // console.log(dateString);

  useEffect(() => {
    fetchDeliveryDetails();
  }, []);

  return (
    <section className="user-dashboard pending-delivery specifics">
      <div className="pending-delivery-specifics-wrapper">
        <div className="pending-delivery-pickup-slide">
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

        <div className="specific-details-section">
          <h3>
            Instant Delivery ID: <span>{deliveryDetails?.parcel_code}</span>
          </h3>
          <div className="delivery-details-pictures specifics-images">
            {deliveryDetails.imgs?.map((item, index) => (
              <li key={index}>
                <DeliveryImages rectangle={item} />
              </li>
            ))}
          </div>

          <h3>Delivery status </h3>
          <div className="delivery-details-location">
            <div className="delivery-deatails-location-pickup">
              <div className="location-img">
                <img src={locationimg} alt="" />
              </div>
              <h3>Item Received by Delivery Agent </h3>
              <p>
                {dateString} at {timeString}
              </p>
              <h3>Item in Transit </h3>
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
              Your Item will arrive at your Location in Approximately 10 minutes
            </h2>
          </div>
          <br />
          <br />

          <h3>Delivery Details</h3>

          <div className="delivery-profile">
            <div className="driver-profile-image">
              <div className="image">
                <img src={deliveryDetails.delivery_agent_img} />{" "}
              </div>
            </div>
            <div className="delivery-profile-details">
              <table>
                <tr>
                  <th>Delivery Agent :</th>
                  <td>{deliveryDetails?.delivery_agent_name}</td>
                </tr>
                <tr>
                  <th>Vehicle Type :</th>
                  <td>{deliveryDetails.delivery_agent_vehicle_type}</td>
                </tr>
                <tr>
                  <th>Vehicle Color :</th>
                  <td>{deliveryDetails.delivery_agent_vehicle_color}</td>
                </tr>
                <tr>
                  <th>Agent ID :</th>
                  <td>{deliveryDetails.delivery_agent_id}</td>
                </tr>
                <tr>
                  <th>Plate Number :</th>
                  <td>{deliveryDetails.delivery_agent_plate_no}</td>
                </tr>
                <tr>
                  <th>Phone Number :</th>
                  <td>{deliveryDetails.delivery_agent_phone_no}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="specific-info delivery-history-info">
            <DeliverInfo2
              sender={deliveryDetails.sender_fullname}
              sender_no={deliveryDetails.sender_phone_no}
              receiver={deliveryDetails.reciever_name}
              receiver_no={deliveryDetails.reciever_phone_no}
              parcel_name={deliveryDetails.parcel_name}
              parcel_type={deliveryDetails.parcel_type}
              description={deliveryDetails.parcel_description}
              instruction={deliveryDetails.delivery_instructions}
            />
          </div>
          <br />

          {/* <div className="report-user">
            <div>
              <img src={Flag} alt="" />
            </div>
            <p
              onClick={() => {
                setPopupButton(true);
              }}
            >
              Report this Delivery
            </p>
          </div> */}
          <br />
        </div>
      </div>
    </section>
  );
}
