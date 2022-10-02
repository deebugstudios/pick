import React from "react";
import "./deliveryinfo.css";
export const DeliverInfo = (props) => {
  return (
    <>
      <table>
        <tr>
          <th>Sender's name:</th>
          <td>{props.sender}</td>
        </tr>
        <tr>
          <th>Sender's phone no:</th>
          <td>{props.sender_no}</td>
        </tr>
        <tr>
          <th>Receiver's name:</th>
          <td>{props.receiver}</td>
        </tr>
        <tr>
          <th>Receiver's phone no: </th>
          <td>{props.receiver_no}</td>
        </tr>
        <tr>
          <th>Item name:</th>
          <td>{props.parcel_name}</td>
        </tr>
        <tr>
          <th>Item type:</th>
          <td> {props.parcel_type}</td>
        </tr>
        <tr>
          <th>Quantity of items: </th>
          <td> {props.description}</td>
        </tr>
        <tr>
          <th>Delivery instruction:</th>
          <td>{props.instruction}</td>
        </tr>
        <tr>
          <th>Scheduled pickup date :</th>
          <td>{props.date}</td>
        </tr>
        <tr>
          <th>Scheduled pickup time :</th>
          <td>{props.time}</td>
        </tr>
      </table>
    </>
  );
};

export const DeliverInfo2 = (props) => {
  return (
    <>
      <table>
        <tr>
          <th>Sender's name:</th>
          <td>{props.sender}</td>
        </tr>
        <tr>
          <th>Sender's phone no:</th>
          <td>{props.sender_no}</td>
        </tr>
        <tr>
          <th>Receiver's name:</th>
          <td>{props.receiver}</td>
        </tr>
        <tr>
          <th>Receiver's phone no: </th>
          <td>{props.receiver_no}</td>
        </tr>
        <tr>
          <th>Item name:</th>
          <td>{props.parcel_name}</td>
        </tr>
        <tr>
          <th>Item type:</th>
          <td> {props.parcel_type}</td>
        </tr>
        <tr>
          <th>Quantity of items: </th>
          <td> {props.description}</td>
        </tr>
        <tr>
          <th>Delivery instruction:</th>
          <td>{props.instruction}</td>
        </tr>
      </table>
      {/* comment just incase i decide to note use the table */}
      {/* <h3>Sender’s Name: <span className='delivery-details-spans'>April Purpose</span></h3>
                <h3>Sender’s Phone Number:<span className='delivery-details-spans'>08077665543</span></h3>
                <h3>Receiver’s Name: <span className='delivery-details-spans'>Purpose April</span></h3>
                <h3>Receiver’s Phone Number: <span className='delivery-details-spans'>08077665543</span></h3>
                <h3>Item Name: <span className='delivery-details-spans'>1 Pair Of Nike Airforce Shoes “44</span></h3>
                <h3>Quantity of Items: <span className='delivery-details-spans'>Lorem ipsum dolor sit amet, cons ect eturadipiscing elit. Nisl pretium. scing elit</span></h3>
                <h3>Delivery Instruction: <span className='delivery-details-spans'>Lorem ipsum dolor sit amet, cons ect eturadipiscing elit. Nisl pretium. scing elit</span></h3> */}
    </>
  );
};
