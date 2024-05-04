import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

interface iType {
  auth: {
      uLoggedIn: boolean
  }
}


function UserProtect() {

  const {uLoggedIn}=useSelector((state: iType)=>state.auth)

  return (
    uLoggedIn?<Outlet/> : <Navigate to='' replace/>
  )
}

export default UserProtect