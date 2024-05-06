import React from 'react'
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-transparent.png";

function AuthPageLeftContent() {
  return (
    <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div className="flex flex-col">
          <div className="p-32">
            <h1 className='text-4xl text-center leading-normal'>"Navigate effortlessly, park confidently."</h1> :
          </div>
          <div className="m-10 ml-28">
            <img src={LogoImg} className='w-full md:w-96 max-w-full md:max-w-96 ml-0 md:ml-16' />
          </div>
        </div>
      </div>
  )
}

export default AuthPageLeftContent