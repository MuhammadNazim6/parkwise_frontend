import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-transparent.png";
import { Button } from "@/components/ui/button"
import { FaPowerOff } from "react-icons/fa6";
import { useProviderLogoutMutation } from '@/redux/slices/providerSlice';
import { providerLogout } from '@/redux/slices/authSlice';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
    <div className="flex justify-end sticky top-0 z-10">
      <div className=" bg-gray-50 w-full right-0 mx-6 text-white md:pl-14  rounded-lg h-16 flex justify-between">
        <div className="w-36 p-2">
          {/* <img src={LogoImg} /> */}
        </div>
        <div className="p-3">
          
          <AlertDialog>
              <AlertDialogTrigger>
              <Button className='bg-black rounded-md active:scale-[.98] active:duration-75 transition-all hover:scale-[1.025] ease-in-out'>Logout <FaPowerOff className='ml-2 ' /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction><span onClick={handleLogout}>Continue</span></AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export default ProvNavbar