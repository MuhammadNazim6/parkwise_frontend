import React from 'react'
import ProvNavbar from '@/components/Provider/ProvNavbar'
import Sidebar from '@/components/Provider/Sidebar'
import ProDashboardContent from '@/components/Provider/ProDashboardContent'

function ProviderDashboard() {
  return (
    <>
    <ProvNavbar/> 
    <Sidebar/>
    <ProDashboardContent/>
    </>
  )
}

export default ProviderDashboard