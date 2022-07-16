import React from "react";
import Navsignedin from "./javascripts/Navsignedin";
import SideBar from "./javascripts/SideBar";
// import map from './images/maps.png'
import "./css/loggedinmainpage.css";
const LoggedinMainPage = (props) => {
  return (
    <section className="user-dashboard-main">
      {/* <BrowserRouter> */}
      <div className="user-left-side-main">
        <Navsignedin />
      </div>
      <div className="user-right-side-main">
        <div className="sider-group">
          <SideBar />
        </div>

        <div className="map-container">{props.name}</div>
      </div>
      {/* <Routes>
            <Route path="/" element={<Main />} />
            <Route path="Deliveryrequest" element={<ResquestPickup />} />
            <Route path="/location" element={<RequestLocation />} />
            <Route path="/requestdetails" element={<RequestPickupDetails />} />
            <Route path="/accept" element={<DeliveryCompleted />} /> */}
      {/* </Route> */}
      {/* </Route> */}
      {/* <Route
              path="/Pendingdeliveries"
              element={<PendingDeliveryPickup />}
            />
            <Route
              path="/Specificpickupdetails"
              element={<PendingDeliveryspecifics />}
            />
            <Route path="/Deliveryhistory" element={<DeliveryHistory />} />
            <Route path="/Details" element={<DeliveryHistoryDetails />} />
            <Route path="/Chatwithadmin" element={<ChatAdmin />} /> */}
      {/* </Route> */}
      {/* </Routes> */}
      {/* </div> */}
      {/* </BrowserRouter> */}
    </section>
  );
};

export default LoggedinMainPage;
