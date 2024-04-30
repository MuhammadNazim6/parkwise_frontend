import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login_Admin from '../screens/Admin/Login_Admin'

function AdminRoutes() {
  return (
    <Routes>
      <Route path='' element={<Login_Admin/>} />
      <Route element>
       
      </Route>
    </Routes>
  )
}

export default AdminRoutes