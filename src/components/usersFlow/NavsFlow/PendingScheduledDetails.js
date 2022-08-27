import React, { useState, useEffect } from "react";
import { DeliveryImages } from "../Details info/DeliveryImages";
import "./deliveryhistorydetails.css";
import { DeliverInfo2 } from "../Details info/DeliverInfo";
import Flag from "../../Images/flag.png";
import Arrow from "../../Images/Arrow.png";
import Selected from "../../Images/SelectedTab.png";
import Cancel from "../../Images/close.png";
import { useNavigate, useLocation } from "react-router-dom";
import Popup, { Popup2, Popup3 } from "../../javascript/Popup";
import ReportReason from "../ReportReason";
import CancelBooking from "../CancelBooking";

export default function PendingScheduledDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [date, setDate] = useState(new Date());
  const [cancelButton, setCancelButton] = useState(false);

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
    const results = await data;
    setLoading(false);
    setDeliveryDetails(results?.delivery);
    console.log(deliveryDetails);
    setDate(deliveryDetails?.pickup_time);
  };

  useEffect(() => {
    fetchDeliveryDetails();
  }, [loading === true]);

  return (
    <section className="user-dashboard pending-delivery specifics">
      <div className="history-wrapper">
        <div className="specific-details-section">
          <div
            id="arrow-div"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={Arrow} alt="" />
          </div>
          <br />
          <h3>Scheduled Delivery ID: {deliveryDetails?.parcel_code} </h3>
          <div className="delivery-details-pictures specifics-images">
            {deliveryDetails.imgs?.map((item, index) => (
              <li key={index}>
                <DeliveryImages rectangle={item} />
              </li>
            ))}
          </div>

          <h3>Delivery statistics</h3>
          <div className="delivery-details-location">
            <div className="delivery-deatail-location-pickup">
              <div>
                <img src={Selected} alt="" id="selected-img" />
              </div>
              <div id="selected-col">
                <h3>Scheduled Delivery Time and Date</h3>
                <p>Thursday March 25th at 9:30 PM</p>
              </div>
            </div>
          </div>
          <br />
          <br />

          <h3>Delivery Request Accepted by:</h3>
          <br />

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
          <div className="delivery-history-info">
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
          <br />
          <br />

          <div
            className="report-user"
            onClick={() => {
              setCancelButton(true);
            }}
          >
            <div>
              <img src={Cancel} alt="" />
            </div>
            <p>Cancel</p>
          </div>
          <br />
        </div>

        <Popup3 trigger={cancelButton}>
          <CancelBooking
            click={() => {
              setCancelButton(false);
            }}
            delivery_id={Delivery_id}
          />
        </Popup3>
      </div>
    </section>
  );
}
