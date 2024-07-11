import React, { useEffect, useState } from 'react';
import { useFetchTotalBookingsTodayProvMutation } from '@/redux/slices/providerSlice';
import ServicesCountChart from '@/components/Provider/ServicesCountChart';
import MonthlyWeeklyDailyGraph from '@/components/Provider/MonthlyWeeklyDailyGraph';   
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { motion } from "framer-motion"


function ProDashboardContent() {
  const { providerInfo } = useSelector((state: RootState) => state.auth)

  const [todaysBookingCount, setTodaysBookingCount] = useState(0)
  const [fetchTodaysBoookingCount] = useFetchTotalBookingsTodayProvMutation()

  useEffect(() => {
    handleFetchTodaysBookingCount()
  }, [])

  const handleFetchTodaysBookingCount = async () => {
    const res = await fetchTodaysBoookingCount(providerInfo.id).unwrap()
    if (res.success) {
      setTodaysBookingCount(res.data)
    }
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.1, duration: 0.2, ease: 'easeIn' }
        }} className="p-4 sm:ml-64">
        <div className="bg-white text-center h-screen flex w-full">
          <div className="flex w-1/2 h-1/2">
            <div className="w-full">
              <div className="h-1/3 p-4 border border-gray-200 m-3 bg-teal-800/40 w-full rounded-lg">
                <p className='text-xl font-mono'>Todays bookings count</p>
                <p className='mt-8 text-2xl font-bold'>{todaysBookingCount} bookings</p>
              </div>
              <div className="w-full h-2/3">  {/* Services used pie chart */}
                <ServicesCountChart />
              </div>
            </div>
          </div>
          <div className="w-1/2 h-2/3">
            <MonthlyWeeklyDailyGraph />
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ProDashboardContent