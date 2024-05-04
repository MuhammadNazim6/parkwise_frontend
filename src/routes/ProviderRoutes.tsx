import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProvSignup from '../screens/Provider/ProvSignup';
import ProvForgotPassword from '../screens/Provider/ProvForgotPassword';
import ProvEmailVerify from '../screens/Provider/ProvEmailVerify'
import ProvDashboard from '@/screens/Provider/ProvDashboard';
import ProvAddSlot from '@/screens/Provider/ProvAddSlot';
import ProvParkingLot from '@/screens/Provider/ProvParkingLot';
import ProvInbox from '@/screens/Provider/ProvInbox';
import ProvFeedbacks from '@/screens/Provider/ProvFeedbacks';


function ProviderRouter() {
  return (
    <Routes>
      <Route path='' element={<ProvDashboard/>} />
      <Route path='signup' element={<ProvSignup />} />
      <Route path='forgotpassword' element={<ProvForgotPassword />} />
      <Route path='email-verify' element={<ProvEmailVerify/>} />
      <Route path='add-slots' element={<ProvAddSlot/>} />
      <Route path='parking-lot' element={<ProvParkingLot/>} />
      <Route path='inbox' element={<ProvInbox/>} />
      <Route path='feedbacks' element={<ProvFeedbacks/>} />
    </Routes>
  )
}

export default ProviderRouter