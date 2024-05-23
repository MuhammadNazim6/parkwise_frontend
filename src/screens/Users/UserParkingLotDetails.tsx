import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetLotDetailsMutation, useGetBookedSlotsMutation } from '@/redux/slices/userApiSlice';
import { Calendar } from "@/components/ui/calendar"
import { IoIosSearch } from "react-icons/io";
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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import heroImage from '../../assets/Images/depositphotos_140718644-stock-illustration-isometric-vector-illustration-car-in.jpg'


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

  const carouselArr = [1, 2, 3, 4]
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


  const slots = Array.from({ length: 24 - startingSlotTime }, (_, index) => `${startingSlotTime + index}:00 - ${startingSlotTime + index + 1}:00`);

  const handleTimeChange = (event) => {
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
    if (!date || !startingSlotTime) {
      toast({
        variant: "destructive",
        title: "Please select a date and starting time",
        description: "There was a problem with your request.",
      })
      return
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

  const minTime = '09:00';
  const maxTime = '18:00';

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-blue-50 px-4 md:px-24 p-3'>
      <div className="w-full md:w-1/2 pt-10 md:flex">
        {lotDetails ? (
          <div className="bg-primary-blue rounded-l-2xl shadow-2xl w-full h-full p-10">
            <h1 className="mb-1 text-2xl md:text-4xl font-bold h-1/6">{lotDetails.address.buildingOrAreaName}</h1>
            <div className="carousel">

              {carouselArr.map((x, index) => {
                const prevIndex = (index === 0) ? carouselArr.length - 1 : index - 1;
                const nextIndex = (index === carouselArr.length - 1) ? 0 : index + 1;
                return (
                  <div id={`slide${index}`} className="carousel-item relative w-full">
                    <img src={heroImage} className="w-full h-64 object-cover" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href={`#slide${prevIndex}`} className="btn btn-circle">❮</a>
                      <a href={`#slide${nextIndex}`} className="btn btn-circle">❯</a>
                    </div>
                  </div>
                )
              })
              }

            </div>
            <div className="flex justify-around p-10 rounded-lg">
              <div className="">
                <p className="text-md">{lotDetails.address.buildingOrAreaName},</p>
                <p className="text-md">{lotDetails.address.street},</p>
                <p className="text-md">{lotDetails.address.landmark},</p>
                <p className="text-md">{lotDetails.address.pinNumber},</p>
                <p className="text-md">{lotDetails.address.city},</p>
                <p className="text-md">{lotDetails.address.state},</p>
                <p className="text-md">{lotDetails.address.country}</p>
              </div>
              <div className="space-y-5">
                {lotDetails.evChargeFacilityPrice && (<div className="flex place-items-center space-x-1">
                  <IoMdBatteryCharging className="text-gray-800" />
                  <p className="text-gray-700">ev charging</p>
                </div>)}
                {lotDetails.waterServicePrice && (<div className="flex place-items-center space-x-1">
                  <MdLocalCarWash className="text-gray-800" />
                  <p className="text-gray-700">water service</p>
                </div>)}
                {lotDetails.airPressureCheckPrice && (<div className="flex place-items-center space-x-1">
                  <GiCartwheel className="text-gray-800" />
                  <p className="text-gray-700">air filling</p>
                </div>)}
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
              min={minTime}
              max={maxTime}
            />
          </div>
          <button className="bg-secondary-blue h-12 w-full md:w-3/12 text-white rounded-r-sm active:scale-102">
            <span className="" onClick={checkAvailabilty}>Check</span>
          </button>
        </div>
        {showSlots && (
          <div className="mt-10 p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {!loadingBooked ? (slots.map((slot, idx) => {
                const hour = parseInt(slot.split(':')[0], 10);
                const isBooked = bookedSlots.has(hour);
                return (
                  <div
                    key={idx}
                    onClick={isBooked ? () => { console.log('BOOKED'); } : () => handleSlotClick(slot)}
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
              ) : <div className="flex items-center justify-center h-96 w-96">
                <div className="ml-32">
                  <Loader />
                </div>
                <span className='ml-5'>loading available slots..</span>
              </div>
              }
            </div>
            <div className="bg-white h-24 flex m-10 justify-evenly p-9 space-x-1 shadow-lg rounded-lg">
              <div className="flex flex-col items-center ">
                <div className="w-4/12 ring-1 ring-blue-400 text-blue-100 bg-blue-100 rounded-sm">.</div>
                <div>Available</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-4/12  bg-gray-400 text-gray-400 rounded-sm">.</div>
                <div>Booked</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-4/12  bg-secondary-blue text-secondary-blue rounded-sm">.</div>
                <div>Selected</div>
              </div>
            </div>


          </div>


        )}
      </div>
    </div>

  )
}

export default UserParkingLotDetails