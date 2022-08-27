import React, { useState, useEffect } from "react";
import { DeliveryImages } from "../Details info/DeliveryImages";
import Checkout from "../../Images/checkoutprogress.png";
import "./deliveryhistorydetails.css";
import { DeliverInfo2 } from "../Details info/DeliverInfo";
import Flag from "../../Images/flag.png";
import Arrow from "../../Images/Arrow.png";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "../../javascript/Popup";
import ReportReason from "../ReportReason";
import LeaveReview from "../LeaveReview";

export default function DeliveryHistoryDetails() {
  const navigate = useNavigate();

  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [reviewButton, setReviewButton] = useState(false);
  const [popupButton, setPopupButton] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  // const [pickDate, setPickDate] = useState(Number);

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
    console.log(results);
    setDeliveryDetails(results?.delivery);
  };

  useEffect(() => {
    fetchDeliveryDetails();
  }, []);

  const img_ids = deliveryDetails.img_ids;
  const imgs = deliveryDetails.imgs;

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
          <br />
          <h3>Instant Delivery ID: {deliveryDetails?.parcel_code} </h3>
          <div className="delivery-details-pictures specifics-images">
            {deliveryDetails.imgs?.map((item, index) => (
              <li key={index}>
                <DeliveryImages rectangle={item} />
              </li>
            ))}
          </div>
          <br />
          <h3>Delivery status</h3>
          <div className="delivery-details-location">
            <div className="delivery-deatails-location-pickup">
              <div className="location-img">
                <img src={Checkout} alt="" />
              </div>
              <h3>Item Received by Delivery Agent at the Pickup Location </h3>
              <p>Thursday March 25th at 9:30 PM</p>
              <h3>Item Received by User at the Drop off loaction </h3>
              <p>Thursday March 25th at 10:30 PM</p>
            </div>
          </div>
          <div className="estimatedtime">
            <h2>Your Item arrived at your Location in 60 minutes</h2>
          </div>
          <br />
          <br />

          <h3>Delivery Details</h3>

          <div className="delivery-profile">
            <div className="driver-profile-image">
              <div className="image">
                <img src={deliveryDetails.delivery_agent_img} alt="" />{" "}
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

          <div className="report-user">
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
            <button
              onClick={() => {
                setReviewButton(true);
              }}
            >
              Leave a Review
            </button>
          </div>
          <br />
        </div>
        <Popup trigger={popupButton} setTrigger={setPopupButton}>
          <ReportReason
            delivery_id={Delivery_id}
            parcel_code={deliveryDetails.parcel_code}
            img_ids={img_ids}
            imgs={imgs}
            agentName={deliveryDetails.delivery_agent_name}
            delivery_agent_code={deliveryDetails.delivery_agent_code}
            delivery_agent_id={deliveryDetails.delivery_agent_id}
            delivery_agent_img={deliveryDetails.delivery_agent_img}
            delivery_agent_img_id={deliveryDetails.delivery_agent_img_id}
          />
        </Popup>
        <Popup trigger={reviewButton} setTrigger={setReviewButton}>
          <LeaveReview agentId={deliveryDetails.delivery_agent_id} />
        </Popup>
      </div>
    </section>
  );
}
