import React from "react";
import "../css/ourservices.css";
import parcelicon from "../images/parcelicon.png";
import truckicon from "../images/truckicon.png";
const OurServices = () => {
  return (
    <section className="ourservices">
      <h3>Our Services</h3>
      <p>
        PickLoad offers a wide range of delivery services that cater to
        different needs, ranging from the transportation of small parcels and
        items to the relocation of entire households. We prioritize our users'
        satisfaction by offering both on-demand/instant delivery services and
        scheduled delivery services.
      </p>
      <div className="ourservices-description">
        <div className="ourservices-descrip">
          <img src={parcelicon} alt="parcel-icon" />
          <div className="ourservices-texts">
            <h4>ITEM DELIVERY</h4>
            <p>
              We have logistics companies and individuals ready to move your
              items to your desired destination.{" "}
            </p>
          </div>
        </div>
        <div className="ourservices-descrip">
          <img src={truckicon} alt="truck-icon" />
          <div className="ourservices-texts">
            <h4>HOUSE MOVEMENT</h4>
            <p>
              Move your home items to your new home by making an Instant or
              Scheduled delivery request on the PickLoad app.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
