import React, { useState } from "react";
import "../css/privacy.css";
import "./faq.css";
import Footer from "./Footer";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FAQ() {
  const faq = [
    {
      q: "What services do you offer?",
      a: "We offer a range of logistics services.",
    },
    {
      q: "How do I book your services?",
      a: "You can easily book our services through our app. Simply download the app, create an account, and select the service you need.",
    },
    {
      q: "What are your rates?",
      a: "Our rates vary depending on the service you need and the distance of the delivery. You can check our rates on the app or contact us for a quote.",
    },
    {
      q: "How do I track my delivery?",
      a: "You can track your delivery in real-time through our app. You will receive updates on the status of your delivery, including when it has been picked up and when it will be delivered.",
    },
    {
      q: "What if I have a problem with my delivery?",
      a: "If you have any issues with your delivery, please contact our customer support team through the app. We will do our best to resolve the issue as quickly as possible.",
    },
    {
      q: "What types of vehicles do you have for transportation?",
      a: "We have a variety of vehicles available for transportation, including Motor Bikes, Cars and Vans. We can accommodate different sizes and types of cargo. Active means of delivery are available on the app.",
    },
    {
      q: "How do you ensure the safety of my goods during transportation?",
      a: "We take the safety of your goods very seriously. Our Riders/drivers are trained to handle cargo safely, and we use secure packaging and loading techniques for your peace of mind.",
    },
    {
      q: "What areas do you serve?",
      a: "We serve locally within Nigeria, You can check our service areas on the app or contact us for more information on service coverage.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept online payment with credit cards/debit card method on the app.",
    },
    {
      q: "How do I provide special instructions for my delivery?",
      a: "You can provide special instructions for your delivery through the app. For example, you can specify the delivery location or provide contact information for the recipient.",
    },
    {
      q: "How do I know when my delivery has been completed?",
      a: "You will receive a notification through the app when your delivery has been completed. You can also track the status of your delivery in real-time.",
    },
    {
      q: "What is your delivery time frame?",
      a: "Our delivery time frame depends on the service you choose and the distance of the delivery. We offer same-day and scheduled deliveries. You can check the estimated delivery time on the app.",
    },
    {
      q: "Do you offer any discounts or promotions?",
      a: "Yes, we offer various discounts and promotions from time to time. You can check for any current promotions on the app or contact us for more information.",
    },
    {
      q: "How do I provide feedback on my experience?",
      a: "We welcome your feedback on your experience with our services. You can provide feedback through the app or contact our customer support team. We appreciate your input and use it to improve our services.",
    },
    {
      q: "What if I need to change my delivery details?",
      a: "You can change your delivery details through the app only before making payment. Kindly go through your booking summaries before making payment. However knidly contact Pickload Customer support for assistance.",
    },
    {
      q: "How do I know if my delivery is delayed?",
      a: "If your delivery is delayed for any reason, we will notify you through the app. We will also provide updates on the status of your delivery and an estimated time of arrival.",
    },
    // {
    //   "q": "Do you offer bike delivery services?",
    //   "a": "Yes, we offer bike delivery services for smaller packages and deliveries within a certain distance. You can select the bike delivery option on the app.",
    // },
    {
      q: "What is the maximum weight and size for deliveries?",
      a: "The maximum weight and size for deliveries depends on the capacity of the vehicle being used and the distance of the delivery.",
    },
    {
      q: "How do you ensure the safety of my package during delivery?",
      a: "We take the safety of your package very seriously. Our couriers are trained to handle packages safely, and we use secure packaging and loading techniques.",
    },
    {
      q: "What if I need to cancel my delivery?",
      a: "You can ONLY cancel Scheduled Bookings; cancellation does not apply for instant delivery booking. However, please note that cancellation fees applies.",
    },
    {
      q: "How do I track my delivery?",
      a: "You can track your delivery in real-time through the app. You will receive updates on the status of your delivery, including when it has been picked up and when it will be delivered.",
    },
    {
      q: "How long does it take to get my refund on cancelled booking?",
      a: "You get refund within 3 to 5 business working days.",
    },
    {
      q: "What if I have a question that is not answered on the app?",
      a: "If you have a question that is not answered on the app, you can contact our customer support team. We are available to assist you with any questions or concerns you may have.",
    },
  ];
  return (
    <section className="privacy">
      <div className="background-top">
        <h3>Frequently Asked Questions (FAQs)</h3>
      </div>
      <div className="terms-container">
        <div className="faq-questions" style={{ marginTop: "30px" }}>
          {faq?.map((item, i) => (
            <FaqComponent
              question={item.q}
              number={i}
              key={i}
              answer={item.a}
            />
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}

export function FaqComponent(props) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <div className="questions-container">
      <div className="question">
        <p>{props.question}</p>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={activeIndex === props.number ? "rotate" : "faq-point"}
          onClick={() => handleClick(props.number)}
        />
        {/* <i
          className={`fas fa-angle-down ${
            activeIndex === props.number ? "rotate" : "faq-point"
          }`}
          
        ></i> */}
      </div>
      <div className={`answer ${activeIndex === props.number ? "active" : ""}`}>
        <p>{props.answer}</p>
      </div>
    </div>
  );
}
