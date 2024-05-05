import React from 'react'
import ProvNavbar from '@/components/Provider/ProvNavbar'
import Sidebar from '@/components/Provider/Sidebar'
import { Outlet } from 'react-router-dom'

function ProvSidebar() {
  return (
    <>
    <ProvNavbar/> 
    <Sidebar/>
    <Outlet/>
    </>
  )
}

export default ProvSidebar