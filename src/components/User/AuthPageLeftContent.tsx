import React from 'react'
import LogoImg from "../../assets/Images/WhatsApp_Image_2024-05-07_at_20.13.27_bb0ad381-removebg-preview.png";
import Lottie from 'lottie-react';
import carParkingAnim from '../../assets/Animation/carParkingAnim.json'

function AuthPageLeftContent() {
  return (
    <div className="hidden lg:flex h-full w-1/2 items-center  justify-center">
        {/* <div className="flex flex-col">
          <div className="p-32">
            <h1 className='text-4xl text-center leading-normal'>"Navigate effortlessly, park confidently."</h1> :
          </div> */}
          <div className="w-1/2">
            <img src={LogoImg} className='' />
            {/* <Lottie animationData={carParkingAnim} className='h-96' /> */}

            {/* w-full md:w-96 max-w-full md:max-w-96 ml-0 md:ml-16 */}
          </div>
        {/* </div> */}
      </div>
  )
}

export default AuthPageLeftContent