import React,{useContext, useState} from 'react'
import { RiderContext } from '../Contexts/RiderContext';
import './paymentdetails.css'
const PaymentDetails = () => {
  const value = useContext(RiderContext);
  const { riderdata } = value;
  const {bank_details} = riderdata
  const [bankName, setBankName] = useState(bank_details?.bank_name);
  const [accountName, setAccountName] = useState(bank_details?.account_name);
  const [accountNumber, setAccountNumber] = useState(bank_details?.account_no
);
  const [accountType, setAccountType] = useState(bank_details?.accont_type);
  const [bvn, setBvn] = useState(bank_details?.bvn);
  
  return (
    <section className="payment-details-section">
      <div className="payment-details-wrapper">
        <form className='payment-details-form'>
        <label htmlFor="bankName">Bank Name</label> <br />
          <input type="text" name='bankName' id='bankName' value={bankName
} disabled/> <br />
          <label htmlFor="holderName">Bank account holder name</label> <br />
          <input type="text" name='holderName' id='holderName' value={accountName
} disabled/> <br />
          <label htmlFor="accountNumber">Bank account number</label> <br />
          <input type="text" name='accountNumber' id='acountNumber' value={accountNumber} disabled/> <br />
          <label htmlFor="accountType">Account type</label><br />
          <input type="text" name='accountType' id='accountType' value={accountType
} disabled/> <br />
          <label htmlFor="bvn">Bvn</label><br />
          <input type="text" name='bvn' id='bvn' value={bvn
} disabled/> <br />
          <button type="submit" className='payment-btn'>Request to change payment account</button>
        </form>
      </div>
    </section>
  )
}

export default PaymentDetails