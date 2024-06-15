import React, { useEffect, useState } from 'react'
import { useGetProviderDetailsMutation } from '@/redux/slices/providerSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Loader } from '@/components/Common/BootstrapElems';
import ProEditProfileModal from '@/components/Provider/ProEditProfileModal';
import { useDisclosure } from '@chakra-ui/react'
import ProvChangePassModal from './ProvChangePassModal';

function ProvProfile() {
  const { providerInfo } = useSelector((state: RootState) => state.auth);
  const [providerDetails, setProviderDetails] = useState(null)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const { isOpen: isPassChangeModalOpen, onOpen: openPassChangeModal, onClose: closePassChangeModal } = useDisclosure()


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

  const toggleEditProfileModal = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
  };

  return (
    <>
      <div className="p-4 sm:ml-64 h-full rounded-sm ">
        <div className="p-2 border-2 h-full border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex justify-center items-center">
          <div className="h-auto bg-gray-100 w-full max-w-3xl m-16 shadow-2xl rounded-lg relative flex items-center justify-center p-8">
            {providerDetails ? (
              <>
                <div className="absolute right-5 top-3 h-12 bg-gray-100 overflow-hidden transition duration-300 ease-in-out cursor-pointer">
                  <p className='text-black hover:text-gray-500' onClick={openPassChangeModal}>Change password</p>

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
                    <span className="block text-gray-700 font-medium">Mobile:</span>
                    <span className="block text-gray-900 border border-gray-300 p-2 rounded-md w-full sm:w-3/4 bg-gray-50">{providerDetails.mobile}</span>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button type='button'
                      className="bg-primary-provider hover:bg-secondary-provider text-sm  text-white font-semibold p-2 m-2 w-32 rounded flex items-center justify-around transition-colors duration-300"
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
      <ProvChangePassModal isOpen={isPassChangeModalOpen} onClose={closePassChangeModal} providerId={providerInfo.id} provEmail={providerInfo.email}/>
    </>
  )
}

export default ProvProfile