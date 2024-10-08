import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetLotDetailsMutation, useGetBookedSlotsMutation } from '@/redux/slices/userApiSlice';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { IoMdBatteryCharging } from "react-icons/io";
import { GiCartwheel } from "react-icons/gi";
import { MdLocalCarWash } from "react-icons/md";
import UserCarousel from '@/components/User/UserCarousel ';
import { LiaRupeeSignSolid } from "react-icons/lia";
import UserBookingModal from '@/components/User/UserBookingModal';
import { SlotSkeleton } from '@/components/User/SlotSkeleton';
import UserLoginModal from './UserLoginModal';
import { useDisclosure } from '@chakra-ui/react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import Footer from '@/components/User/Footer';
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import boxLoader from '../../assets/Animation/boxLoader.json'
import Feedbacks from '@/components/User/Feedbacks';


function UserParkingLotDetails() {

  const { uLoggedIn } = useSelector((state: RootState) => state.auth);

  const { id } = useParams();
  const [lotDetails, setLotDetails] = useState(null)
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const [showSlots, setShowSlots] = useState(false);
  const startingSlotTime = parseInt(selectedTime.slice(0, 2))
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  const [urlToNavigate, setUrlToNavigate] = useState('')
  const { isOpen: isLoginModalOpen, onOpen: openLoginModal, onClose: closeLoginModal } = useDisclosure()

  const navigate = useNavigate()

  const { toast } = useToast()
  const [getDetails] = useGetLotDetailsMutation()
  const [getBookedSlots, { isLoading }] = useGetBookedSlotsMutation()


  useEffect(() => {
    const fetchAndUpdateDetails = async () => {
      try {
        const details = await getDetails(id).unwrap();
        if (details.success) {
          setLotDetails(details.data);
        } else {
          console.error('Unable to fetch details');
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchAndUpdateDetails();
  }, []);

  const slots = Array.from({ length: 24 - startingSlotTime }, (_, index) => `${startingSlotTime + index}:00 `)


  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSlotClick = (slot) => {
    const tempSelectedSlots = new Set(selectedSlots);
    if (tempSelectedSlots.has(slot)) {
      tempSelectedSlots.delete(slot)
    } else {
      if (slot)
        tempSelectedSlots.add(slot)
    }
    setSelectedSlots(tempSelectedSlots);
  };

  const checkAvailabilty = async () => {
    clearAllSelection()
    if (!date) {
      toast({
        variant: "destructive",
        title: "Please select a date",
        description: "There was a problem with your request.",
      })
      return
    }
    if (!startingSlotTime) {
      setSelectedTime(lotDetails.startTime)
    }


    const bookedData = await getBookedSlots({ date, id }).unwrap()
    const data = bookedData.data

    const booked = new Set();
    data.forEach(({ time }) => {
      const [start, end] = time.split('-').map(t => parseInt(t))
      for (let i = start; i < end; i++) {
        booked.add(i)
      }
    })

    // Blocking the already over time
    const currentTime = new Date()
    if(currentTime.getDate() == date.getDate()){
      for(let i = 0; i <= currentTime.getHours();i++){
        booked.add(i)
      }
    }
    setBookedSlots(booked)
    setShowSlots(true)
  };

  const clearAllSelection = () => {
    const clearedSet = new Set()
    setSelectedSlots(clearedSet)
  }

  const handleGoToChats = () => {
    if (!uLoggedIn) {
      setUrlToNavigate(`/user/chats?ID=${id}`)
      openLoginModal()
    } else {
      navigate(`/user/chats?ID=${id}`)
    }
  }

  const handleGoToDirections = (url) => {
    if (!uLoggedIn) {
      setUrlToNavigate(url)
      openLoginModal()
    } else {
      navigate(url)
    }
  }

  const handleBookNow = () => {
    if (!uLoggedIn) {
      setUrlToNavigate('')
      openLoginModal()
    } else {
      setBookingModalOpen(true)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
      }}>

      <div className='h-full pb-11 flex flex-col md:flex-row bg-blue-50 px-4 xl:px-40 '>
        <div className="w-full md:w-1/2 pt-10 md:flex h-full">
          {lotDetails ? (
            <div className="bg-white md:rounded-l-2xl_dis shadow-lg w-full">
              <div className="carousel md:rousdnded-tl-2xl w-full">
                <UserCarousel carouselArr={lotDetails.images} lotDetails={lotDetails} />
              </div>
              <div className="flex m-6 justify-between text-[13px]">
                <div className="">
                  <p className="text-gray-900">{lotDetails.address.buildingOrAreaName}</p>
                  {/* <p className="text-gray-900">{lotDetails.address.street}</p> */}
                  {lotDetails.address.landmark && (
                    <p className="text-gray-900">{lotDetails.address.landmark}</p>
                  )}
                  <span className="text-gray-900">{lotDetails.address.pinNumber}, </span>
                  <span className="text-gray-900">{lotDetails.address.city}</span>
                  <p className="text-gray-900">{lotDetails.address.state}</p>
                </div>

                <div className="flex flex-col space-y-2 text">
                  {!lotDetails.evChargeFacilityPrice && (
                    <div className="flex items-center space-x-2 bg-blue-50 p-1 rounded-md_dis shadow-sm hover:bg-blue-100 transition duration-300">
                      <IoMdBatteryCharging className="" />
                      <p className="text-gray-700 font-medium">EV Charging</p>
                    </div>
                  )}
                  {lotDetails.waterServicePrice && (
                    <div className="flex items-center space-x-2 bg-blue-50 p-1 rounded-md_dis shadow-sm hover:bg-blue-100 transition duration-300">
                      <MdLocalCarWash className=" " />
                      <p className="text-gray-700 font-medium">Water Service</p>
                    </div>
                  )}
                  {!lotDetails.airPressureCheckPrice && (
                    <div className="flex items-center space-x-2 bg-blue-50 p-1 rounded-md_dis shadow-sm hover:bg-blue-100 transition duration-300">
                      <GiCartwheel className=" " />
                      <p className="text-gray-700 font-medium">Air Filling</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="transition duration-300 ease-in-out transform hover:scale-102 bg-blue-200 hover:scale-[1.01] hover:bg-blue-300">
                <p
                  onClick={handleGoToChats}
                  className="flex justify-center items-center space-x-2 text-md p-3 cursor-pointer rounded-md w-full"
                >
                  <span className='text-sm'>Chat now</span>
                  {/* <IoMdChatbubbles /> */}
                </p>
              </div>
              <div className="transition duration-300 ease-in-out transform hover:scale-102 bg-gray-200 rounded-b-md hover:scale-[1.01] hover:bg-gray-300">
                <p
                  onClick={() => handleGoToDirections(`/user/find/lotDetails/directions?end=${lotDetails.location.coordinates}`)}
                  className="flex justify-center items-center space-x-2 text-md  p-3 cursor-pointer rounded-md w-full   active:bg-blue-400"
                >
                  <span className='text-sm'>Get directions</span>
                  {/* <FaDirections /> */}

                </p>
              </div>

            </div>
          ) : null}
        </div>
        <div className="w-full md:w-1/2 p-4 mt-5 lg:mt-0 lg:p-10">
          <div className="flex flex-col md:flex-row w-full">
            {/* Date */}
            <div className="w-full md:w-4/12 mb-4 md:mb-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left h-12 rounded-none overflow-hidden rounded-l-sm text-sm font-medium",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => {
                      let today = new Date();
                      let upToDate = new Date(today);
                      upToDate.setDate(today.getDate() + 2);
                      let yesterday = new Date(today);
                      yesterday.setDate(today.getDate() - 1);
                      return date <= yesterday || date > upToDate;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Time */}
            <div className="w-full md:w-6/12 h-12 flex mb-4 md:mb-0">
              <label className='bg-white w-1/3 h-full p-3 cursor-pointer text-nowrap' htmlFor="time">From:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className='w-2/3 h-full border-0 cursor-pointer'
              />
            </div>
            <button onClick={checkAvailabilty} className="bg-secondary-blue h-12 w-full md:w-3/12 text-white rounded-r-sm active:scale-102">
              <span>Check</span>
            </button>
          </div>
          {showSlots ? (
            <div className="mt-10 p-6 bg-white shadow-lg rounded-r-lg">
              <div className="text-end mb-2 cursor-pointer" onClick={clearAllSelection}>Clear all</div>
              <div className="grid grid-cols-6 text-[10px] xs:text-[12px] md:text-[14px] md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {
                  !isLoading ?
                    (slots.map((slot, idx) => {
                      const hour = parseInt(slot.split(':')[0], 10);
                      const isBooked = bookedSlots.has(hour);
                      return (
                        <div
                          key={idx}
                          onClick={isBooked ? () => { console.log('Booked'); } : () => handleSlotClick(slot)}
                          className={`h-12 rounded-md cursor-pointer flex items-center justify-center text-black shadow-xl
                  ${selectedSlots.has(slot) ? 'bg-secondary-blue active:scale-101 text-white' : isBooked ? 'bg-gray-400 cursor-not-allowed transition-transform ease-in-out active:animate-shake' : ' ring-1 ring-blue-400 active:scale-101'}`}
                          aria-label={`Parking slot from ${slot}`}
                          role="button"
                          aria-disabled={isBooked}
                        >
                          {slot}
                        </div>
                      );
                    })
                    )
                    : (slots.map((idx) => {
                      return (
                        <div key={idx}>
                          <SlotSkeleton />
                        </div>
                      );
                    })
                    )

                }
              </div>
              <div className="h-20 flex m-8 justify-evenly items-center space-x-1 rounded-lg text-xs">
                <div className="flex flex-col items-center ">
                  <div className="w-[18px] h-[18px] ring-1 ring-blue-400 text-blue-100 rounded-sm">.</div>
                  <div className='mt-1'>Available</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-[18px] h-[18px] bg-gray-400 text-gray-400 rounded-sm">.</div>
                  <div className='mt-1'>Booked/Expired</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-[18px] h-[18px] bg-secondary-blue text-secondary-blue rounded-sm">.</div>
                  <div className='mt-1'>Selected</div>
                </div>
              </div>
            </div>
          ) : (

            isLoading ? (
              <div className="flex justify-center items-center mt-5 min-h-96">
                <Lottie animationData={boxLoader} className='w-28' />
              </div>
            )
              : (

                <div className="flex justify-center items-center h-96">
                  <div className="">
                    <p className='text-center text-sm text-gray-600'>Check for available slots now</p>
                  </div>
                </div>
              )

          )}
        </div>
        {selectedSlots.size ? (<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 rounded-lg bg-white z-10 ring-1 ring-blue-400 p-1 mb-2 w-1/2 shadow-lg">
          <div className="flex justify-evenly">
            <p className='p-3 flex items-center space-x-3 text-lg font-medium'> <LiaRupeeSignSolid />
              <span>{lotDetails.pricePerHour * selectedSlots.size}.00</span></p>
            <button className="btn border-1 border-secondary-blue bg-white text-black hover:bg-primary-blue"
              onClick={handleBookNow}>
              Book now
            </button>
          </div>
        </div>) : null}
        {lotDetails && (
          <UserBookingModal isOpen={bookingModalOpen} setBookingModalOpen={setBookingModalOpen} lotDetails={lotDetails} selectedSlots={selectedSlots} date={date} checkAvailabilty={checkAvailabilty} />
        )}

        <UserLoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} url={urlToNavigate} />
      </div>
      <Feedbacks lotId={id} />
      <Footer />

    </motion.div >

  )
}

export default UserParkingLotDetails

