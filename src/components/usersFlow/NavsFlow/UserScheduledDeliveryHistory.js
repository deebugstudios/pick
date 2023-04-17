import React, { useState, useEffect, useContext } from "react";
import { DeliveryImages } from "../Details info/DeliveryImages";
import Checkout from "../../Images/checkoutprogress.png";
import "../../../Shadow/Pages/DeliveryHistorys/DeliveryHistoryDetails/deliveryhistorydetails.css";
import { DeliverInfo2 } from "../Details info/DeliverInfo";
import Flag from "../../Images/flag.png";
import Arrow from "../../Images/Arrow.png";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "../../javascript/Popup";
import ReportReason from "../ReportReason";
import LeaveReview from "../LeaveReview";
import { ClipLoader } from "react-spinners";
import { DateConverter } from "../../../DateAndTimeConverter";
import { TimeConverter } from "../../../DateAndTimeConverter";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import ThousandConverter from "../../javascript/ThousandConverter";

export default function UserScheduledDeliveryHistory() {
  function convertMillisecondsToTime(ms) {
    const hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
    const minutes = Math.floor((ms % 3600000) / 60000); // 1 Minute = 60000 Milliseconds
    const seconds = (ms % 60000) / 1000;

    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      if (remainingHours === 0) {
        return (
          days +
          (days > 1 ? " days, " : " day, ") +
          minutes +
          (minutes > 1 ? " minutes" : " minute")
        );
      } else {
        return (
          days +
          (days > 1 ? " days, " : " day, ") +
          remainingHours +
          (remainingHours > 1 ? " hours" : " hour")
        );
      }
    } else if (hours === 0 && minutes === 0) {
      return seconds.toFixed(0) + " seconds";
    } else if (hours === 0) {
      return (
        minutes +
        (minutes > 1 ? " minutes " : " minute ") +
        seconds.toFixed(0) +
        (seconds > 1 ? " seconds" : " second")
      );
    } else {
      const remainingHours = hours % 24;
      if (remainingHours === 0) {
        return (
          hours +
          (hours > 1 ? " hours, " : " hour, ") +
          minutes +
          (minutes > 1 ? " minutes" : " minute")
        );
      } else {
        return (
          hours +
          (hours > 1 ? " hours, " : " hour, ") +
          minutes +
          (minutes > 1 ? " minutes" : " minute")
        );
      }
    }
  }
  const navigate = useNavigate();
  const userValues = useContext(userContext);
  const { token } = userValues;

  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [popupButton, setPopupButton] = useState(false);
  const [reviewButton, setReviewButton] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [deliveryImages, setDeliveryImages] = useState([]);
  const [milli, setMilli] = useState("");
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
          token: JSON.parse(token),
          delivery_id: Delivery_id,
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setLoading(false);
    setDeliveryDetails(results?.delivery);
    setDeliveryImages(results?.delivery.imgs);
    setMilli(results?.delivery.delivered_in);
    // console.log(deliveryDetails);
  };

  useEffect(() => {
    fetchDeliveryDetails();
  }, []);

  // const imgs = deliveryDetails.imgs;
  // const urls = imgs.join(", ");

  if (loading === true) {
    return (
      <div className="loader-screen">
        <ClipLoader color={"#1AA803"} loading={loading} size={100} />
        <p>Loading...</p>
      </div>
    );
  } else
    return (
      <section className="user-dashboard pending-delivery no-max">
        <div className="history-wrapper-1">
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
            <h3>Completed Scheduled Delivery</h3>
            <br />
            <p>
              <strong>Delivery confirmation proof</strong>
            </p>
            <div className="delivery-details-pictures specifics-images">
              {deliveryDetails.delivery_confirmation_proof_urls?.map(
                (item, index) => (
                  <li key={index}>
                    <DeliveryImages rectangle={item} />
                  </li>
                )
              )}
            </div>

            <p>
              <strong>Delivery Summary</strong>
            </p>
            <div className="delivery-details-pictures specifics-images">
              {deliveryDetails.imgs?.map((item, index) => (
                <li key={index}>
                  <DeliveryImages rectangle={item} />
                </li>
              ))}
            </div>
            <br />
            <div className="summary-cost">
              <p>
                <strong>Delivery cost: </strong>
                <span>
                  &#8358;
                  {
                    <ThousandConverter
                      value={deliveryDetails?.delivery_cost_user}
                    />
                  }
                </span>
              </p>
              <p>
                <strong>Delivery ID:</strong> {deliveryDetails?.parcel_code}{" "}
              </p>
              <p>
                <strong>Pickup address:</strong>{" "}
                {deliveryDetails?.pickup_address}
              </p>
              <p>
                <strong>Drop off address:</strong>{" "}
                {deliveryDetails?.drop_off_address}
              </p>
            </div>
            <div className="delivery-details-location">
              <div className="delivery-deatails-location-pickup">
                <div className="location-img">
                  <img src={Checkout} alt="" />
                </div>
                <h3>Item collected by Delivery agent </h3>
                <p>
                  {
                    <TimeConverter
                      value={deliveryDetails?.delivery_status.is_started_at}
                    />
                  }{" "}
                  {
                    <DateConverter
                      value={deliveryDetails?.delivery_status.is_started_at}
                    />
                  }
                </p>
                <h3>Item arrived drop off location </h3>
                <p>
                  {" "}
                  {
                    <TimeConverter
                      value={deliveryDetails?.delivery_status.is_completed_at}
                    />
                  }{" "}
                  {
                    <DateConverter
                      value={deliveryDetails?.delivery_status.is_completed_at}
                    />
                  }
                </p>
              </div>
            </div>
            <div className="estimatedtime">
              <h2>Item delivered in {convertMillisecondsToTime(milli)}</h2>
            </div>
            <br />
            <br />
            <h3>Delivery Details</h3>
            <br />

            <div className="delivery-profile1">
              <div className="driver-profile-image">
                <div className="image">
                  <img src={deliveryDetails.delivery_agent_img} />{" "}
                </div>
              </div>
              <div className="delivery-profile-details">
                <table>
                  <tr>
                    <th>Delivery agent:</th>
                    <td>{deliveryDetails?.delivery_agent_name}</td>
                  </tr>
                  <tr>
                    <th>Phone no:</th>
                    <td>{deliveryDetails.delivery_agent_phone_no}</td>
                  </tr>
                  <tr>
                    <th>Rider ID:</th>
                    <td>{deliveryDetails.delivery_agent_id}</td>
                  </tr>
                  <tr>
                    <th>Vehicle type:</th>
                    <td>{deliveryDetails.delivery_agent_vehicle_type}</td>
                  </tr>
                  <tr>
                    <th>Vehicle color:</th>
                    <td>{deliveryDetails.delivery_agent_vehicle_color}</td>
                  </tr>
                  <tr>
                    <th>Plate no:</th>
                    <td>{deliveryDetails.delivery_agent_plate_no}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="delivery-history-info">
              <DeliverInfo2
                sender={deliveryDetails.sender_fullname}
                sender_no={`0${deliveryDetails.sender_phone_no}`}
                receiver={deliveryDetails.reciever_name}
                receiver_no={`0${deliveryDetails.reciever_phone_no}`}
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
              img_ids={deliveryDetails.img_ids}
              imgs={deliveryImages.join(", ")}
              agentName={deliveryDetails.delivery_agent_name}
              delivery_agent_code={deliveryDetails.delivery_agent_code}
              delivery_agent_id={deliveryDetails.delivery_agent_id}
              delivery_agent_img={deliveryDetails.delivery_agent_img}
              delivery_agent_img_id={deliveryDetails.delivery_agent_img_id}
              delivery_agent_email={deliveryDetails.delivery_agent_email}
              user_email={deliveryDetails.sender_email}
              delivery_type={deliveryDetails.delivery_type}
              sender_fullname={deliveryDetails.sender_fullname}
              sender_id={deliveryDetails.sender_id}
            />
          </Popup>
          <Popup trigger={reviewButton} setTrigger={setReviewButton}>
            <LeaveReview agentId={deliveryDetails.delivery_agent_id} />
          </Popup>
        </div>
      </section>
    );
}
