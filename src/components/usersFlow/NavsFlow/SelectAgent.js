import React from "react";
import FormProgress from "../../Images/FormProgress.png";
import "../../css/selectagent.css";
import Splash from "../../Images/splash.png";
import Star from "../../Images/Star.png";
import LoggedinMainPage from "./LoggedinMainPage";
import { Link } from "react-router-dom";

export default function SelectAgent() {
  return <LoggedinMainPage file={<SelectAgent1 />} />;
}

export function SelectAgent1() {
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
            <Link to="/schedule-f">
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
