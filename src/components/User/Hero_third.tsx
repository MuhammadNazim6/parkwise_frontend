import React from 'react'
import mapImg from '../../assets/Images/mapImg.jpg'
import overlapImg from '../../assets/Images/overlapImg.avif'


function Hero_third() {
  return (
    <div className='text-black bg-white'>
    <div className="max-w-6xl mx-auto px-4 py-8 md:flex md:items-center md:justify-between md:py-16">
      <div className="md:w-1/2 md:pr-8">
        <h1 className='font-bold text-4xl md:text-3xl p-5 mt-5'>Features and benefits</h1>
        <p className='text-slate-600 mt-4 md:text-lg p-2'>We update our off-street parking data daily, using insights from parking lot operators, site visits and user feedback to deliver relevant info to drivers. That includes details on availability, pricing, opening hours and available services at parking lots and garages </p>
      </div>
      <div className='md:w-1/2 md:pl-8 md:mt-0 mt-8 flex justify-center md:justify-start'>
        <img className="rounded-xl" style={{ width: '80%', maxWidth: '440px', height: 'auto' }} src={mapImg} alt="Image" />
      </div>

    </div>
  </div>
  )
}

export default Hero_third