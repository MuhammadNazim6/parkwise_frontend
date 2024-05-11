import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'

function ProSidebarLink(props) {

  const activeStyle = {
    backgroundColor: "#0F1015",
    color: "white ",
  };


  return (
    <>
      <li>
        <NavLink to={props.link} end className="flex items-center p-5 text-[#d1cdcd] rounded-lg dark:text-[#5F7093]  dark:hover:bg-gray-700 group"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          {props.Icon}
          <span className="ms-3">{props.title}</span>
        </NavLink>
      </li>
    </>
  )
}

export default ProSidebarLink