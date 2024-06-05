import React, { useEffect, useState } from 'react'
import profileImage from '../../../src/assets/Images/Plogo.png'
import { RiImageEditLine } from "react-icons/ri";
import { useGetProviderDetailsMutation } from '@/redux/slices/providerSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Loader } from '@/components/Common/BootstrapElems';
import ProEditProfileModal from '@/components/Provider/ProEditProfileModal';


function ProvParkingLot() {
  const { providerInfo } = useSelector((state: RootState) => state.auth);
  const [providerDetails, setProviderDetails] = useState(null)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)


  const [getDetails] = useGetProviderDetailsMutation()
  useEffect(() => {
    fetchPRoviderDetails();
  }, [])

  const fetchPRoviderDetails = async () => {
    const response = await getDetails(providerInfo.id).unwrap()
    if (response.success) {
      console.log(response.data);
      
      setProviderDetails(response.data)
    }
  }
  return (
    <>

      {providerDetails && providerDetails.approvalStatus === 'true' ? (
        <div className="p-4 sm:ml-64 h-full">
          <div className="p-2 border-2 min-h-screen border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex justify-center items-center">
            <div className="h-auto bg-[#b0c8d0] w-full max-w-3xl m-16 shadow-2xl rounded-lg relative flex items-center justify-center p-8">
              <div className="space-y-6 mt-8 w-full">
                <div className="flex flex-col sm:flex-row items-start justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Address:</span>
                  <div className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">
                    <p>{providerDetails.address.buildingOrAreaName}</p>
                    <p>{providerDetails.address.street}</p>
                    <p>{providerDetails.address.pinNumber}</p>
                    <p>{providerDetails.address.city}</p>
                    <p>{providerDetails.address.state}, {providerDetails.address.country}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Number of slots:</span>
                  <span className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">{providerDetails.availableSpace}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Air pressure check:</span>
                  <span className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">{providerDetails.airPressureCheckPrice ? providerDetails.airPressureCheckPrice : 'nil'}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Water service:</span>
                  <span className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">{providerDetails.waterServicePrice ? providerDetails.waterServicePrice : 'nil'}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">EV charging:</span>
                  <span className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">{providerDetails.evChargeFacilityPrice ? providerDetails.evChargeFacilityPrice : 'nil'}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Phone Number:</span>
                  <span className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">{providerDetails.mobile}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="block text-gray-700 font-medium">Images</span>
                  <div className="flex flex-wrap justify-start">
                    {providerDetails.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Provider image ${index + 1}`}
                        className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 m-2 rounded-sm object-cover"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button type='button' className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 m-2 w-32 rounded flex items-center justify-around transition-colors duration-300">
                    <RiImageEditLine className="text-xl" /> Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : null}
    </>
  )
}

export default ProvParkingLot