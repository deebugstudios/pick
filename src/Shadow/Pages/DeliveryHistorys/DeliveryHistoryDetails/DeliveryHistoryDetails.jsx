import React from 'react'
import { DeliveryImages } from '../../Details info/DeliveryImages'
import locationimg from '../../../images/checkoutprogress.png'
import './deliveryhistorydetails.css'
import { DeliverInfo } from '../../Details info/DeliverInfo'
import { Outlet } from 'react-router-dom'
const DeliveryHistoryDetails = () => {
  return (
    <section className=" user-dashboard pending-delivery pending-delivery specifics"> 
        <div className="history-wrapper">
            <div className='specifics-details-section'>
                <h3>Instant Delivery ID: 7805097 </h3>
                <div className="delivery-details-pictures specifics-images">
                    <DeliveryImages/>
                    <DeliveryImages/>
                    <DeliveryImages/>
                </div>
                <h3>Delivery status</h3>
                <div className="delivery-details-location">
                    <div className="delivery-deatails-location-pickup">
                        <div className="location-img">
                            <img src={locationimg} alt="" />
                        </div>
                        <h3>Parcel Received by Delivery Agent at the Pickup Location </h3>
                        <p>Thursday March 25th at 9:30 PM</p>
                        <h3>Parcel Received by User at the Drop off loaction </h3>
                        <p>Thursday March 25th at 10:30 PM</p>
                    </div>
                </div>
                <div className="estimatedtime">
                    <h2>Parcel delivered in <span className='delivered-time'>1 hour 20 minutes</span> </h2>
                </div>
                <div className="delivery-profile">
                    <div className="driver-profile-image">
                        <div className="image">

                        </div>
                        <p>View Profile</p>
                    </div>
                    <div className="delivery-profile-details">
                        <table>
                            <tr>
                                <th>Delivery Agent :</th>
                                <td>Peter Robinson</td>
                            </tr>
                            <tr>
                                <th>Delivery Vehicle :</th>
                                <td>Tesla Cyber Truck</td>
                            </tr>
                            <tr>
                                <th>Agent ID :</th>
                                <td>6788</td>
                            </tr>
                            <tr>
                                <th>Plate Number :</th>
                                <td>LSR4KMJ</td>
                            </tr>
                            <tr>
                                <th>Phone Number :</th>
                                <td>09087614543</td>
                            </tr>
                            <tr>
                                <th>Senders Contact:</th>
                                <td>09092887765</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="delivery-history-info">
                    <DeliverInfo/>
                </div>
            </div>
        </div>
        <Outlet/>
    </section>
  )
}

export default DeliveryHistoryDetails