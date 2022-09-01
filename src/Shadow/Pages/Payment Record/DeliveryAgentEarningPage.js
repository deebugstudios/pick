import React, { useContext, useEffect, useState } from "react";
import { RiderContext } from "../Contexts/RiderContext";
import { NoTransaction } from "../NoTransactionpage/NoTransaction";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import "./deliveryagentearningpage.css";
import { PaymentWeeks } from "./ReauableComponents/PaymentWeeks/PaymentWeeks";
import ClipLoader from "react-spinners/ClipLoader";
const DeliveryAgentEarningPage = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [message, setMessage]= useState("")
  const [cname1, setCname1] = useState("week1");
  const [cname2, setCname2] = useState("week2");
  const [cname3, setCname3] = useState("week2");
  const [cname4, setCname4] = useState("week2");
  const [cname5, setCname5] = useState("week2");
  const [week, setWeek] = useState(1);
  const [date, setDate] = useState("");

  const handleClassName1 = () => {
    setWeek(1);
    setCname1("week1");
    setCname2("week2");
    setCname3("week2");
    setCname4("week2");
    setCname5("week2");
  };
  const handleClassName2 = () => {
    setWeek(2);
    setCname1("week2");
    setCname2("week1");
    setCname3("week2");
    setCname4("week2");
    setCname5("week2");
  };
  const handleClassName3 = () => {
    setWeek(3);
    setCname1("week2");
    setCname2("week2");
    setCname3("week1");
    setCname4("week2");
    setCname5("week2");
  };
  const handleClassName4 = () => {
    setWeek(4);
    setCname1("week2");
    setCname2("week2");
    setCname3("week2");
    setCname4("week1");
    setCname5("week2");
  };
  const handleClassName5 = () => {
    setWeek(5);
    setCname1("week2");
    setCname2("week2");
    setCname3("week2");
    setCname4("week2");
    setCname5("week1");
  };

  // console.log(week);
  // console.log(computedYear, computedMonth)
  // console.log(date.getFullYear())
  const value = useContext(RiderContext);
  const { riderdata, token } = value;

  const fetchEarning = async () => {
    let computedYear = new Date(date).getFullYear();
    let computedMonth = new Date(date).getMonth();
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_single_delivery_agent_earnings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(token),
            month: computedMonth,
            year: computedYear,
            week: week,
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
  }, [week]);

  // const jeff = dataList.map((obj) =>(
  //     <li>{obj?.timestamp}</li>
  // ))

  const earningList = dataList?.map((itemsObj, index) => (
    <tr key={index} className="td-style">
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
    <div className="iii">
      <div className="profile-page-container">
        <MainTop riderdata={riderdata} />
        {loading ? (
          <div className="profile-page-bottom height padding">
            {/* <PaymentWeeks  handleClassName1={handleClassName1} handleClassName2={handleClassName2} handleClassName3={handleClassName3} handleClassName4={handleClassName4} handleClassName5={handleClassName5}/> */}
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "20%", marginBottom: "15px", marginLeft: "5px" }}
            />
            <section className="paymentweeks-container">
              <div className="payment-week">
                <div className={cname1} onClick={handleClassName1}>
                  WEEK 1
                </div>
                <div className={cname2} onClick={handleClassName2}>
                  WEEK 2
                </div>
                <div className={cname3} onClick={handleClassName3}>
                  WEEK 3
                </div>
                <div className={cname4} onClick={handleClassName4}>
                  WEEK 4
                </div>
                <div className={cname5} onClick={handleClassName5}>
                  WEEK 5
                </div>
              </div>
            </section>
            <h1
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <ClipLoader color={"#1AA803"} loading={loading} size={100} />
            </h1>
          </div>
        ) : (
          <div className="profile-page-bottom height padding">
            {/* <PaymentWeeks 
            handleClassName1={handleClassName1} handleClassName2={handleClassName2} handleClassName3={handleClassName3} handleClassName4={handleClassName4} handleClassName5={handleClassName5} cname1={cname1} cname2={cname2} cname3={cname3} cname4={cname4} cname5={cname5}
          /> */}
            <input type="date" onChange={(e) => setDate(e.target.value)} />
            <section className="paymentweeks-container">
              <div className="payment-week">
                <div className={cname1} onClick={handleClassName1}>
                  WEEK 1
                </div>
                <div className={cname2} onClick={handleClassName2}>
                  WEEK 2
                </div>
                <div className={cname3} onClick={handleClassName3}>
                  WEEK 3
                </div>
                <div className={cname4} onClick={handleClassName4}>
                  WEEK 4
                </div>
                <div className={cname5} onClick={handleClassName5}>
                  WEEK 5
                </div>
              </div>
            </section>
            {dataList ? (
              <>
                <table className="table-data">
                  <thead>
                    <th>Date</th>
                    <th>Weekday</th>
                    <th>Daily Earning</th>
                  </thead>
                  <tbody className="earning-tbody">{earningList}</tbody>
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
            ) : (
              <NoTransaction />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryAgentEarningPage;
