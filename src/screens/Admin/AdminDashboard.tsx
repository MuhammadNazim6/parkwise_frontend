import React, { PureComponent, useEffect, useState } from 'react';
import {
  useFetchTotalBookingsTodayMutation
} from '@/redux/slices/adminSlice';
import ServicesCountChart from '@/components/Admin/ServicesCountChart';
import MonthlyWeeklyDailyGraph from '@/components/Admin/MonthlyWeeklyDailyGraph';

function AdminDashboard() {

  const [todaysBookingCount, setTodaysBookingCount] = useState(0)
  const [fetchTodaysBoookingCount] = useFetchTotalBookingsTodayMutation()

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
    <div className="bg-white text-center h-screen flex w-full p-14 pb-0">
      <div className="flex w-1/2 h-1/2">
        <div className="w-full">
          <div className="h-1/2 border border-gray-200 m-3 bg-violet-500/20 w-full">
            <p className='text-xl mt-6 font-mono'>Todays bookings count</p>
            <p className='mt-8 text-2xl font-bold'>{todaysBookingCount} bookings</p>
          </div>
          <div className="w-full h-2/3"> 
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