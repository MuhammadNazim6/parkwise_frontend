import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-transparent.png";
import { Button } from "@/components/ui/button"
import { FaPowerOff } from "react-icons/fa6";
import { useProviderLogoutMutation } from '@/redux/slices/providerSlice';
import { providerLogout } from '@/redux/slices/authSlice';

import { useDispatch } from 'react-redux';


const ProvNavbar = () => {

  const [logout] = useProviderLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const res = await logout();
    dispatch(providerLogout())
    navigate('/')

  }

  return (
   <div className="flex justify-end sticky top-0">
     <div className=" bg-gray-50 w-full right-0 mx-6 text-white md:pl-14  rounded-lg h-16 flex justify-between">
      <div className="w-36 p-2">
        {/* <img src={LogoImg} /> */}
      </div>
      <div className="p-3">
        <Button className='bg-secondary-provider rounded-none' onClick={handleLogout}>Logout <FaPowerOff className='ml-2 ' /></Button>
      </div>
    </div>
   </div>
  )
}

export default ProvNavbar