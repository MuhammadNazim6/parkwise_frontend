import React, { PureComponent, useEffect, useState } from 'react';
import {
  useFetchTotalBookingsTodayAdminMutation
} from '@/redux/slices/adminSlice';
import ServicesCountChart from '@/components/Admin/ServicesCountChart';
import MonthlyWeeklyDailyGraph from '@/components/Admin/MonthlyWeeklyDailyGraph';

function AdminDashboard() {

  const [todaysBookingCount, setTodaysBookingCount] = useState(0)
  const [fetchTodaysBoookingCount] = useFetchTotalBookingsTodayAdminMutation()

  useEffect(() => {
    handleFetchTodaysBookingCount()
  }, [])

  const handleFetchTodaysBookingCount = async () => {
    const res = await fetchTodaysBoookingCount(null).unwrap()
    if (res.success) {
      setTodaysBookingCount(res.data)
    }
  }

  return (
    <div className="bg-white text-center h-screen flex w-full p-14 pb-0 mt-5">
      <div className="flex w-1/2 h-1/2">
        <div className="w-full">
          <div className="h-1/3 bg-[#b1ceff] w-full rounded-md flex justify-center items-center">
            <div className="">
            <p className='text-xl mt-2 font-mono'>Todays booking count</p>
            <p className='mt-8 text-2xl font-bold'>{todaysBookingCount} bookings</p>
            </div>
          </div>
          <div className="w-full h-2/3 mt-20"> 
            <ServicesCountChart />
          </div>
        </div>
      </div>
      <div className="w-1/2 h-2/3">
        <MonthlyWeeklyDailyGraph />
      </div>
    </div>
  )
}

export default AdminDashboard