import React from 'react'
import agent from '../images/pickloadagent.png'
import '../css/becomeagent.css'
const BecomeAgent = () => {
  return (
    <section className="agent-wrapper">
        <div className="agent-left-side">
            <h3>Become a <span className='green'>Delivery Agent</span>  on PickLoad</h3>
            <p>At PickLoad, we register logistics companies and individuals on our platform who are ready to provide fast, reliable and secure logistics services to users.</p>
            <p>To become a delivery agent you can choose to sign up as</p>
            <ul className='agent'>
                <li>An individual delivery agent OR</li>
                <li>A Fleet Manager</li>
            </ul>
            <button>Learn more</button>
        </div>
        <div className="agent-right-side">
        <div className='agent-image'>
            <img src={agent} alt="" />
        </div>
        </div>
    </section>
  )
}

export default BecomeAgent