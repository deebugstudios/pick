import React, { useState, useEffect, useContext } from "react";
import "./pendingdeliveryspecifics.css";
import "../../../Shadow/Pages/DeliveryHistorys/DeliveryHistoryDetails/deliveryhistorydetails.css";
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
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateConverter } from "../../../DateAndTimeConverter";
import { TimeConverter } from "../../../DateAndTimeConverter";
import { ClipLoader } from "react-spinners";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import ThousandConverter from "../../javascript/ThousandConverter";
import { doc } from "firebase/firestore";
import {
  collection,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { async } from "@firebase/util";

export default function PendingInstantDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const userValues = useContext(userContext);
  const { token } = userValues;

  // const [isMounted, setIsMounted] = useState(true);

  const [loading, setLoading] = useState(true);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [pickDate, setPickDate] = useState("");
  // const [popupButton, setPopupButton] = useState(false);
  // const [time, setTime] = useState({});

  const Delivery_id = location.state.id;
  const agentId = location.state.agentId;
  // console.log(agentId);

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

    setLoading(false);
    setDeliveryDetails(data?.delivery);
    console.log(data);
  };
  // let lat;
  // let lng;
  let agentLocation;

  useEffect(() => {
    fetchDeliveryDetails();
  }, []);
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
            <GoogleMap mark={agentLocation} />
          </div>
          <br />

          <div className="specific-details-section">
            <h3 className="margin-bottom">
              Delivery cost:{" "}
              <span>
                &#8358;
                {
                  <ThousandConverter
                    value={deliveryDetails?.delivery_cost_user}
                  />
                }
              </span>
            </h3>
            <h3>
              Delivery ID: <span>{deliveryDetails?.parcel_code}</span>
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
              {/* <div className="delivery-deatails-location-pickup">
                <div className="location-img">
                  <img src={locationimg} alt="" />
                </div>
                <h3>Item collected by delivery agent </h3>
                <p>
                  {<TimeConverter value={deliveryDetails?.timestamp} />} on{" "}
                  {<DateConverter value={deliveryDetails?.timestamp} />}
                </p>
                <h3>Item in transit </h3>
              </div> */}
            </div>
            <div className="estimatedtime estimate-div">
              <h2>
                Your item will arrive at your location in approximately 10
                minutes{" "}
              </h2>
            </div>
            <br />
            <br />

            <h3>Delivery details</h3>

            <div className="estimate-div">
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
              <p
                id="message-agent"
                onClick={() => {
                  navigate("/user/chatwithagentuser", {
                    state: {
                      agentId: deliveryDetails.delivery_agent_id,
                      agentName: deliveryDetails.delivery_agent_name,
                    },
                  });
                }}
              >
                Message Agent
                <span>
                  <FontAwesomeIcon icon={faMessage} className="space-icons-1" />
                </span>
              </p>
            </div>

            <div className="specific-info delivery-history-info">
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
