import React, { useContext, useEffect, useState } from "react";
import "./payment_record.css";
import "../../../components/css/toggle.css";
import "./payment_bar_stat.css";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
import { useNavigate } from "react-router-dom";
import ThousandConverter from "../../../components/javascript/ThousandConverter";
// import { Calendar } from "../../../Calendar";
// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';

export default function Payment_Bar_stat() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [earnings, setEarnings] = useState("");
  const value = useContext(RiderContext);
  const { riderdata, token, typeAccount } = value;
  const [stats, setStats] = useState({});

  const navigate = useNavigate();

  // const goBack = () => {
  //     navigate(-1)
  //   }

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_stats/view_statistics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(token),
            delivery_agent_type:
              typeAccount === "Agent" ? "delivery agent" : "fleet manager",
          }),
        }
      );
      const data = await res.json();
      const results = await data;
      setLoading(false);
      console.log(results);
      setData(results?.vehicles);
      setEarnings(data?.earnings);
      setStats(data?.fleet_stats);
    } catch (err) {
      console.log(err);
    }
  };
  // const newListItems = deliveryHistory.map(list => {
  //   return list
  // })
  //   console.log(newListItems?._id);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="iii">
      <div className="profile-page-container">
        <MainTop riderdata={riderdata} />
        <div className="profile-page-bottom height">
          {/* <div className="back-arrow">
               <p onClick={goBack}>go back</p> 
        </div> */}
          {/* <div className="input-div"> */}
          {/* <input type="date" name="" id="" className="width-small"/> */}
          {/* <Calendar/> */}
          {/* </div> */}

          <h4 style={{ paddingLeft: "30px", paddingTop: "30px" }}>Fleet</h4>
          <div className="fleet-manager-stats">
            <div className="deliveries">
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="yellow"></p>
                  <h5>Bikes</h5>
                </div>
                <div className="amount-made">
                  <h5>{data?.no_of_bikes}</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="green"></p>
                  <h5>Cars</h5>
                </div>
                <div className="amount-made">
                  <h5>{data?.no_of_cars}</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="gray"></p>
                  <h5>Vans</h5>
                </div>
                <div className="amount-made">
                  <h5>{data?.no_of_vans}</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="red"></p>
                  <h5>Trucks</h5>
                </div>
                <div className="amount-made">
                  <h5>{data?.no_of_trucks}</h5>
                </div>
              </div>

              <p
                style={{
                  // paddingLeft: "30px",
                  paddingTop: "30px",
                  // marginBottom: "-50px",
                  fontWeight: "600",
                }}
              >
                Deliveries
              </p>
              {/* <div className="fleet-manager-stats"> */}
              {/* <div className="deliveries"> */}
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="yellow"></p>
                  <h5>Accepted deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>{stats?.no_accepted_deliveries}</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="gray"></p>
                  <h5>Declined deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>{stats?.no_declined_deliveries}</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="green"></p>
                  <h5>Completed deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>{stats?.no_completed_deliveries}</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="red"></p>
                  <h5>Cancelled Deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>{stats?.no_cancelled_deliveries}</h5>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className="fleet-payment-stat">
              <div className="payment-stat-details">
                <div className="vechicle-name">
                  <h4>Earnings</h4>
                </div>
                <div className="amount-made">
                  <h5>
                    Total earning: &#8358;
                    {earnings == 0 ? (
                      "0"
                    ) : (
                      <ThousandConverter value={earnings} />
                    )}
                    .00
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
