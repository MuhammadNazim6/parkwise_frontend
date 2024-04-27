import React from 'react';
import Navbar from '../../components/User/Navbar';
import { PiFunnelSimpleBold } from "react-icons/pi";

function FindSpots() {
  return (
    <>
      <Navbar />
      <div className=" bg-black flex h-80">
        <div className="bg-green-400 w-1/2 text-center ">
          <div className="">
            <input type="text" className='bg-orange-600 w-2/3 h-10 p-2 mt-7 text-lg rounded-l-lg' placeholder='Search for available parking lots...' />
            <button className='bg-secondary-blue text-white p-2 rounded-r-lg h-10 w-auto'><PiFunnelSimpleBold /></button>
          </div>

          <div className="flex justify-end pr-24">
            <button className='bg-secondary-blue text-white rounded-lg  h-10 mt-7 w-auto p-2'>Show nearby spots</button>
          </div>
        </div>
        <div className="bg-yellow-300 w-1/2">
          HEy
        </div>
      </div>
    </>
  )
}

export default FindSpots