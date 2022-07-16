import React from 'react'
import phoneicon from '../images/phoneicon.png'
import personicon from '../images/personicon.png'
import dragicon from '../images/dragicon.png'
import '../css/section2subsec1.css'
const Section2subsec1 = () => {
  return (
    <section className="subsec1">
        <h3>How it works</h3>
        <div className="subsec1-description">
            <div className='descrip-1'>
            <img src={phoneicon} alt="phone-icon" />
                <h4>STEP 1</h4>
                <h3>Download the App</h3>
                <p>The PickLoad Mobile Application is available on Google Playstore and Apple App store </p>
            </div>
            <div className='descrip-2'>
                <img src={personicon} alt="person-icon" />
                <h4>STEP 2</h4>
                <h3>Create an Account</h3>
                <p>Follow the prompts provided to easily create an account on PickLoad</p>
            </div>
            <div className='descrip-3'>
                <img src={dragicon} alt="drag-icon" />
                <h4>STEP 3</h4>
                <h3>Make a Delivery Request</h3>
                <p>Request for your item to be delivered to a specified location from the comfort of your home.</p>
            </div>
        </div>
    </section>
  )
}

export default Section2subsec1