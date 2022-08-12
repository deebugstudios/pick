import React from 'react'
import './maintop.css'
import personprofileicon from "../../../images/profilepersonicon.png";
import staricon from "../../../images/staricon.png";
import barsicon from "../../../images/barsicon.png";
import fleeticons from "../../../images/fleeticons.png";
import cashicon from "../../../images/cashicon.png";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const MainTop = (props) => {
const {fleet_manager_vehicles, rating} = props?.riderdata;
// const {no_of_bikes, no_of_buses, no_of_cars, no_of_trucks} = fleet_manager_vehicles;
// const {total_rating} = rating
  return (
    <div className="profile-page-top">
        <div className="pages">
          <h3>PROFILE INFORMATION</h3>
          <div className="profile-icons">
            <div className="half-circle green-color">
            <img src={personprofileicon} alt="icon" className="profile-small-icon"/>
            </div>
          </div>
        </div>
        <Link to="/earnings">
        <div className="pages">
          <h3>FLEET EARNINGS</h3>
          <div className="profile-icons">
            <div className="half-circle yellow-color">
            <img src={cashicon} alt="icon" />
            </div>
          </div>
        </div>
        </Link>
        <Link to="/fleet-stat">
          <div className="pages">
            <h3>FLEET STATISTICS</h3>
            <div className="profile-icons">
              <div className="half-circle gray-color">
              <img src={barsicon} alt="icon" />
              </div>
            </div>
          </div>
        </Link>
        <div className="pages">
          <h3>MY RATING </h3>
          <span>&nbsp; {rating?.total_rating}</span>
          <div className="profile-icons">
            <div className="half-circle green-color">
            <img src={staricon} alt="icon" />
            </div>
          </div>
        </div>
        <div className="pages span-two">
          <h3>MY FLEET</h3>
          <div className="profile-icons">
            <div className="half-circle yellow-color">
            <img src={fleeticons} alt="icon" className="profile-big-icon" />
            </div>
          </div>
          <div className="transportations">
            <ul>
              <li>{fleet_manager_vehicles?.no_of_bikes} Bikes</li>
              <li>{fleet_manager_vehicles?.no_of_cars} Cars</li>
            </ul>
            <ul>
              <li>{fleet_manager_vehicles?.no_of_buses} Buses</li>
              <li>{fleet_manager_vehicles?.no_of_trucks} Trucks</li>
            </ul>
          </div>
        </div>
        {/* <Outlet/> */}
      </div>
  )
}
