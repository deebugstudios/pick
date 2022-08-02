import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../javascript/Button";

export default function LeaveReview() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/review-thanks");
  };

  return (
    <form id="reason-form" onSubmit={handleSubmit}>
      <h2 id="review-h2">Review</h2>
      <br />
      <p>How would you rate this delivery agent?</p>
      <br />
      <br />
      <br />
      <br />
      <div id="input-div-w">
        <label className="check-reason" htmlFor="why">
          Care to give more details?
        </label>
        <input type="text" name="why" id="why-input" />
      </div>

      <Button name="Publish review" type="submit" />
    </form>
  );
}
