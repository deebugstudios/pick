import React from "react";
import "../css/deliverycompleted.css";

const DeliveryCompleted = () => {
  return (
    <section className="delivery-completed">
      <div className="top-section">
        <h2>Weldone</h2>
        <div className="completed">{/* <img src={} alt="" /> */}</div>
        <p>
          Thanks for the delivery. You've earned some cash for this
          delivery.Summary of delivery is detailed below.
        </p>
      </div>
      <div className="bottom-section">
        <p>
          Item Name <span>Nike Boots</span>
        </p>
        <p>
          Instant delivery ID <span>7809874</span>
        </p>
        <p>
          Total<span># 1,500.00</span>
        </p>
      </div>
      <button className="view-earnings">View Earnings</button>
    </section>
  );
};

export default DeliveryCompleted;
