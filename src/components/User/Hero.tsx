import React from 'react'
import heroImage from '../../assets/Images/heroImage.jpg'


function Hero() {
  return (
    <div className='text-black bg-primary-blue'>
      <div className="max-w-6xl mx-auto px-4 py-8 md:flex md:items-center md:justify-between md:py-16">
        <div className="md:w-1/2 md:pr-8">
          <h1 className='font-bold text-4xl md:text-6xl p-5'>Your instant parking Solution</h1>

          <p className='text-black mt-4 md:text-lg p-5'>Welcome to our Parking Finder project! Say goodbye to circling the block endlessly—our intuitive app locates available parking spaces near you in seconds, making urban parking stress a thing of the past.</p>
          <div className="mx-24 md:mt-4 flex flex-col md:flex-row justify-between ">
            <button className='md:bg-blue-500 hover:text-blue-900 md:hover:bg-blue-700  border-black md:text-white font-bold px-4 py-2 md:rounded'>Get started</button>
            <button className=' md:hover:bg-amber-100 hover:text-blue-900 md:hover:border-black md:border border-black md:border-black md:text-black font-bold px-4 rounded p-3'><a href='#scroll'>How it works </a></button>
          </div>
        </div>
        <div className='md:w-1/2 md:pl-8 md:mt-0 mt-8'>
          <img className="mx-auto md:mx-0 md:ml-20 rounded-xl" style={{ width: '80%', maxWidth: '330px', height: 'auto' }} src={heroImage} alt="Image" />
        </div>
      </div>
    </div>
  )
}

export default Hero