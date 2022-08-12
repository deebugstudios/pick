import React, { useContext, useState } from "react";
import { PaymentWeeks } from "./ReauableComponents/PaymentWeeks/PaymentWeeks";
import "./payment_record.css";
import "../../../components/css/toggle.css";
import { useNavigate } from "react-router-dom";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
import { FleetSummarydetails } from "./ReauableComponents/PaymentWeeks/FleetSummarydetails";
import Payment_Stat from "./Payment_Stat";


// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';

export default function Payment_record() {
  const value = useContext(RiderContext);
  const { riderdata} = value;
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();


  let listItem
  if (toggle === true) {
    listItem = <FleetSummarydetails/>;
  } else {
    listItem = <Payment_Stat/> ;
  }


  const firstClick = () => {
    setToggle(true);

    // navigate("/Pending-del");
  };

  const secondClick = () => {
    setToggle(false);
    // navigate("/Pending-del");
  };


const goBack = () => {
    navigate(-1)
  }


  return (
    <div className="profile-page-container">
    {/* <MainTop/> */}

    <div className="profile-page-bottom">
        <div className="back-arrow">
            <p onClick={goBack}>go back</p> 
        </div>
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
          {listItem}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
