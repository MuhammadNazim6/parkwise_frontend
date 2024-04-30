import React from 'react'
import LogoImg from '../../assets/Images/parkwise-high-resolution-logo-transparent.png'
import ForgotPassForm from '../../components/Common/ForgotPassForm'

function ForgotPassword() {
  return (
    <div className='flex w-full h-screen lg:bg-primary-blue'>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div className="flex flex-col">
          <div className="p-32">
            <h1 className='text-4xl text-center leading-normal'>"Navigate effortlessly, park confidently."</h1>
          </div>
          <div className="m-10 ml-28">
            <img src={LogoImg} className='w-full md:w-96 max-w-full md:max-w-96 ml-0 md:ml-16' />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white m-2 mr-0 rounded-l-3xl overflow-hidden">
        <ForgotPassForm />
      </div>
    </div>
  )
}

export default ForgotPassword