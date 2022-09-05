import React, { useContext, useEffect, useState } from "react";
import { PaymentWeeks } from "./ReauableComponents/PaymentWeeks/PaymentWeeks";
import "./payment_record.css";
import "../../../components/css/toggle.css";
import { useNavigate } from "react-router-dom";
import './payment_stat.css'
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
import ClipLoader from "react-spinners/ClipLoader";
import { NoTransaction } from "../NoTransactionpage/NoTransaction";

// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';

export default function Payment_Stat() {

  const value = useContext(RiderContext);
    const { token} = value;

  const [cname1, setCname1] = useState('week1');
  const [cname2, setCname2] = useState('week2');
  const [cname3, setCname3] = useState('week2');
  const [cname4, setCname4] = useState('week2');
  const [cname5, setCname5] = useState('week2');
  const [week, setWeek ] = useState(1)
  const [date, setDate] = useState("2022/07/22")
  const [loading, setLoading] = useState(true)
  const [dataList, setDataList] = useState([])

  const handleClassName1 = () => {
    setWeek(1)
    setCname1('week1');
    setCname2('week2');
    setCname3('week2');
    setCname4('week2');
    setCname5('week2');
  }
  const handleClassName2 = () => {
    setWeek(2)
    setCname1('week2');
    setCname2('week1');
    setCname3('week2');
    setCname4('week2');
    setCname5('week2');
  }
  const handleClassName3 = () => {
    setWeek(3)
    setCname1('week2');
    setCname2('week2');
    setCname3('week1');
    setCname4('week2');
    setCname5('week2');
  }
  const handleClassName4 = () => {
    setWeek(4)
    setCname1('week2');
    setCname2('week2');
    setCname3('week2');
    setCname4('week1');
    setCname5('week2');
  }
  const handleClassName5 = () => {
    setWeek(5)
    setCname1('week2');
    setCname2('week2');
    setCname3('week2');
    setCname4('week2');
    setCname5('week1');
  }

  const computedYear = new Date(date).getFullYear()
    const computedMonth = (new Date(date).getMonth() + 1)

    const fetchEarning = async () => {
      // let computedYear = new Date(date).getFullYear()
      // let computedMonth = (new Date(date).getMonth() -1)
      setLoading(true)
      try {
        const res = await fetch(
          "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_combined_earnings",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token:JSON.parse(token),
              month: computedMonth,
              year: computedYear,
              week: week,
            }),
          }
        );
        const data = await res.json();
        // console.log(data)
        if (res.status === 200) {
          setDataList(data?.total_earnings?.[0]);
        setLoading(false);
        // console.log(data?.total_earnings?.[0]);
        // console.log("worked");
        } else {
          console.log("some error occurred");
          setLoading(false)
          // console.log(loading)
        }
      } catch (error) {
        console.log(error);
        // console.log("error");
      }
    };
    useEffect(() => {
      fetchEarning();
    }, [week, computedMonth, computedYear]);
  

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
          <input type="date"  onChange={(e)=> setDate(e.target.value)}/>
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
            <div className='payment-week'>
            <div  >
            <button className={cname1} disabled={loading}  onClick={handleClassName1}>WEEK 1</button>
            </div>
            <div  >
            <button className={cname2} disabled={loading}  onClick={handleClassName2}>WEEK 2</button>
            </div>
            <div  >
            <button className={cname3} disabled={loading}  onClick={handleClassName3}>WEEK 3</button>
            </div>
            <div  >
            <button className={cname4} disabled={loading}  onClick={handleClassName4}>WEEK 4</button>
            </div>
            <div >
                <button className={cname5}disabled={loading}  onClick={handleClassName5}>WEEK 5</button>
            </div>
        </div>
    </section>
            {loading? (
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}>
              <ClipLoader color={"#1AA803"} loading={loading}  size={100}  />
              </div>
            ): (
              <div>
                {dataList ? 
                (
                  <div className="payment-stat">
                    <div className="payment-stat-details">
                    <div className="vechicle-name">
                        <p className="yellow"></p>
                        <h5>Bikes</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N {dataList?.total_bike_earnings}</h5>
                    </div>
                </div>
                <div className="payment-stat-details">
                <div className="vechicle-name">
                        <p className="gray"></p>
                        <h5>Buses</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N {dataList?.total_van_earnings }</h5>
                    </div>
                </div>
                <div className="payment-stat-details">
                <div className="vechicle-name">
                        <p className="green"></p>
                        <h5>Cars</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N {dataList?.total_car_earnings }</h5>
                    </div>
                </div>
                <div className="payment-stat-details">
                <div className="vechicle-name">
                        <p className="red"></p>
                        <h5>Trucks</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N {dataList?.total_truck_earnings}</h5>
                    </div>
                </div>
                <div className="payment-stat-details span2">
                <div className="vechicle-name">
                        <h5>TOTAL WEEK 1 FLEET  EARNINGS</h5>
                    </div>
                    <div className="amount-made">
                        <h5>N {dataList?.total }</h5>
                    </div>
                </div>
                    </div> 
                ) : 
                ( 
                    <NoTransaction/>
                )
                
                }
            </div>
            )
            }
          </div>
        </div>
      {/* </div> */}
    </div>
    </div>
    </div>
  );
}
