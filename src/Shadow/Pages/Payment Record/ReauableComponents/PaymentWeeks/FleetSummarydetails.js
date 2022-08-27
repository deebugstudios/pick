import React, { useEffect, useState } from "react";
import { PaymentWeeks } from "./PaymentWeeks";
import "./fleetsummarydetails.css";
import { useNavigate } from "react-router-dom";

export const FleetSummarydetails = () => {
  const [data, setData] = useState([]);

  const [bike, setBike] = useState("bikes");
  const [car, setCar] = useState("cars");
  const [van, setVan] = useState("cars");
  const [truck, setTruck] = useState("cars");

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
  const month = 4;
  const year = 2022;
  const week = 6;
  const type = "bike";

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/admin_payment_record/individual_agents",
        {
          method: "POST",

          body: JSON.stringify({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRhOThkYmM5YjBjYzczYWU0MTc4OGMiLCJlbWFpbCI6Imh5a3NvczkyQGdtYWlsLmNvbSIsImlhdCI6MTY1ODQ5MzE0N30.OvJ7kycXzUEouHLikuQ0Fm3L0bc_a1hwzEN4hD0Ga8Q",
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
      console.log(result);

      if (response.status === 200) {
        console.log("data gotten succesfully");
      } else {
        console.log("some error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleClickIndivdualRecords = () => {
    navigate("/individual-payment");
  };
  return (
    <div className="wrapper-payment">
      <div className="record-date">
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
            <tr>
              <td>ID786789</td>
              <td>ODOGWU</td>
              <td>N23,000</td>
              <td>
                <p className="paid">PAID</p>
              </td>
              <td>
                <button onClick={handleClickIndivdualRecords}>
                  View details
                </button>
              </td>
              {/* <td><FaGreaterThan /></td> */}
            </tr>
            <tr>
              <td>ID786789</td>
              <td>ODOGWU</td>
              <td>N23,000</td>
              <td>
                <p className="paid">PAID</p>
              </td>
              <td>
                <button>View details</button>
              </td>
              {/* <td><FaGreaterThan /></td> */}
            </tr>
            <tr>
              <td>ID786789</td>
              <td>ODOGWU</td>
              <td>N23,000</td>
              <td>
                <p className="paid">PAID</p>
              </td>
              <td>
                <button>View details</button>
              </td>
              {/* <td><FaGreaterThan /></td> */}
            </tr>
            <tr>
              <td>ID786789</td>
              <td>ODOGWU</td>
              <td>N23,000</td>
              <td>
                <p className="paid">PAID</p>
              </td>
              <td>
                <button>View details</button>
              </td>
              {/* <td><FaGreaterThan /></td> */}
            </tr>
            <tr>
              <td>ID786789</td>
              <td>ODOGWU</td>
              <td>N23,000</td>
              <td>
                <p className="not-paid">NOT PAID</p>{" "}
              </td>
              <td>
                <button>View details</button>
              </td>
              {/* <td><FaGreaterThan /></td> */}
            </tr>
            <tr>
              <td>ID786789</td>
              <td>ODOGWU</td>
              <td>N23,000</td>
              <td>
                <p className="not-paid">NOT PAID</p>{" "}
              </td>
              <td>
                {" "}
                <button>View details</button>
              </td>
              {/* <td><FaGreaterThan /></td> */}
            </tr>
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
