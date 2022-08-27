import React from 'react'
import Me from '../../images/pickloadlogo.png'
import './deliveryimages.css'
export const DeliveryImages = (props) => {
  // console.log(props)
  return (
    <div className='delivery-imgs' key={props.index}>
        <img src={props.rectangle} />
    </div>
  )
}
