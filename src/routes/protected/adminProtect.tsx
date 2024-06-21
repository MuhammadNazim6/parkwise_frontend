import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

interface iType {
  auth: {
    aLoggedIn: boolean
  }
}


function AdminProtect() {

  const { aLoggedIn } = useSelector((state: iType) => state.auth)

  return (
    aLoggedIn ? <Outlet /> : <Navigate to='/login' replace />
  )
}

export default AdminProtect