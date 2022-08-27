import React, { useState, useEffect } from "react";
import FormProgress from "../../Images/FormProgress.png";
import "../../css/selectagent.css";
import Splash from "../../Images/splash.png";
import Star from "../../Images/Star.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SelectAgent() {
  const location = useLocation();
  const vehicle = location.state.vehicle;
  const deliveryState = location.state.pickupState;
  const navigate = useNavigate();

  const [agent, setAgent] = useState([]);
  const [loading, setLoading] = useState(true);

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
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZmOWRjMTIwZjFmYzlhNjRjNzg2YjIiLCJwaG9uZV9ubyI6IjgwNjU4Njk1MDEiLCJpYXQiOjE2NjExMDY0MTh9.HJZDyNXDZqIxwgW8jni0RVJalip1jij3TtxELLy0vc8",
          delivery_medium: vehicle,
          state: deliveryState,
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
                      rating: item?.rating.total_rating,
                      deliveries: item?.no_successful_deliveries,
                      phone: item?.phone_no,
                      agentId: item?._id,
                      color: item?.vehicle_details.color,
                      plate: item?.vehicle_details.plate_no,
                      vehicle_name: item?.vehicle_details.name,
                      vehicle_image: item?.vehicle_details.img_urls,
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
                        {item?.rating.total_rating}.0 {Stars}
                      </p>
                    </div>
                    <div className="ratings-star">
                      <p>Deliveries</p>
                      <p>{item?.no_successful_deliveries}</p>
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
