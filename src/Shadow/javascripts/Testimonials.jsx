import React from 'react'
import '../css/testimonials.css'
import image from '../images/profileimage.png'
const Testimonials = () => {
  return (
    <section className="testimonials-wrapper">
    <div className="testimonial">
        <h3>Testimonials</h3>
        <div className="testimonial-image">
            <img src={image} alt="" />
        </div>
        <div className="testimonial-text">
            <p>
            Honestly, this is the best Logistic app I have ever made use of. I have never had things delivered to me in so short a time at a very affordable rate. The delivery agent was also very professional yet  friendly.
            </p>
            <h5 className='testimonial-name'>GLORIA BASSEY</h5>
            <div className='flex'>
                <div className='circles'></div>
                <div className='circles'></div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Testimonials