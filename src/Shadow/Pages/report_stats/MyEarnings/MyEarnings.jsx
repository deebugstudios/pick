import React from "react";
import { PaymentWeeks } from "../../Payment Record/ReauableComponents/PaymentWeeks/PaymentWeeks";
import { MainTop } from "../Profile_page_main_top/MainTop";

const MyEarnings = (props) => {
  return (
    <section className="MyEarnings-wrapper">
      {/* <MainTop/> */}
      <div className="profile-page-bottom">
        <div className="calender">
          <input type="date" name="" id="" />
        </div>
        <section className="paymentweeks-container">
          <div className="payment-week">
            <div className={props.cname1} onClick={props.handleClassName1}>
              WEEK 1
            </div>
            <div className={props.cname2} onClick={props.handleClassName2}>
              WEEK 2
            </div>
            <div className={props.cname3} onClick={props.handleClassName3}>
              WEEK 3
            </div>
            <div className={props.cname4} onClick={props.handleClassName4}>
              WEEK 4
            </div>
            <div className={props.cname5} onClick={props.handleClassName5}>
              WEEK 5
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default MyEarnings;
