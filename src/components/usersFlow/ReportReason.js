import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/reason.css";
import Button from "../javascript/Button";

export default function ReportReason(props) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/report-thanks");
  };
  return (
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
              name="Reason"
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
              name="Reason"
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
        <input type="text" name="why" id="why-input" />
      </div>

      <Button name="Submit" type="submit" />
    </form>
  );
}
