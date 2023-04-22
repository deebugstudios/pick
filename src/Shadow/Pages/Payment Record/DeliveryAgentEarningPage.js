import React, { useContext, useEffect, useState } from "react";
import { RiderContext } from "../Contexts/RiderContext";
import { NoTransaction } from "../NoTransactionpage/NoTransaction";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import "./deliveryagentearningpage.css";
import { PaymentWeeks } from "./ReauableComponents/PaymentWeeks/PaymentWeeks";
import ClipLoader from "react-spinners/ClipLoader";
import { DateConverter, WeekDayConverter } from "../../../DateAndTimeConverter";
import weekRangeGetter, { getWeekNumber } from "../WeekRanger";
import dayjs from "dayjs";
import ThousandConverter from "../../../components/javascript/ThousandConverter";
const DeliveryAgentEarningPage = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  // const [message, setMessage]= useState("")
  const [cname1, setCname1] = useState("week1");
  const [cname2, setCname2] = useState("week2");
  const [cname3, setCname3] = useState("week2");
  const [cname4, setCname4] = useState("week2");
  const [cname5, setCname5] = useState("week2");
  const [cname6, setCname6] = useState("week2");
  const [week, setWeek] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Cweek, setCweek] = useState(1);
  const [month, setMonth] = useState(Number.parseInt(dayjs().month()));
  const [year, setYear] = useState(Number.parseInt(dayjs().year()));
  const [date, setDate] = useState(dayjs(Date.now()).format("YYYY-MM"));
  const handleDate = (e) => {
    const newDate = dayjs(e.target.value).format("YYYY-MM");
    const yearM = Number.parseInt(newDate.slice(0, 4));
    const monthM = Number.parseInt(newDate.slice(5, 7)) - 1;
    setDate(newDate);
    setYear(Number.parseInt(newDate.slice(0, 4)));
    setMonth(Number.parseInt(newDate.slice(5, 7)) - 1);
    // console.log(newDate, yearM, monthM);
    fetchData(Cweek, monthM, yearM);
    checkPayment(Cweek, month, yearM);
    weekRangeGetter(monthM, yearM);
  };

  useEffect(() => {
    const weekNo = getWeekNumber(year, month, new Date().getDate());
    switch (weekNo) {
      case 1:
        handleClick5("auto");

        break;
      case 2:
        handleClick6("auto");

        break;
      case 3:
        handleClick7("auto");

        break;
      case 4:
        handleClick8("auto");

        break;
      case 5:
        handleClick9("auto");

        break;
      case 6:
        handleClick11("auto");

        break;
    }
    fetchData();
    checkPayment();
  }, []);
  const handleClick5 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName1();
      setCweek(1);
      fetchData(1);
      checkPayment(1);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName1();
      setCweek(1);
      fetchData(1);
      checkPayment(1);
      // setDWeek("");
    }
  };

  const handleClick6 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName2();
      setCweek(2);
      fetchData(2);
      checkPayment(2);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName2();
      setCweek(2);
      fetchData(2);
      checkPayment(2);
      // setDWeek("");
    }
  };

  const handleClick7 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName3();
      setCweek(3);
      fetchData(3);
      checkPayment(3);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName3();
      setCweek(3);
      fetchData(3);
      checkPayment(3);
      // setDWeek("");
    }
  };

  const handleClick8 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName4();
      setCweek(4);
      fetchData(4);
      checkPayment(4);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName4();
      setCweek(4);
      fetchData(4);
      checkPayment(4);
      // setDWeek("");
    }
  };

  const handleClick9 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName5();
      setCweek(5);
      fetchData(5);
      checkPayment(5);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName5();
      setCweek(5);
      fetchData(5);
      checkPayment(5);
      // setDWeek("");
    }
  };

  const handleClick11 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName6();
      setCweek(6);
      fetchData(6);
      checkPayment(6);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName6();
      setCweek(6);
      fetchData(6);
      checkPayment(6);
      // setDWeek("");
    }
  };

  const handleClassName1 = () => {
    setCname1("week1");
    setCname2("week2");
    setCname3("week2");
    setCname4("week2");
    setCname5("week2");
    setCname6("week2");

    // setCName1('week1date');
    // setCName2('');
    // setCName3('');
    // setCName4('');
    // setCName5('');
  };
  const handleClassName2 = () => {
    setCname1("week2");
    setCname2("week1");
    setCname3("week2");
    setCname4("week2");
    setCname5("week2");
    setCname6("week2");

    // setCName1('');
    // setCName2('week1date');
    // setCName3('');
    // setCName4('');
    // setCName5('');
  };
  const handleClassName3 = () => {
    setCname1("week2");
    setCname2("week2");
    setCname3("week1");
    setCname4("week2");
    setCname5("week2");
    setCname6("week2");
  };
  const handleClassName4 = () => {
    setCname1("week2");
    setCname2("week2");
    setCname3("week2");
    setCname4("week1");
    setCname5("week2");
    setCname6("week2");
  };
  const handleClassName5 = () => {
    setCname1("week2");
    setCname2("week2");
    setCname3("week2");
    setCname4("week2");
    setCname5("week1");
    setCname6("week2");
  };

  const handleClassName6 = () => {
    setCname1("week2");
    setCname2("week2");
    setCname3("week2");
    setCname4("week2");
    setCname5("week2");
    setCname6("week1");
  };

  // console.log(computedYear, computedMonth)
  // console.log(date.getFullYear())
  const value = useContext(RiderContext);
  const { riderdata, token } = value;

  let computedYear = new Date(date).getFullYear();
  let computedMonth = new Date(date).getMonth() + 1;

  const checkPayment = async (week, monthM, yearM) => {
    setPaid(true);
    console.log(riderdata);
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_payment_status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(token),
            month: monthM || month,
            year: yearM || year,
            week: week || Cweek,
            transaction_type: "individual",
            vehicle_type: riderdata?.vehicle_details.type,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.payment_check === null) {
        setPaid(false);
      } else
        for (let agent of data["payment_check"]["not_paids"]) {
          if (agent["agent_id"] === riderdata._id) {
            setPaid(false);
            break;
          }
        }
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log("error");
    }
  };

  const fetchData = async (week, monthM, yearM) => {
    setLoading(true);
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
            month: monthM || month,
            year: yearM || year,
            week: week || Cweek,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      setDataList(data?.delivery_agent_earnings);
      setLoading(false);
      // console.log(data?.delivery_agent_earnings);
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log("error");
    }
  };
  useEffect(() => {
    fetchData();
    checkPayment();
  }, []);

  // const jeff = dataList.map((obj) =>(
  //     <li>{obj?.timestamp}</li>
  // ))

  const earningList = dataList?.map(
    (itemsObj) =>
      itemsObj?._id && (
        <tr key={itemsObj?._id} className="td-style">
          <td>{<DateConverter value={itemsObj?.timestamp} />}</td>
          <td>{<WeekDayConverter value={itemsObj?.timestamp} />}</td>
          <td>
            ₦{<ThousandConverter value={itemsObj?.amt_for_delivery_agent} />}
          </td>
        </tr>
      )
  );
  const totalAmount = dataList ? (
    <span>
      {
        <ThousandConverter
          value={dataList[dataList?.length - 1]?.total_weekly_earnings}
        />
      }
    </span>
  ) : null;

  // console.log(totalAmount);
  return (
    <div className="iii">
      <div className="profile-page-container">
        <MainTop riderdata={riderdata} />
        {loading ? (
          <div className="profile-page-bottom height padding">
            {/* <PaymentWeeks  handleClassName1={handleClassName1} handleClassName2={handleClassName2} handleClassName3={handleClassName3} handleClassName4={handleClassName4} handleClassName5={handleClassName5}/> */}
            <div className="record-date">
              <input
                type="month"
                name="schedule"
                min="2022-01-01"
                max="2025-12-31"
                value={date}
                onChange={handleDate}
              />
              {/* <input type="date"  onChange={(e)=> setDate(e.target.value)} style={{width:"20%", marginBottom:"15px", marginLeft:"5px" , height:"30px"}}/> */}
            </div>
            <section className="paymentweeks-container">
              <div className="payment-week">
                <div className="week1date">
                  <div className={cname1} onClick={handleClick5}>
                    WEEK 1
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[0]}
                  </p>
                </div>

                <div className="week1date">
                  <div className={cname2} onClick={handleClick6}>
                    WEEK 2
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[1]}
                  </p>
                </div>

                <div className="week1date">
                  <div className={cname3} onClick={handleClick7}>
                    WEEK 3
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[2]}
                  </p>
                </div>

                <div className="week1date">
                  <div className={cname4} onClick={handleClick8}>
                    WEEK 4
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[3]}
                  </p>
                </div>

                <div className="week1date">
                  <div className={cname5} onClick={handleClick9}>
                    WEEK 5
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[4]}
                  </p>
                </div>
                {weekRangeGetter(month, year)[5] ? (
                  <div className="week1date">
                    <div className={cname6} onClick={handleClick11}>
                      WEEK 6
                    </div>
                    <p className="week-duration">
                      {weekRangeGetter(month, year)[5]}
                    </p>
                  </div>
                ) : null}
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
            <div className="record-date">
              <input
                type="month"
                name="schedule"
                min="2022-01-01"
                max="2025-12-31"
                value={date}
                onChange={handleDate}
              />
            </div>
            <section className="paymentweeks-container">
              <div className="payment-week">
                <div className="week1date">
                  <div className={cname1} onClick={handleClick5}>
                    WEEK 1
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[0]}
                  </p>
                </div>

                <div className="week1date">
                  <div className={cname2} onClick={handleClick6}>
                    WEEK 2
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[1]}
                  </p>
                </div>

                <div className="week1date">
                  <div className={cname3} onClick={handleClick7}>
                    WEEK 3
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[2]}
                  </p>
                </div>

                <div className="week1date">
                  <div className={cname4} onClick={handleClick8}>
                    WEEK 4
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[3]}
                  </p>
                </div>

                <div className="week1date">
                  <div className={cname5} onClick={handleClick9}>
                    WEEK 5
                  </div>
                  <p className="week-duration">
                    {weekRangeGetter(month, year)[4]}
                  </p>
                </div>
                {weekRangeGetter(month, year)[5] ? (
                  <div className="week1date">
                    <div className={cname6} onClick={handleClick11}>
                      WEEK 6
                    </div>
                    <p className="week-duration">
                      {weekRangeGetter(month, year)[5]}
                    </p>
                  </div>
                ) : null}
              </div>
            </section>
            {dataList ? (
              <>
                <table className="table-data">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Weekday</th>
                      <th>Daily Earning</th>
                    </tr>
                  </thead>
                  <tbody className="earning-tbody">{earningList}</tbody>
                </table>
                <div className="total-earnings">
                  <h5>TOTAL WEEKS EARNING</h5>
                  <p>₦{totalAmount}</p>
                </div>
                <div className="total-earnings">
                  <p>PAYMENT STATUS:</p>
                  <p style={{ color: paid ? "blue" : "red" }}>
                    {paid ? "PAID" : "PENDING"}
                  </p>
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
