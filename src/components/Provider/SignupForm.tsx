import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useProviderRegisterMutation, useProviderVerificationMutation } from '../../redux/slices/providerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../Common/BootstrapElems'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { setProviderCredentials, setEmailInfo } from '../../redux/slices/authSlice';
import { toast } from '../../script/toast'


export default function SignupForm(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null)

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [commonError, setCommonError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  }

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [verify] = useProviderVerificationMutation()
  const [loading, setLoading] = useState(false);


  const { providerInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (providerInfo) {
      navigate('/provider')
    }
  }, [navigate, providerInfo])

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
    name:string;
    email:string;
    password:string;
    mobile:string;
}

  const handleRegistration = async (formData:FormData) => {
    try {
      setLoading(true)

      const otpRes = await verify(formData)
      console.log(otpRes.data.success);

      if (otpRes.data.success) {
        dispatch(setEmailInfo(formData))
        setLoading(false);
        navigate('/provider/email-verify')
      } else {
        setCommonError(otpRes.data.message);
        setLoading(false)
      }

    } catch (error) {
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
          <input className='w-full border-2 border-gray-300 rounded-xl p-3 h-11 mt-1 bg-transparent'  type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {nameError && <p className="text-red-400 pl-4 text-sm">{nameError}</p>}
        </div>
        <div className="h-20 mt-3">
          <label className='text-sm font-medium tracking-wide' >Email</label>
          <input className='w-full border-2 border-gray-300 rounded-xl p-3 h-11 mt-1 bg-transparent'  type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <p className="text-red-400 pl-4 text-sm">{emailError}</p>}
        </div>
        <div className="h-20 mt-3">
          <label className='text-sm font-medium tracking-wide' >Mobile</label>
          <input className='w-full border-2 border-gray-300 rounded-xl p-3 mt-1 h-11 bg-transparent'  type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
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
        {commonError && <p className='text-center text-red-500 '>{commonError}</p>}
        </div>

        <div className='mt-2 gap-y-4 flex justify-center items-center h-10'>
          {loading ? <Loader /> : <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out rounded-xl bg-primary-provider text-white text-lg font-bold w-11/12 h-11' onClick={submitHandler}>Sign up</button>}
        </div>
        <div className="mt-3 flex justify-center items-center">
          <p className='font-sm text-base text-gray-600'>Already have an account? </p>
          <Link to='/login'><button className='text-secondary-blue text-base font-sm ml-2 hover:scale-[1.02]' onClick={props.toggleFn}>Sign in</button></Link>
        </div>
      </div>
    </div>

  )
}