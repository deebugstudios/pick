import React from "react";
import {
  DateConverter,
  EveryDateConverter,
  TimeConverter,
} from "../../../DateAndTimeConverter";
import "./deliveryinfo.css";
export const DeliverInfo = (props) => {
  // console.log(props.timestamp)
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Sender's Name:</th>
            <td>{props.sender}</td>
          </tr>
          <tr>
            <th>Sender's Phone Number:</th>
            <td>0{props.sender_no}</td>
          </tr>
          <tr>
            <th>Receiver's Name:</th>
            <td>{props.receiver}</td>
          </tr>
          <tr>
            <th>Receiver's Phone Number: </th>
            <td>0{props.receiver_no}</td>
          </tr>
          <tr>
            <th>Item Name:</th>
            <td>{props.parcel_name}</td>
          </tr>
          <tr>
            <th>Item Type:</th>
            <td> {props.parcel_type}</td>
          </tr>
          <tr>
            <th>Item Description: </th>
            <td> {props.description}</td>
          </tr>
          <tr>
            <th>Delivery Instruction:</th>
            <td>{props.instruction}</td>
          </tr>
          {props.timestamp ? (
            <tr>
              <th>Scheduled Pickup Date :</th>
              <td>
                <EveryDateConverter value={props.timestamp} />
              </td>
            </tr>
          ) : null}
          {props.timestamp ? (
            <tr>
              <th>Scheduled Pickup Time :</th>
              <td>
                <TimeConverter value={props.timestamp} />
              </td>
            </tr>
          ) : null}
        </thead>
      </table>
      {/* comment just incase i decide to note use the table */}
      {/* <h3>Sender’s Name: <span className='delivery-details-spans'>April Purpose</span></h3>
                <h3>Sender’s Phone Number:<span className='delivery-details-spans'>08077665543</span></h3>
                <h3>Receiver’s Name: <span className='delivery-details-spans'>Purpose April</span></h3>
                <h3>Receiver’s Phone Number: <span className='delivery-details-spans'>08077665543</span></h3>
                <h3>Item Name: <span className='delivery-details-spans'>1 Pair Of Nike Airforce Shoes “44</span></h3>
                <h3>Item Description: <span className='delivery-details-spans'>Lorem ipsum dolor sit amet, cons ect eturadipiscing elit. Nisl pretium. scing elit</span></h3>
                <h3>Delivery Instruction: <span className='delivery-details-spans'>Lorem ipsum dolor sit amet, cons ect eturadipiscing elit. Nisl pretium. scing elit</span></h3> */}
    </>
  );
};
