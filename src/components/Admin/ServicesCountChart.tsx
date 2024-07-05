import React, { useEffect, useState } from 'react'
import { PieChart, Pie } from 'recharts';
import { Tooltip, ResponsiveContainer } from 'recharts';
import { useFetchServicesUsedCountMutation } from '@/redux/slices/adminSlice';

function ServicesCountChart() {
  const [servicesData, setServicesData] = useState([
    { name: 'Air pressure', value: 0 },
    { name: 'Water service', value: 0 },
    { name: 'ev charging', value: 0 }
  ])

  const [fetchServicesCount] = useFetchServicesUsedCountMutation()
  useEffect(() => {
    handleFetchServicesCount()
  },[])
  
  const handleFetchServicesCount = async () => {
    const res = await fetchServicesCount(null).unwrap()
    if (res.success) {
      setServicesData(res.data)
    }
  }

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={servicesData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <p className='text-lg font-sans'> Services used</p>
    </>
  )
}

export default ServicesCountChart