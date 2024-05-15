import React, { useState } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BsEnvelopeArrowUp } from "react-icons/bs";
import { RiParkingBoxLine } from "react-icons/ri";
import { PiUsersThree } from "react-icons/pi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAdminLogoutMutation } from '@/redux/slices/adminSlice';
import { adminLogout } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
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


function AdminLayoutComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoutAdmin] = useAdminLogoutMutation()
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await logoutAdmin().unwrap();
    dispatch(adminLogout())
    navigate('/')

  }
  const activeStyle = {
    backgroundColor: "#272925",
    color: "white ",
  };

  return (
    <div className="drawer sticky top-0 z-10">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" checked={isSidebarOpen} />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        {/* BBC3A4 */}
        <div className="w-full navbar bg-[#574476] text-white">
          <div className="flex-none">
            <label htmlFor="my-drawer-3" onClick={handleSidebarToggle} className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current stroke-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-lg">Parkwise Admin</div>
          <div className="flex-none hidden md:block">
            <span className='mr-16 flex items-center cursor-pointer'><span><RiLogoutBoxLine className='mr-2' /></span><span>
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
            </span></span>
          </div>
        </div>
      </div>
      <div className="drawer-side text-gray-300">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay" onClick={handleSidebarToggle}></label>
        <ul className="menu w-64 min-h-full bg-[#574476] text-lg ">
          <NavLink to='/admin' end style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={handleSidebarToggle} className='flex items-center p-4 mt-16 text-md cursor-pointer pl-12  rounded-md transition duration-300 ease-in-out hover:bg-[#4b3867] hover:text-gray-200'><span className='w-[100px]'>Dashboard</span><LuLayoutDashboard className='text-xl' /></NavLink>
          <NavLink to='/admin/requests' style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={handleSidebarToggle} className='flex items-center p-4  text-md  cursor-pointer pl-12 rounded-md transition duration-300 ease-in-out hover:bg-[#4b3867] hover:text-gray-200'><span className='w-[100px]'>Requests</span><BsEnvelopeArrowUp className='text-xl' /></NavLink>
          <NavLink to='/admin/providers' style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={handleSidebarToggle} className='flex items-center p-4  text-md  cursor-pointer pl-12 rounded-md transition duration-300 ease-in-out hover:bg-[#4b3867] hover:text-gray-200'><span className='w-[100px]'>Providers</span><RiParkingBoxLine className='text-2xl' /></NavLink>
          <NavLink to='/admin/users' style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={handleSidebarToggle} className='flex items-center p-4  text-md  cursor-pointer pl-12 rounded-md transition duration-300 ease-in-out hover:bg-[#4b3867] hover:text-gray-200'><span className='w-[100px]'>Users List</span><PiUsersThree className='text-2xl' /></NavLink>
        </ul>
      </div>
    </div>
  );
}

export default AdminLayoutComponent