import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../screens/Admin/AdminLogin'

function AdminRoutes() {
  return (
    <Routes>
      <Route path='' element={<AdminLogin/>} />
      <Route element>
  
      </Route>
    </Routes>
  )
}

export default AdminRoutes