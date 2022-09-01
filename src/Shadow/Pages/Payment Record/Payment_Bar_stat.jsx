import React, { useContext, useState } from "react";
import "./payment_record.css";
import "../../../components/css/toggle.css";
import "./payment_bar_stat.css";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
import { useNavigate } from "react-router-dom";
// import { Calendar } from "../../../Calendar";
// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';

export default function Payment_Bar_stat() {
  const value = useContext(RiderContext);
  const { riderdata } = value;

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="iii">
      <div className="profile-page-container">
        <MainTop riderdata={riderdata} />
        <div className="profile-page-bottom height">
          {/* <div className="back-arrow">
               <p onClick={goBack}>go back</p> 
        </div> */}
          <div className="input-div">
            {/* <input type="date" name="" id="" className="width-small"/> */}
            {/* <Calendar/> */}
          </div>
          <div className="fleet-manager-stats">
            <div className="deliveries">
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="yellow"></p>
                  <h5>Accepted deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>800</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="green"></p>
                  <h5>Completed deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>750</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="gray"></p>
                  <h5>Ignored deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>800</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="red"></p>
                  <h5>Cancelled deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>800</h5>
                </div>
              </div>
            </div>
            <div className="fleet-payment-stat">
              <div className="payment-stat-details margin-bottom">
                <div className="vechicle-name">
                  <p className="yellow"></p>
                  <h5>Bikes</h5>
                </div>
                <div className="amount-made">
                  <h5>N 80000</h5>
                </div>
              </div>
              <div className="payment-stat-details margin-bottom">
                <div className="vechicle-name">
                  <p className="gray"></p>
                  <h5>Buses</h5>
                </div>
                <div className="amount-made">
                  <h5>N 80000</h5>
                </div>
              </div>
              <div className="payment-stat-details margin-bottom">
                <div className="vechicle-name">
                  <p className="green"></p>
                  <h5>Cars</h5>
                </div>
                <div className="amount-made">
                  <h5>N 80000</h5>
                </div>
              </div>
              <div className="payment-stat-details margin-bottom">
                <div className="vechicle-name">
                  <p className="red"></p>
                  <h5>Trucks</h5>
                </div>
                <div className="amount-made">
                  <h5>N 80000</h5>
                </div>
              </div>
              <div className="payment-stat-details">
                <div className="vechicle-name">
                  <h5>TOTAL</h5>
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
  );
}
