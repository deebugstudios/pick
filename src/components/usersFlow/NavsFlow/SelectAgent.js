import React, { useState, useEffect, useContext } from "react";
import FormProgress from "../../Images/FormProgress.png";
import "../../css/selectagent.css";
import Splash from "../../Images/splash.png";
import Star from "../../Images/Star.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../../Shadow/Pages/Contexts/RiderContext";
import { ClipLoader } from "react-spinners";

export default function SelectAgent() {
  const location = useLocation();
  const vehicle = location.state.vehicle;
  const distance = location.state.distance;
  const pickupLocation = location.state.pickupLocation;
  const pickupState = location.state.pickupState;
  const dropOffLocation = location.state.dropOffLocation;
  const delivery_cost = location.state.price;
  const member = location.state.member;
  const pickup_address = location.state.pickup_address;
  const drop_off_address = location.state.drop_off_address;
  const navigate = useNavigate();
  const senderName = location.state.senderName;
  const number = location.state.number;
  const email = location.state.email;
  const userValues = useContext(userContext);
  const { token } = userValues;

  const [agent, setAgent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState("");

  const fetchAgent = async () => {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/user_delivery/delivery_agents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pagec: 1,
          token: JSON.parse(token),
          delivery_medium: vehicle,
          state: pickupState,
        }),
      }
    );
    const data = await res.json();
    // console.log(data);
    // const results = await data;
    setLoading(false);
    // setAgent(results?.deliveries);
    setAgent(data?.delivery_agents);
    console.log(data?.delivery_agents);
  };

  useEffect(() => {
    fetchAgent();
  }, []);

  const Stars = <img src={Star} alt="" />;

  if (loading === true) {
    return (
      <div className="loader-screen">
        <ClipLoader color={"#1AA803"} loading={loading} size={100} />
        <p>Loading...</p>
      </div>
    );
  } else
    return (
      <>
        <div id="select-agent-wrap">
          <div id="select-agent-content">
            <h3>Choose Your Preferred Delivery Agent</h3>
            <div>
              <img src={FormProgress} alt="" />
            </div>

            <div id="agent-profiles-div">
              {agent?.map((item) => (
                <div
                  className="agent-profiles"
                  id="agent-profiles"
                  onClick={() => {
                    navigate("/user/specific-a", {
                      state: {
                        name: item?.fullname,
                        profile: item?.img_url,
                        total_rating: item?.rating.total_rating,
                        rating_count: item?.rating.rating_count,
                        deliveries: item?.no_completed_deliveries,
                        phone: item?.phone_no,
                        agentId: item?._id,
                        color: item?.vehicle_details.color,
                        plate: item?.vehicle_details.plate_no,
                        vehicle_name: item?.vehicle_details.name,
                        vehicle_image: item?.vehicle_details.img_urls,
                        vehicle: vehicle,
                        distance: distance,
                        pickupLocation: pickupLocation,
                        pickupState: pickupState,
                        dropOffLocation: dropOffLocation,
                        price: delivery_cost,
                        type: member,
                        pickup_address: pickup_address,
                        drop_off_address: drop_off_address,
                        senderName: senderName,
                        phone_no: number,
                        email: email,
                      },
                    });
                  }}
                >
                  <div className="agent-profiles-image">
                    <img src={item?.img_url} />
                  </div>

                  <div className="agent-profiles-rating">
                    <p className="agent-info-name">{item?.fullname}</p>
                    <div className="ratings-info">
                      <div className="ratings-star">
                        <p>Rating</p>
                        <p>
                          {item?.rating.rating_count > 0
                            ? (
                                item?.rating.total_rating /
                                item?.rating.rating_count
                              ).toFixed(1)
                            : "0"}{" "}
                          {Stars}
                        </p>
                      </div>
                      <div className="ratings-star">
                        <p>Deliveries</p>
                        <p>{item?.no_completed_deliveries}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
// </Link>;
// function AgentProfile() {
//   const Stars = <img src={Star} alt="" />;
//   return (
//     <div className="agent-profiles">
//       <div className="agent-profiles-image">
//         <img src={Splash} />
//       </div>
//       <div className="agent-profiles-rating">
//         <p className="agent-info-name">Matthew Johnson</p>
//         <div className="ratings-info">
//           <div className="ratings-star">
//             <p>Rating</p>
//             <p>4.5 {Stars}</p>
//           </div>
//           <div className="ratings-star">
//             <p>Deliveries</p>
//             <p>178</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
