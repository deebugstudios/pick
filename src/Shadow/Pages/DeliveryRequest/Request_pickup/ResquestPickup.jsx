import React from 'react'
import map from '../../../images/maps.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'
import './resquestpickup.css'
import { Link, Outlet } from 'react-router-dom'
import GoogleMap from '../../../javascripts/GoogleMap'
const ResquestPickup = () => {
  return (
    <section className="user-dashboard">
        <div className='user-right-side'>
        <div className="map-container">
            {/* <img src={map} alt="" /> */}
            <GoogleMap/>
        </div>
        </div>
        <div className="set-location-pickup">
            <FontAwesomeIcon icon={faLocationDot} className="green"/>
            <h4>Where are you?</h4>
            <p>Tell us your location so that we can pair you with the nearest availabe pickup request</p>
           <Link to="/Location"><button className='set-location-btn'>Set location</button></Link> 
        </div>
  </section>
  )
}

export default ResquestPickup