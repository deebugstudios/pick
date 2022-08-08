import React from 'react'
import { PaymentWeeks } from '../../Payment Record/ReauableComponents/PaymentWeeks/PaymentWeeks'
import { MainTop } from '../Profile_page_main_top/MainTop'

const MyEarnings = () => {
  return (
    <section className="MyEarnings-wrapper">
    {/* <MainTop/> */}
    <div className="profile-page-bottom">
        <div className="calender">
            <input type="date" name="" id="" />
        </div>
        <PaymentWeeks/>
    </div>
    </section>
  )
}

export default MyEarnings