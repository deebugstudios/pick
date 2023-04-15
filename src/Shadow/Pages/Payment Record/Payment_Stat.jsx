import React, { useContext, useEffect, useState } from "react";
import { PaymentWeeks } from "./ReauableComponents/PaymentWeeks/PaymentWeeks";
import "./payment_record.css";
import "../../../components/css/toggle.css";
import { useNavigate } from "react-router-dom";
import "./payment_stat.css";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
import ClipLoader from "react-spinners/ClipLoader";
import { NoTransaction } from "../NoTransactionpage/NoTransaction";
import { DateConverter, WeekDayConverter } from "../../../DateAndTimeConverter";
import weekRangeGetter, { getWeekNumber } from "../WeekRanger";
import dayjs from "dayjs";
import ThousandConverter from "../../../components/javascript/ThousandConverter";

// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';

export default function Payment_Stat() {
  const value = useContext(RiderContext);
  const { token } = value;

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, []);
  const handleClick5 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName1();
      setCweek(1);
      fetchData(1);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName1();
      setCweek(1);
      fetchData(1);
      // setDWeek("");
    }
  };

  const handleClick6 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName2();
      setCweek(2);
      fetchData(2);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName2();
      setCweek(2);
      fetchData(2);
      // setDWeek("");
    }
  };

  const handleClick7 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName3();
      setCweek(3);
      fetchData(3);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName3();
      setCweek(3);
      fetchData(3);
      // setDWeek("");
    }
  };

  const handleClick8 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName4();
      setCweek(4);
      fetchData(4);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName4();
      setCweek(4);
      fetchData(4);
      // setDWeek("");
    }
  };

  const handleClick9 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName5();
      setCweek(5);
      fetchData(5);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName5();
      setCweek(5);
      fetchData(5);
      // setDWeek("");
    }
  };

  const handleClick11 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName6();
      setCweek(6);
      fetchData(6);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName6();
      setCweek(6);
      fetchData(6);
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

  const computedYear = new Date(date).getFullYear();
  const computedMonth = new Date(date).getMonth() + 1;

  const fetchData = async (week, monthM, yearM) => {
    // let computedYear = new Date(date).getFullYear()
    // let computedMonth = (new Date(date).getMonth() -1)
    setLoading(true);
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_combined_earnings",
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
      // console.log(data)
      if (res.status === 200) {
        console.log(data);
        const list = data?.total_earnings;
        setDataList(list);
        setLoading(false);
        // console.log(data?.total_earnings?.[0]);
        // console.log("worked");
      } else {
        // console.log("some error occurred");
        // setLoading(false);
        // console.log(loading)
      }
    } catch (error) {
      console.log(error);
      // console.log("error");
    }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="wrapper-payment">
      {/* <MainTop/> */}
      <div className="profile-page-bottom height">
        <div className="payment-record-container">
          {/* <div className="DA-payment-history"> */}
          <div className="da-payment-props">
            <div className="payment-to">
              <div className="toggle-div">
                {/* <div
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
              </div> */}
              </div>
            </div>
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
            <div className="payment-history">
              {/* <div className="payment-vehicle">
            <div className={bike} onClick={handleCName1}>BIKES</div>
              <div className={car} onClick={handleCName2}>CARS</div>
              <div className={van} onClick={handleCName3}>BUSES</div>
              <div className={truck} onClick={handleCName4}>TRUCKS</div>
            </div> */}
              {/* <PaymentWeeks /> */}
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
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <ClipLoader color={"#1AA803"} loading={loading} size={100} />
                </div>
              ) : (
                <div>
                  {dataList ? (
                    <div className="payment-stat">
                      <div className="payment-stat-details">
                        <div className="vechicle-name">
                          <p className="yellow"></p>
                          <h5>Bikes</h5>
                        </div>
                        <div className="amount-made">
                          <h5>
                            ₦
                            {
                              <ThousandConverter
                                value={dataList[0]?.total_bike_earnings}
                              />
                            }
                          </h5>
                        </div>
                      </div>
                      <div className="payment-stat-details">
                        <div className="vechicle-name">
                          <p className="gray"></p>
                          <h5>Buses</h5>
                        </div>
                        <div className="amount-made">
                          <h5>
                            ₦
                            {
                              <ThousandConverter
                                value={dataList[0]?.total_van_earnings}
                              />
                            }
                          </h5>
                        </div>
                      </div>
                      <div className="payment-stat-details">
                        <div className="vechicle-name">
                          <p className="green"></p>
                          <h5>Cars</h5>
                        </div>
                        <div className="amount-made">
                          <h5>
                            ₦
                            {
                              <ThousandConverter
                                value={dataList[0]?.total_car_earnings}
                              />
                            }
                          </h5>
                        </div>
                      </div>
                      <div className="payment-stat-details">
                        <div className="vechicle-name">
                          <p className="red"></p>
                          <h5>Trucks</h5>
                        </div>
                        <div className="amount-made">
                          <h5>
                            ₦
                            {
                              <ThousandConverter
                                value={dataList[0]?.total_truck_earnings}
                              />
                            }
                          </h5>
                        </div>
                      </div>
                      <div className="payment-stat-details span2">
                        <div className="vechicle-name">
                          <h5>TOTAL WEEK {Cweek} FLEET EARNINGS</h5>
                        </div>
                        <div className="amount-made">
                          <h5>
                            ₦{<ThousandConverter value={dataList[0]?.total} />}
                          </h5>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NoTransaction />
                  )}
                </div>
              )}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
