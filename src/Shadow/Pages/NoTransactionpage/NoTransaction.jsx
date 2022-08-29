import React from "react";
import notransaction from "../../images/notransaction.png";
import "./notransaction.css";
import { PaymentWeeks } from "../Payment Record/ReauableComponents/PaymentWeeks/PaymentWeeks";
export const NoTransaction = () => {
  return (
    
      <div className="no-transaction-container">
        <div className="no-transaction-container2">
          <div className="no-transaction-image-wrapper">
            <img src={notransaction} alt="no transaction log" />
          </div>
          <p>No transaction to display</p>
        </div>
      </div>
  );
};
