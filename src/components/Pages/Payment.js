import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { PaystackButton } from "react-paystack";
import "./payment.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Payment() {
  const [email, setEmail] = useState("");
  const [showButton, setShowButton] = useState("paystack-button");
  const amount = 1000;
  const phone = "08157542820";
  const name = "Nedu";
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    channels: ["card"],
    publicKey: "pk_test_43feb057cb4b04a113c1d3287f57a2c3c6a1d519",
    className: "paystack-button",
    text: "Proceed to Payment",
    onSuccess: () => {
      //   handleSubmit();
      alert("success");
    },
    // callback: function
    // onFail: () => {},

    onClose: () => alert("Payment cancelled"),
  };

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
            // token: JSON.parse(token),
            // fullname: name,
            // delivery_id: deliveryID,
            // deliivery_medium: vehicle,
            // delivery_agent_id: deliveryDetails.delivery_agent_id,
            // delivery_agent_name: deliveryDetails.delivery_agent_name,
            // amt: price,
            // ref: Date.now(),
            // to_fleet: toFleet,
            // method: "card",
            // status: "Success",
            // fleet_manager_id: fleetId,
            // parcel_code: deliveryDetails.parcel_code,
            // parcel_name: deliveryDetails.parcel_name,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      const data = await res.json();
      console.log(data);

      //   if (res.status === 200) {
      //     setTimeoutState(true);
      //     navigate("/paysuccess", { state: { itemId: parcelCode } });
      //   } else {
      //     // setMessage("An Error occured");
      //   }
    } catch (error) {
      console.log(error);
      // const err = error
    }
    // setIsSuccess(true);
  };
  return (
    <div className="react-pay">
      <div className="react-form">
        <div>Enter your email address</div>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div id="btn-proceed">
          <PaystackButton {...componentProps} />
        </div>
      </div>
    </div>
  );
}
