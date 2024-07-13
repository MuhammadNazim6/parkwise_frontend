import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserVerificationMutation, useUserSignGoogleMutation } from '../../redux/slices/userApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../Common/BootstrapElems'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { setCredentials, setEmailInfo } from '../../redux/slices/authSlice';
import axios from 'axios';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { RootState } from '@/redux/store';


export default function SignupForm(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [commonError, setCommonError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [verify] = useUserVerificationMutation()
  const [sign] = useUserSignGoogleMutation()
  const [loading, setLoading] = useState(false);


  const { uLoggedIn } = useSelector((state: RootState) => state.auth);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  }


  const Glogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
        );
        const googleUserData = {
          name: res.data.name,
          email: res.data.email,
          mobile: 0,
          password: res.data.sub,
          google: true
        }
        const signed = await sign(googleUserData).unwrap()
        if (signed.success) {
          const mobile = signed.data.mobile ? signed.data.mobile : 0
          dispatch(setCredentials({ ...googleUserData, id: signed.data.id, mobile }))
          navigate('/user/find', { replace: true })
        } else {
          setCommonError(signed.message);
        }
      } catch (error) {
        console.error(error);
      }
    },

  });

  useEffect(() => {
    if (uLoggedIn) {
      navigate('/user/find')
    }
  }, [navigate, uLoggedIn])

  const handleLoginClick = () => {
    navigate('/', { replace: true });
  };

  const submitHandler = async (e) => {

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
    const mobileRegex = /^(?![0-5])\d{10}$/;
    const nameRegex = /^[^\s]+(\s[^\s]+)*$/;

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setCommonError('');
    setMobileError('');
    let hasError = false;

    if (!name) {
      setNameError("Name is required")
      hasError = true;
    } else if (!name.match(nameRegex)) {
      setNameError("Name cannot contain consecutive spaces");
      hasError = true;
    }

    if (!mobile) {
      setMobileError("Mobile number is required");
      hasError = true;
    } else if (!mobile.match(mobileRegex)) {
      setMobileError("Enter a valid mobile number");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!email.match(emailRegex)) {
      setEmailError("Invalid email address");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (!password.match(passwordRegex)) {
      setPasswordError("Password must be at least 6 characters and contain at least one special character");
      hasError = true;
    } else if (!confirmPassword) {
      setPasswordError("Please confirm your password");
      hasError = true;
    } else if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      hasError = true;
    }

    if (!hasError) {
      const formData = {
        name,
        email,
        password,
        mobile
      };
      handleRegistration(formData);
    }
  }

  interface FormData {
    name: string;
    email: string;
    password: string;
    mobile: string;
  }

  const handleRegistration = async (formData: FormData) => {
    try {
      setLoading(true)
      const otpRes = await verify(formData).unwrap()

      if (otpRes.success) {
        dispatch(setEmailInfo(formData))
        setLoading(false);
        navigate('/user/email-verify', { replace: true })
      } else {
        setCommonError(otpRes.message);
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error('Registration failed:', error);
    }
  }


  return (
    <div className='bg-white lg:border-0 md:w-3/4 '>
      <h1 className='text-2xl font-semibold '>Create Account</h1>
      <p className='font-medium text-lg text-gray-500 mt-1 tracking-wide'>Please enter your details.</p>

      <div className='mt-1'>
        <div className="h-20 mt-3">
          <label className='text-sm font-medium tracking-wide' >Name</label>
          <input className='w-full border-2 border-gray-300 rounded-xl p-3 h-11 mt-1 bg-transparent' type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {nameError && <p className="text-red-400 pl-4 text-sm">{nameError}</p>}
        </div>
        <div className="h-20 mt-3">
          <label className='text-sm font-medium tracking-wide' >Email</label>
          <input className='w-full border-2 border-gray-300 rounded-xl p-3 h-11 mt-1 bg-transparent' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <p className="text-red-400 pl-4 text-sm">{emailError}</p>}
        </div>
        <div className="h-20 mt-3">
          <label className='text-sm font-medium tracking-wide' >Mobile</label>
          <input className='w-full border-2 border-gray-300 rounded-xl p-3 mt-1 h-11 bg-transparent' type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          {mobileError && <p className="text-red-400 pl-4 text-sm">{mobileError}</p>}
        </div>
        <div className="flex h-32">

          <div className="p-2 relative w-1/2">
            <label className='text-sm font-medium tracking-wide'>Password</label>
            <div className="relative">
              <input
                className='w-full border-2 border-gray-300 rounded-xl p-3 mt-1 h-11 bg-transparent'
                placeholder=''
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute text-xl inset-y-5 right-2 flex items-center px-2 text-gray-500"
              >
                {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
              </button>
            </div>
            {passwordError && <p className="text-red-400 pl-4 text-sm">{passwordError}</p>}
          </div>

          <div className="p-2 relative w-1/2">
            <label className='text-sm font-medium tracking-wide'>Confirm password</label>
            <div className="relative">
              <input
                className='w-full border-2 border-gray-300 rounded-xl p-3 mt-1 h-11 bg-transparent'
                placeholder=''
                type={showCPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleCPasswordVisibility}
                className="absolute text-xl inset-y-5 right-2 flex items-center px-2 text-gray-500"
              >
                {showCPassword ? (<FaEyeSlash />) : (<FaEye />)}
              </button>
            </div>
          </div>
        </div>
        <div className="h-6">
          {commonError && <p className='text-center text-red-500 text-lg font-medium'>{commonError}</p>}
        </div>

        <div className='mt-2 gap-y-4 flex justify-center items-center h-10'>
          {loading ? <Loader /> : <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out rounded-xl bg-secondary-blue text-white text-lg font-bold w-11/12 h-11' onClick={submitHandler}>Sign up</button>}
        </div>
        <div className='mt-4 gap-y-4 flex justify-center items-center'>

          <div onClick={() => Glogin()}>
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="mr-2">Sign in with Google</span>

              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" /><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
            </a>
          </div>

        </div>
        <div className="mt-3 flex justify-center items-center">
          <p className='font-sm text-base text-gray-600'>Already have an account? </p>
          <Link to='/login'><button className='text-secondary-blue text-base font-sm ml-2 hover:scale-[1.02]' onClick={handleLoginClick}>Sign in</button></Link>
        </div>
      </div>

      <div className="flex">

      </div>
    </div>
  )
}