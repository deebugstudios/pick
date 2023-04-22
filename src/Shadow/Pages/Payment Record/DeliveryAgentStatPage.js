import React, { useContext, useState, useEffect } from "react";
import "./payment_record.css";
import "../../../components/css/toggle.css";
import "./payment_bar_stat.css";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
import ThousandConverter from "../../../components/javascript/ThousandConverter";
// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';

export default function DeliveryAgentStatPage() {
  const value = useContext(RiderContext);
  const { riderdata, token, typeAccount } = value;
  const {
    no_accepted_deliveries,
    no_completed_deliveries,
    no_declined_deliveries,
    no_cancelled_deliveries,
  } = riderdata;
  const [data, setData] = useState([]);
  const [earnings, setEarnings] = useState("");
  const [loading, setLoading] = useState(true);

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
      //   console.log(results);
      //   setData(results?.vehicles);
      setEarnings(data?.earnings);
    } catch (err) {
      //   console.log(err);
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
          {/* <h3><input type="date" name="" id="" className="width-small"/></h3> */}
          <div className="fleet-manager-stats">
            <div className="deliveries">
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="yellow"></p>
                  <h5>Accepted deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>{no_accepted_deliveries}</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="green"></p>
                  <h5>Completed deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>{no_completed_deliveries}</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="gray"></p>
                  <h5>Declined deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>{no_declined_deliveries}</h5>
                </div>
              </div>
              <div className="delivery-stats payment-stat-details">
                <div className="delivery-name">
                  <p className="red"></p>
                  <h5>Cancelled deliveries</h5>
                </div>
                <div className="amount-made">
                  <h5>{no_cancelled_deliveries}</h5>
                </div>
              </div>
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
                      "0.00"
                    ) : (
                      <ThousandConverter value={earnings} />
                    )}
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
