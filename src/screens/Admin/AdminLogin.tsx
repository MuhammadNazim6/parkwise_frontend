import React, { useState } from 'react';
import LoginForm from '../../components/Admin/LoginForm';
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-white-transparent.png";


interface MyComponentProps {
  toggleFn: () => void;
  togglePasswordFn: () => void;
}
function AdminLogin() {

  return (
    <div className='flex w-full h-screen lg:bg-primary-admin'>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div className="flex flex-col">
          <div className="p-32">
            <h1 className='text-4xl text-center text-white leading-normal'>"Together, we pave the way for hassle-free parking."
            </h1> 
          </div>
          <div className="m-10 ml-28">
            <img src={LogoImg} className='w-full md:w-96 max-w-full md:max-w-96 ml-0 md:ml-16' />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white m-2 mr-0 rounded-l-3xl overflow-hidden">
        <LoginForm />
      </div>
    </div>
  )
}

export default AdminLogin