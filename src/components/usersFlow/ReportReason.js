import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/reason.css";
import Button from "../javascript/Button";
import ReportThanks from "./ReportThanks";
import Popup, { Popup2, Popup3 } from "../javascript/Popup";
import { userContext } from "../../Shadow/Pages/Contexts/RiderContext";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db, storage } from "../../utils/firebase";

export default function ReportReason(props) {
  const navigate = useNavigate();
  const [reason, setReason] = useState("Item Seal Broken");
  const [others, setOthers] = useState("");
  const [message, setMessage] = useState("");
  const [popupButton, setPopupButton] = useState(false);
  const [explain, setExplain] = useState("");
  const userValues = useContext(userContext);
  const [realImage, setRealImage] = useState("");
  const { token, userImg } = userValues;

  /**@type React.MutableRefObject<HTMLInputElement> */
  const othersRef = useRef();

  const handleCheck = (e) => {
    setReason(e.target.value);
  };

  const handleExplain = (e) => {
    setExplain(e.target.value);
  };
  //set the reason inside handle change

  const handleSubmit = async (e) => {
    e.preventDefault();

    // navigate("/report-thanks");
    const realReason = reason === "Other reasons" ? explain : reason;
    if (reason === "Other reasons" && explain === "") {
      return;
    } else {
      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/user_report/report_delivery",
          {
            method: "POST",

            body: JSON.stringify({
              token: JSON.parse(token),
              body: realReason,
              delivery_id: props.delivery_id,
              parcel_code: props.parcel_code,
              delivery_img_urls: props.imgs,
              user_id: props.sender_id,
              user_name: props.sender_fullname,
              user_img_url: JSON.parse(userImg),
              delivery_agent_name: props.agentName,
              delivery_agent_code: props.delivery_agent_code,
              delivery_agent_id: props.delivery_agent_id,
              delivery_agent_img_url: props.delivery_agent_img,
              reporter: "user",
              delivery_agent_email: props.delivery_agent_email,
              user_email: props.user_email,
              delivery_type: props.delivery_type,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );
        const data = await res.json();
        // console.log(data);

        if (res.status === 200) {
          setPopupButton(true);
          const notifyRef = doc(db, "admin_notifiers", "reports");
          await updateDoc(notifyRef, {
            reports_count: increment(1),
          });
        } else {
          setMessage("Error occured");
        }
      } catch (error) {
        // console.log(error);
      }
    }
  };

  return (
    <div className="reason-main-div">
      <form id="reason-form" onSubmit={handleSubmit}>
        <h2>
          Please let us know why you are reporting <br /> this delivery request
        </h2>
        <br />

        <div id="reason-div">
          <div className="div-reason">
            <div className="real-div">
              <input
                id="maleCheck"
                type="checkbox"
                value="Item Seal Broken"
                checked={reason === "Item Seal Broken"}
                name="Reason"
                onChange={handleCheck}
              />
              <label className="check-reason" htmlFor="Reason">
                Item Seal Broken
              </label>
            </div>

            <div className="real-div">
              <input
                id="maleCheck"
                type="checkbox"
                value="Damaged Goods"
                checked={reason === "Damaged Goods"}
                name="Reason"
                onChange={handleCheck}
              />
              <label className="check-reason" htmlFor="Reason">
                Damaged Goods
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
            // onChange={handleChange}
          />
        </div>

        <Button name="Submit" type="submit" />
      </form>

      <Popup3 trigger={popupButton} setTrigger={setPopupButton}>
        <ReportThanks />
      </Popup3>
    </div>
  );
}
