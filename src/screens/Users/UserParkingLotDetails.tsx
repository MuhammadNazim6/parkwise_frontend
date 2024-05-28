import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetLotDetailsMutation, useGetBookedSlotsMutation } from '@/redux/slices/userApiSlice';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { IoMdBatteryCharging } from "react-icons/io";
import { GiCartwheel } from "react-icons/gi";
import { MdLocalCarWash } from "react-icons/md";
import { Loader } from '@/components/Common/BootstrapElems';
import UserCarousel from '@/components/User/UserCarousel ';
import { MdAccessTime } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { LiaRupeeSignSolid } from "react-icons/lia";



function UserParkingLotDetails() {
  const { id } = useParams();
  const [lotDetails, setLotDetails] = useState(null)
  const [date, setDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const [showSlots, setShowSlots] = useState(false);
  const startingSlotTime = parseInt(selectedTime.slice(0, 2))
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [loadingBooked, setLoadingBooked] = useState(false)
  const { toast } = useToast()

  const [getDetails] = useGetLotDetailsMutation()
  const [getBookedSlots] = useGetBookedSlotsMutation()


  useEffect(() => {
    const fetchAndUpdateDetails = async () => {
      try {
        const details = await getDetails(id).unwrap();
        if (details.success) {
          console.log(details.data);
          setLotDetails(details.data);
        } else {
          console.log('Unable to fetch details');
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchAndUpdateDetails();
  }, []);

  const slots = Array.from({ length: 24 - startingSlotTime }, (_, index) => `${startingSlotTime + index}:00 `)


  const handleTimeChange = (event) => {
    console.log(event.target.value);

    setSelectedTime(event.target.value);
  };

  const handleSlotClick = (slot) => {
    const tempSelectedSlots = new Set(selectedSlots);
    if (tempSelectedSlots.has(slot)) {
      tempSelectedSlots.delete(slot)
    } else {
      tempSelectedSlots.add(slot)
    }
    setSelectedSlots(tempSelectedSlots);
  };

  const checkAvailabilty = async () => {
    if (!date) {
      toast({
        variant: "destructive",
        title: "Please select a date",
        description: "There was a problem with your request.",
      })
      return
    }
    if (!startingSlotTime || startingSlotTime < lotDetails.startTime) {
      setSelectedTime(lotDetails.startTime)
    }
    setLoadingBooked(true)
    const bookedData = await getBookedSlots({ date, id }).unwrap()
    setLoadingBooked(false)
    console.log(bookedData.data);

    const data = bookedData.data
    const booked = new Set();
    data.forEach(({ time }) => {
      const [start, end] = time.split('-').map(t => parseInt(t))
      for (let i = start; i < end; i++) {
        booked.add(i)
      }
    })

    setBookedSlots(booked)

    setShowSlots(true)
  };


  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-blue-50 px-4 md:px-24'>
      <div className="w-full md:w-1/2 pt-10 md:flex h-full">
        {lotDetails ? (
          <div className="bg-white md:rounded-l-2xl shadow-2xl w-full">
            <div className="carousel md:rounded-tl-2xl w-full">
              <UserCarousel carouselArr={lotDetails.images} lotDetails={lotDetails} />
            </div>
            <div className="flex m-6 justify-between pb-12 text-[13px]">
              <div className="flex flex-col">
                <p className="text-gray-900">{lotDetails.address.buildingOrAreaName}</p>
                <p className="text-gray-900">{lotDetails.address.street}</p>
                {lotDetails.address.landmark && (
                  <p className="text-gray-900">{lotDetails.address.landmark}</p>
                )}
                <p className="text-gray-900">{lotDetails.address.pinNumber}</p>
                <p className="text-gray-900">{lotDetails.address.city}</p>
                <p className="text-gray-900">{lotDetails.address.state}</p>
              </div>

              <div className="flex flex-col space-y-2 text">
                {/* <div className="flex items-center space-x-2 p-1 rounded-md shadow-sm hover:bg-blue-50 transition duration-300">
                  <MdAccessTime />
                  <p className="text-gray-700 font-medium text-sm">{lotDetails.startTime === '00:00' ? '24/7' : '06:00 - 20:00'}</p>
                </div> */}
                {lotDetails.evChargeFacilityPrice && (
                  <div className="flex items-center space-x-2 bg-blue-50 p-1 rounded-md shadow-sm hover:bg-blue-100 transition duration-300">
                    <IoMdBatteryCharging className="text-blue-600 " />
                    <p className="text-gray-700 font-medium">EV Charging</p>
                  </div>
                )}
                {lotDetails.waterServicePrice && (
                  <div className="flex items-center space-x-2 bg-green-50 p-1 rounded-md shadow-sm hover:bg-green-100 transition duration-300">
                    <MdLocalCarWash className="text-green-600 " />
                    <p className="text-gray-700 font-medium">Water Service</p>
                  </div>
                )}
                {lotDetails.airPressureCheckPrice && (
                  <div className="flex items-center space-x-2 bg-yellow-50 p-1 rounded-md shadow-sm hover:bg-yellow-100 transition duration-300">
                    <GiCartwheel className="text-yellow-600 " />
                    <p className="text-gray-700 font-medium">Air Filling</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="w-full md:w-1/2 p-4 mt-10 md:mt-0 md:p-10">
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
            <label className='bg-white w-1/3 h-full p-3 cursor-pointer' htmlFor="time">From:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className='w-2/3 h-full border-0 cursor-pointer'
            // min='10:00'
            // max={maxTime}
            />
          </div>
          <button className="bg-secondary-blue h-12 w-full md:w-3/12 text-white rounded-r-sm active:scale-102">
            <span className="" onClick={checkAvailabilty}>Check</span>
          </button>
        </div>
        {showSlots && (
          <div className="mt-10 p-5 bg-white shadow-2xl rounded-r-lg">
            <div className="grid grid-cols-6 text-xs md:text-sm md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {!loadingBooked ? (slots.map((slot, idx) => {
                const hour = parseInt(slot.split(':')[0], 10);
                const isBooked = bookedSlots.has(hour);
                return (
                  <div
                    key={idx}
                    onClick={isBooked ? () => { console.log('BOOKED'); } : () => handleSlotClick(slot)}
                    className={`h-12 rounded-md cursor-pointer flex items-center justify-center text-black shadow-xl
                  ${selectedSlots.has(slot) ? 'bg-secondary-blue active:scale-101 text-white' : isBooked ? 'bg-gray-400 cursor-not-allowed transition-transform ease-in-out active:animate-shake' : ' ring- ring-blue-400 active:scale-101'}`}
                    aria-label={`Parking slot from ${slot}`}
                    role="button"
                    aria-disabled={isBooked}
                  >
                    {slot}
                  </div>
                );
              })
              ) : <div className="flex items-center justify-center h-96 w-96">
                <div className="ml-32">
                  <Loader />
                </div>
                <span className='ml-5'>loading available slots..</span>
              </div>
              }
            </div>
            <div className="h-20 flex m-10 justify-evenly items-center space-x-1 rounded-lg">
              <div className="flex flex-col items-center ">
                <div className="w-[18px] h-[18px] ring-1 ring-blue-400 text-blue-100 rounded-sm">.</div>
                <div>Available</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-[18px] h-[18px] bg-gray-400 text-gray-400 rounded-sm">.</div>
                <div>Not available</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-[18px] h-[18px] bg-secondary-blue text-secondary-blue rounded-sm">.</div>
                <div>Selected</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedSlots.size ? (<div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 rounded-lg bg-white border p-2 m-2 w-1/2 shadow-lg">
        <div className="flex justify-evenly">
          <p className='p-3 flex items-center space-x-3 text-lg font-medium'> <LiaRupeeSignSolid />

            <span>{lotDetails.pricePerHour * selectedSlots.size}.00</span></p>
          <div className="btn p-3 border-1 border-secondary-blue bg-white text-black hover:bg-primary-blue">Book now</div>
        </div>
      </div>) : null}
    </div>

  )
}

export default UserParkingLotDetails