import React, { useState } from "react";
import { PaymentWeeks } from "./ReauableComponents/PaymentWeeks/PaymentWeeks";
import "./payment_record.css";
import "../../../components/css/toggle.css";
import { useNavigate } from "react-router-dom";
// import { FaGreaterThan, FaLessThan} from 'react-icons/fa';

export default function Payment_record() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const firstClick = () => {
    setToggle(true);

    // navigate("/Pending-del");
  };

  const secondClick = () => {
    setToggle(false);
    // navigate("/Pending-del");
  };
  return (
    <div className="payment-record-container">
      <div className="DA-payment-history">
        <div className="da-payment-props">
          <div className="payment-to">
            <div className="toggle-div">
              <div
                className="first-toggle"
                onClick={firstClick}
                id={toggle ? "active" : "inactive2"}
              >
                Fleet Weekly Summary
              </div>
              <div
                className="second-toggle"
                onClick={secondClick}
                id={toggle ? "inactive" : "active2"}
              >
                Combined Earnings
              </div>
            </div>
          </div>
          <div className="record-date">
            <input type="date" />
          </div>
          <div className="payment-history">
            <div className="payment-vehicle">
              <div className="bikes">BIKES</div>
              <div className="cars">CARS</div>
              <div className="buses">BUSES</div>
              <div className="truck">TRUCKS</div>
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
      </div>
    </div>
  );
}
