import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-transparent.png";
import LogoImgBlack from "../../assets/Images/parkwise-high-resolution-logo-black-transparent.png";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useLogoutMutation } from '../../redux/slices/userApiSlice';
import { userLogout } from '../../redux/slices/authSlice';
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
import { RootState } from '@/redux/store';


function Navbar() {


  const [nav, setNav] = useState(true)
  const handleNav = () => {
    setNav(!nav)
  }
  const { userInfo } = useSelector((state:RootState) => state.auth)
  const [logout, { isLoading }] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    const res = await logout(null);
    if (res) {
      dispatch(userLogout())
      setNav(!nav)
      navigate('/')
    }

  }
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4  text-black'>
      <h1 className='w-full text-3xl font-bold'><img className='w-40 cursor-pointer' src={LogoImg} /></h1>
      <ul className='hidden md:flex'>
        <Link to='/'>
          <li className='p-4 cursor-pointer text-md w-28 '>Home</li>
        </Link>
        <Link to='/user/find'>
          <li className='p-4 cursor-pointer text-md w-32'>Find spots</li>
        </Link>
        <Link to='/about'>
          <li className='p-4 ml-3 cursor-pointer text-md w-28'>About</li>
        </Link>
        {userInfo ? (
          <AlertDialog>
            <AlertDialogTrigger>   <li className='text-md w-28' >Logout </li>
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
        ) : (<Link to='/login'>
          <li className='p-4 cursor-pointer text-md w-28'>Signin</li>
        </Link>)}
        <Link className='bg-transparent text-black w-48 p-1 border-primary-blue border-2 font-semibold rounded-md flex justify-center items-center tracking-normal hover:bg-primary-blue transition duration-300 ease-in-out transform hover:shadow-lg ' to='/provider/signup'>
          <button className=''>
            List your property
          </button>
        </Link>


      </ul>
      <div onClick={handleNav} className='block md:hidden '>
        {!nav ? <AiOutlineClose size={25} className='cursor-pointer' /> : <AiOutlineMenu size={25} className='cursor-pointer' />}
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[70%] h-full border-r bg-white ease-in-out duration-500  md:hidden z-20' : 'fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-primary-blue ease-in-out duration-700 z-20'}>
        {/* <h1 className='w-full text-3xl font-bold m-8 text-white'><img className='w-40 cursor-pointer' src={LogoImgBlack} /></h1> */}

        <ul className='uppercase p-4'>
          <li className='p-4 mt-6'><Link to="/">Home</Link></li>
          <li className='p-4 border-t-2'><Link to="/find_spots">Find spots</Link></li>
          <li className='p-4 border-t-2'><Link to="/about">About</Link></li>
          <li className='p-4 border-t-2'>{userInfo ? (
            <AlertDialog>
              <AlertDialogTrigger>Logout</AlertDialogTrigger>
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
          ) : (<Link to="/login">Signin</Link>)}</li>
          <li className='p-4 border-t-2 capitalize'><Link to="/provider/signup">List your property</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar