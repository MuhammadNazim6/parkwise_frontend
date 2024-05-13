import React from 'react'
import AdminLayoutComponent from '@/components/Admin/AdminLayoutComponent'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <>
      <AdminLayoutComponent />
      <Outlet/>
    </>

  )
}

export default AdminLayout