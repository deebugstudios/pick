import React, { useState } from 'react'

export const PaymentWeeks = () => {

    const [cname1, setCname1] = useState('week1');
    const [cname2, setCname2] = useState('week2');
    const [cname3, setCname3] = useState('week2');
    const [cname4, setCname4] = useState('week2');
    const [cname5, setCname5] = useState('week2');


    const handleClassName1 = () => {
        setCname1('week1');
        setCname2('week2');
        setCname3('week2');
        setCname4('week2');
        setCname5('week2');
      }
      const handleClassName2 = () => {
        setCname1('week2');
        setCname2('week1');
        setCname3('week2');
        setCname4('week2');
        setCname5('week2');
      }
      const handleClassName3 = () => {
        setCname1('week2');
        setCname2('week2');
        setCname3('week1');
        setCname4('week2');
        setCname5('week2');
      }
      const handleClassName4 = () => {
        setCname1('week2');
        setCname2('week2');
        setCname3('week2');
        setCname4('week1');
        setCname5('week2');
      }
      const handleClassName5 = () => {
        setCname1('week2');
        setCname2('week2');
        setCname3('week2');
        setCname4('week2');
        setCname5('week1');
      }
    


  return (
    <section className="paymentweeks-container">
        <div className='payment-week'>
            <div className={cname1} onClick={handleClassName1}>
                WEEK 1
            </div>
            <div className={cname2} onClick={handleClassName2}>
                WEEK 2
            </div>
            <div className={cname3} onClick={handleClassName3}>
                WEEK 3
            </div>
            <div className={cname4} onClick={handleClassName4}>
                WEEK 4
            </div>
            <div className={cname5} onClick={handleClassName5}>
                WEEK 5
            </div>
        </div>
    </section>
  )
}
