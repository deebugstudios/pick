import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import Arrow from "../../Images/Arrow.png";
import FormProgress from "../../Images/FormProgress2.png";
import Starr from "../../Images/Star.png";
import "../../css/specific.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DeliveryImages,
  DeliveryImages2,
} from "../Details info/DeliveryImages";
import Button, { Button5 } from "../../javascript/Button";
import MainStar from "../../Images/MainStar.png";
import Stars from "react-stars-display";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import UserIcon from "../../Images/user.png";
import "../../../Shadow/Pages/DeliveryHistorys/DeliveryHistoryDetails/deliveryhistorydetails.css";
import { DateConverter } from "../../../DateAndTimeConverter";
import { ClipLoader } from "react-spinners";

export default function SpecificAgent() {
  const Star = <img src={Starr} alt="" />;
  const MainStars = <img src={MainStar} alt="" />;
  const navigate = useNavigate();
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const userValues = useContext(userContext);
  const [show, setShow] = useState(false);
  const { token } = userValues;
  const isMounted = useRef(true);

  const name = location.state.name;
  const profile = location.state.profile;
  const rating = location.state.total_rating;
  const rating_count = location.state.rating_count;
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
          token: JSON.parse(token),
          delivery_agent_id: agentId,
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setLoading(false);

    // console.log(results);
    setReviews(results?.reviews);
    setShow(true);

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
        <div className="delivery-profile1">
          <div className="driver-profile-image">
            <div className="image">
              <img src={profile} alt="" />
            </div>
          </div>
          <div className="delivery-profile-details">
            <table>
              <tbody>
                <tr>
                  <th>Delivery agent:</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th>Phone number:</th>
                  <td>{phone}</td>
                </tr>
                <tr>
                  <th>Agent ID:</th>
                  <td>{agentId}</td>
                </tr>
                <tr>
                  <th>Vehicle type:</th>
                  <td>{vehicle_name}</td>
                </tr>
                <tr>
                  <th>Vehicle color:</th>
                  <td>{color}</td>
                </tr>
                <tr>
                  <th>Plate number:</th>
                  <td>{plate}</td>
                </tr>
              </tbody>
            </table>

            <div className="ratings-info">
              <div className="ratings-star">
                <p className="important">Rating</p>
                <p>
                  {rating > 0 ? (rating / rating_count).toFixed(1) : "0.0"}{" "}
                  {Star}
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
        {vehicle_image[2] ? (
          <DeliveryImages rectangle={vehicle_image[2]} />
        ) : null}
        {vehicle_image[3] ? (
          <DeliveryImages rectangle={vehicle_image[3]} />
        ) : null}
        {vehicle_image[4] ? (
          <DeliveryImages rectangle={vehicle_image[4]} />
        ) : null}
      </div>

      <br />
      <br />
      <div id="center-button-2">
        <Button5
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
                AgentName: name,
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
        {loading ? (
          <div className="loader-screen">
            <ClipLoader color={"#1AA803"} loading={loading} size={100} />
            <p>Loading...</p>
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((item) => (
            <div id="flex-review">
              <div id="review-div">
                <div className="review-profile">
                  <img
                    src={item.user_img.length > 2 ? item.user_img : UserIcon}
                    alt=""
                  />
                </div>

                <div id="text-review">
                  <p id="reviewer">{item.user_name}</p>
                </div>
                <div id="star-review">
                  <div id="split-star">
                    <div id="actual-star">
                      <Stars
                        stars={item.stars}
                        size={20}
                        spacing={1}
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
                  <p className="date-review">
                    {" "}
                    <DateConverter value={item.timestamp} />
                  </p>
                </div>
              </div>
              <p id="actual-review">{item.review}</p>
            </div>
          ))
        ) : (
          "This agent has no reviews yet"
        )}
      </div>
    </div>
  );
}
