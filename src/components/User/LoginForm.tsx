import * as React from 'react';
import { FaGoogle } from 'react-icons/fa';


export default function LoginForm(props) {
  return (
    // border-2 border-gray-200
    <div className='bg-white p-10 lg:border-0 border-2 border-gray-200'>
      <h1 className='text-4xl font-semibold '>Welcome back</h1>
      <p className='font-medium text-lg text-gray-500 mt-4 tracking-wide'>Please enter your details.</p>
      <div className='mt-8 '>
        <div className="">
          <label className='text-lg font-medium tracking-wide' >Email</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your email' type="text" />
        </div>
        <div className="">
          <label className='text-lg font-medium tracking-wide' >Password</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your password' type="password" />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div className="">
          </div>
          <button className='font-medium text-base text-secondary-blue hover:scale-[1.02]'>Forgot password?</button>
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-4 rounded-xl bg-secondary-blue text-white text-lg font-bold w-96'>Sign in</button>
          <button className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 border-2 border-gray-100 rounded-xl'><FaGoogle/> Sign in with Google</button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className='font-medium text-base'>Don't have an account?</p>
          <button className='text-secondary-blue text-base font-medium ml-2 hover:scale-[1.02]' onClick={props.toggleFn}>Sign up</button>
        </div>
      </div>
    </div>
  )
}