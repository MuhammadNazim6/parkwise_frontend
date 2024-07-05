import React, { useEffect, useState, useCallback } from 'react'
import { useGetRequestsMutation, useAcceptReqMutation, useRejectReqMutation } from '@/redux/slices/adminSlice'
import AdminRequestModal from '@/components/Admin/AdminRequestModal';
import toast from 'react-hot-toast';
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import Lottie from 'lottie-react'
import adminLoader from '../../assets/Animation/adminLoader.json'


function AdminRequests() {
  const [getRequests, { isLoading }] = useGetRequestsMutation()
  const [acceptRequest] = useAcceptReqMutation()
  const [rejectRequest] = useRejectReqMutation()
  const [requests, setRequests] = useState([]);
  const [selectedLot, setSelectedLot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLatest, setShowLatest] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const requestsData = await getRequests().unwrap();
      setRequests(requestsData.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }, [getRequests])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const acceptRequestFn = useCallback(async (lotId) => {
    const acceptedResponse = await acceptRequest({ id: lotId }).unwrap();
    if (acceptedResponse.success) {
      toast('Provider Request Accepted', {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setIsModalOpen(false);
      fetchData();
    }
  }, [fetchData, setIsModalOpen]);

  const rejectRequestFn = useCallback(async (lotId) => {
    const rejectedResponse = await rejectRequest({ id: lotId }).unwrap();
    if (rejectedResponse.success) {
      toast('Provider Request Rejected', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setIsModalOpen(false);
      fetchData();
    }
  }, [fetchData, setIsModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openModal = (lot) => {
    setSelectedLot(lot)
    setIsModalOpen(true)
  }

  const handleShowLatest = () => {
    setShowLatest((prev) => !prev)
    let data = requests.reverse();
    setRequests(data)
  }
  const reversedRequests = showLatest ? [...requests] : [...requests].reverse();
  const currentDate = new Date();


  return (
    <div className=" flex items-center justify-center bg-gray-100 pt-4">
      <div className="h-full md:w-2/3 w-full p-5">
        <p className='sm:text-2xl md:text-3xl text-lg text-center md:m-4 text-black font-bold p-3'>Parking Provider Requests</p>
        <div className="flex bg-gray-100 min-h-screen">
          <div className="flex-grow md:w-2/3">

            {showLatest ? (
              <div onClick={() => setShowLatest((prev) => !prev)} className="flex justify-end items-center cursor-pointer hover:scale-[1.0003] hover:text-gray-800"><FaSortAmountDown /> <span className='ml-2'>Show oldest</span></div>
            ) : (
              <div onClick={() => setShowLatest((prev) => !prev)} className="flex justify-end items-center cursor-pointer hover:scale-[1.0003] hover:text-gray-800"><FaSortAmountUp /> <span className='ml-2'>Show latest</span></div>
            )}

            {!isLoading ? (reversedRequests.length > 0 ? (reversedRequests.map((lot) => (
              <div>
                <div key={lot._id} onClick={() => openModal(lot)}
                  className="bg-white shadow-lg rounded-md p-4 mt-4 cursor-pointer transition-transform hover:scale-[1.003] ease-in-out duration-300">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg"><span>Name: </span>{lot.parkingName}</div>
                    <div className="text-gray-500 text-sm w-20">
                      {new Date(lot.requestDate).getDate() === currentDate.getDate()
                        ? new Date(lot.requestDate).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })
                        : new Date(lot.requestDate).toLocaleDateString() + ` ` + new Date(lot.requestDate).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}
                    </div>
                  </div>
                  <div className="text-md text-gray-700 mt-2"><span className='font-bold'>Available Slots: </span> {lot.availableSpace}</div>
                  <div className="flex space-x-1">
                    <div className="text-gray-500 mt-2">{lot.addressId.street},</div>
                    <div className="text-gray-500 mt-2">{lot.addressId.city},</div>
                    <div className="text-gray-500 mt-2">{lot.addressId.pinNumber}</div>
                    {/* <div className="text-gray-500 mt-2">{lot.addressId.landmark},</div>
                    <div className="text-gray-500 mt-2">{lot.addressId.state},</div>
                    <div className="text-gray-500 mt-2">{lot.addressId.country}</div> */}
                  </div>
                </div>



              </div>
            ))) : (<div className="flex bg-gray-100 justify-center items-center h-96">
              <div className="text-gray-400 text-xl">No Requests found</div>
            </div>)) :
              (
                <div className="flex justify-center items-center mt-14">
                  <Lottie animationData={adminLoader} className='w-[450px]'/>
                </div>
              )}
            <AdminRequestModal
              isOpen={isModalOpen}
              onClose={closeModal}
              selectedLot={selectedLot}
              acceptRequestFn={acceptRequestFn}
              rejectRequestFn={rejectRequestFn}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminRequests