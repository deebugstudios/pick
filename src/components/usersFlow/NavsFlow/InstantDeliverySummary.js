import React, { useState, useEffect } from "react";
import {
  DeliveryImages,
  DeliveryImages2,
} from "../Details info/DeliveryImages";
import Checkout from "../../Images/checkoutprogress.png";
import "./deliveryhistorydetails.css";
import "./deliveryhistory.css";
import "./pendingdeliveryspecifics.css";
import { DeliverInfo, DeliverInfo2 } from "../Details info/DeliverInfo";
import Button from "../../javascript/Button";
import FormProgress2 from "../../Images/FormProgress2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoggedinMainPage from "./LoggedinMainPage";
import { PaystackButton } from "react-paystack";

export default function InstantDeliverySummary() {
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const deliveryID = location.state.deliveryID;
  const price = location.state.price;
  const email = location.state.email;
  const name = location.state.name;
  const phone = location.state.number;
  const navigate = useNavigate();

  const amount = price * 100;

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey: "pk_test_43feb057cb4b04a113c1d3287f57a2c3c6a1d519",
    className: "paystack-button",
    text: "Proceed to Payment",
    onSuccess: () => {
      setIsSuccess(true);
      navigate("/paysuccess");
      // console.log()
    },
    // callback: function
    // onFail: () => {},

    onClose: () => alert("Wait! Don't leave :("),
  };

  const [deliveryDetails, setDeliveryDetails] = useState({});

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
          delivery_id: deliveryID,
        }),
      }
    );
    const data = await res.json();
    setDeliveryDetails(data?.delivery);
  };

  console.log(deliveryDetails);
  useEffect(() => {
    fetchDeliveryDetails();
  }, []);

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
              <div className="image2">
                <img src={deliveryDetails.delivery_agent_img} alt="" />
              </div>
            </div>
            <div className="delivery-profile-details">
              <table>
                <tr>
                  <th>Delivery Agent :</th>
                  <td>{deliveryDetails.delivery_agent_name}</td>
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

          <h3>Image: </h3>
          <div className="delivery-details-pictures specifics-images images-border">
            {deliveryDetails.imgs?.map((item, index) => (
              <li key={index}>
                <DeliveryImages rectangle={item} />
              </li>
            ))}
          </div>
          <br />

          <div className="delivery-details-location">
            <div className="delivery-deatails-location-pickup">
              <div className="location-img">
                <img src={Checkout} alt="" />
              </div>
              <h3>Pickup Location </h3>
              <p>{deliveryDetails.pickup_address}</p>
              <h3>Delivery location </h3>
              <p>{deliveryDetails.drop_off_address}</p>
            </div>
          </div>

          <div id="btn-proceed">
            <PaystackButton {...componentProps} />
          </div>
        </div>
      </div>
    </section>
  );
}
