import React from 'react'

function AdminProviders() {
  return (
    <div className="flex items-center justify-center bg-gray-100  pt-4">
    <div className="h-full sm:w-2/3">
      <p className='sm:text-2xl md:text-3xl text-lg text-center md:m-4 text-black font-bold p-3'>Providers list</p>
      <div className="flex bg-gray-100 h-screen ">
        <div className="flex-grow md:w-2/3">
          <div className="bg-white shadow-lg rounded-md p-4 mt-3 cursor-pointer transition-transform hover:scale-[1.002] ease-in-out duration-300">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg">Suresh Sabith</div>
              <div className="text-gray-500 text-sm">
                <button className='bg-red-800 text-white md:p-2 md:px-5 rounded-sm hover:bg-[#8e1e1e] transition-transform ease-in-out'>Block</button>
              </div>
            </div>
            <div className="text-sm text-gray-700 mt-2">sabithmuhammad@gmail.com</div>
            {/* <div className="text-xs text-gray-500 mt-2">Address City state country world galaxy</div> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminProviders