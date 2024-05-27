import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProvSignup from '../screens/Provider/ProvSignup';
import ProvForgotPassword from '../screens/Provider/ProvForgotPassword';
import ProvEmailVerify from '../screens/Provider/ProvEmailVerify'
import ProvSidebar from '@/screens/Provider/ProvSidebar';
import ProvAddSlot from '@/screens/Provider/ProvAddSlot';
import ProvParkingLot from '@/screens/Provider/ProvParkingLot';
import ProvProfile from '@/screens/Provider/ProvProfile';
import ProvFeedbacks from '@/screens/Provider/ProvFeedbacks';
import ProvDashboard from '@/screens/Provider/ProvDashboard';


function ProviderRouter() {
  return (
    <Routes>
      <Route path='/' element={<ProvSidebar />}>
        <Route index element={<ProvDashboard />} />
        <Route path='add-slots' element={<ProvAddSlot />} />
        <Route path='parking-lot' element={<ProvParkingLot />} />
        <Route path='profile' element={<ProvProfile />} />
        <Route path='feedbacks' element={<ProvFeedbacks />} />
      </Route>
      <Route path='signup' element={<ProvSignup />} />
      <Route path='email-verify' element={<ProvEmailVerify />} />
    </Routes>
  )
}

export default ProviderRouter