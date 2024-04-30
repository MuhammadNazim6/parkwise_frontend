import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import {
  useProviderRegisterMutation,
  useProviderVerificationMutation
} from '../../slices/providerSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Common/Loader';
import { setProviderCredentials, setEmailInfo } from '../../slices/authSlice';
import { toast } from '../../script/toast'

export default function SignupForm(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useProviderRegisterMutation()
  const [verify] = useProviderVerificationMutation()
  const [loading, setLoading] = useState(false);

  const { providerInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (providerInfo) {
      navigate('/')
    }
  }, [navigate, providerInfo])

  const submitHandler = async (e) => {

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
    const mobileRegex = /^(?![0-5])\d{10}$/;
    const nameRegex = /^[^\s]+(\s[^\s]+)*$/;

    // Check if any field is empty
    if (!name || !mobile || !email || !password) {
      toast('error', "All fields should be filled");
    } else if (!mobile.match(mobileRegex)) {
      toast('error', "Enter a valid mobile number");
    } else if (!name.match(nameRegex)) {
      toast('error', "Name cannot contain consecutive spaces");
    } else if (!email.match(emailRegex)) {
      toast('error', "Invalid email address");
    } else if (!password.match(passwordRegex)) {
      toast('error', "Password must be at least 6 characters and contain at least one special character");
    } else if (password !== confirmPassword) {
      toast('error', "Password do not match");
    } else {
      const formData = {
        name,
        email,
        password,
        mobile
      };

      handleRegistration(formData);
    }
  }

  const handleRegistration = async (formData) => {
    try {
      setLoading(true);
      const otpRes= await verify(formData).unwrap();
      console.log(otpRes);
      
      formData.OTP = otpRes.otp
      dispatch(setEmailInfo(formData))
      setLoading(false); 
      navigate('/provider/email-verify')
      
    } catch (error) {
      console.error('Registration failed:', error);
    }

  }


  return (
    <div className='bg-white lg:border-0 md:w-3/4'>
      <h1 className='text-2xl font-semibold '>Create Account</h1>
      <p className='font-medium text-lg text-gray-500 mt-1 tracking-wide'>Please enter your details.</p>

      <div className='mt-3 '>
        <div className="">
          <label className='text-sm font-medium tracking-wide' >Fullname</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 h-11 mt-1 bg-transparent' placeholder='Enter your name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="">
          <label className='text-sm font-medium tracking-wide' >Email</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 h-11 mt-1 bg-transparent' placeholder='Enter your email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="">
          <label className='text-sm font-medium tracking-wide' >Mobile</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 h-11 bg-transparent' placeholder='Enter your mobile' type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        <div className="">
          <label className='text-sm font-medium tracking-wide' >Password</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 h-11 bg-transparent' placeholder='Enter your password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="">
          <label className='text-sm font-medium tracking-wide' >Confirm password</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 h-11 bg-transparent' placeholder='Confirm your password' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className='mt-4 gap-y-4 flex justify-center items-center'>
        {loading ? <div>Loading</div> : <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out rounded-xl bg-secondary-provider text-white text-lg font-bold w-1/2 h-11' onClick={submitHandler}>Sign up</button>}
        </div>
        <div className='mt-4 gap-y-4 flex justify-center items-center'>
          <button className='flex justify-center items-center p-3 gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 border-2 border-blue-300 w-1/2 rounded-xl h-11'><FaGoogle />  Sign up with Google</button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className='font-medium text-base'>Already have an account? </p>
          <Link to='/provider/login'><button className='text-secondary-blue text-base font-medium ml-2 hover:scale-[1.02]'>Sign in</button></Link>
        </div>
      </div>
    </div>
  )
}