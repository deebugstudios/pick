import React from 'react'
import Me from '../../images/pickloadlogo.png'
import './deliveryimages.css'
export const DeliveryImages = (props) => {
  // console.log(props)
  return (
    <div className='delivery-imgs'>
        <img src={props.rectangle} />
    </div>
  )
}
