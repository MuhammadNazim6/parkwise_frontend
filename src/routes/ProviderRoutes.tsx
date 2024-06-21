import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProvSignup from '../screens/Provider/ProvSignup';
import ProvEmailVerify from '../screens/Provider/ProvEmailVerify'
import ProvSidebar from '@/screens/Provider/ProvSidebar';
import ProvAddSlot from '@/screens/Provider/ProvAddSlot';
import ProvParkingLot from '@/screens/Provider/ProvParkingLot';
import ProvProfile from '@/screens/Provider/ProvProfile';
import ProvFeedbacks from '@/screens/Provider/ProvFeedbacks';
import ProvDashboard from '@/screens/Provider/ProvDashboard';
import ProvBookings from '@/screens/Provider/ProvBookings';
import ProvChats from '@/screens/Provider/ProvChats';
import NotFoundPage from '@/screens/Common/NotFoundPage';
import ProviderProtect from './protected/ProviderProtect';


function ProviderRouter() {
  return (
    <Routes>
      <Route element={<ProviderProtect />}>
        <Route path='/' element={<ProvSidebar />}>
          <Route index element={<ProvDashboard />} />
          <Route path='add-slots' element={<ProvAddSlot />} />
          <Route path='parking-lot' element={<ProvParkingLot />} />
          <Route path='profile' element={<ProvProfile />} />
          <Route path='feedbacks' element={<ProvFeedbacks />} />
          <Route path='bookings' element={<ProvBookings />} />
          <Route path='chats' element={<ProvChats />} />
        </Route>
      </Route>
      <Route path='signup' element={<ProvSignup />} />
      <Route path='email-verify' element={<ProvEmailVerify />} />

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  )
}

export default ProviderRouter