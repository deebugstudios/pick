import React from 'react'
import { PaymentWeeks } from './PaymentWeeks'
import {useNavigate} from 'react-router-dom'

export const FleetSummarydetails = () => {
    const navigate = useNavigate()

    const handleClickIndivdualRecords = () => {
        navigate("/individual-payment")
    }
  return (
    <div className="wrapper-payment">
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
                    <button onClick={handleClickIndivdualRecords}>View details</button>
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
  )
}
