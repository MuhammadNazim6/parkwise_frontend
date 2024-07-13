import React from 'react'
import ForgotPassForm from '../../components/Common/ForgotPassForm'
import AuthPageLeftContent from '@/components/User/AuthPageLeftContent'
import { Outlet } from 'react-router-dom'

function CommonLeftSideLayout() {
  return (
    <div className='flex w-full h-screen lg:bg-primary-blue'>
      <AuthPageLeftContent />
      <div className="w-full flex items-center justify-center lg:w-1/2 md:bg-white m-2 mr-0 rounded-l-3xl overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default CommonLeftSideLayout