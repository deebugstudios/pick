import React, { useState } from 'react'

export const PaymentWeeks = (props) => {


console.log(props.cname1)
  return (
    <section className="paymentweeks-container">
        <div className='payment-week'>
            <div className={props.cname1} onClick={props.handleClassName1}>
                WEEK 1
            </div>
            <div className={props.cname2} onClick={props.handleClassName2}>
                WEEK 2
            </div>
            <div className={props.cname3} onClick={props.handleClassName3}>
                WEEK 3
            </div>
            <div className={props.cname4} onClick={props.handleClassName4}>
                WEEK 4
            </div>
            <div className={props.cname5} onClick={props.handleClassName5}>
                WEEK 5
            </div>
        </div>
    </section>
  )
}
