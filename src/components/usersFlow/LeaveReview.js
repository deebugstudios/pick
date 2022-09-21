import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../javascript/Button";
import ReviewThanks from "./ReviewThanks";
import { Popup3 } from "../javascript/Popup";
import { async } from "@firebase/util";
import { userContext } from "../../Shadow/Pages/Contexts/RiderContext";

export default function LeaveReview(props) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(1);
  const [popupButton, setPopupButton] = useState(false);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const userValues = useContext(userContext);
  const { token } = userValues;

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (rating == 0) {
      setRatingError("please pick a star rating");
    } else setRatingError("");

    if (!review) {
      setReviewError("please give more details");
    } else setReviewError("");
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/user_review/new_review",
        {
          method: "POST",

          body: JSON.stringify({
            review: review,
            delivery_agent_id: props.agentId,
            user_img: userDetails.img,
            token: JSON.parse(token),
            user_name: userDetails.fullname,
            stars: rating,
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
        // setMessage("Error occured");
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <form id="reason-form" onSubmit={handleSubmit}>
      <h2 id="review-h2">Review</h2>
      <br />
      <p>How would you rate this delivery agent?</p>
      <br />
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
      <p className="error-style">{ratingError}</p>
      <br />
      <div id="input-div-w">
        <label className="check-reason" htmlFor="why">
          Care to give more details?
        </label>
        <textarea
          type="text"
          name="why"
          id="why-input"
          className="phone-input3 textarea"
          value={review}
          onChange={handleChange}
          maxLength={100}
        />
        <p className="error-style">{reviewError}</p>
      </div>

      <Button name="Publish review" type="submit" />
      <Popup3 trigger={popupButton} setTrigger={setPopupButton}>
        <ReviewThanks />
      </Popup3>
    </form>
  );
}
