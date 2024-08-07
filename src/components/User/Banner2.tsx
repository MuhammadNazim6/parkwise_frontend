import React from 'react'
import heroImg from '../../assets/Images/hero2.jpg'
import overlapImg from '../../assets/Images/overlapImg.avif'
import { motion } from "framer-motion"


function Banner2() {
  return (
    <div id='work' className='text-black bg-white'>
      <motion.div initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
        }} className="max-w-6xl mx-auto px-4 py-8 md:flex md:items-center md:justify-between md:py-16">
        <div className='md:w-1/2 md:pl-8 md:mt-0 mt-8 flex justify-center md:justify-start md:relative'>
          <img className="rounded-xl" style={{ width: '80%', maxWidth: '440px', height: 'auto' }} src={heroImg} alt="Image" />
          <img className="absolute top-48 left-96 w-1/2 rounded-xl hidden xl:block" style={{ maxWidth: '140px', height: 'auto' }} src={overlapImg} alt="Overlapping Image" />
        </div>

        <div className="md:w-1/2 md:pr-8 text-center md:text-start">
          <h1 className='font-bold text-2xl md:text-3xl p-5 mt-5 '> How It Works: Your Step-by-Step Guide to Seamless Parking</h1>
          <p className='text-slate-600 mt-4 md:text-lg p-2 '>Locate Parking: Simply search a location or enable live location to instantly find nearby parking spots.</p>
          <p className='text-slate-600 mt-4 md:text-lg p-2'>Review and Reserve: Browse through available options, check real-time availability, and reserve your spot with just a few taps.</p>
          <p className='text-slate-600 mt-4 md:text-lg p-2'>Navigate with Ease: Use our integrated navigation system to effortlessly reach your reserved parking space, ensuring a stress-free parking experience.</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Banner2