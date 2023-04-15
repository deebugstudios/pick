import React, { useContext, useEffect, useState } from "react";
import "./payment_record.css";
import "./individual_records.css";
import "../../../components/css/toggle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';
import profileimage from "../../images/profileimage.png";
import ClipLoader from "react-spinners/ClipLoader";

export default function Individual_records() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const location = useLocation();
  const value = useContext(RiderContext);
  const [earnings, setEarnings] = useState({});
  const { token, riderdata } = value;
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
  const computedYear = location.state.year;
  const week = location.state.week;
  const computedMonth = location.state.month;

  // console.log(DeliveryAgent_id)

  const fetchDeliveryDetails = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_fleet_manager_delivery_agent_earnings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(token),
            delivery_agent_id: DeliveryAgent_id,
            year: computedYear,
            month: computedMonth,
            week: week,
          }),
        }
      );
      const data = await res.json();

      if (res.status === 200) {
        const results = await data;
        console.log(results);
        setData(results?.delivery_agent);
        setLoading(false);
        setEarnings(results?.delivery_agent_earnings);
      } else {
        console.log("some error occurred");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDeliveryDetails();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="iii">
      <div className="profile-page-container">
        <MainTop riderdata={riderdata} />
        {loading ? (
          <h1
            style={{
              display: "flex",
              aligneItem: "center",
              justifyContent: "center",
            }}
          >
            <ClipLoader color={"#1AA803"} loading={loading} size={100} />
          </h1>
        ) : (
          <div className="profile-page-bottom">
            <div className="back-arrow">
              <p onClick={goBack}>go back</p>
            </div>
            <div className="week-payment">
              <h4 className="week">WEEK {week}</h4>
            </div>
            <div className="delivery-profile">
              <div className="driver-profile-image">
                <div className="image">
                  <img src={data?.img_url} alt="profile image" />
                </div>
              </div>
              <div className="delivery-profile-details">
                {/* <h3 className="earnings-h3">{data?.fullname}</h3> */}
                <table className="earning-first-table">
                  <tr>
                    <th>Agent ID:</th>
                    <td>{DeliveryAgent_id}</td>
                  </tr>
                  <tr>
                    <th>Vehicle type:</th>
                    <td>{data?.vehicle_details?.type?.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <th>Plate number:</th>
                    <td>{data?.vehicle_details.plate_no}</td>
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
                  {earnings?.slice(0, earnings?.length - 1).map(() => (
                    <tr>
                      <td>06/06/2022</td>
                      <td>Monday</td>
                      <td>N23,000</td>
                      <td>12</td>
                      <td>2</td>
                      <td>1</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
