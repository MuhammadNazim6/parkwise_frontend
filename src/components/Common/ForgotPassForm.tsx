import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom';



function ForgotPassForm(props) {
const navigate = useNavigate()
const location = useLocation()
  const togglePassword = ()=>{
    props.togglePasswordFn()
    location.pathname === '/user/forgotpassword' ?  navigate('/user/login') : navigate('/provider/login')
  }
  return (
    <div className='bg-white p-10 lg:border-0 border-2 border-gray-200'>
      <h1 className='text-4xl font-semibold '>Forgot password?</h1>
      <p className='font-medium text-lg text-gray-500 mt-4 tracking-wide'>Dont worry we can help.</p>
      <div className='mt-8 '>
        <div className="">
          <label className='text-lg font-medium tracking-wide'>Enter you email</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your email' type="text" />
        </div>
        <div className="">
          <label className='text-lg font-medium tracking-wide' >Password</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter your password' type="password" />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div className="">
          </div>
          <button onClick={togglePassword} className='font-medium text-base text-secondary-blue hover:scale-[1.02]'>Back to login</button>
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-4 rounded-xl bg-secondary-provider text-white text-lg font-bold w-96'>Send otp</button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassForm