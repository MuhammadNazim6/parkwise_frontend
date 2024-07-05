import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'
import { useFetchBookingDetailsMutation } from '@/redux/slices/commonSlice'
import Lottie from 'lottie-react'
import { useSelector } from 'react-redux'
import { useToast } from "@/components/ui/use-toast"
import { RootState } from '@/redux/store'
import { useFetchParkingLotsBookingsMutation } from '@/redux/slices/providerSlice'
import ProvBookingDetailsAnim from '../../assets/Animation/ProvBookingDetailsAnim.json'
import noBookingsIng from '../../assets/Images/noBookingsIng.png'
import { motion } from "framer-motion"


function ProvBookings() {

  const [fetchBookingDetails] = useFetchBookingDetailsMutation()
  const { isOpen, onOpen: openBookingDetailsModal, onClose } = useDisclosure()
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 770);
  const [bookings, setBookings] = useState(null);
  const { providerInfo } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast()
  const [fetchBookingsOfLot] = useFetchParkingLotsBookingsMutation()

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 770);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchBookingsOfParkingLot()
  }, [])

  const fetchBookingsOfParkingLot = async () => {
    const response = await fetchBookingsOfLot(providerInfo.id).unwrap()
    if (response.success) {
      console.log(response.data)
      setBookings(response.data)
    } else {
      toast({
        variant: "destructive",
        title: "There was a problem loading the bookings",
        description: "An error occured.",
      })
    }
  }

  const [bookingDetails, setBookingDetails] = useState(null)

  const handleDetailsModal = async (id) => {
    const details = await fetchBookingDetails(id).unwrap()
    setBookingDetails(details.data[0])
    openBookingDetailsModal()
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.1, duration: 0.2, ease: 'easeIn' }
      }}  className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg h-screen">
          <div className="flex items-center p-5 w-full h-12 text-sm">
            <div className="text-gray-700 font-semibold  w-1/3 md:w-1/4 lg:w-1/5 p-1 text-center">Date</div>
            <div className="text-gray-700 font-semibold  w-1/3 md:w-1/4 lg:w-1/5 p-1 text-center">Slots</div>
            <div className="text-gray-700 font-semibold  w-1/3 md:w-1/4 lg:w-1/5 p-1 text-center">Amount</div>
            <div className="text-gray-700 font-semibold  w-1/5 p-1 text-center hidden lg:block">User</div>
            <div className="text-gray-700 font-semibold  w-1/4 md:w-1/4 lg:w-1/5 p-1 text-center hidden md:block">Details</div>
          </div>
          {(bookings && bookings.length)? (
            bookings.map((booking) => (
            <div key={booking._id} className="flex bg-gray-100 w-full">
              <div className="flex-grow">
                <div className={`shadow-sm rounded-md p-4 mt-2 cursor-pointe`} onClick={isSmallScreen ? () => { handleDetailsModal(booking._id) } : null}>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-gray-700 font-semibold p-1 w-1/3 md:w-1/4 lg:w-1/5 text-sm text-center">{new Date(booking.bookingDate).toLocaleDateString()}</div>
                    <div className="text-gray-700 font-semibold p-1 w-1/3 md:w-1/4 lg:w-1/5 text-sm text-center">{booking.selectedSlots.length}</div>
                    <div className="text-gray-700 font-semibold p-1 w-1/3 md:w-1/4 lg:w-1/5 text-sm text-center">{booking.amount}</div>
                    <div className="text-md text-gray-700 font-semibold p-1 w-1/5 hidden lg:block text-center">{booking.user.name}</div>
                    <div className="text-sm text-gray-700 p-1 md:w-1/4 lg:w-1/5 transition-transform hover:text-gray-500 hover:scale-[1.007] ease-in-out duration-300 hidden md:block text-center" onClick={() => { handleDetailsModal(booking._id) }}>
                    <span className='bg-blue-400 p-2 rounded-md text-white cursor-pointer'>View</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <img src={noBookingsIng} className='md:h-1/3 h-1/3 mt-[-200px]' />
            </div>
          )}
        </div>

        {bookingDetails && (<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={`${isSmallScreen ? `md` : `4xl`}`}>
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Booking details</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody>
              <div className="min-h-80 md:flex mt-8">
                <div className="h-1/2 md:w-1/2 bg-gray-100 m-2 rounded-md p-3">
                  <Lottie animationData={ProvBookingDetailsAnim} className='h-52' />
                  <div className="">
                    <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Name:</p>
                      <p className="text-gray-600 md:text-lg font-semibold">{bookingDetails.user.name}</p>
                    </div>
                    <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Mobile:</p>
                      <p className="text-gray-600 md:text-lg font-semibold">{bookingDetails.user.mobile}</p>
                    </div>
                    <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Email:</p>
                      <p className="text-gray-600 md:text-lg font-semibold">{bookingDetails.user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="h-1/2 md:w-1/2 bg-gray-100 m-2 rounded-md p-3">
                  <div className="m-2">
                    <div className="p-2 mb-3 pl-6 ring-gray-300 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Slots Count:</p>
                      <p className="text-gray-600 md:text-lg font-semibold">{bookingDetails.selectedSlots.length}</p>
                    </div>
                    <div className="p-2 mb-3 pl-6 ring-gray-300 bg-white shadow-md rounded-lg">
                      <p className=" text-sm text-gray-700">Services Used:</p>
                      <ul className="list-disc list-inside ml-4">
                        {Object.entries(bookingDetails.servicesUsed).map(([service, used], index) => (
                          <li key={index} className={used ? "text-blue-800 text-md" : "text-gray-500 text-md"}>
                            {service}: {used ? "Yes" : "No"}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2 mb-3 pl-6 ring-gray-300 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Booking Date:</p>
                      <p className="text-gray-600 font-semibold md:text-lg">{new Date(bookingDetails.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <div className="p-2 mb-3 pl-6 ring-gray-300 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Booked On:</p>
                      <p className="text-gray-600 font-semibold md:text-lg">{new Date(bookingDetails.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="p-2 mb-3 pl-6 ring-gray-300 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Amount:</p>
                      <p className="text-gray-600 font-semibold md:text-lg">{bookingDetails.amount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>)}
      </motion.div>
    </>
  )
}

export default ProvBookings