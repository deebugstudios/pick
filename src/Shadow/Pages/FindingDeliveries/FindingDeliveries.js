import React from "react";
import "./findingdeliveries.css";
// import loadingimage from "../images/loadingimage.png";
import Loading from "../../../components/Images/loading.png";
import { ClipLoader } from "react-spinners";
import FadeLoader from "react-spinners/FadeLoader";

// export const FindingDeliveries = () => {
//   return (
//     <section className="loading-state">
//       <div className="loading-state-wrapper">
//         <div className="loading-state-image-container">
//           <img src={loadingimage} alt="" />
//         </div>
//         <div className="loading-state-text-container">
//           <h4>
//             Please wait while pickload pairs you with the closest available
//             Pickup Request
//           </h4>
//         </div>
//       </div>
//     </section>
//   );
// };

export const FindingDeliveriesUser = (props) => {
  return (
    <section className="loading-state">
      <div className="loading-state-wrapper">
        <div className="loading-state-image-container">
          <ClipLoader color={"grey"} size={100} />
        </div>
        <div className="loading-state-text-container">
          <h4>{props.text}</h4>
        </div>
      </div>
    </section>
  );
};
