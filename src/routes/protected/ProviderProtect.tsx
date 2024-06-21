import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

interface iType {
  auth: {
      pLoggedIn: boolean
  }
}


function ProviderProtect() {

  const {pLoggedIn}=useSelector((state: iType)=>state.auth)

  return (
    pLoggedIn?<Outlet/> : <Navigate to='/login' replace/>
  )
}

export default ProviderProtect