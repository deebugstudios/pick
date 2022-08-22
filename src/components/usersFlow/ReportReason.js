import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/reason.css";
import Button from "../javascript/Button";
import ReportThanks from "./ReportThanks";
import Popup from "../javascript/Popup";

export default function ReportReason(props) {
  const navigate = useNavigate();
  const [reason, setReason] = useState("Parcel Seal Broken");
  const [others, setOthers] = useState("");
  const [message, setMessage] = useState("");
  const [popupButton, setPopupButton] = useState(false);
  /**@type React.MutableRefObject<HTMLInputElement> */
  const othersRef = useRef();

  const handleCheck = (e) => {
    setReason(e.target.value);
  };

  //set the reason inside handle change

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopupButton(true);

    // navigate("/report-thanks");
    // try {
    //   const res = await fetch(
    //     "https://guarded-falls-60982.herokuapp.com/user_auth/signup",
    //     {
    //       method: "POST",

    //       body: JSON.stringify({
    //         token:
    //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ2ZmVkOGU1OGEyOTIxN2I0MDRiMjIiLCJwaG9uZV9ubyI6IjgwNzI1ODk2NjQiLCJpYXQiOjE2NTgyNTcxMTJ9.bj4YL5kI9rpWJ7CTbMNiKcT1b26x1S33IPH8R-dc9rw",
    //         body: reason,
    //         delivery_id: "",
    //         delivery_code: "",
    //         delivery_img_ids: "",
    //         delivery_img_urls: "",
    //         user_id: "",
    //         user_name: "",
    //         user_img_id: "",
    //         user_img_url: "",
    //         delivery_agent_name: "",
    //         delivery_agent_code: "",
    //         delivery_agent_id: "",
    //         delivery_agent_img_url: "",
    //         delivery_agent_img_id: "",
    //         reporter: "",
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json, text/plain, */*",
    //       },
    //     }
    //   );
    //   const data = await res.json();
    //   console.log(data);

    //   if (res.status === 200) {
    //     setMessage("User created successfully");
    //     navigate("/report-thanks");
    //   } else {
    //     setMessage("Error occured");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // if (reason === "Other reasons" && othersRef.current.value !== "") {
  //   setReason(`Other reasons: ${othersRef.current.value}`);
  // }

  console.log(reason);
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
                value="Parcel Seal Broken"
                checked={reason === "Parcel Seal Broken"}
                name="Reason"
                onChange={handleCheck}
              />
              <label className="check-reason" htmlFor="Reason">
                Parcel Seal Broken
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
            className="phone-input3"
            disabled={reason !== "Other reasons"}
            ref={othersRef}
            // onChange={handleChange}
          />
        </div>

        <Button name="Submit" type="submit" />
      </form>

      <Popup trigger={popupButton} setTrigger={setPopupButton}>
        <ReportThanks />
      </Popup>
    </div>
  );
}
