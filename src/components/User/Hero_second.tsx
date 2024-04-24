import React from 'react'
import heroImg from '../../assets/hero2.jpg'
import overlapImg from '../../assets/overlapImg.avif'

function Hero_second() {
  return (
    <div className='text-black bg-white'>
      <div className="max-w-6xl mx-auto px-4 py-8 md:flex md:items-center md:justify-between md:py-16">
        <div className='md:w-1/2 md:pl-8 md:mt-0 mt-8 flex justify-center md:justify-start relative'>
          <img className="rounded-xl" style={{ width: '80%', maxWidth: '440px', height: 'auto' }} src={heroImg} alt="Image" />
          <img className="absolute top-48 left-96 w-1/2 rounded-xl md:block hidden" style={{ maxWidth: '140px', height: 'auto' }} src={overlapImg} alt="Overlapping Image" />
        </div>

        <div className="md:w-1/2 md:pr-8">
          <h1 className='font-bold text-4xl md:text-3xl p-5 mt-5'> "How It Works: Your Step-by-Step Guide to Seamless Parking"</h1>
          <p className='text-slate-600 mt-4 md:text-lg p-2'>Locate Parking: Simply search a location or enable live location to instantly find nearby parking spots.</p>
          <p className='text-slate-600 mt-4 md:text-lg p-2'>Review and Reserve: Browse through available options, check real-time availability, and reserve your spot with just a few taps.</p>
          <p className='text-slate-600 mt-4 md:text-lg p-2'>Navigate with Ease: Use our integrated navigation system to effortlessly reach your reserved parking space, ensuring a stress-free parking experience.</p>
          {/* <div className="mx-24 md:mt-16 flex flex-col md:flex-row justify-between ">
          <button className='md:bg-blue-500 hover:text-blue-900 md:hover:bg-blue-700  border-black md:text-white font-bold px-4 py-2 md:rounded'>Get started</button>
          <button className=' md:hover:bg-amber-100 hover:text-blue-900 md:hover:border-black md:border border-black md:border-black md:text-black font-bold py-2 px-4 rounded p-3'>How it works</button>
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default Hero_second