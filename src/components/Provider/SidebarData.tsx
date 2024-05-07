import React from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuParkingSquare } from "react-icons/lu";
import { PiChatTeardropDots } from "react-icons/pi";
import { MdOutlineFeedback } from "react-icons/md";


export const SidebarData = [
  {
    title:"Dashboard",
    icon:<MdOutlineSpaceDashboard />,
    link:"/"
  },
  {
    title:"Add slots",
    icon:<IoAddCircleOutline />,
    link:"/add-slots"
  },
  {
    title:"Parking Lot",
    icon:<LuParkingSquare />,
    link:"/parking-lot"
  },
  {
    title:"Chats",
    icon:<PiChatTeardropDots />,
    link:"/chats"
  },
  {
    title:"Feedbacks",
    icon:<MdOutlineFeedback />,
    link:"/feedbacks"
  },
]

