import React from 'react'
import './paymentdetails.css'
const PaymentDetails = () => {
  return (
    <section className="payment-details-section">
      <div className="payment-details-wrapper">
        <form className='payment-details-form'>
        <label htmlFor="bankName">Bank Name</label> <br />
          <input type="text" name='bankName' id='bankName' value={"First Bank"} disabled/> <br />
          <label htmlFor="holderName">Bank account holder name</label> <br />
          <input type="text" name='holderName' id='holderName' value={"John Mark"} disabled/> <br />
          <label htmlFor="accountNumber">Bank account number</label> <br />
          <input type="text" name='accountNumber' id='acountNumber' value={"2104242340"} disabled/> <br />
          <label htmlFor="accountType">Account type</label><br />
          <input type="text" name='accountType' id='accountType' value={"Savings"} disabled/> <br />
          <label htmlFor="bvn">Bvn</label><br />
          <input type="text" name='bvn' id='bvn' value={"5532626262626266"} disabled/> <br />
          <button type="submit" className='payment-btn'>Request to change payment account</button>
        </form>
      </div>
    </section>
  )
}

export default PaymentDetails