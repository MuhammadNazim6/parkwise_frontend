import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import Lottie from 'lottie-react'
import { useToast } from "@/components/ui/use-toast"
import { useFetchUserBookingsMutation, useCancelBookingMutation, useGetFilledSlotsMutation, useRescheduleSlotsMutation } from '@/redux/slices/userApiSlice';
import resheduleAnim from '../../../assets/Animation/resheduleAnim.json'
import cancelledAnim from '../../../assets/Animation/cancelledAnim.json'
import { useFetchBookingDetailsMutation } from '@/redux/slices/commonSlice';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import noBookingsIng from '../../../assets/Images/noBookingsIng.png'


function BookingsListModal({ isOpen, onClose, userId, page, setPage }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 770);
  const [bookings, setBookings] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState('')
  const [fetchBookings, { isLoading }] = useFetchUserBookingsMutation()
  const [fetchBookingDetails] = useFetchBookingDetailsMutation()
  const [getBookedSlots] = useGetFilledSlotsMutation()
  const [cancelBooking] = useCancelBookingMutation()
  const [rescheduleSlots] = useRescheduleSlotsMutation()

  const [bookedSlotsOfParkingLot, setBookedSlotsOfParkingLot] = useState([])

  const [totalPages, setTotalPages] = useState(1)
  const slots = Array.from({ length: 24 }, (_, index) => `${1 + index}:00 `)
  const [selectedSlots, setSelectedSlots] = useState(new Set());

  const { toast } = useToast()
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 770);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    fetchBookingsOfUser()
  }, [page])

  const fetchBookingsOfUser = async () => {
    const data = {
      userId,
      page
    }
    const response = await fetchBookings(data).unwrap()

    if (response.success) {
      setBookings(response.data.bookings)
      setTotalPages(response.data.totalPages)
    } else {
      toast({
        variant: "destructive",
        title: "There was a problem loading the bookings",
        description: "An error occured.",
      })
    }
  }

  const formatDate = (dateStr) => {
    let bookingDate = new Date(dateStr);
    bookingDate.setDate(bookingDate.getDate() - 1)
    let newDateStr = bookingDate.toLocaleDateString()
    return newDateStr
  }

  const handleGetBookingDetails = async (bookingId) => {
    const details = await fetchBookingDetails(bookingId).unwrap()
    setBookingDetails(details.data[0])

    const response = await getBookedSlots(bookingId).unwrap()
    setBookedSlotsOfParkingLot(response.data)
  }

  const manageCloseOfModal = async () => {
    setBookingDetails(null)
    onClose()
  }

  const manageGoBack = async () => {
    setBookingDetails(null)
  }

  const manageCancelBooking = async (bookingId) => {
    const response = await cancelBooking(bookingId).unwrap()
    if (response.success) {
      toast({
        title: "Your booking has been cancelled",
        description: "Refund has been credited to your wallet",
      })
      fetchBookingsOfUser()
      manageCloseOfModal()

    } else {
      toast({
        variant: "destructive",
        title: "Your booking cannot be cancelled",
        description: "Reasons",
      })
    }
  }

  const handlePrevPageClick = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const handleNextPageClick = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  const handleSlotClick = (slot) => {
    const tempSelectedSlots = new Set(selectedSlots);
    if (tempSelectedSlots.has(slot)) {
      tempSelectedSlots.delete(slot)
    } else {
      if (tempSelectedSlots.size === bookingDetails.selectedSlots.length) {
        setError(`You can choose only ${bookingDetails.selectedSlots.length} slot.`)
        setTimeout(() => {
          setError('')
        }, 2000);
        return
      }
      tempSelectedSlots.add(slot)
    }
    setSelectedSlots(tempSelectedSlots);
  };

  const handleRescheduleSlots = async (bookingId) => {
    const data = {
      bookingId,
      slots: Array.from(selectedSlots)
    }
    const rescheduled = await rescheduleSlots(data).unwrap()
    if (rescheduled.success) {
      toast({
        title: "Your booking has been rescheduled.",
        description: ""
      })
      manageCloseOfModal()

    }
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={manageCloseOfModal} size={'6xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{bookingDetails ? 'Booking details' : 'Booking history'}</ModalHeader>
          <ModalBody className='min-h-96'>
            {bookingDetails ? (
              <div className="min-h-80 md:flex mt-8 items-center">
                <div className="md:w-1/2 w-full">
                  {bookingDetails.bookingStatus === 'cancelled' ? (
                    <div className="flex justify-center items-center p-5 m-3">
                      <div className="">
                        <Lottie animationData={cancelledAnim} className='h-36' />
                        <p className='text-red-900 mt-3'> Your Booking has been cancelled</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <Accordion allowToggle>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as='span' flex='1' textAlign='left'>
                                <div className="h-1/2 rounded-md flex justify-center transition duration-300 ease-in-out hover:bg-[#f5f4f48a] cursor-pointer">
                                  {/* <Lottie animationData={resheduleAnim} className='h-10' /> */}
                                  <p className='flex justify-center items-center cursor-pointer text-lg'>Reshedule Booking</p>
                                </div>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel className='h-96' pb={1}>
                            <p className='text-center'> Select {bookingDetails.selectedSlots.length} available slots</p>
                            <div className="grid grid-cols-6 text-[14px]  md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 m-3">
                              {
                                (slots.map((slot, idx) => {
                                  const hour = parseInt(slot.split(':')[0]);
                                  let isBooked = false;

                                  for (let i = 0; i < bookedSlotsOfParkingLot.length; i++) {
                                    if (hour === parseInt(bookedSlotsOfParkingLot[i].time.split('-')[0])) {
                                      isBooked = true
                                    }
                                  }

                                  return (
                                    <div
                                      key={idx}
                                      onClick={isBooked ? () => { console.log('Booked'); } : () => handleSlotClick(slot)}
                                      className={`h-12 rounded-md cursor-pointer flex items-center justify-center text-black shadow-xl  ring-1 ring-blue-400
                                    ${selectedSlots.has(slot) ? 'bg-secondary-blue active:scale-101 text-white' : isBooked ? 'bg-gray-400 cursor-not-allowed transition-transform ease-in-out active:animate-shake' : ' ring-1 ring-blue-400 active:scale-101'}`}
                                      aria-label={`Parking slot from ${slot}`}
                                      role="button"
                                      aria-disabled={isBooked}
                                    >
                                      {slot}
                                    </div>
                                  );
                                })
                                )}
                            </div>
                            <p className='text-red-700 text-center'>&nbsp;{error}</p>
                            <div className="flex justify-center mt-1">
                              <button className='btn btn-md bg-primary-blue' onClick={() => handleRescheduleSlots(bookingDetails._id)}>Update</button>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <h2>
                            <AccordionButton>
                              <Box as='span' flex='1' textAlign='left'>
                                <div className="h-1/2 rounded-md flex justify-center transition duration-300 ease-in-out hover:bg-[#f5f4f48a] cursor-pointer">
                                  <p className='flex justify-center items-center cursor-pointer text-lg'>Cancel booking</p>
                                </div>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel className='h-96' pb={4}>
                            <div className="text-center mt-10 text-lg"> Are you sure, cancel booking?</div>
                            <div className="flex justify-center space-x-5 mt-4">
                              <button type='button' onClick={onClose} className='bg-gray-500 hover:bg-gray-400 text-xs  text-white font-semibold p-2 m-1 w-20 rounded transition-colors duration-300'>
                                No
                              </button>
                              <button type='button' onClick={() => manageCancelBooking(bookingDetails._id)} className='bg-primary-provider hover:bg-secondary-provider text-xs  text-white font-semibold p-2 m-1 w-20 rounded transition-colors duration-300'>
                                Yes
                              </button>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}
                </div>
                <div className="h-1/2 md:w-1/2 bg-gray-100 m-2 rounded-md p-3">
                  <div className="m-2">
                    <div className="p-2 mb-3 pl-6 ring-gray-300 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Slots Count:</p>
                      <p className="text-gray-600 md:text-lg font-semibold">{bookingDetails.selectedSlots.length}</p>
                    </div>
                    <div className="p-2 mb-3 pl-6 ring-gray-300 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Slots:</p>
                      <p className="text-gray-600 md:text-lg font-semibold">{bookingDetails.selectedSlots.join(', ')}</p>
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
                      <p className="text-gray-600 font-semibold md:text-lg">{formatDate(bookingDetails.bookingDate)}</p>
                    </div>
                    <div className="p-2 mb-3 pl-6 ring-gray-300 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Booked On:</p>
                      <p className="text-gray-600 font-semibold md:text-lg">{formatDate(bookingDetails.createdAt)}</p>
                    </div>
                    <div className="p-2 mb-3 pl-6 ring-gray-300 bg-white shadow-md rounded-lg">
                      <p className="text-sm text-gray-700">Amount:</p>
                      <p className="text-gray-600 font-semibold md:text-lg">Rs {bookingDetails.amount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-2 border-2 min-h-[350px] border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                  <div className="flex items-center p-5 w-full h-12 text-sm">
                    <div className="text-gray-700 font-semibold  w-1/3 md:w-1/4 p-1 text-center">Date</div>
                    <div className="text-gray-700 font-semibold  w-1/3 md:w-1/4  p-1 text-center">Slots</div>
                    <div className="text-gray-700 font-semibold  w-1/3 md:w-1/4 p-1 text-center">Amount</div>
                    <div className="text-gray-700 font-semibold  w-1/4 md:w-1/4 p-1 text-center hidden md:block">Status</div>
                    <div className="text-gray-700 font-semibold  w-1/4 md:w-1/4 p-1 text-center hidden md:block">Details</div>
                  </div>

                  {bookings.length ? (
                    bookings.map((booking) => (
                      <div key={booking._id} className="flex bg-gray-100 w-full">
                        <div className="flex-grow">
                          <div className={`shadow-sm rounded-md p-4 mt-2 cursor-pointer`}
                            onClick={isSmallScreen ? () => { handleGetBookingDetails(booking._id) } : null}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="text-gray-700 font-semibold p-1 w-1/4 md:w-1/4 text-sm text-center">{formatDate(booking.bookingDate)}</div>
                              <div className="text-gray-700 font-semibold p-1 w-1/4 md:w-1/4 text-sm text-center">{booking.selectedSlots.length}</div>
                              <div className="text-gray-700 font-semibold p-1 w-1/4 md:w-1/4 text-sm text-center">{booking.amount}</div>
                              <div className={`text-gray-700 font-semibold p-1 w-1/4 md:w-1/4 text-sm text-center ${booking.bookingStatus === 'cancelled' ? `text-red-800` : null} `}>{booking.bookingStatus}</div>
                              <div className="text-sm text-gray-700 font-semibold p-1 w-1/4 md:w-1/4 transition-transform  hover:scale-[1.007] ease-in-out duration-300 hidden md:block text-center" ><span onClick={() => { handleGetBookingDetails(booking._id) }} className='hover:text-gray-500 bg-white p-3 w-28 outline outline-1 rounded-md'>View</span></div>

                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ):
                  (
                    <div className="flex justify-center items-center">
                    <img src={noBookingsIng} className='h-60 mb-16' />
                  </div>
                  )
                  }
                </div>
                {bookings.length ? (<Pagination className="mt-3">
                  <PaginationContent className="bg p-1 glass rounded-lg">
                    <PaginationItem className="cursor-pointer">
                      <PaginationPrevious onClick={handlePrevPageClick} />
                    </PaginationItem>

                    <Pagination>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index} className="cursor-pointer">
                          <PaginationLink isActive={page === index + 1} onClick={() => setPage(index + 1)}>{index + 1}</PaginationLink>
                        </PaginationItem>
                      ))}
                    </Pagination>

                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem className="cursor-pointer">
                      <PaginationNext onClick={handleNextPageClick} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>):null}
              </>
            )}
          </ModalBody>
          <div className='flex space-x-7 justify-between m-5'>
            <div className="">
              {bookingDetails && <Button onClick={manageGoBack}>Go back</Button>}
            </div>
            <Button onClick={manageCloseOfModal}>Close</Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BookingsListModal