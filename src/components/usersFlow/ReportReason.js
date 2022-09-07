import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/reason.css";
import Button from "../javascript/Button";
import ReportThanks from "./ReportThanks";
import Popup, { Popup2, Popup3 } from "../javascript/Popup";
import { userContext } from "../../Shadow/Pages/Contexts/RiderContext";

export default function ReportReason(props) {
  const navigate = useNavigate();
  const [reason, setReason] = useState("Item Seal Broken");
  const [others, setOthers] = useState("");
  const [message, setMessage] = useState("");
  const [popupButton, setPopupButton] = useState(false);
  const [explain, setExplain] = useState("");
  const userValues = useContext(userContext);
  const { token } = userValues;

  const [userDetails, setUserDetails] = useState([]);
  /**@type React.MutableRefObject<HTMLInputElement> */
  const othersRef = useRef();

  const fetchUserDetails = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_profile/user_profile",
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
    const results = await data;
    setUserDetails(results?.user);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleCheck = (e) => {
    setReason(e.target.value);
  };

  //set the reason inside handle change

  const handleSubmit = async (e) => {
    e.preventDefault();

    // navigate("/report-thanks");
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_report/report_delivery",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            body: reason,
            delivery_id: props.delivery_id,
            parcel_code: props.parcel_code,
            delivery_img_urls: props.imgs,
            user_id: userDetails._id,
            user_name: userDetails.fullname,
            user_img_id: userDetails.img_id,
            user_img_url: userDetails.img,
            delivery_agent_name: props.agentName,
            delivery_agent_code: props.delivery_agent_code,
            delivery_agent_id: props.delivery_agent_id,
            delivery_agent_img_url: props.delivery_agent_img,
            delivery_agent_img_id: props.delivery_agent_img_id,
            reporter: "user",
            delivery_agent_email: props.delivery_agent_email,
            user_email: userDetails.email,
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
        setPopupButton(true);
      } else {
        setMessage("Error occured");
      }
    } catch (error) {
      console.log(error);
    }
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
            // onChange={handleCheck}
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
