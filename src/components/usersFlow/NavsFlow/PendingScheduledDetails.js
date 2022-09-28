import React, { useState, useEffect, useContext } from "react";
import { DeliveryImages } from "../Details info/DeliveryImages";
// import "./deliveryhistorydetails.css";
import { DeliverInfo2 } from "../Details info/DeliverInfo";
import Flag from "../../Images/flag.png";
import Arrow from "../../Images/Arrow.png";
import Selected from "../../Images/SelectedTab.png";
import "./pendingdeliveryspecifics.css";
import Cancel from "../../Images/close.png";
import { useNavigate, useLocation } from "react-router-dom";
import Popup, { Popup2, Popup3 } from "../../javascript/Popup";
import ReportReason from "../ReportReason";
import "../../../Shadow/Pages/DeliveryHistorys/DeliveryHistoryDetails/deliveryhistorydetails.css";
import CancelBooking from "../CancelBooking";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { TimeConverter } from "../../../DateAndTimeConverter";
import { DateConverter } from "../../../DateAndTimeConverter";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import Thousand_converter from "../../javascript/Thousand_converter";

export default function PendingScheduledDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [date, setDate] = useState(new Date());
  const [percent, setPercent] = useState("");
  const [cancelButton, setCancelButton] = useState(false);
  const userValues = useContext(userContext);
  const { token } = userValues;

  const Delivery_id = location.state.id;

  const fetchPercentage = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/stats/get_refund_percent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: JSON.parse(token),
        }),
      }
    );
    const data = await res.json();
    setPercent(data.refund_percent);

    // console.log(data);
  };

  useEffect(() => {
    fetchPercentage();
    fetchDeliveryDetails();
  }, []);

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
    // console.log(deliveryDetails);
    setDate(deliveryDetails?.pickup_time);
  };

  useEffect(() => {
    fetchDeliveryDetails();
  }, [loading === true]);

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
          <div className="specific-details-section margin-bottom">
            <div
              id="arrow-div"
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={Arrow} alt="" />
            </div>
            <br />
            <h3 className="margin-bottom">
              Delivery cost:{" "}
              <span>
                &#8358;
                {
                  <Thousand_converter
                    value={deliveryDetails?.delivery_cost_user}
                  />
                }
              </span>
            </h3>
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
                  <h3>Scheduled delivery time and date</h3>
                  <p>
                    {<TimeConverter value={deliveryDetails?.timestamp} />} on{" "}
                    {<DateConverter value={deliveryDetails?.timestamp} />}
                  </p>
                </div>
              </div>
            </div>
            <br />
            <br />

            <h3>Delivery Request Accepted by:</h3>
            <br />

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
                      <th>Delivery agent :</th>
                      <td>{deliveryDetails.delivery_agent_name}</td>
                    </tr>
                    <tr>
                      <th>Vehicle type :</th>
                      <td>{deliveryDetails.delivery_agent_vehicle_type}</td>
                    </tr>
                    <tr>
                      <th>Vehicle color :</th>
                      <td>{deliveryDetails.delivery_agent_vehicle_color}</td>
                    </tr>
                    <tr>
                      <th>Agent ID :</th>
                      <td>{deliveryDetails.delivery_agent_id}</td>
                    </tr>
                    <tr>
                      <th>Plate no :</th>
                      <td>{deliveryDetails.delivery_agent_plate_no}</td>
                    </tr>
                    <tr>
                      <th>Phone no :</th>
                      <td>{deliveryDetails.delivery_agent_phone_no}</td>
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
              percent={percent}
              delivery_id={Delivery_id}
            />
          </Popup3>
        </div>
      </section>
    );
}
