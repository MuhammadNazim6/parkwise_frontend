import React, { useEffect, useState } from 'react'
import { RiImageEditLine } from "react-icons/ri";
import { useGetProviderDetailsMutation } from '@/redux/slices/providerSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Loader } from '@/components/Common/BootstrapElems';
import ProEditProfileModal from '@/components/Provider/ProEditProfileModal';



function ProvProfile() {
  const { providerInfo } = useSelector((state: RootState) => state.auth);
  const [providerDetails, setProviderDetails] = useState(null)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)


  const [getDetails] = useGetProviderDetailsMutation()
  useEffect(() => {
    fetchPRoviderDetails();
  }, [])

  const fetchPRoviderDetails = async () => {
    const response = await getDetails(providerInfo._id).unwrap()
    if (response.success) {
      setProviderDetails(response.data)
    }
  }

  const toggleEditProfileModal = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
  };

  return (
    <>
      <div className="p-4 sm:ml-64 h-full">
        <div className="p-2 border-2 min-h-screen border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex justify-center items-center">
          <div className="h-auto bg-[#b0c8d0] w-full max-w-3xl m-16 shadow-2xl rounded-lg relative flex items-center justify-center p-8">
            {providerDetails ? (
              <>
                <div className="absolute -top-12 w-32 h-32 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-400 hover:brightness-75 transition duration-300 ease-in-out cursor-pointer">
                  <img src={providerDetails.images[0]} alt='profile image' className='w-full h-full object-cover relative contrast-10' />
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button type='button' className="bg-gray-600 text-white px-2 py-1 ml-2 rounded">
                      <RiImageEditLine />
                    </button>
                  </div>
                </div>
                <div className="space-y-6 mt-16 w-full">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className="block text-gray-700 font-medium">Name:</span>
                    <span className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">{providerDetails.name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className="block text-gray-700 font-medium">Email:</span>
                    <span className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">{providerDetails.email}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className="block text-gray-700 font-medium">Phone Number:</span>
                    <span className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">{providerDetails.mobile}</span>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button type='button'
                      className="bg-primary-provider hover:bg-secondary-provider text-white font-semibold p-2 m-2 w-32 rounded flex items-center justify-around transition-colors duration-300"
                      onClick={() => setIsEditProfileModalOpen((prev) => !prev)}>
                       Edit
                    </button>
                  </div>
                </div>
              </>
            ) : <Loader />}
          </div>
        </div>
      </div>

      <ProEditProfileModal isOpen={isEditProfileModalOpen} onClose={toggleEditProfileModal} profileDetails={providerDetails} setProviderDetails={setProviderDetails} />

    </>
  )
}

export default ProvProfile