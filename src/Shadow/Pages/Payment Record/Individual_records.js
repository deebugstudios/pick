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
import ThousandConverter from "../../../components/javascript/ThousandConverter";

export default function Individual_records() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const location = useLocation();
  const value = useContext(RiderContext);
  const [earnings, setEarnings] = useState({});
  const { token, riderdata } = value;
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  function timestampToDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  function timestampToDayOfWeek(timestamp) {
    const date = new Date(timestamp);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  }

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
  const name = location.state.name;
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
    console.log(riderdata);
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
            <div className="delivery-profile1">
              <div className="driver-profile-image">
                <div className="image">
                  <img src={data?.img_url} alt="profile image" />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                {/* <h3 className="earnings-h3">{data?.fullname}</h3> */}
                <table style={{ margin: "0" }}>
                  <tr>
                    <th
                      style={{
                        fontWeight: "500",
                        fontSize: "15px",
                        lineHeight: "1.8",
                      }}
                    >
                      {name}
                    </th>
                    <td></td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        fontWeight: "600",
                        fontSize: "15px",
                        lineHeight: "1.8",
                      }}
                    >
                      Agent ID:
                    </th>
                    <td
                      style={{
                        fontWeight: "500",
                        fontSize: "15px",
                        lineHeight: "1.5",
                        paddingLeft: "10px",
                      }}
                    >
                      {DeliveryAgent_id}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div
              className="payment-table"
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
                marginBottom: "30px",
              }}
            >
              {earnings?.slice(0, earnings?.length - 1).map((item, i) => (
                <div className="payment-stat-details span2" key={i}>
                  <div className="vechicle-name">
                    <div style={{ display: "flex", columnGap: "10px" }}>
                      <span>{timestampToDayOfWeek(item.timestamp)}</span>
                      <span>{timestampToDate(item.timestamp)}</span>
                    </div>
                  </div>
                  <div className="amount-made">
                    ₦{<ThousandConverter value={item.amt_for_delivery_agent} />}
                    .00
                  </div>
                </div>
              ))}
              <div
                className="payment-stat-details span2"
                style={{ marginTop: "50px" }}
              >
                <div className="vechicle-name">
                  <div>Total weeks earning</div>
                </div>
                <div className="amount-made" style={{ color: "green" }}>
                  ₦
                  {
                    <ThousandConverter
                      value={
                        earnings[earnings.length - 1]?.total_weekly_earnings
                      }
                    />
                  }
                  .00
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
