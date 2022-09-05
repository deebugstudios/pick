import React, { useContext, useEffect, useState } from "react";
import { RiderContext } from "../Contexts/RiderContext";
import { NoTransaction } from "../NoTransactionpage/NoTransaction";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import "./deliveryagentearningpage.css";
import { PaymentWeeks } from "./ReauableComponents/PaymentWeeks/PaymentWeeks";
import ClipLoader from "react-spinners/ClipLoader";
import { DateConverter, WeekDayConverter } from "../../../DateAndTimeConverter";
const DeliveryAgentEarningPage = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [message, setMessage]= useState("")
  const [cname1, setCname1] = useState('week1');
  const [cname2, setCname2] = useState('week2');
  const [cname3, setCname3] = useState('week2');
  const [cname4, setCname4] = useState('week2');
  const [cname5, setCname5] = useState('week2');
  const [week, setWeek ] = useState(1)
  const [date, setDate] = useState(new Date())


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

// console.log(computedYear, computedMonth)
// console.log(date.getFullYear())
const value = useContext(RiderContext);
const { riderdata, token } = value;

let computedYear = new Date(date).getFullYear()
let computedMonth = (new Date(date).getMonth() + 1)
const fetchEarning = async () => {
  setLoading(true)
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
    } catch (error) {
      setLoading(false)
      console.log(error);
      console.log("error");
    }
 
  };
  useEffect(() => {
    fetchEarning();
  }, [week, computedMonth, computedYear]);

  // const jeff = dataList.map((obj) =>(
  //     <li>{obj?.timestamp}</li>
  // ))

  const earningList = dataList?.map((itemsObj) => (
    ( itemsObj?._id &&
      <tr key = {itemsObj?._id} className="td-style">
      <td>{<DateConverter value={itemsObj?.timestamp}/>}</td>
      <td>{<WeekDayConverter value={itemsObj?.timestamp}/>}</td>
      <td>{itemsObj?.amt_for_delivery_agent}</td>
    </tr>
    )
  ));
  const totalAmount = dataList?.map((itemsObj, i) => (
    <span key={i}>{itemsObj?.total_weekly_earnings}</span>
  ));
  // console.log(totalAmount);
  return (
    <div className="iii">
    <div className="profile-page-container">
      <MainTop riderdata={riderdata} />
      {loading ? (
        <div className="profile-page-bottom height padding">
          {/* <PaymentWeeks  handleClassName1={handleClassName1} handleClassName2={handleClassName2} handleClassName3={handleClassName3} handleClassName4={handleClassName4} handleClassName5={handleClassName5}/> */}
          <div className="record-date">
      <input type="date"  onChange={(e)=> setDate(e.target.value)}/>
      {/* <input type="date"  onChange={(e)=> setDate(e.target.value)} style={{width:"20%", marginBottom:"15px", marginLeft:"5px" , height:"30px"}}/> */}
      </div>
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
          <h1
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
              <ClipLoader color={"#1AA803"} loading={loading}  size={100} />
          </h1>
        </div>
      ) :  (
        <div className="profile-page-bottom height padding">
          {/* <PaymentWeeks 
            handleClassName1={handleClassName1} handleClassName2={handleClassName2} handleClassName3={handleClassName3} handleClassName4={handleClassName4} handleClassName5={handleClassName5} cname1={cname1} cname2={cname2} cname3={cname3} cname4={cname4} cname5={cname5}
          /> */}
          <div className="record-date">
      <input type="date"  onChange={(e)=> setDate(e.target.value)}/>
      {/* <input type="date"  onChange={(e)=> setDate(e.target.value)} style={{width:"20%", marginBottom:"15px", marginLeft:"5px" , height:"30px"}}/> */}
      </div>
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
         { dataList ?
         <>
          <table className="table-data">
            <thead>
              <tr>
              <th>Date</th>
              <th>Weekday</th>
              <th>Daily Earning</th>
              </tr>
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
    </div>
  );
};

export default DeliveryAgentEarningPage;
