// import { async } from "@firebase/util";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Shadow/Pages/Contexts/RiderContext";
import "../css/reason.css";
import Button from "../javascript/Button";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db, storage } from "../../utils/firebase";

export default function CancelReason(props) {
  const navigate = useNavigate();
  const [reason, setReason] = useState("I changed my mind");
  const [explain, setExplain] = useState("");
  const userValues = useContext(userContext);
  const { userName, token } = userValues;

  const handleCheck = (e) => {
    setReason(e.target.value);
  };

  const handleExplain = (e) => {
    setExplain(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const realReason = reason === "Other reasons" ? explain : reason;
    if (reason === "Other reasons" && explain === "") {
      return;
    } else {
      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/user_delivery/cancel_delivery",
          {
            method: "POST",

            body: JSON.stringify({
              delivery_id: props.delivery_id,
              token: JSON.parse(token),
              cancel_reason: realReason,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        // const data = await res.json();
        // console.log(data);

        if (res.status === 200) {
          navigate("/user/completed-del");
          const notifyRef = doc(db, "delivery_requests", props.delivery_id);
          await updateDoc(notifyRef, {
            cancel_reason: realReason,
            delivery_status_is_cancelled_by: JSON.parse(userName),
            delivery_status_is_cancelled: true,
            delivery_status_is_cancelled_at: Date.now(),
          });
        } else {
          // setMessage("Error occured");
          // console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form id="reason-form" onSubmit={handleSubmit}>
      <h2>
        Please let us know why you are cancelling <br /> this delivery request
      </h2>
      <br />

      <div id="reason-div">
        <div className="div-reason">
          <div className="real-div">
            <input
              id="maleCheck"
              type="checkbox"
              value="I changed my mind"
              name="Reason"
              checked={reason === "I changed my mind"}
              onChange={handleCheck}
            />
            <label className="check-reason" htmlFor="Reason">
              I changed my mind
            </label>
          </div>

          <div className="real-div">
            <input
              id="maleCheck"
              type="checkbox"
              value="High cost of delivery"
              name="Reason"
              checked={reason === "High cost of delivery"}
              onChange={handleCheck}
            />
            <label className="check-reason" htmlFor="Reason">
              High cost of delivery
            </label>
          </div>
        </div>

        <div className="div-reason">
          <div className="real-div">
            <input
              id="maleCheck"
              type="checkbox"
              value="Long delivery time"
              name="Reason"
              checked={reason === "Long delivery time"}
              onChange={handleCheck}
            />
            <label className="check-reason" htmlFor="Reason">
              Long delivery time
            </label>
          </div>

          <div className="real-div">
            <input
              id="maleCheck"
              type="checkbox"
              value="Other reasons"
              name="Reason"
              checked={reason === "Other reasons"}
              onChange={handleCheck}
            />
            <label className="check-reason" htmlFor="Reason">
              Other reasons
            </label>
          </div>
        </div>
      </div>
      <br />

      <div id="input-div-w">
        <label className="check-reason" htmlFor="why">
          Please tell us why
        </label>
        <textarea
          type="text"
          name="why"
          id="why-input"
          className="phone-input3 textarea"
          disabled={reason !== "Other reasons"}
          value={explain}
          onChange={handleExplain}
        />
      </div>

      <Button name="Submit" />
    </form>
  );
}
