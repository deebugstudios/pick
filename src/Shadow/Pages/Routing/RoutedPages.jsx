import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '../../javascripts/Main'
import DeliveryHistory from '../DeliveryHistorys/DeliveryHistory/DeliveryHistory'

const RoutedPages = () => {
  return (

    <Routes>
        <Route path="/" elment={<Main/>}>
        </Route>
            <Route path='deliveryhistory' element={DeliveryHistory}/>
    </Routes>
  )
}

export default RoutedPages