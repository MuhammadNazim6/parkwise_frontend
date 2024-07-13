import React, { useState } from 'react';
import SignupForm from '../../components/User/SignupForm';
import loginImg from "../../assets/Images/loginImg.png";


interface MyComponentProps {
  toggleFn: () => void;
  togglePasswordFn: () => void;
}
function UserSignup() {

  return (
    <div className='flex w-full h-screen lg:bg-primary-blue'>
      <div className="hidden lg:flex h-full w-1/2 items-center  justify-center">
      <div className="bg-back flex justify-center items-center">
        <img src={loginImg} className='w-4/5 h-4/5' />
      </div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-white m-2 mr-0 rounded-l-3xl overflow-hidden">
        <SignupForm />
      </div>
    </div>
  )
}

export default UserSignup