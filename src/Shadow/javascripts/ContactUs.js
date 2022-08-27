import React from 'react'
import contactus from '../images/contactusimage.png'
import decor from '../images/decorator.png'
import criclegreendesign from '../images/circlegreendesign.png'
import circlereddesign from '../images/circlereddesign.png'
import '../css/contactus.css'
import Footer from './Footer'
export const ContactUs = () => {
  return (
    <section className="contact-us">
        <div className="contact-us-wrapper">
            <div className="dots-container1">
                <img src={criclegreendesign}  />
            </div>
            <div className="dots-container2">
                <img src={circlereddesign} />
            </div>
            <div className="dots-container3">
                <img src={criclegreendesign}  />
            </div>
            <div className="dots-container4">
                <img src={circlereddesign} />
            </div>
            <div className="contact-us-left-side">
                <div className="text-container">
                    <h3>
                    Whenever you need us, we are <span className='green-icons'>always available</span>  to meet your logistic needs.
                    </h3>
                </div>
            </div>
            <div className="contact-us-right-side">
                <div className="image-contaniner">
                    <img src={contactus} alt="services girl" />
                </div>
            </div>
        </div>
        <div className="contact-details-wrapper">
            <div className="decoration-container">
                <img src={decor} alt="" />
            </div>
            <div className='input-text-containerr'>
                <h3>We’d love to hear from you</h3>
                <p>
                    Fill out this short form and a member of our team will get back to you within 24 hours
                </p>
            </div>
            <div className="contact-inputs-container">
                <label htmlFor="fullName">Full Name</label>
                <br />
                <input type="text" name="fullName" id="fullName" placeholder='Enter your full name'/>
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input type="email" name="email" id="email"  placeholder='Enter your email'/>
                <br />
                <label htmlFor="number">Number</label>
                <br />
                <input type="number" name="number" id="number"  placeholder='Enter Your Phone Number'/>
                <br />
                <label htmlFor="message">Message</label>
                <br />
                <textarea name="message" id="message" placeholder='Type your message here'></textarea>
            </div>
            <div className='input-btn'>Submit</div>
        </div>
        <Footer/>
    </section>
  )
}
