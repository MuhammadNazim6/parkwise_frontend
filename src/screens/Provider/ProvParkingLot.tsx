import React, { useEffect, useState } from 'react'
import profileImage from '../../../src/assets/Images/Plogo.png'
import { RiImageEditLine } from "react-icons/ri";
import { useGetProviderDetailsMutation } from '@/redux/slices/providerSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


function ProvParkingLot() {
  const { providerInfo } = useSelector((state: RootState) => state.auth);
  const [providerDetails, setProviderDetails] = useState(null)


  const [getDetails] = useGetProviderDetailsMutation()
  useEffect(() => {
    fetchPRoviderDetails();
  }, [])

  const fetchPRoviderDetails = async () => {
    const response = await getDetails(providerInfo.id).unwrap()
    if (response.success) {
      setProviderDetails(response.data)
    }

  }
  return (
    <>
      <div className="p-4 sm:ml-64 h-full">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-screen flex justify-items-center">
          <div className="h-auto bg-[#b1d4e1] w-full m-16 shadow-2xl rounded-lg relative flex items-center justify-center">
            <div className="absolute -top-12 w-32 h-32 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-400 hover:brightness-75 transition duration-300 ease-in-out cursor-pointer">
              <img src={profileImage} alt='profile IMage' className='w-full h-full object-cover relative contrast-10 ' />
              <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 ">
                <button type='button' className="bg-gray-600 text-white px-2 py-1 ml-2 rounded"><RiImageEditLine /></button>
              </div>
            </div>

            <div className="space-y-4 mt-16">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="block text-gray-700 font-medium">Name:</span>
                {/* <span className="block text-gray-900">John Doe</span> */}
                <span className="block text-gray-900">{providerDetails.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="block text-gray-700 font-medium">Email:</span>
                {/* <span className="block text-gray-900">john.doe@example.com</span> */}
                <span className="block text-gray-900">{providerDetails.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="block text-gray-700 font-medium">Password:</span>
                <span className="block text-gray-900">••••••••</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="block text-gray-700 font-medium">Phone Number:</span>
                {/* <span className="block text-gray-900">+123 456 7890</span> */}
                <span className="block text-gray-900">{providerDetails.mobile}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="block text-gray-700 font-medium">Address:</span>
                <div className="block text-gray-900">
                  <p>Street Address 1</p>
                  <p>Street Address 2</p>
                  <p>City, State, ZIP</p>
                  <p>Country</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ProvParkingLot