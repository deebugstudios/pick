import React, { useContext } from 'react'
import { RiderContext } from '../Contexts/RiderContext';
import './deliveryagentearningpage.css'
import { PaymentWeeks } from './ReauableComponents/PaymentWeeks/PaymentWeeks';
const DeliveryAgentEarningPage = () => {
    const value = useContext(RiderContext);
    const { riderdata} = value;
  return (
    <div className="profile-page-container">
    {/* <MainTop/> */}
        <div className="profile-page-bottom height padding">
         <PaymentWeeks/>
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
            <div className="total-earnings">
                <h5>TOTAL WEEKS EARNING</h5>
                <p>N 23450.00</p>
            </div>
            <div className="place-right">
                <div className="is-payment">
                    <p>PENDING PAYMENT</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeliveryAgentEarningPage