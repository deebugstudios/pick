import React, { useContext, useState } from "react";
import "./payment_record.css";
import "../../../components/css/toggle.css";
import './payment_bar_stat.css'
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';

export default function DeliveryAgentStatPage() {
    const value = useContext(RiderContext);
  const { riderdata} = value;
  const {no_accepted_deliveries, no_completed_deliveries, no_declined_deliveries, no_cancelled_deliveries } = riderdata
  return (
    <div className="iii">
    <div className="profile-page-container">
    <MainTop riderdata={riderdata}/>
    <div className="profile-page-bottom height">
    <h3><input type="date" name="" id="" className="width-small"/></h3>
        <div className="fleet-manager-stats">
            <div className="deliveries">
                <div className="delivery-stats payment-stat-details">
                    <div className="delivery-name">
                        <p className="yellow"></p>
                        <h5>Accepted deliveries</h5>
                    </div>
                    <div className="amount-made">
                        <h5>{no_accepted_deliveries}</h5>
                    </div>
                </div>
                <div className="delivery-stats payment-stat-details">
                    <div className="delivery-name">
                        <p className="green"></p>
                        <h5>Completed deliveries</h5>
                    </div>
                    <div className="amount-made">
                        <h5>{no_completed_deliveries}</h5>
                    </div>
                </div>
            </div>
            <div className="fleet-payment-stat">
            <div className="delivery-stats payment-stat-details">
                    <div className="delivery-name">
                        <p className="gray"></p>
                        <h5>Ignored deliveries</h5>
                    </div>
                    <div className="amount-made">
                        <h5>{no_declined_deliveries}</h5>
                    </div>
                </div>
                <div className="delivery-stats payment-stat-details">
                    <div className="delivery-name">
                        <p className="red"></p>
                        <h5>Cancelled deliveries</h5>
                    </div>
                    <div className="amount-made">
                        <h5>{no_cancelled_deliveries }</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  );
}
