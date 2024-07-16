import React, { useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoImg from "../../assets/Images/parkwise-high-resolution-logo-transparent.png";
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
import { Loader } from '@/components/Common/BootstrapElems'

function Navbar() {

  const activeStyle = {
    color: "#6782fc",
    fontWeight: 500,
    fontSize: '17px'
  };

  const [nav, setNav] = useState(true)
  const toggleNav = () => {
    setNav(!nav)
  }
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    const res = await logout(null);
    navigate('/login')
    dispatch(userLogout())
    setNav(!nav)
    navigate('')
  }
  
  const handleNavRouting = (route)=>{
    navigate(route)
    toggleNav()
  }
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4  text-black'>
      <h1 className='w-full text-3xl font-bold'><img className='w-40 cursor-pointer' onClick={() => navigate('')} src={LogoImg} /></h1>
      <ul className='hidden md:flex'>
        <NavLink to='/' end style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <li className='p-4 cursor-pointer text-md w-28 '>Home</li>
        </NavLink>
        <NavLink to='/user/find' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <li className='p-4 cursor-pointer text-md w-32'>Find spots</li>
        </NavLink>
        {userInfo ? (<NavLink to='/user/profile' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <li className='p-4 ml-3 cursor-pointer text-md w-28'>Profile</li>
        </NavLink>) : null}
        {userInfo ? (<NavLink to='/user/chats' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <li className='p-4 ml-3 cursor-pointer text-md w-28'>Chats</li>
        </NavLink>) : null}

        {userInfo ? (
          <AlertDialog>
            <AlertDialogTrigger>  {isLoggingOut ? <div className="w-28 mt-1"><Loader /></div> : <li className='text-md w-28'>Logout </li>}
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
        ) : (<NavLink to='/login' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <li className='p-4 cursor-pointer text-md w-28'>Signin</li>
        </NavLink>)}
        <Link className='bg-transparent text-black w-48 p-1 border-primary-blue border-2 font-semibold rounded-md flex justify-center items-center tracking-normal hover:bg-primary-blue transition duration-300 ease-in-out transform hover:shadow-lg ' to='/provider/signup'>
          <button className=''>
            List your property
          </button>
        </Link>
      </ul>
      <div onClick={toggleNav} className='block md:hidden'>
        {!nav ? <AiOutlineClose size={25} className='cursor-pointer' /> : <AiOutlineMenu size={25} className='cursor-pointer' />}
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[70%] h-full border-r bg-white ease-in-out duration-500  md:hidden z-30 shadow-2xl' : 'fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-primary-blue ease-in-out duration-700 z-20'}>
        <ul className=' p-4'>
          <li  onClick={()=>handleNavRouting('/')} className='p-4'><NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/">Home</NavLink></li>
          <li  onClick={()=>handleNavRouting('/user/find')} className='p-4 border-t-2'><NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/user/find">Find spots</NavLink></li>
          {userInfo ? (<li  onClick={()=>handleNavRouting('/user/profile')} className='p-4 border-t-2'><NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/user/profile">Profile</NavLink></li>) : null}

          {userInfo ? (<li  onClick={()=>handleNavRouting('/user/chats')} className='p-4 border-t-2'><NavLink style={({ isActive }) => (isActive ? activeStyle : undefined)} to="/user/chats">Chats</NavLink></li>) : null}

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
      <div className={!nav ? 'h-screen w-[100%] fixed right-0 top-0 ease-in-out duration-1000 z-20 bg-black bg-opacity-35' : 'left-[10%] ease-in-out duration-1000'} onClick={toggleNav}>
      </div>
    </div>
  )
}

export default Navbar