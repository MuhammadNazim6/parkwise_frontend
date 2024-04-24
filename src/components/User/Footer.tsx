import React from 'react'
import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaWhatsappSquare
} from 'react-icons/fa'

function Footer() {
  return (
    <div className="mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300 bg-black">
      <div className="">
        <h1 className='w-full text-2xl font-bold text-slate-300 cursor-pointer'> ParkWise</h1>
        <p className='text-[12px] mt-6 text-gray-400'>"Find and book parking effortlessly with our innovative app. Whether you're planning a quick errand or a day trip, our app helps you locate parking spots near your destination, saving you time and hassle. With real-time availability, detailed maps, and secure payments, parking has never been easier. </p>
        <div className="flex justify-between md:w-[45%] my-7">
          <FaFacebookSquare className='cursor-pointer' size={30} />
          <FaTwitterSquare className='cursor-pointer' size={30} />
          <FaGithubSquare className='cursor-pointer' size={30} />
          <FaInstagram className='cursor-pointer' size={30} />
          <FaWhatsappSquare className='cursor-pointer' size={30} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className='font-medium text-gray-400'>Solutions</h6>
          <ul>
            <li className='py-2 text-sm cursor-pointer'>Analytics</li>
            <li className='py-2 text-sm cursor-pointer'>Marketing</li>
            <li className='py-2 text-sm cursor-pointer'>Solutions</li>
            <li className='py-2 text-sm cursor-pointer'>Insight</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Support</h6>
          <ul>
            <li className='py-2 text-sm cursor-pointer'>Pricing</li>
            <li className='py-2 text-sm cursor-pointer'>Documentation</li>
            <li className='py-2 text-sm cursor-pointer'>Guides</li>
            <li className='py-2 text-sm cursor-pointer'>Status</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Company</h6>
          <ul>
            <li className='py-2 text-sm cursor-pointer'>About</li>
            <li className='py-2 text-sm cursor-pointer'>Blog</li>
            <li className='py-2 text-sm cursor-pointer'>Jobs</li>
            <li className='py-2 text-sm cursor-pointer'>Press</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Legal</h6>
          <ul>
            <li className='py-2 text-sm cursor-pointer'>Claim</li>
            <li className='py-2 text-sm cursor-pointer'>Policy</li>
            <li className='py-2 text-sm cursor-pointer'>Terms</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer