import React from 'react'

function Collapse({ title, children }) {
  return (
    <div className="border border-gray-300 rounded-md mt-4">
      <div className="flex justify-between items-center p-4 cursor-pointer">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-gray-500">▼</div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function AdminRequests() {
  return (
    <div className=" flex items-center justify-center bg-gray-100  pt-4">
      <div className="h-full md:w-2/3">
        <p className='sm:text-2xl md:text-3xl text-lg text-center md:m-4 text-black font-bold p-3'>Parking Provider Requests</p>

        <div className="flex bg-gray-100 h-screen ">
          <div className="flex-grow md:w-2/3">
            
            <div className="bg-white shadow-lg rounded-md p-4 mt-4 cursor-pointer transition-transform hover:scale-[1.006] ease-in-out duration-300">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Parking lot name here</div>
                <div className="text-gray-500 text-sm">12:30 PM</div>
              </div>
              <div className="text-sm text-gray-700 mt-2">Number of slots</div>
              <div className="text-xs text-gray-500 mt-2">Address City state country world galaxy</div>
            </div>
            <div className="bg-white shadow-lg rounded-md p-4 mt-4 cursor-pointer transition-transform hover:scale-[1.006] ease-in-out duration-300">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Parking lot name here</div>
                <div className="text-gray-500 text-sm">12:30 PM</div>
              </div>
              <div className="text-sm text-gray-700 mt-2">Number of slots</div>
              <div className="text-xs text-gray-500 mt-2">Address City state country world galaxy</div>
            </div>
            <div className="bg-white shadow-lg rounded-md p-4 mt-4 cursor-pointer transition-transform hover:scale-[1.006] ease-in-out duration-300">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Parking lot name here</div>
                <div className="text-gray-500 text-sm">12:30 PM</div>
              </div>
              <div className="text-sm text-gray-700 mt-2">Number of slots</div>
              <div className="text-xs text-gray-500 mt-2">Address City state country world galaxy</div>
            </div>
         
           
          </div>
        </div>


      </div>
    </div>
  )
}

export default AdminRequests