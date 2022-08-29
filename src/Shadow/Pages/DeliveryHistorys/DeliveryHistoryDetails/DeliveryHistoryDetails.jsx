import React, { useContext, useEffect, useState } from "react";
import { DeliveryImages } from "../../Details info/DeliveryImages";
import locationimg from "../../../images/checkoutprogress.png";
import "./deliveryhistorydetails.css";
import { DeliverInfo } from "../../Details info/DeliverInfo";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiderContext } from "../../Contexts/RiderContext";

const DeliveryHistoryDetailsAgent = () => {
  const location = useLocation();
  const value = useContext(RiderContext);
  const { token } = value;

  const [loading, setLoading] = useState(true);
  const [deliveryDetails, setDeliveryDetails] = useState({});

  const Delivery_id = location.state.id;

  const fetchDeliveryDetails = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_delivery/view_single_delivery",
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
    } catch (err) {
      console.log(err);
    }
  };
  console.log(deliveryDetails);
  useEffect(() => {
    fetchDeliveryDetails();
  }, []);

  const navigate = useNavigate();
  return (
    <section className=" user-dashboard pending-delivery pending-delivery specifics-1">
      <div className="history-wrapper">
        <div className="specifics-details-section-1">
          <h3>
            {deliveryDetails?.delivery_type == "instant"
              ? "Instant"
              : deliveryDetails?.delivery_type === "scheduled"
              ? "Scheduled"
              : null}{" "}
            Delivery ID : {deliveryDetails?.delivered_in}{" "}
          </h3>
          <div className="delivery-details-pictures specifics-images">
            {deliveryDetails.imgs?.map((item, index) => (
              <DeliveryImages rectangle={item} index={index} />
            ))}
          </div>
          <h3>Delivery status</h3>
          <div className="delivery-details-location">
            <div className="delivery-deatails-location-pickup">
              <div className="location-img">
                <img src={locationimg} alt="" />
              </div>
              <h3>Item Received by Delivery Agent at the Pickup Location </h3>
              <p>Thursday March 25th at 9:30 PM</p>
              <h3>Item Received by User at the Drop off loaction </h3>
              <p>Thursday March 25th at 10:30 PM</p>
            </div>
          </div>
          <div className="estimatedtime">
            <h2>
              Item delivered in{" "}
              <span className="delivered-time">1 hour 20 minutes</span>{" "}
            </h2>
          </div>
          <div className="delivery-profile">
            <div className="driver-profile-image">
              <div className="image">
                <img src={deliveryDetails.delivery_agent_img} alt="" />
              </div>
              <p>View Profile</p>
            </div>
            <div className="delivery-profile-details">
              <table>
                <tr>
                  <th>Delivery Agent :</th>
                  <td>{deliveryDetails?.delivery_agent_name}</td>
                </tr>
                <tr>
                  <th>Delivery Vehicle :</th>
                  <td>{deliveryDetails.delivery_agent_vehicle_type}</td>
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
                <tr>
                  <th>Senders Contact:</th>
                  <td>{deliveryDetails.sender_phone_no}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="delivery-history-info">
            <DeliverInfo
              sender={deliveryDetails.sender_fullname}
              sender_no={deliveryDetails.sender_phone_no}
              receiver={deliveryDetails.reciever_name}
              receiver_no={deliveryDetails.reciever_phone_no}
              parcel_name={deliveryDetails.parcel_name}
              parcel_type={deliveryDetails.parcel_type}
              description={deliveryDetails.parcel_description}
              instruction={deliveryDetails.delivery_instructions}
              timestamp={deliveryDetails.timestamp}
            />
          </div>
          <br />

          {/* <div className="report-user">
            <div><img src={Flag} alt="" /></div>
            <p
              onClick={() => {
                navigate("/report");
              }}
            >
              Report this user
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default DeliveryHistoryDetailsAgent;

export const ScheduledHistoryDetailsAgent = () => {
  const navigate = useNavigate();
  return (
    <section className=" user-dashboard pending-delivery pending-delivery specifics-1">
      <div className="history-wrapper">
        <div className="specifics-details-section-1">
          <h3>Scheduled Delivery ID: 7805097 </h3>
          <div className="delivery-details-pictures specifics-images">
            <DeliveryImages />
            <DeliveryImages />
            <DeliveryImages />
          </div>
          <h3>Delivery status</h3>
          <div className="delivery-details-location">
            <div className="delivery-deatails-location-pickup">
              <div className="location-img">
                <img src={locationimg} alt="" />
              </div>
              <h3>Item Received by Delivery Agent at the Pickup Location </h3>
              <p>Thursday March 25th at 9:30 PM</p>
              <h3>Item Received by User at the Drop off loaction </h3>
              <p>Thursday March 25th at 10:30 PM</p>
            </div>
          </div>
          <div className="estimatedtime">
            <h2>
              Item delivered in{" "}
              <span className="delivered-time">1 hour 20 minutes</span>{" "}
            </h2>
          </div>
          <div className="delivery-profile">
            <div className="driver-profile-image">
              <div className="image"></div>
              <p>View Profile</p>
            </div>
            <div className="delivery-profile-details">
              <table>
                <tr>
                  <th>Delivery Agent :</th>
                  <td>Peter Robinson</td>
                </tr>
                <tr>
                  <th>Delivery Vehicle :</th>
                  <td>Tesla Cyber Truck</td>
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
                <tr>
                  <th>Senders Contact:</th>
                  <td>09092887765</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="delivery-history-info">
            <DeliverInfo />
          </div>
          <br />

          {/* <div className="report-user">
            <div><img src={Flag} alt="" /></div>
            <p
              onClick={() => {
                navigate("/report");
              }}
            >
              Report this user
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};
