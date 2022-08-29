import React from "react";
import "./Pages/DeliveryRequest/Request_pickup/resquestpickup.css";
import { Link, Outlet } from "react-router-dom";
const FirstPageToDisplay = () => {
  return (
    <section className="user-dashboard">
      <div className="user-right-side">
        
      </div>
      <Outlet/>
    </section>
  );
};

export default FirstPageToDisplay;
