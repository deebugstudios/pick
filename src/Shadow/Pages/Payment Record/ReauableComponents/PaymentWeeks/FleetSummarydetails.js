import React, { useContext, useEffect, useState } from "react";
import { PaymentWeeks } from "./PaymentWeeks";
import "./fleetsummarydetails.css";
import { useNavigate } from "react-router-dom";
// import { Calendar } from "../../../../../Calendar";
import { RiderContext } from "../../../Contexts/RiderContext";

export const FleetSummarydetails = () => {
  const value = useContext(RiderContext);
  const { token} = value;
  const [data, setData] = useState([]);
  const [loading, setLoading] =useState(true)

  const [bike, setBike] = useState("bikes");
  const [car, setCar] = useState("cars");
  const [van, setVan] = useState("cars");
  const [truck, setTruck] = useState("cars");
 const [vehicleused, setVehicleUsed] = useState("bike")

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
  const month = 4;
  const year = 2022;
  const week = 6;
  const type = "bike";

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/admin_payment_record/individual_agents",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            pageCount: 1,
            month: month,
            year: year,
            week: week,
            vehicle_type: type,
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
        // console.log(result)
      //  console.log(result?.individual_agents_earnings)
        setLoading(false)
        console.log("data gotten succesfully");
      } else {
        console.log("some error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

const eachDeliveryAgentEarning = data.map((eobj, index)=> {
return (
  <tr key={index}>
              <td>{eobj?.delivery_agent_details.delivery_agent_code}</td>
              <td>{eobj?.delivery_agent_details.fullname}</td>
              <td>{eobj?.total_weeekly_earnings}</td>
              <td>
                <p className="paid">PAID</p>
              </td>
              <td>
                <button onClick={(()=> navigate("/individual-payment", {
                state: { id: eobj?.delivery_agent_details._id },
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
      {/* <Calendar/> */}
      <button>date</button>
        <input type="date" />
      </div>
      <div className="payment-history">
        <div className="payment-vehicle">
          <div className={bike} onClick={handleCName1}>
            BIKES
          </div>
          <div className={car} onClick={handleCName2}>
            CARS
          </div>
          <div className={van} onClick={handleCName3}>
            BUSES
          </div>
          <div className={truck} onClick={handleCName4}>
            TRUCKS
          </div>
        </div>
        <PaymentWeeks />
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
      </div>
    </div>
  );
};
