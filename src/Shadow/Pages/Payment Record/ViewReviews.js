import React, { useState, useEffect } from "react";
import { RiderContext } from "../Contexts/RiderContext";
import { useContext } from "react";
import { MainTop } from "../report_stats/Profile_page_main_top/MainTop";
import ClipLoader from "react-spinners/ClipLoader";
import notransaction from "../../images/notransaction.png";
import { DateConverter } from "../../../DateAndTimeConverter";
import Stars from "react-stars-display";
import UserIcon from "../../../components/Images/user.png";
import { NoTransaction } from "../NoTransactionpage/NoTransaction";

export default function ViewReviews() {
  const value = useContext(RiderContext);
  const { riderdata, token } = value;
  const [dataList, setDataList] = useState({});
  const [loading, setLoading] = useState(true);
  const [critical, setCritical] = useState(false);
  const [toggle, setToggle] = useState(true);

  const firstClick = () => {
    setToggle(true);
    setCritical(false);

    // navigate("/Pending-del");
  };

  const secondClick = () => {
    setToggle(false);
    setCritical(true);
    // navigate("/Pending-del");
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ancient-wildwood-73926.herokuapp.com/delivery_agent_review/get_reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: JSON.parse(token),
            pagec: 1,
            critical: critical,
          }),
        }
      );
      const data = await res.json();
      // console.log(data)
      if (res.status === 200) {
        console.log(data);

        setDataList(data?.reviews);
        setLoading(false);
        // console.log(data?.total_earnings?.[0]);
        // console.log("worked");
        setLoading(false);
      } else {
        // console.log("some error occurred");
        setLoading(false);
        // console.log(loading)
      }
    } catch (error) {
      console.log(error);
      // console.log("error");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [toggle]);

  return (
    <div className="iii">
      <div className="profile-page-container">
        <MainTop riderdata={riderdata} />
        <div className="profile-page-bottom">
          <div className="payment-record-container">
            <div className="payment-to">
              <div className="toggle-div">
                <div
                  className="first-toggle"
                  onClick={firstClick}
                  id={toggle ? "active" : "inactive2"}
                >
                  Positive
                </div>
                <div
                  className="second-toggle"
                  onClick={secondClick}
                  id={toggle ? "inactive" : "active2"}
                >
                  Critical
                </div>
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
                  <ClipLoader color={"#1AA803"} loading={loading} size={100} />
                </h1>
              </div>
            ) : dataList?.length > 0 ? (
              dataList?.map((item) => (
                <div id="flex-review">
                  <div id="review-div">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="review-profile">
                        <img
                          src={
                            item.user_img.length > 2 ? item.user_img : UserIcon
                          }
                          alt=""
                        />
                      </div>

                      <div id="text-review">
                        <p id="reviewer">{item.user_name}</p>
                      </div>
                    </div>
                    <div id="star-review">
                      <div id="split-star">
                        <div id="actual-star">
                          <Stars
                            stars={item.stars}
                            size={20}
                            spacing={1}
                            fill="#ea9c46"
                          />
                        </div>
                        <p>
                          {Number.isInteger(item.stars)
                            ? `${item.stars}.0`
                            : item.stars}
                        </p>
                      </div>
                      {/* <br /> */}
                      <p className="date-review">
                        {" "}
                        <DateConverter value={item.timestamp} />
                      </p>
                    </div>
                  </div>
                  <p id="actual-review">{item.review}</p>
                </div>
              ))
            ) : (
              <div className="no-transaction-container">
                <div className="no-transaction-container2">
                  <div className="no-transaction-image-wrapper">
                    <img src={notransaction} alt="no transaction log" />
                  </div>
                  <p>No reviews to display</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
