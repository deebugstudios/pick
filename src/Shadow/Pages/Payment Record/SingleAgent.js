import React, { useState, useEffect } from "react";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import { RiderContext } from "../Contexts/RiderContext";
import { useContext } from "react";
import Arrow from "../../../components/Images/Arrow.png";
import Aang from "../../../components/Images/user.png";
import { useLocation, useNavigate } from "react-router-dom";
import { DeliveryImages } from "../../../components/usersFlow/Details info/DeliveryImages";
import ClipLoader from "react-spinners/ClipLoader";

export default function SingleAgent() {
  const value = useContext(RiderContext);
  const { riderdata, token } = value;
  const location = useLocation();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const id = location.state.id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_earnings/view_fleet_manager_delivery_agent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(token),
            delivery_agent_id: id,
          }),
        }
      );
      const data = await res.json();
      const results = await data;
      setLoading(false);
      console.log(results);
      setData(results?.delivery_agent[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="iii">
      <div className="profile-page-container">
        <MainTop riderdata={riderdata} />
        <div className="profile-page-bottom">
          <div className="payment-record-container">
            <div
              className="payment-history"
              style={{ margin: "50px 0", height: "100%" }}
            >
              <div
                id="number-arrow-div"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <img src={Arrow} alt="" />
              </div>
            </div>

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
              <>
                <div className="driver-profile-image">
                  <div className="image">
                    <img src={data?.img_url} alt="" />
                  </div>
                </div>

                <div
                  className="delivery-history-info"
                  style={{
                    height: "100%",
                    padding: "0 20px",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "10px",
                      fontWeight: "600",
                      fontSize: "15px",
                      marginTop: "10px",
                    }}
                  >
                    Personal Information
                  </div>
                  <table className="view-full">
                    <tr>
                      <th>Agent ID:</th>
                      <td>{data?._id}</td>
                    </tr>
                    <tr>
                      <th>Fullname:</th>
                      <td>{data?.fullname}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{data?.email}</td>
                    </tr>
                    <tr>
                      <th>Phone number:</th>
                      <td>{data?.phone_no}</td>
                    </tr>
                    <tr>
                      <th>Address:</th>
                      <td>{data?.address}</td>
                    </tr>
                    <tr>
                      <th>State:</th>
                      <td>{data?.state}</td>
                    </tr>
                  </table>
                </div>

                <div
                  className="delivery-history-info"
                  style={{
                    height: "100%",
                    padding: "0 20px",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "10px",
                      fontWeight: "600",
                      fontSize: "15px",
                      marginTop: "10px",
                    }}
                  >
                    Vehicle Information
                  </div>
                  <table className="view-full">
                    <tr>
                      <th>Vehicle manufacturer:</th>
                      <td>{data?.vehicle_details.name}</td>
                    </tr>
                    <tr>
                      <th>Vehicle type:</th>
                      <td>{data?.vehicle_details.type}</td>
                    </tr>
                    <tr>
                      <th>Vehicle color:</th>
                      <td>{data?.vehicle_details.color}</td>
                    </tr>
                    <tr>
                      <th>Vehicle plate number:</th>
                      <td>{data?.vehicle_details.plate_no}</td>
                    </tr>
                    <tr>
                      <th>Driver's license expiry date:</th>
                      <td>
                        {data?.vehicle_details.driver_license_expiry_date}
                      </td>
                    </tr>
                  </table>
                </div>

                <div
                  style={{
                    margin: "20px 0 10px 0",
                    fontWeight: "600",
                    paddingLeft: "20px",
                    fontSize: "15px",
                  }}
                >
                  Driver's License Image (front and back)
                </div>
                <div
                  className="delivery-details-pictures-1 specifics-images"
                  style={{ justifyContent: "flex-start", paddingLeft: "10px" }}
                >
                  <DeliveryImages
                    rectangle={data?.vehicle_details.img_urls[0]}
                  />

                  <DeliveryImages
                    rectangle={data?.vehicle_details.img_urls[1]}
                  />
                </div>

                <div
                  style={{
                    margin: "20px 0 10px 0",
                    fontWeight: "600",
                    paddingLeft: "20px",
                    fontSize: "15px",
                  }}
                >
                  Vehicle Images
                </div>
                <div
                  className="delivery-details-pictures specifics-images"
                  style={{ justifyContent: "flex-start", paddingLeft: "10px" }}
                >
                  {data?.vehicle_details.img_urls[2] && (
                    <DeliveryImages
                      rectangle={data?.vehicle_details.img_urls[2]}
                    />
                  )}
                  {data?.vehicle_details.img_urls[3] && (
                    <DeliveryImages
                      rectangle={data?.vehicle_details.img_urls[3]}
                    />
                  )}
                  {data?.vehicle_details.img_urls[4] && (
                    <DeliveryImages
                      rectangle={data?.vehicle_details.img_urls[4]}
                    />
                  )}
                  {data?.vehicle_details.img_urls[5] && (
                    <DeliveryImages
                      rectangle={data?.vehicle_details.img_urls[5]}
                    />
                  )}
                  {data?.vehicle_details.img_urls[6] && (
                    <DeliveryImages
                      rectangle={data?.vehicle_details.img_urls[6]}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
