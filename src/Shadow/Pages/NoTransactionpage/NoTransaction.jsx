import React from "react";
import notransaction from "../../images/message.png";
import "./notransaction.css";
import { PaymentWeeks } from "../ReauableComponents/PaymentWeeks/PaymentWeeks";
export const NoTransaction = () => {
  return (
    <section className="no-transaction-wrapper">
      <div className="no-transaction-container">
        <input type="date" name="" id="" />
        <div className="payment-weeks-wrapper">
          <PaymentWeeks />
        </div>
        <div className="no-transaction-container2">
          <div className="no-transaction-image-wrapper">
            <img src={notransaction} alt="no transaction log" />
          </div>
          <p>No transaction to display</p>
        </div>
      </div>
    </section>
  );
};
