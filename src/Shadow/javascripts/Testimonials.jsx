import React from 'react'
import { useState } from 'react'
import '../css/testimonials.css'
import image from '../images/profileimage.png'
import image1 from '../images/kem-hero.png'
import image2 from '../images/contact_us.png'
import image3 from '../images/contactusimage.png'
// import image4 from '../images/profilepic3.png'
const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const testimonialSlider = [
        {
            image: image,
            text: " Pickload made parcel delivery so easier.",
            name: "GLORIA BASSEY",
        },
        {
            image: image,
            text: " pickload you Rock.",
            name: "CHIZZY",
        },
        {
            image: image,
            text: " this is an amazing website.",
            name: "LIGHT",
        },
        {
            image: image,
            text: " awesome project .",
            name: "MR P",
        },
        {
            image: image,
            text: " Honestly, this is the best Logistic app I have ever made use of. I have never had things delivered to me in so short a time at a very affordable rate. The delivery agent was also very professional yet  friendly.",
            name: "MR OBINNA",
        },
    ]
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

  return (
    <section className="testimonials-wrapper">
        <div className="testimonial">
        <h3>Testimonials</h3>
            <div className='testimonial-container'>
                <div className="testimonial-image">
                    <img src={testimonialSlider[currentIndex].image} alt="" />
                </div>
                <div className="testimonial-text">
                    <p>
                    {testimonialSlider[currentIndex]?.text}
                    </p>
                    <h5 className='testimonial-name'>{testimonialSlider[currentIndex]?.name}</h5>
                    <div className='flex'>
                        {testimonialSlider.map((slide, slideIndex)=> (
                            <div className={currentIndex === slideIndex  ? "active-dot" : 'circles'} key={slideIndex} onClick={()=> goToSlide(slideIndex)}></div>
                          ) )}
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonials