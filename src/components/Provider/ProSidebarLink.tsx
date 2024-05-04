import React from 'react'

function ProSidebarLink(props) {
  return (
    <>
      <li className=''>
        <a className="flex mt-6 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          {props.Icon}
          <span className="ms-3">{props.title}</span>
        </a>
      </li>
    </>
  )
}

export default ProSidebarLink