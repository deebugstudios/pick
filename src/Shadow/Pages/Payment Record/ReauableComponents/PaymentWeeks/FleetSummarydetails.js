import React, { useContext, useEffect, useState } from "react";
import { PaymentWeeks } from "./PaymentWeeks";
import "./fleetsummarydetails.css";
import { useNavigate } from "react-router-dom";
// import { Calendar } from "../../../../../Calendar";
import { RiderContext } from "../../../Contexts/RiderContext";
import { NoTransaction } from "../../../NoTransactionpage/NoTransaction";
import ClipLoader from "react-spinners/ClipLoader";
import { DateConverter } from "../../../../../DateAndTimeConverter";

import weekRangeGetter, { getWeekNumber } from "../../../WeekRanger";
import dayjs from "dayjs";
import ThousandConverter from "../../../../../components/javascript/ThousandConverter";

export const FleetSummarydetails = () => {
  const value = useContext(RiderContext);
  const { token } = value;
  const [data, setData] = useState([]);

  const [cname1, setCname1] = useState("week1");
  const [cname2, setCname2] = useState("week2");
  const [cname3, setCname3] = useState("week2");
  const [cname4, setCname4] = useState("week2");
  const [cname5, setCname5] = useState("week2");
  const [cname6, setCname6] = useState("week2");

  const [bike, setBike] = useState("bikes");
  const [car, setCar] = useState("cars");
  const [van, setVan] = useState("cars");
  const [truck, setTruck] = useState("cars");
  const [month, setMonth] = useState(Number.parseInt(dayjs().month()));
  const [year, setYear] = useState(Number.parseInt(dayjs().year()));
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(dayjs(Date.now()).format("YYYY-MM"));
  const [Cweek, setCweek] = useState(1);
  const [Ctype, setCtype] = useState("bike");
  const [real, setReal] = useState({});

  // const [vehicleused, setVehicleUsed] = useState("bike");

  // console.log(vehicleused)
  // console.log(week)
  // console.log(computedMonth,computedYear)
  // const month = 4;
  // const year = 2022;
  // const weeke = 6;
  // const type = "bike";

  useEffect(() => {
    fetchData();
  }, []);

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
  }, []);

  const handleDate = (e) => {
    const newDate = dayjs(e.target.value).format("YYYY-MM");
    const yearM = Number.parseInt(newDate.slice(0, 4));
    const monthM = Number.parseInt(newDate.slice(5, 7)) - 1;
    setDate(newDate);
    setYear(Number.parseInt(newDate.slice(0, 4)));
    setMonth(Number.parseInt(newDate.slice(5, 7)) - 1);
    // console.log(newDate, yearM, monthM);
    fetchData(Cweek, Ctype, monthM, yearM);
    weekRangeGetter(monthM, yearM);
  };

  const handleCName1 = () => {
    setBike("bikes");
    setCar("cars");
    setVan("cars");
    setTruck("cars");
  };
  const handleCName2 = () => {
    setBike("cars");
    setCar("bikes");
    setVan("cars");
    setTruck("cars");
  };
  const handleCName3 = () => {
    setBike("cars");
    setCar("cars");
    setVan("bikes");
    setTruck("cars");
  };
  const handleCName4 = () => {
    setBike("cars");
    setCar("cars");
    setVan("cars");
    setTruck("bikes");
  };

  const handleClassName1 = () => {
    setCname1("week1");
    setCname2("week2");
    setCname3("week2");
    setCname4("week2");
    setCname5("week2");
    setCname6("week2");
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
  const handleClick1 = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    handleCName1();
    setCtype("bike");
    fetchData(Cweek, "bike");
    // setDWeek("");
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    handleCName2();
    setCtype("car");
    fetchData(Cweek, "car");
    // setDWeek("");
  };

  const handleClick3 = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    handleCName3();
    setCtype("van");
    fetchData(Cweek, "van");
    // setDWeek("");
  };

  const handleClick4 = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    handleCName4();
    setCtype("truck");
    fetchData(Cweek, "truck");
    // setDWeek("");
  };

  const handleClick5 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName1();
      setCweek(1);
      fetchData(1, Ctype);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName1();
      setCweek(1);
      fetchData(1, Ctype);
      // setDWeek("");
    }
  };

  const handleClick6 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName2();
      setCweek(2);
      fetchData(2, Ctype);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName2();
      setCweek(2);
      fetchData(2, Ctype);
      // setDWeek("");
    }
  };

  const handleClick7 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName3();
      setCweek(3);
      fetchData(3, Ctype);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName3();
      setCweek(3);
      fetchData(3, Ctype);
      // setDWeek("");
    }
  };

  const handleClick8 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName4();
      setCweek(4);
      fetchData(4, Ctype);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName4();
      setCweek(4);
      fetchData(4, Ctype);
      // setDWeek("");
    }
  };

  const handleClick9 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName5();
      setCweek(5);
      fetchData(5, Ctype);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName5();
      setCweek(5);
      fetchData(5, Ctype);
      // setDWeek("");
    }
  };

  const handleClick11 = (e) => {
    if (e === "auto") {
      setIsLoaded(false);
      handleClassName6();
      setCweek(6);
      fetchData(6, Ctype);
      // setDWeek("");
    } else {
      e.preventDefault();
      setIsLoaded(false);
      handleClassName6();
      setCweek(6);
      fetchData(6, Ctype);
      // setDWeek("");
    }
  };

  // let computedYear = new Date(date).getFullYear();
  // let computedMonth = new Date(date).getMonth() + 1;

  const fetchData = async (week, type, monthM, yearM) => {
    setLoading(true);
    // console.log(week, type, monthM, yearM);
    try {
      const response = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_fleet_manager_earnings",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            month: monthM || month,
            year: yearM || year,
            week: week || Cweek,
            type: type || Ctype,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      // getData(await response.json());
      const result = await response.json();

      if (response.status === 200) {
        const list = result?.Pdata;
        setData(list);
        setLoading(false);
        console.log(result);
        setReal(result);
        // console.log("data gotten succesfully");
      } else {
        // console.log(vehicleused, computedMonth, computedYear, week)
        console.log("some error occurred");
        setLoading(false);
        // console.log(loading)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const eachDeliveryAgentEarning = data
    ?.slice(0, data?.length - 1)
    .map((eobj, index) => {
      return (
        <tr key={eobj?.delivery_agent_id}>
          <td>{eobj?.delivery_agent_id}</td>
          <td>{eobj?.delivery_agent_name}</td>
          <td>{<ThousandConverter value={eobj?.total_earnings} />}</td>

          <td>
            <button
              onClick={() =>
                navigate("/individual-payment", {
                  state: {
                    id: eobj?.delivery_agent_id,
                    week: Cweek,
                    year: year,
                    month: month,
                  },
                })
              }
            >
              View details
            </button>
          </td>
          {/* <td><FaGreaterThan /></td> */}
        </tr>
      );
    });
  // console.log(eachDeliveryAgentEarning);
  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  // const handleClickIndivdualRecords = (agentID) => {
  //   navigate("/individual-payment", {
  //     state: { id: agentID },
  //   });
  // };

  return (
    <div className="wrapper-payment">
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
      <div className="payment-history">
        <div className="payment-vehicle">
          <div className={bike} onClick={handleClick1}>
            BIKES
          </div>
          <div className={car} onClick={handleClick2}>
            CARS
          </div>
          <div className={van} onClick={handleClick3}>
            VANS
          </div>
          <div className={truck} onClick={handleClick4}>
            TRUCKS
          </div>
        </div>
        <section className="paymentweeks-container">
          <div className="payment-week">
            <div className="week1date">
              <div className={cname1} onClick={handleClick5}>
                WEEK 1
              </div>
              <p className="week-duration">{weekRangeGetter(month, year)[0]}</p>
            </div>

            <div className="week1date">
              <div className={cname2} onClick={handleClick6}>
                WEEK 2
              </div>
              <p className="week-duration">{weekRangeGetter(month, year)[1]}</p>
            </div>

            <div className="week1date">
              <div className={cname3} onClick={handleClick7}>
                WEEK 3
              </div>
              <p className="week-duration">{weekRangeGetter(month, year)[2]}</p>
            </div>

            <div className="week1date">
              <div className={cname4} onClick={handleClick8}>
                WEEK 4
              </div>
              <p className="week-duration">{weekRangeGetter(month, year)[3]}</p>
            </div>

            <div className="week1date">
              <div className={cname5} onClick={handleClick9}>
                WEEK 5
              </div>
              <p className="week-duration">{weekRangeGetter(month, year)[4]}</p>
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
          <div className="profile-page-bottom height padding">
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
        ) : real.msg ==
          "fleet manager weekly transactions gotten successfully" ? (
          <>
            <table className="table-data">
              <thead>
                <th>Agent ID</th>
                <th>Agent Name</th>
                <th>Weeks Earning</th>
              </thead>
              <tbody>{eachDeliveryAgentEarning}</tbody>
            </table>
            <div className="last-para" style={{ marginBottom: "50px" }}>
              <h5>
                TOTAL {Ctype.toUpperCase()} WEEK {Cweek} EARNINGS
              </h5>
              <p>₦{<ThousandConverter value={data[data?.length - 1]} />}</p>
            </div>
          </>
        ) : real.msg == "no earnings were made on this date" ? (
          <NoTransaction />
        ) : null}
      </div>
    </div>
  );
};
