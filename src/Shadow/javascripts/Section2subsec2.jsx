import React from "react";
import "../css/section2subsec2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Section2subsec3 from "./Section2subsec3";
const Section2subsec2 = () => {
  return (
    <section className="subsec2-main-wrapper">
      <section className="subsec2-wrapper">
        <div className="subsecs2-left">
          <h3>
            about <span>pickload</span>
          </h3>
          <p>
            Pickload was birthed to bridge a gap between at home buyers, sellers
            and the item's logistics. Our Delivery agents provide super fast
            pickup and Delivery services to it's pickload users and also
            provides a way for delivery agents to earn cash as well for the
            services rendered. In short, PICKLOAD serves the purpose of
            connecting these sets of people together in a secure and convenient
            space{" "}
          </p>
          <div className="btns">
            <button className="learn-more">Learn More</button>
            <button className="watch-video">
              {" "}
              <a href="http://www.youtube.com" target="_blank">
                {" "}
                Watch Video <FontAwesomeIcon icon={faPlay} />{" "}
              </a>
            </button>
          </div>
        </div>
        <div className="subsecs2-right">
          <div className="stats">
            <div>
              <h4>500+</h4>
              <p>Avaliable Riders</p>
            </div>
            <div>
              <h4>250+</h4>
              <p>Deliveries Completed</p>
            </div>
            <div>
              <h4>640+</h4>
              <p>Satisfied Users</p>
            </div>
            <div>
              <h4>25</h4>
              <p>Fleets Managers</p>
            </div>
          </div>
        </div>
      </section>
      <Section2subsec3 />
    </section>
  );
};

export default Section2subsec2;
