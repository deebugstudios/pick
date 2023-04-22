import React, { useState, useEffect } from "react";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
import { useContext } from "react";
import { NoTransaction } from "../NoTransactionpage/NoTransaction";
import ThousandConverter from "../../../components/javascript/ThousandConverter";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

export default function TotalFleet() {
  const value = useContext(RiderContext);
  const { riderdata, token } = value;
  const [vechicle, setVehicle] = useState("bike");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [vechicle]);
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_fleet_manager_delivery_agent_total_earnings",
        {
          method: "POST",

          body: JSON.stringify({
            token: JSON.parse(token),
            type: vechicle,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      // getData(await response.json());
      const result = await response.json();

      if (response.status === 200) {
        //   const list = result?.Pdata;
        setData(result?.delivery_agents);
        setLoading(false);
        console.log(result);

        // console.log("data gotten succesfully");
      } else {
        // console.log(vehicleused, computedMonth, computedYear, week)
        //   console.log("some error occurred");
        setLoading(false);
        // console.log(loading)
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="iii">
      <div className="profile-page-container">
        <MainTop riderdata={riderdata} />
        <div className="profile-page-bottom">
          <div className="payment-record-container" style={{ height: "100%" }}>
            <div
              className="payment-history"
              style={{ margin: "50px 0", height: "100%" }}
            >
              <div className="payment-vehicle">
                <div
                  className={vechicle == "bike" ? "bikes" : "cars"}
                  onClick={() => setVehicle("bike")}
                >
                  BIKES
                </div>
                <div
                  className={vechicle == "car" ? "bikes" : "cars"}
                  onClick={() => setVehicle("car")}
                >
                  CARS
                </div>
                <div
                  className={vechicle == "van" ? "bikes" : "cars"}
                  onClick={() => setVehicle("van")}
                >
                  VANS
                </div>
                <div
                  className={vechicle == "truck" ? "bikes" : "cars"}
                  onClick={() => setVehicle("truck")}
                >
                  TRUCKS
                </div>
              </div>
              {loading ? (
                <div className="profile-page-bottom height padding">
                  <h1
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ClipLoader
                      color={"#1AA803"}
                      loading={loading}
                      size={100}
                    />
                  </h1>
                </div>
              ) : data?.length > 0 ? (
                <table className="table-data">
                  <thead>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Total Earnings</th>
                    <th></th>
                  </thead>

                  <tbody>
                    {data?.map((item, i) => (
                      <tr className="delivery-stats" key={i}>
                        <td>{i + 1}</td>
                        <td>{item.fullname}</td>
                        <td>
                          ₦{<ThousandConverter value={item.total_earnings} />}
                          .00
                        </td>
                        <td>
                          <button
                            style={{ fontSize: "12px" }}
                            onClick={() =>
                              navigate("/single-agent", {
                                state: { id: item._id },
                              })
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <NoTransaction />
              )}
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
