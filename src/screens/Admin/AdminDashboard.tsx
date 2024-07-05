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

  const monthlyData = [
    {
      name: 'Jan',
      uv: 4000,

      amt: 2400,
    },
    {
      name: 'Feb',
      uv: 3000,

      amt: 2210,
    },
    {
      name: 'Mar',
      uv: 2000,

      amt: 2290,
    },
    {
      name: 'Apr',
      uv: 2780,

      amt: 2000,
    },
    {
      name: 'May',
      uv: 1890,

      amt: 2181,
    },
    {
      name: 'Jun',
      uv: 2390,

      amt: 2500,
    },
    {
      name: 'Jul',
      uv: 3490,

      amt: 2100,
    },
    {
      name: 'Aug',
      uv: 3490,

      amt: 2100,
    },
    {
      name: 'Sep',
      uv: 3490,

      amt: 2100,
    },
    {
      name: 'Oct',
      uv: 3490,

      amt: 2100,
    },
    {
      name: 'Nov',
      uv: 3490,

      amt: 2100,
    },
    {
      name: 'Dec',
      uv: 3490,

      amt: 2100,
    },

  ]
  const weeklyData = [
    { name: 'Week 1', count: 24000, amount: 14000 },
    { name: 'Week 2', count: 22100, amount: 12000 },
    { name: 'Week 3', count: 22100, amount: 12000 },
    { name: 'Week 4', count: 22100, amount: 12000 },
    { name: 'Week 5', count: 22100, amount: 12000 },
    { name: 'Week 6', count: 22100, amount: 12000 },
    { name: 'Week 7', count: 22100, amount: 12000 },
  ];
  const dailyData = [
    { name: '2024-06-01', count: 4000, amount: 2400 },
    { name: '2024-06-02', count: 3000, amount: 2210 },
    { name: '2024-06-03', count: 3000, amount: 2210 },
    { name: '2024-06-04', count: 3000, amount: 2210 },
    { name: '2024-06-05', count: 3000, amount: 2210 },
    { name: '2024-06-06', count: 3000, amount: 2210 },
    { name: '2024-06-07', count: 3000, amount: 2210 },
    { name: '2024-06-08', count: 3000, amount: 2210 },
    { name: '2024-06-09', count: 3000, amount: 2210 },
    { name: '2024-06-10', count: 3000, amount: 2210 },

  ];

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
          <div className="w-full h-2/3">  {/* Services used pie chart */}
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