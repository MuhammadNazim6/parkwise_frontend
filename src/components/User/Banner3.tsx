import React from 'react'
import mapImg from '../../assets/Images/mapImg.jpg'
import { motion } from "framer-motion"


function Banner3() {
  return (
    <motion.div initial={{ opacity: 0 }}
    animate={{
      opacity: 1,
      transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
    }} className='text-black bg-white'>
    <div className="max-w-6xl mx-auto px-4 md:flex md:items-center md:justify-between md:py-16 mb-10 md:mb-0">
      <div className="md:w-1/2 md:pr-8">
        <h1 className='font-bold text-3xl text-center md:text-4xl p-5'>Features and benefits</h1>
        <p className='text-slate-600 mt-4 md:text-lg p-2'>We update our off-street parking data daily, using insights from parking lot operators, site visits and user feedback to deliver relevant info to drivers. That includes details on availability, pricing, opening hours and available services at parking lots and garages </p>
      </div>
      <div className='md:w-1/2 md:pl-8 md:mt-0 mt-8 flex justify-center md:justify-start'>
        <img className="rounded-xl" style={{ width: '80%', maxWidth: '440px', height: 'auto' }} src={mapImg} alt="Image" />
      </div>
    </div>
  </motion.div>
  )
}

export default Banner3