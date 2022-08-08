import React, { useState, useEffect } from "react";
import FormProgress from "../../Images/FormProgress.png";
import "../../css/selectagent.css";
import Splash from "../../Images/splash.png";
import Star from "../../Images/Star.png";
import LoggedinMainPage from "./LoggedinMainPage";
import { Link, useLocation } from "react-router-dom";

export default function SelectAgent() {
  return <LoggedinMainPage file={<SelectAgent1 />} />;
}

export function SelectAgent1() {
  const location = useLocation();
  const vehicle = location.state.vehicle;
  console.log(vehicle);

  const [agent, setAgent] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAgent = async () => {
    const res = await fetch(
      "https://guarded-falls-60982.herokuapp.com/user_delivery/delivery_agents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pagec: 1,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ2ZmVkOGU1OGEyOTIxN2I0MDRiMjIiLCJwaG9uZV9ubyI6IjgwNzI1ODk2NjQiLCJpYXQiOjE2NTgyNTcxMTJ9.bj4YL5kI9rpWJ7CTbMNiKcT1b26x1S33IPH8R-dc9rw",
          delivery_medium: vehicle,
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setLoading(false);
    // setAgent(results?.deliveries);
    console.log(results);
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
            <Link to="/schedule-form">
              <div className="agent-profiles" id="agent-profiles">
                <div className="agent-profiles-image">
                  <img src={Splash} />
                </div>

                <div className="agent-profiles-rating">
                  <p className="agent-info-name">Matthew Johnson</p>
                  <div className="ratings-info">
                    <div className="ratings-star">
                      <p>Rating</p>
                      <p>4.5 {Stars}</p>
                    </div>
                    <div className="ratings-star">
                      <p>Deliveries</p>
                      <p>178</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
            <AgentProfile />
          </div>
        </div>
      </div>
    </>
  );
}

function AgentProfile() {
  const Stars = <img src={Star} alt="" />;
  return (
    <div className="agent-profiles">
      <div className="agent-profiles-image">
        <img src={Splash} />
      </div>
      <div className="agent-profiles-rating">
        <p className="agent-info-name">Matthew Johnson</p>
        <div className="ratings-info">
          <div className="ratings-star">
            <p>Rating</p>
            <p>4.5 {Stars}</p>
          </div>
          <div className="ratings-star">
            <p>Deliveries</p>
            <p>178</p>
          </div>
        </div>
      </div>
    </div>
  );
}
