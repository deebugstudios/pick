import React, { useState, useEffect } from "react";
import Arrow from "../../Images/Arrow.png";
import FormProgress from "../../Images/FormProgress2.png";
import Starr from "../../Images/Star.png";
import "../../css/specific.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DeliveryImages,
  DeliveryImages2,
} from "../Details info/DeliveryImages";
import Button from "../../javascript/Button";
import MainStar from "../../Images/MainStar.png";
import Stars from "react-stars-display";

export default function SpecificAgent() {
  const Star = <img src={Starr} alt="" />;
  const MainStars = <img src={MainStar} alt="" />;
  const navigate = useNavigate();
  const location = useLocation();
  const [reviews, setReviews] = useState([]);

  const name = location.state.name;
  const profile = location.state.profile;
  const rating = location.state.rating;
  const deliveries = location.state.deliveries;
  const phone = location.state.phone;

  const color = location.state.color;
  const plate = location.state.plate;
  const vehicle_name = location.state.vehicle_name;
  const vehicle_image = location.state.vehicle_image;

  const vehicle = location.state.vehicle;
  const agentId = location.state.agentId;
  const distance = location.state.distance;
  const pickupState = location.state.pickupState;
  const pickupLocation = location.state.pickupLocation;
  const dropOffLocation = location.state.dropOffLocation;
  const price = location.state.price;
  const type = location.state.type;
  const pickup_address = location.state.pickup_address;
  const drop_off_address = location.state.drop_off_address;
  const senderName = location.state.senderName;
  const phone_no = location.state.phone_no;
  const email = location.state.email;

  const fetchReviews = async () => {
    const res = await fetch(
      `https://ancient-wildwood-73926.herokuapp.com/user_review/top_reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBlNjdiODQ1M2EzNzIyMjc1N2I3OGMiLCJwaG9uZV9ubyI6IisyMzQ4MTU3NTQyODIwIiwiaWF0IjoxNjYxODg4NDUzfQ.ZcLApAMCMxmo17pp17Bu9nJ0d_G_vvkhfZekLrrkjis",
          delivery_agent_id: agentId,
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    // setLoading(false);

    console.log(results);
    setReviews(results?.reviews);
    // console.log(userDetails);
    // pendingDeliveries.map((item) => console.log(item));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div id="specific-a-div">
      <br />
      <br />
      <div
        id="arrow-div-specific"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={Arrow} alt="" />
      </div>

      <div id="select-agent-content">
        <h3>Scheduled Delivery</h3>
        <div>
          <img src={FormProgress} alt="" />
        </div>
      </div>

      <div id="profile-ratings-section">
        <div className="delivery-profile">
          <div className="driver-profile-image">
            <div className="image2">
              <img src={profile} alt="" />
            </div>
          </div>
          <div className="delivery-profile-details">
            <table>
              <tbody>
                <tr>
                  <th>Delivery Agent :</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th>Vehicle Type :</th>
                  <td>{vehicle_name}</td>
                </tr>
                <tr>
                  <th>Vehicle Color :</th>
                  <td>{color}</td>
                </tr>
                <tr>
                  <th>Agent ID :</th>
                  <td>{agentId}</td>
                </tr>
                <tr>
                  <th>Plate Number :</th>
                  <td>{plate}</td>
                </tr>
                <tr>
                  <th>Phone Number :</th>
                  <td>{phone}</td>
                </tr>
              </tbody>
            </table>

            <div className="ratings-info">
              <div className="ratings-star">
                <p className="important">Rating</p>
                <p>
                  {rating == null ? 0 : `${rating}.0`} {Star}
                </p>
              </div>
              <div className="ratings-star">
                <p className="important">Deliveries</p>
                <p>{deliveries}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="delivery-details-pictures-1 specifics-images">
        {vehicle_image.map((item, index) => (
          <li key={index}>
            <DeliveryImages rectangle={item} />
          </li>
        ))}
      </div>

      <br />
      <br />
      <div id="center-button-2">
        <Button
          name="Proceed with this Agent"
          click={() => {
            navigate("/user/schedule-form", {
              state: {
                vehicle: vehicle,
                distance: distance,
                pickupState: pickupState,
                pickupLocation: pickupLocation,
                agentId: agentId,
                dropOffLocation: dropOffLocation,
                price: price,
                type: type,
                pickup_address: pickup_address,
                drop_off_address: drop_off_address,
                senderName: senderName,
                phone_no: phone_no,
                email: email,
              },
            });
          }}
        />
      </div>

      <br />
      <br />

      <div id="review-p-div">
        <p id="review-p">
          <strong>
            <span className="review-span">Reviews</span>
          </strong>
        </p>
      </div>

      <br />
      <br />

      <div id="review-div-wrapper">
        {reviews.map((item) => (
          <div id="review-div">
            <div className="review-profile">
              <img src={item.user_img} alt="" />
            </div>
            <div id="text-review">
              <p id="reviewer">{item.user_name}</p>
              <p id="actual-review">{item.review}</p>
            </div>
            <div id="star-review">
              <div id="split-star">
                <div id="actual-star">
                  <Stars
                    stars={item.stars}
                    size={35}
                    spacing={2}
                    fill="#ea9c46"
                  />
                </div>
                <p>
                  {Number.isInteger(item.stars)
                    ? `${item.stars}.0`
                    : item.stars}
                </p>
              </div>
              <br />
              <p className="date-review">11/06/21</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
