import React, { useContext, useEffect, useState } from "react";
import { RiderContext } from "../Contexts/RiderContext";
import { NoTransaction } from "../NoTransactionpage/NoTransaction";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import "./deliveryagentearningpage.css";
import { PaymentWeeks } from "./ReauableComponents/PaymentWeeks/PaymentWeeks";
const DeliveryAgentEarningPage = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [message, setMessage]= useState("")

  const value = useContext(RiderContext);
  const { riderdata, token } = value;

  const fetchEarning = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_single_delivery_agent_earnings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token:JSON.parse(token),
            month: 7,
            year: 2022,
            week: 4,
          }),
        }
      );
      const data = await res.json();

      setDataList(data?.delivery_agent_earnings);
      setLoading(false);
      console.log(data?.delivery_agent_earnings);
      console.log("worked");
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  };
  useEffect(() => {
    fetchEarning();
  }, []);

  // const jeff = dataList.map((obj) =>(
  //     <li>{obj?.timestamp}</li>
  // ))

  const earningList = dataList?.map((itemsObj, index) => (
    <tr key={index}>
      <td>{itemsObj?.timestamp}</td>
      <td>{itemsObj?.timestamp}</td>
      <td>{itemsObj?.amt_for_delivery_agent}</td>
    </tr>
  ));
  const totalAmount = dataList?.map((itemsObj) => (
    <span>{itemsObj?.total_weekly_earnings}</span>
  ));
  // console.log(totalAmount);
  return (
    <div className="profile-page-container">
      <MainTop riderdata={riderdata} />
      {loading ? (
        <div className="profile-page-bottom height padding">
          <PaymentWeeks />
          <h1
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            loading...
          </h1>
        </div>
      ) :  (
        <div className="profile-page-bottom height padding">
          <PaymentWeeks />
         { dataList ?
         <>
          <table className="table-data">
            <thead>
              <th>Date</th>
              <th>Weekday</th>
              <th>Daily Earning</th>
            </thead>
            <tbody className="earning-tbody">
              {earningList}
            </tbody>
          </table>
          <div className="total-earnings">
            <h5>TOTAL WEEKS EARNING</h5>
            <p>N {totalAmount}</p>
          </div>
          <div className="place-right">
            <div className="is-payment">
              <p>PENDING PAYMENT</p>
            </div>
          </div>
          </>
        : <NoTransaction/> }
        </div>
      )  }
    </div>
  );
};

export default DeliveryAgentEarningPage;
