import React, { useEffect } from "react";
import { useState } from "react";
import "../css/testimonials.css";
import image from "../images/obinna.png";
import image1 from "../images/elo.jpg";
import image2 from "../images/michael.jpg";
import image3 from "../images/contactusimage.png";
// import image4 from '../images/profilepic3.png'
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialSlider = [
    {
      image: image,
      text: "I was struggling to manage my business's logistics before I found this app. But now, thanks to its easy-to-use interface and powerful features, I'm able to streamline my delivery and tracking processes like never before. I've saved so much time and money since I started using it, and I couldn't be happier!",
      name: "Osmond Obinna",
    },
    {
      image: image1,
      text: "As an ecommerce entrepreneur, delivery is one of the most important aspect of my business. That's why I was thrilled to discover this logistics app. It's transformed the way I manage my orders and deliveries, with real-time tracking, automatic notifications, and seamless integration with my existing systems. I highly recommend it to anyone in the ecommerce space!",
      name: "Light Elo",
    },
    {
      image: image2,
      text: "I'm not usually one to leave reviews, but this logistics app has truly blown me away. From its user-friendly interface to its lightning-fast delivery times, it's clear that the developers really know what they're doing. I've used it for both personal and professional deliveries, and it's never let me down. If you're looking for a reliable logistics solution, look no further than this app!",
      name: "Michael Nukonu",
    },
  ];
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const goToNext = () => {
    const lastIndex = currentIndex == testimonialSlider.length - 1;
    const finalInedex = lastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(finalInedex);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 7000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="testimonials-wrapper">
      <div className="testimonial">
        <h3>Testimonials</h3>
        <div className="testimonial-container">
          <div className="testimonial-image">
            <img src={testimonialSlider[currentIndex].image} alt="" />
          </div>
          <div className="testimonial-text">
            <p>{testimonialSlider[currentIndex]?.text}</p>
            <h5 className="testimonial-name">
              {testimonialSlider[currentIndex]?.name}
            </h5>
            <div className="flex">
              {testimonialSlider.map((slide, slideIndex) => (
                <div
                  className={
                    currentIndex === slideIndex ? "active-dot" : "circles"
                  }
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                ></div>
              ))}
              {/* <div onClick={goToNext}>next</div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
