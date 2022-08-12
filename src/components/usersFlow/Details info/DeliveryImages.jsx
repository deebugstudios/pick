import React from "react";
// import Me from '../../images/pickloadlogo.png'
import Rectangle from "../../Images/Rectangle.png";
import "./deliveryimages.css";
export const DeliveryImages = (props) => {
  return (
    <div className="delivery-imgs">
      <img src={props?.rectangle} />
    </div>
  );
};

export const DeliveryImages2 = () => {
  return (
    <div className="delivery-imgs">
      <img src={Rectangle} />
    </div>
  );
};
