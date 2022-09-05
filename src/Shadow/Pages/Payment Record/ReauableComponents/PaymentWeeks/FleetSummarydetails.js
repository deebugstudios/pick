import React, { useContext, useEffect, useState } from "react";
import { PaymentWeeks } from "./PaymentWeeks";
import "./fleetsummarydetails.css";
import { useNavigate } from "react-router-dom";
// import { Calendar } from "../../../../../Calendar";
import { RiderContext } from "../../../Contexts/RiderContext";
import { NoTransaction } from "../../../NoTransactionpage/NoTransaction";
import ClipLoader from "react-spinners/ClipLoader";

export const FleetSummarydetails = () => {
  const value = useContext(RiderContext);
  const { token} = value;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  const [bike, setBike] = useState("bikes");
  const [car, setCar] = useState("cars");
  const [van, setVan] = useState("cars");
  const [truck, setTruck] = useState("cars");
 const [vehicleused, setVehicleUsed] = useState("bike")


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




  const handleCName1 = () => {
    setVehicleUsed("bike")
    setBike("bikes");
    setCar("cars");
    setVan("cars");
    setTruck("cars");
  };
  const handleCName2 = () => {
    setVehicleUsed("car")
    setBike("cars");
    setCar("bikes");
    setVan("cars");
    setTruck("cars");
  };
  const handleCName3 = () => {
    setVehicleUsed("bus")
    setBike("cars");
    setCar("cars");
    setVan("bikes");
    setTruck("cars");
  };
  const handleCName4 = () => {
    setVehicleUsed("truck")
    setBike("cars");
    setCar("cars");
    setVan("cars");
    setTruck("bikes");
  };
  // console.log(vehicleused)
  // console.log(week) 
  // console.log(computedMonth,computedYear)
  // const month = 4;
  // const year = 2022;
  // const weeke = 6;
  // const type = "bike";
  let computedYear = new Date(date).getFullYear()
  let computedMonth = (new Date(date).getMonth() + 1)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_fleet_manager_earnings",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            pageCount: 1,
            month: computedMonth,
            year: computedYear,
            week: week,
            type: vehicleused,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      // getData(await response.json());
      const result = await response.json();
      // console.log(result);
      
      if (response.status === 200) {
        setData(result?.individual_agents_earnings)
        setLoading(false)
        // console.log("data gotten succesfully");
      } else {
        // console.log(vehicleused, computedMonth, computedYear, week)
        console.log("some error occurred");
        setLoading(false)
        // console.log(loading)
      }
    } catch (error) {
      console.log(error);
    }
  };
const eachDeliveryAgentEarning = data?.map((eobj, index)=> {
return (
  eobj?.delivery_agent_details._id &&
  <tr key={eobj?.delivery_agent_details._id}>
              <td>{eobj?.delivery_agent_details.delivery_agent_code}</td>
              <td>{eobj?.delivery_agent_details.fullname}</td>
              <td>{eobj?.total_weeekly_earnings}</td>
              <td>
                <p className="paid">PAID</p>
              </td>
              <td>
                <button onClick={(()=> navigate("/individual-payment", {
                state: { id: eobj?.delivery_agent_details._id, week: week, year: computedYear, month: computedMonth },
                }))}>
                  View details
                </button>
              </td>
              {/* <td><FaGreaterThan /></td> */}
            </tr>
)
})
// console.log(eachDeliveryAgentEarning);
  useEffect(() => {
    fetchData();
  }, [vehicleused, week, computedMonth, computedYear]);

  const navigate = useNavigate();

  // const handleClickIndivdualRecords = (agentID) => {
  //   navigate("/individual-payment", {
  //     state: { id: agentID },
  //   });
  // };
  return (
    <div className="wrapper-payment">
      <div className="record-date">
      <input type="date"  onChange={(e)=> setDate(e.target.value)}/>
      {/* <input type="date"  onChange={(e)=> setDate(e.target.value)} style={{width:"20%", marginBottom:"15px", marginLeft:"5px" , height:"30px"}}/> */}
      </div>
      <div className="payment-history">
        <div className="payment-vehicle">
          <div  >
          <button className={bike} disabled={loading}  onClick={handleCName1}>BIKES</button>
          </div>
          <div  >
          <button className={car} disabled={loading}  onClick={handleCName2}>CARS</button>
          </div>
          <div  >
          <button className={van} disabled={loading}  onClick={handleCName3}>BUSES</button>
          </div>
          <div  >
          <button className={truck} disabled={loading}  onClick={handleCName4}>TRUCKS</button>
          </div>
        
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
        {loading ? (
          <div className="profile-page-bottom height padding">
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
        )
        : (

       <>
          { (data !== undefined) ?
          <>
        <table className="table-data">
          <thead>
            <th>Agent ID</th>
            <th>Agent Name</th>
            <th>Weeks Earning</th>
            <th>Status</th>
          </thead>
          <tbody>
            {eachDeliveryAgentEarning}
          </tbody>
        </table>
        <div className="last-para">
          <h5>TOTAL BIKE WEEK 1 EARNINGS</h5>
          <p>N 93450.00</p>
        </div> 
        </>
     : <NoTransaction/> }
     </>
        )}
       
      </div>
    </div>
  );
};
