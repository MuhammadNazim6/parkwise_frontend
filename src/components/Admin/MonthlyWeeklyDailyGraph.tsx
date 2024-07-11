import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  useFetchMontlyBookingsAdminMutation,
  useFetchWeeklyBookingsAdminMutation,
  useFetchDailyyBookingsAdminMutation,
} from '@/redux/slices/adminSlice';

function MonthlyWeeklyDailyGraph() {
  const [isActive, setIsActive] = useState('')
  const [barGraphData, setBarGraphData] = useState([])

  const [fetchMonthlyBookings] = useFetchMontlyBookingsAdminMutation()
  const [fetchWeeklyBookings] = useFetchWeeklyBookingsAdminMutation()
  const [fetchDailyBoookings] = useFetchDailyyBookingsAdminMutation()

  useEffect(() => {
    handlefetchMonthly()
  }, [])

  const handlefetchMonthly = async () => {
    setIsActive('monthly')
    const res = await fetchMonthlyBookings(null).unwrap()
    if (res.success) {
      setBarGraphData(res.data)
    }
  }
  const handlefetchWeekly = async () => {
    setIsActive('weekly')
    const res = await fetchWeeklyBookings(null).unwrap()
    if (res.success) {
      setBarGraphData(res.data)
    }
  }
  const handleFetchDaily = async () => {
    setIsActive('daily')
    const res = await fetchDailyBoookings(null).unwrap()
    if (res.success) {
      setBarGraphData(res.data)
    }
  }

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={barGraphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 40, right: 40 }} />
          <YAxis padding={{ top: 40 }} />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#8884d8" background={{ fill: '#eee' }} />
          <Bar dataKey="amount" stackId="a" fill="#234f79" />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex space-x-8 justify-center">
        <p onClick={handlefetchMonthly} className={`cursor-pointer ${isActive === 'monthly' ? 'bg-slate-900/20' : 'bg-white border border-gray-500'}  p-1 rounded-md w-20 text-xs active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out
`}>Monthly</p>
        <p onClick={handlefetchWeekly} className={`cursor-pointer ${isActive === 'weekly' ? 'bg-slate-900/20' : 'bg-white border border-gray-500'}  p-1 rounded-md w-20 text-xs active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out
`}>Weekly</p>
        <p onClick={handleFetchDaily} className={`cursor-pointer ${isActive === 'daily' ? 'bg-slate-900/20' : 'bg-white border border-gray-500'} p-1 rounded-md w-20 text-xs active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out
`}>Daily</p>
      </div>
    </>
  )
}

export default MonthlyWeeklyDailyGraph