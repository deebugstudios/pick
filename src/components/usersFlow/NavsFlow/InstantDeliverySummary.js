import React, { useState, useEffect, useContext } from "react";
import {
  DeliveryImages,
  DeliveryImages2,
} from "../Details info/DeliveryImages";
import Checkout from "../../Images/checkoutprogress.png";
import "./pendingdeliveryspecifics.css";
import "../../../Shadow/Pages/DeliveryHistorys/DeliveryHistoryDetails/deliveryhistorydetails.css";
import { DeliverInfo, DeliverInfo2 } from "../Details info/DeliverInfo";
import Button from "../../javascript/Button";
import FormProgress2 from "../../Images/FormProgress2.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import LoggedinMainPage from "./LoggedinMainPage";
import { PaystackButton } from "react-paystack";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import Countdown from "../../javascript/Countdown";

export default function InstantDeliverySummary() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showButton, setShowButton] = useState("paystack-button");
  const [parcelCode, setParcelCode] = useState("");
  const [timeoutState, setTimeoutState] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [toFleet, setToFleet] = useState(null);
  const [fleetId, setFleetId] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const deliveryID = location.state.deliveryID;
  const price = location.state.price;
  const email = location.state.email;
  const name = location.state.name;
  const phone = location.state.number;
  const vehicle = location.state.deliveryMedium;
  const payDuration = location.state.payDuration;
  const navigate = useNavigate();
  const userValues = useContext(userContext);
  const { token } = userValues;

  useEffect(() => {
    // console.log(vehicle);
    let timer;
    if (timeoutState === false) {
      timer = setTimeout(async () => {
        alert("Your payment time has expired, please make a new delivery");
        setShowButton("payment-button");
        try {
          const res = await fetch(
            "https://ancient-wildwood-73926.herokuapp.com/user_delivery/timeout",
            {
              method: "POST",

              body: JSON.stringify({
                token: JSON.parse(token),
                delivery_id: deliveryID,
              }),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
              },
            }
          );
          const data = await res.json();

          if (res.status === 200) {
            navigate("/user/type");
          } else {
            //
          }
        } catch (error) {
          // console.log(error);
        }
      }, payDuration * 60000);
    } else if (timeoutState === true) {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, []);

  const amount = price * 100;

  const handleSubmit = async () => {
    // console.log(
    //   toFleet,
    //   name,
    //   price,
    //   deliveryDetails.parcel_code,
    //   deliveryDetails.parcel_name,
    //   deliveryDetails.delivery_agent_id,
    //   deliveryDetails.delivery_agent_name,
    //   fleetId,
    //   Date.now()
    // );
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_transaction/new_transaction",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            fullname: name,
            delivery_id: deliveryID,
            deliivery_medium: vehicle,
            delivery_agent_id: deliveryDetails.delivery_agent_id,
            delivery_agent_name: deliveryDetails.delivery_agent_name,
            amt: price,
            ref: Date.now(),
            to_fleet: toFleet,
            method: "card",
            status: "Success",
            fleet_manager_id: fleetId,
            parcel_code: deliveryDetails.parcel_code,
            parcel_name: deliveryDetails.parcel_name,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        setTimeoutState(true);
        navigate("/paysuccess", { state: { itemId: parcelCode } });
      } else {
        // setMessage("An Error occured");
      }
    } catch (error) {
      console.log(error);
      // const err = error
    }
    setIsSuccess(true);
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    channels: ["card"],
    publicKey: "pk_test_43feb057cb4b04a113c1d3287f57a2c3c6a1d519",
    className: showButton,
    text: "Proceed to Payment",
    onSuccess: () => {
      handleSubmit();
    },
    // callback: function
    // onFail: () => {},

    onClose: () => alert("Payment cancelled"),
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
          token: JSON.parse(token),
          delivery_id: deliveryID,
        }),
      }
    );
    const data = await res.json();
    setDeliveryDetails(data?.delivery);
    setAgentId(data?.delivery.delivery_agent_id);
    setParcelCode(data?.delivery.parcel_code);
    setLoading(false);
  };

  // console.log(deliveryDetails);
  useEffect(() => {
    fetchDeliveryDetails();
  }, []);

  useEffect(() => {
    // console.log(agentId);
    const listen = async () => {
      const docRef = doc(db, "delivery_agents", agentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().fleet_manager_id === "") {
        setToFleet(false);
        setFleetId("0");
      } else {
        setToFleet(true);
        setFleetId(docSnap.data().fleet_manager_id);
      }
    };
    listen();
  }, [loading === false]);

  return (
    <section className="user-dashboard pending-delivery no-max">
      <div className="history-wrapper-1">
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

          <div className="delivery-profile1">
            <div className="driver-profile-image">
              <div className="image">
                <img src={deliveryDetails.delivery_agent_img} alt="" />
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
          <Countdown startMinutes={payDuration} />
          <div id="btn-proceed">
            <PaystackButton {...componentProps} />
          </div>
        </div>
      </div>
    </section>
  );
}
