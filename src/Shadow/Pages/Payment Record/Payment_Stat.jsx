import React, { useContext, useState } from "react";
import { PaymentWeeks } from "./ReauableComponents/PaymentWeeks/PaymentWeeks";
import "./payment_record.css";
import "../../../components/css/toggle.css";
import { useNavigate } from "react-router-dom";
import './payment_stat.css'
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';

export default function Payment_Stat() {
    const value = useContext(RiderContext);
    const { riderdata} = value;
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const firstClick = () => {
    setToggle(true);

    // navigate("/Pending-del");
  };

  const secondClick = () => {
    setToggle(false);
    // navigate("/Pending-del");
  };
  return (
    <div className="profile-page-container">
    {/* <MainTop/> */}
    <div className="profile-page-bottom height">
    <div className="payment-record-container">
      <div className="DA-payment-history">
        <div className="da-payment-props">
          <div className="payment-to">
            <div className="toggle-div">
              <div
                className="first-toggle"
                onClick={firstClick}
                id={toggle ? "active" : "inactive2"}
              >
                Fleet Weekly Summary
              </div>
              <div
                className="second-toggle"
                onClick={secondClick}
                id={toggle ? "inactive" : "active2"}
              >
                Combined Earnings
              </div>
            </div>
          </div>
          <div className="record-date">
            <input type="date" />
          </div>
          <div className="payment-history">
            <div className="payment-vehicle">
              <div className="bikes">BIKES</div>
              <div className="cars">CARS</div>
              <div className="buses">BUSES</div>
              <div className="truck">TRUCKS</div>
            </div>
            <PaymentWeeks />
            <div className="payment-stat">
                <div className="payment-stat-details">
                    <div className="vechicle-name">
                        <p className="yellow"></p>
                        <h5>Bikes</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N 80000</h5>
                    </div>
                </div>
                <div className="payment-stat-details">
                <div className="vechicle-name">
                        <p className="gray"></p>
                        <h5>Buses</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N 80000</h5>
                    </div>
                </div>
                <div className="payment-stat-details">
                <div className="vechicle-name">
                        <p className="green"></p>
                        <h5>Cars</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N 80000</h5>
                    </div>
                </div>
                <div className="payment-stat-details">
                <div className="vechicle-name">
                        <p className="red"></p>
                        <h5>Trucks</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N 80000</h5>
                    </div>
                </div>
                <div className="payment-stat-details span2">
                <div className="vechicle-name">
                        <h5>TOTAL WEEK 1 FLEET  EARNINGS</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N 175000</h5>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
