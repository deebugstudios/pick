import React, { useState } from "react";
import UserOtp from "./components/Pages/UserOtp";
import PhoneConfirm from "./components/Pages/PhoneConfirm";
import Signup from "./components/Pages/Signup";
import SignupDelivery from "./components/Pages/SignupDelivery";
import UserForm from "./components/Pages/UserForm";
import WelcomeUser from "./components/Pages/WelcomeUser";
import ForgotNumber from "./components/Pages/ForgotNumber";
import AsIndividual from "./components/Pages/AsIndividual";
import AsFleet from "./components/Pages/AsFleet";
import DeliveryOtp from "./components/Pages/DeliveryOtp";
import Success from "./components/Pages/Success";
import FleetVehicle from "./components/Pages/FleetVehicle";
import IndividualVehicle from "./components/Pages/IndividualVehicle";
import AgentCompleted from "./components/Pages/AgentCompleted";
import UserRequestPickup from "./components/usersFlow/NavsFlow/UserRequestPickup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedinMainPage from "./Shadow/LoggedinMainPage";
import Main from "./Shadow/javascripts/Main";
import { FleetOtp } from "./components/Pages/DeliveryOtp";
import ResquestPickup from "./Shadow/Pages/DeliveryRequest/Request_pickup/ResquestPickup";

export default function App() {
  return (
    <>
      {/* <AsFleet /> */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            exact
            path="/"
            element={<LoggedinMainPage name={<Main />} />}
          />
          <Route path="join" element={<Signup />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="fleet" element={<AsFleet />} />
          <Route path="confirm" element={<PhoneConfirm />} />
          <Route path="otp" element={<UserOtp />} />
          <Route path="welcome" element={<WelcomeUser />} />
          <Route path="forgot" element={<ForgotNumber />} />
          <Route path="sign" element={<SignupDelivery />} />
          <Route path="individual" element={<AsIndividual />} />
          <Route path="otp3" element={<FleetOtp />} />
          <Route path="otp2" element={<DeliveryOtp />} />
          <Route path="individual-v" element={<IndividualVehicle />} />
          <Route path="fleet-v" element={<FleetVehicle />} />
          <Route path="account" element={<AgentCompleted />} />
          <Route path="success" element={<Success />} />
          <Route
            path="Deliveryrequest"
            element={<LoggedinMainPage name={<ResquestPickup />} />}
          />
          <Route path="userflow" element={<UserRequestPickup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
