import React from "react";
import "../../usersFlow/NavsFlow/resquestpickup.css";

export default function PendingScheduleList() {
  return (
    <div className="pending-delivery-pickup-details-Container">
      <div className="pending-delivery-pickup-details-wrapper">
        <div className="pending-delivery-pickup-detail">
          <div className="pending-delivery-pickup-left">
            <div className="pending-delivery-pickup-img">
              {/* <img src={} alt="" /> */}
            </div>
            <table>
              <tr>
                <th>Parcel Name:</th>
                <td>Grocceries</td>
              </tr>
              <tr>
                <th>Delivery ID:</th>
                <td>7805097</td>
              </tr>
            </table>
          </div>
          <div className="pending-delivery-pickup-actions">
            <div id="type-div-w">
              <img src={Instant} alt="" />
            </div>
            {/* <FontAwesomeIcon icon={faTimesCircle} /> */}
            <button>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}
