import React, { useState } from "react";
import UserOtp from "./components/Pages/UserOtp";
import PhoneConfirm from "./components/Pages/PhoneConfirm";
import Signup from "./components/Pages/Signup";
import SignupDelivery from "./components/Pages/SignupDelivery";
import UserForm from "./components/Pages/UserForm";
import WelcomeUser, { WelcomeAgent } from "./components/Pages/WelcomeUser";
import ForgotNumber from "./components/Pages/ForgotNumber";
import AsIndividual from "./components/Pages/AsIndividual";
import AsFleet from "./components/Pages/AsFleet";
import DeliveryOtp from "./components/Pages/DeliveryOtp";
import Success from "./components/Pages/Success";
import FleetVehicle from "./components/Pages/FleetVehicle";
import IndividualVehicle from "./components/Pages/IndividualVehicle";
import AgentCompleted from "./components/Pages/AgentCompleted";
import UserRequestPickup from "./components/usersFlow/NavsFlow/UserRequestPickup";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoggedinMainPage, { LoggedinMainPage1 } from "./Shadow/LoggedinMainPage";
import Main from "./Shadow/javascripts/Main";
import { FleetOtp } from "./components/Pages/DeliveryOtp";
import ResquestPickup from "./Shadow/Pages/DeliveryRequest/Request_pickup/ResquestPickup";
import DeliveryType from "./components/usersFlow/DeliveryType";
import FormUserDelivery from "./components/usersFlow/NavsFlow/FormUserDelivery";
import SelectAgent from "./components/usersFlow/NavsFlow/SelectAgent";
import InstantDeliverySummary, {
  InstantDeliverySummary1,
} from "./components/usersFlow/NavsFlow/InstantDeliverySummary";
import UserScheduledDeliveryHistory from "./components/usersFlow/NavsFlow/UserScheduledDeliveryHistory";
import CancelledScheduled from "./components/usersFlow/NavsFlow/CancelledScheduled";
import PaymentSuccess from "./components/usersFlow/PaymentSuccess";
import PendingDeliveryPickup from "./components/usersFlow/NavsFlow/PendingDeliveryPickup";
import PendingInstantDetails from "./components/usersFlow/NavsFlow/PendingInstantDetails";
import PendingScheduledDetails from "./components/usersFlow/NavsFlow/PendingScheduledDetails";
import CancelBooking from "./components/usersFlow/CancelBooking";
import CancelReason from "./components/usersFlow/CancelReason";
import CompletedDeliveries from "./components/usersFlow/NavsFlow/CompletedDeliveries";
import DeliveryHistoryDetails from "./components/usersFlow/NavsFlow/UserInstantDeliveryHistory";
import ReportReason from "./components/usersFlow/ReportReason";
import ReportThanks from "./components/usersFlow/ReportThanks";
import LeaveReview from "./components/usersFlow/LeaveReview";
import ReviewThanks from "./components/usersFlow/ReviewThanks";
import UsersProfile from "./components/usersFlow/NavsFlow/UsersProfile";
import Logout, {
  Logout1,
  Logout2,
} from "./components/usersFlow/NavsFlow/Logout";
import ScheduleForm from "./components/usersFlow/NavsFlow/ScheduleForm";
import ScheduledDeliverySummary from "./components/usersFlow/NavsFlow/ScheduledDeliverySummary";
import RequestSuccess from "./components/usersFlow/RequestSuccess";
import RequestLocation from "./Shadow/Pages/DeliveryRequest/Request_pickup_Location/RequestLocation";
import RequestPickupDetails from "./Shadow/Pages/DeliveryRequest/Request_pickup_Details/RequestPickupDetails";
import PendingDeliveryspecificsAgent from "./Shadow/Pages/Pending_deliveries/Delivery_Specifics/PendingDeliveryspecificsAgent";
import DeliveryHistoryDetailsAgent, {
  ScheduledHistoryDetailsAgent,
} from "./Shadow/Pages/DeliveryHistorys/DeliveryHistoryDetails/DeliveryHistoryDetails";
import Navsignedin from "./Shadow/javascripts/Navsignedin";
import SideBar from "./Shadow/javascripts/SideBar";
import PaymentDetails from "./Shadow/Pages/PaymentDetails/PaymentDetails";
import ProfilePage from "./Shadow/Pages/report_stats/ProfilePage";
import Payment_record from "./Shadow/Pages/Payment Record/Payment_record";
import LoginAs from "./components/Pages/LoginAs";
import { AgentContext } from "./components/javascript/AgentContext";
import { UseRiderProvider } from "./Shadow/Pages/Contexts/RiderContext";
import MyEarnings from "./Shadow/Pages/report_stats/MyEarnings/MyEarnings";
import { MainTop } from "./Shadow/Pages/report_stats/Profile_page_main_top/MainTop";
import DeliveryHistory from "./Shadow/Pages/DeliveryHistorys/DeliveryHistory/DeliveryHistory";
import Individual_records from "./Shadow/Pages/Payment Record/Individual_records";
import Payment_Stat from "./Shadow/Pages/Payment Record/Payment_Stat";
import Payment_Bar_stat from "./Shadow/Pages/Payment Record/Payment_Bar_stat";
import DeliveryAgentEarningPage from "./Shadow/Pages/Payment Record/DeliveryAgentEarningPage";
import DeliveryAgentStatPage from "./Shadow/Pages/Payment Record/DeliveryAgentStatPage";
import { ContactUs } from "./Shadow/javascripts/ContactUs";
import { AboutUs } from "./Shadow/javascripts/AboutUs";
import { Terms } from "./Shadow/javascripts/Terms";
import { UseTokenProviderUser } from "./Shadow/Pages/Contexts/RiderContext";
// import { Main1 } from "./Shadow/javascripts/Main";
import LoggedinMainPageUser, {
  LoggedinMainPage2,
} from "./components/usersFlow/NavsFlow/LoggedinMainPage";
import Privacy from "./Shadow/javascripts/Privacy";
import Change_Number from "./components/Pages/Change_Number";
import SpecificAgent from "./components/usersFlow/NavsFlow/SpecificAgent";
import ChangePaymentDetails from "./Shadow/Pages/PaymentDetails/ChangePaymentDetails";
import ChangePhoneNumber from "./Shadow/Pages/ChangeNumber/ChangePhoneNumber";
import { Notification } from "./Shadow/Pages/Notifications/Notification";
import AgentList from "./components/usersFlow/NavsFlow/AgentList";
import { ProtectedRoutes } from "./Shadow/ProtectedRoutes";
import { UserProtectedRoutes } from "./UserProtectedRoutes";
import EditProfile from "./Shadow/Pages/report_stats/EditProfile";

import Chat from "./components/usersFlow/ChatPage/Chat";
import ChatAgent from "./components/usersFlow/ChatPage/ChatAgent";
import Guest from "./components/usersFlow/ChatPage/Guest";
import UpgradeAccount from "./components/Pages/UpgradeAccount";
import FAQ from "./Shadow/javascripts/FAQ";
import Payment from "./components/Pages/Payment";
import TotalFleet from "./Shadow/Pages/Payment Record/TotalFleet";
import SingleAgent from "./Shadow/Pages/Payment Record/SingleAgent";
import ViewReviews from "./Shadow/Pages/Payment Record/ViewReviews";
export default function App() {
  return (
    <>
      <UseRiderProvider>
        <UseTokenProviderUser>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              {/* <Route
                path="contactUS2"
                element={
                  <LoggedinMainPage name={<ContactUs2 />} logged={true} />
                }
              />
              <Route path="contactUS1" element={<ContactUs1 />} /> */}
              {/* <Route path="aboutUS" element={<AboutUs />} /> */}
              {/* <Route
                path="aboutUS2"
                element={<LoggedinMainPage name={<AboutUs2 />} logged={true} />}
              /> */}
              {/* <Route path="aboutUS1" element={<AboutUs1 />} /> */}

              <Route exact path="/" element={<LoggedinMainPage1 />}>
                <Route path="" element={<Main />} />
                {/* <Route path="aboutUS" element={<AboutUs />} />
                <Route path="contactUS" element={<ContactUs />} /> */}
                <Route path="guest" element=<Guest /> />
              </Route>

              <Route path="payment" element={<Payment />} />
              <Route path="Termsandconditions" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="faq" element={<FAQ />} />
              <Route exact path="main1" element={<LoggedinMainPage1 />} />
              <Route path="join" element={<Signup />} />
              <Route path="userform" element={<UserForm />} />
              <Route path="fleet" element={<AsFleet />} />
              <Route path="upgrade" element={<UpgradeAccount />} />
              <Route path="login-as" element={<LoginAs />} />
              <Route path="welcome-agent" element={<WelcomeAgent />} />
              <Route path="confirm" element={<PhoneConfirm />} />
              <Route path="welcome" element={<WelcomeUser />} />
              <Route path="forgot" element={<ForgotNumber />} />
              <Route path="sign" element={<SignupDelivery />} />
              <Route path="individual" element={<AsIndividual />} />
              <Route path="individual-v" element={<IndividualVehicle />} />
              <Route path="fleet-v" element={<FleetVehicle />} />
              <Route path="account" element={<AgentCompleted />} />
              <Route path="success" element={<Success />} />
              <Route
                path="user"
                element={
                  <UserProtectedRoutes>
                    <LoggedinMainPageUser />
                  </UserProtectedRoutes>
                }
              >
                {/* The Route */}
                <Route path="chat" element={<Chat />} />
                <Route path="agentlist" element={<AgentList />} />
                <Route path="type" element={<DeliveryType />} />
                <Route path="notifications" element={<Notification />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="home" element={<Main />} />
                <Route path="userflow" element={<UserRequestPickup />} />
                <Route path="formuser" element={<FormUserDelivery />} />
                <Route path="select-a" element={<SelectAgent />} />
                <Route path="specific-a" element={<SpecificAgent />} />
                <Route path="summary-i" element={<InstantDeliverySummary />} />
                <Route path="schedule-form" element={<ScheduleForm />} />
                <Route
                  path="scheduled-summary"
                  element={<ScheduledDeliverySummary />}
                />
                <Route path="pending-del" element={<PendingDeliveryPickup />} />
                <Route
                  path="pending-instant"
                  element={<PendingInstantDetails />}
                />
                <Route
                  path="pending-scheduled"
                  element={<PendingScheduledDetails />}
                />
                <Route path="completed-del" element={<CompletedDeliveries />} />
                <Route
                  path="user-instant"
                  element={<DeliveryHistoryDetails />}
                />
                <Route
                  path="user-schedule"
                  element={<UserScheduledDeliveryHistory />}
                />
                <Route
                  path="cancelled-details"
                  element={<CancelledScheduled />}
                />
                <Route path="user-profile" element={<UsersProfile />} />
                <Route path="user-logout" element={<Logout />} />
                <Route path="chatwithagentuser" element={<ChatAgent />} />
                <Route path="change" element={<Change_Number />} />
              </Route>

              <Route
                path="paysuccess"
                element={
                  <UserProtectedRoutes>
                    <PaymentSuccess />
                  </UserProtectedRoutes>
                }
              />

              <Route
                path="request-success"
                element={
                  <UserProtectedRoutes>
                    <RequestSuccess />
                  </UserProtectedRoutes>
                }
              />

              <Route
                path="Specificpickupdetails"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <PendingDeliveryspecificsAgent />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              <Route
                path="deliveryhistory"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <DeliveryHistory />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              <Route
                path="deliveryhistorydetails"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <DeliveryHistoryDetailsAgent />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              {/* <Route
                path="scheduledhistorydetails"
                element={
                  <LoggedinMainPage
                    name={<ScheduledHistoryDetailsAgent />}
                    logged={true}
                  />
                }
              /> */}
              {/* <Route
                path="Chatwithadmin"
                element={
                  <LoggedinMainPage name={<ChatAdmin />} logged={true} />
                }
              /> */}

              <Route
                path="payment-details"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <PaymentDetails />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />

              <Route
                path="view-reviews"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <ViewReviews />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              <Route
                path="change-payment-details"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <ChangePaymentDetails />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              <Route
                path="agent-logout"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <Logout2 />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              <Route
                path="agent-profile"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <ProfilePage />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              <Route
                path="earnings"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <Payment_record />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />

              <Route
                path="single-agent"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <SingleAgent />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />

              <Route
                path="my-earning"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <DeliveryAgentEarningPage />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />

              <Route
                path="my-statistics"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <DeliveryAgentStatPage />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />

              <Route
                path="individual-payment"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <Individual_records />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />

              <Route
                path="payment-stat"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <Payment_Stat />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />

              <Route
                path="view-fleet"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <TotalFleet />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />

              <Route
                index
                path="fleet-stat"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <Payment_Bar_stat />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />

              <Route
                path="transactions"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <MyEarnings />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              <Route
                path="paymentrecord"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <Payment_record />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              <Route
                path="edit-profile"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <EditProfile />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
              <Route
                path="change-phone-number"
                element={
                  <LoggedinMainPage
                    name={
                      <ProtectedRoutes>
                        <ChangePhoneNumber />
                      </ProtectedRoutes>
                    }
                    logged={true}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </UseTokenProviderUser>
      </UseRiderProvider>
    </>
  );
}
