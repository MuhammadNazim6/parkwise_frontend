import React, { useState, useEffect } from 'react'
import { MdDashboard } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import ProSidebarLink from './ProSidebarLink';
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IoBookmarks } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { PiChatText } from "react-icons/pi";
import { BsFillChatTextFill } from "react-icons/bs";



function Sidebar() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 643) {
        closeSidebar();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { providerInfo } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">

        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? '' : '-translate-x-full sm:translate-x-0'}`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto glass bg-primary-provider ">
          <div className="flex justify-end h-12">
            <button className='sm:hidden' onClick={toggleSidebar}><IoIosArrowBack className='text-3xl text-white' /></button>
          </div>
          <ul className="space-y-2 font-medium">
            <ProSidebarLink link='/provider' title='Dashboard' Icon={<MdDashboard className='text-2xl text-white' />} />
            {providerInfo.approvalStatus != 'true' ? (<ProSidebarLink link='/provider/add-slots' title='Add slots' Icon={<MdAddBox className='text-2xl text-white' />} />)
              : (<ProSidebarLink link='/provider/parking-lot' title='Parking lot' Icon={<FaParking className='text-2xl text-white' />} />)}
            <ProSidebarLink link='/provider/profile' title='Profile' Icon={<ImProfile className='text-2xl text-white' />} />
            <ProSidebarLink link='/provider/chats' title='Chats' Icon={<BsFillChatTextFill className='text-2xl text-white' />} />
            <ProSidebarLink link='/provider/feedbacks' title='Feedbacks' Icon={<MdFeedback className='text-2xl text-white' />} />
            <ProSidebarLink link='/provider/bookings' title='Bookings' Icon={<IoBookmarks className='text-lg text-white' />} />
          </ul>
        </div>
      </aside>


    </>
  )
}

export default Sidebar