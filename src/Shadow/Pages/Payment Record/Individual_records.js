import React, { useContext, useEffect, useState } from "react";
import "./payment_record.css";
import './individual_records.css'
import "../../../components/css/toggle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';
import profileimage from '../../images/profileimage.png'
export default function Individual_records() {
  const [loading, setLoading]= useState(true)
  const [data, setData] = useState([])
  const location = useLocation();
    const value = useContext(RiderContext);
    const { riderdata} = value;
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  // const firstClick = () => {
  //   setToggle(true);

  //    navigate("/Pending-del");
  // };

  // const secondClick = () => {
  //   setToggle(false);
  //   navigate("/Pending-del");
  // };

  const DeliveryAgent_id = location.state.id;


// console.log(DeliveryAgent_id)

const fetchDeliveryDetails = async () => {
  try {
    const res = await fetch(
      "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_fleet_manager_delivery_agent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9ubyI6IisyMzQ4MTMwNDM5ODM0IiwiX2lkIjoiNjMwMjllOGJkNzMyNWNjMWMzZjFmYWE0IiwiaWF0IjoxNjYxMzM0NzIyfQ.lJqklLaU1XWNjHGc105Iy724DEnLcV64ADbpPSzQlbw",
            delivery_agent_id: DeliveryAgent_id,
        }),
      }
    );
    const data = await res.json();
    const results = await data;
    setData(results?.delivery_agent?.[0]);
    setLoading(false);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchDeliveryDetails();
}, []);

  const goBack = () => {
    navigate(-1)
  }
  
  return (
    <div className="profile-page-container">
    {/* <MainTop/> */}
    <div className="profile-page-bottom">
        <div className="back-arrow">
               <p onClick={goBack}>go back</p> 
        </div>
        <div className="week-payment">
            <h4 className="week">week1</h4>
            <p className="paid2">paid</p>
        </div>
        <div className="delivery-profile">
            <div className="driver-profile-image">
              <div className="image">
                <img src={data?.vehicle_details?.img_urls?.[0]} alt="profile image" />
              </div>
            </div>
            <div className="delivery-profile-details">
                  <h3 className="earnings-h3">{data?.fullname}</h3>
              <table className="earning-first-table">
            
                <tr>
                  <th>Agent ID:</th>
                  <td>ID347488</td>
                </tr>
                <tr>
                  <th>Vehicle type:</th>
                  <td>{data?.vehicle_details.type}</td>
                </tr>
                <tr>
                  <th>Plate number:</th>
                  <td> {data?.vehicle_details.plate_no}</td>
                </tr>
                <tr>
                  <th>Phone Number:</th>
                  <td> {data?.phone_no}</td>
                </tr>
                <tr>
                  <th>Weeks Earning:</th>
                  <td> N 23,470</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="payment-table">
          <table className="table-data">
              <thead>
                <th>Date</th>
                <th>Weekday</th>
                <th>Daily Earning</th>
                <th>Instant Deliveries</th>
                <th>Scheduled Deliveries</th>
                <th>Cancelled Deliveries</th>
              </thead>
              <tbody className="earning-tbody">
                <tr>
                  <td>06/06/2022</td>
                  <td>Monday</td>
                  <td>N23,000</td>
                  <td>12</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>06/06/2022</td>
                  <td>Monday</td>
                  <td>N23,000</td>
                  <td>12</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>06/06/2022</td>
                  <td>Monday</td>
                  <td>N23,000</td>
                  <td>12</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>06/06/2022</td>
                  <td>Monday</td>
                  <td>N23,000</td>
                  <td>12</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>06/06/2022</td>
                  <td>Monday</td>
                  <td>N23,000</td>
                  <td>12</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>06/06/2022</td>
                  <td>Monday</td>
                  <td>N23,000</td>
                  <td>12</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
    </div>
  );
}
