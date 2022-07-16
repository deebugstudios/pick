import React from 'react'
import '../css/section2subsec3.css'
import map from '../images/maps.png'
import Footer from './Footer'
const Section2subsec3 = () => {
  return (
      <section className='subsec3-wrapper'>
        <section className="subsec3">
            <div className="subsec3-left">
                <img src={map} alt="" />
            </div>
            <div className="subsec3-right">
                <h3>You can reach us via any of the following medium or pay us a vist at our office.Our support center is available 24/7
                </h3>
                <div className="info-wrapper">
                <div className="home-office">
                    <h4>Main Office</h4>
                    <p>11 Akpakpava St, opp. WEMA Bank,     Avbiama 300102, Benin City
                    </p>
                </div>
                <div className="contact-details">
                    <h4>Contact</h4>
                    <p>Mobile : +62813 8075 0179</p>
                    <p>Email : info@pickload.com</p>
                    <p>Office : Ph: 021 2270 2243</p>
                </div>
                </div>
                
            </div>
        </section>
    
        <Footer/>
    </section>
  )
}

export default Section2subsec3