import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '@/screens/Admin/AdminLayout'
import AdminDashboard from '@/screens/Admin/AdminDashboard'
import AdminProviders from '@/screens/Admin/AdminProviders'
import AdminUsers from '@/screens/Admin/AdminUsers'
import AdminRequests from '@/screens/Admin/AdminRequests'

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='requests' element={<AdminRequests />} />
          <Route path='providers' element={<AdminProviders />} />
          <Route path='users' element={<AdminUsers />} />
        </Route>

    </Routes>
  )
}

export default AdminRoutes