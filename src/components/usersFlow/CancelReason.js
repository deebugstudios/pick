import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/reason.css";
import Button from "../javascript/Button";

export default function CancelReason(props) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/pending-del");
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

      {/* <Link to="pending-del"> */}
      <Button name="Submit" />
      {/* </Link> */}
    </form>
  );
}
