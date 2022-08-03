import React from 'react'
import './transactionweeks.css'
export const TransactionWeeks = () => {
  return (
    <section className="weekly-transaction-container">
        <div className='transaction-date'>
            <input type='date'/>
        </div>
        <div className='transaction-weeks'>
            <button className='transaction-week'>Week 1</button>
            <button className='transaction-week'>Week 2</button>
            <button className='transaction-week'>Week 3</button>
            <button className='transaction-week'>Week 4</button>
            <button className='transaction-week'>Week 5</button>
        </div>
    </section>
  )
}
