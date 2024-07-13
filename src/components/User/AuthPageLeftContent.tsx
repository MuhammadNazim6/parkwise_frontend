import React from 'react'
import loginImg from "../../assets/Images/loginImg.png";


function AuthPageLeftContent() {
  return (
    <div className="hidden lg:flex h-full w-1/2 items-center justify-center">
      <div className="bg-back flex justify-center items-center">
        <img src={loginImg} className='w-4/5 h-4/5' />
      </div>
    </div>
  )
}

export default AuthPageLeftContent