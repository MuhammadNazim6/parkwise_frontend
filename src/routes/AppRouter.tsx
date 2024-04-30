import React from 'react'
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './UserRoutes';
import ProviderRoutes from './ProviderRoutes';
import AdminRoutes from './AdminRoutes';

function AppRouter() {
  return (
    <Routes>
      <Route path='/*' element={<UserRoutes/>}/>
      <Route path='/provider/*' element={<ProviderRoutes/>}/>
      <Route path='/admin/*' element={<AdminRoutes/>}/>
    </Routes>
  )
}

export default AppRouter