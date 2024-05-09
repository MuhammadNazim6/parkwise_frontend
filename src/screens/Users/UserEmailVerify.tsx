import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation, useUserCheckOtpMutation, useUserVerificationMutation } from '../../redux/slices/userApiSlice';
import { setCredentials, deleteEmailInfo } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function UserEmailVerify(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', ''])
  const [register, { isLoading }] = useRegisterMutation()
  const [check] = useUserCheckOtpMutation()
  const [commonError, setCommonError] = useState('')
  const [otpResendText, setOtpResendText] = useState('')
  const [waiToSendOtp, setWaitToSendOtp] = useState(false)
  const [otpTimer,setOtpTimer] = useState(60)
  const [verify] = useUserVerificationMutation()

  useEffect(()=>{
    if(otpTimer === 0){
      setWaitToSendOtp(false);
      setOtpTimer(60); 
    }
  },[otpTimer])


  const handleOTPInput = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode, target } = event;
    const currentInput = target as HTMLInputElement;
    // To move to next colmn
    if (keyCode >= 48 && keyCode <= 57) {
      const newOTP = [...enteredOtp];
      newOTP[index] = currentInput.value
      setEnteredOtp(newOTP)
      console.log(newOTP.join(''));
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
    // For Backspace key
    if (keyCode === 8 && currentInput.value === '') {
      const newOTP = [...enteredOtp];
      setEnteredOtp(newOTP)
      newOTP[index] = ''
      console.log(newOTP.join(''));
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }

  };

  const { emailInfo } = useSelector((state) => state.auth)

  const checkOtp = async (e) => {
    e.preventDefault();
    if (enteredOtp.join('').length !== 6) {
      setCommonError('Incorrect otp entered')
      return
    }
    if (isNaN(parseInt(enteredOtp.join('')))) {
      setCommonError('Incorrect otp entered')
    }

    const data = { email: emailInfo.email, enteredOtp: enteredOtp.join('') }
    const checkOtp = await check(data)

    if (checkOtp?.data?.success) {
      const res = await register(emailInfo).unwrap();
      if (res.success) {
        dispatch(setCredentials({ ...res.data }))
        localStorage.setItem('token',res.token)
        dispatch(deleteEmailInfo())
        navigate('/')
      }
    } else {
      setOtpResendText('')
      setCommonError('Incorrect otp entered')
    }
  }

  const resendOtpFn = async () => {
    setWaitToSendOtp(true)
    const otpInterval = setInterval(()=>{
      setOtpTimer(prevTimer => prevTimer - 1)
      if(otpTimer === 0){
        setWaitToSendOtp(false)
      }
    },1000)
    setTimeout(()=>{
      clearInterval(otpInterval)
    },60000)
    const otpRes = await verify(emailInfo).unwrap()
    console.log(otpRes);

    if (otpRes.success) {
      setCommonError('')
      setOtpResendText('Otp sent successfully')
      setTimeout(() => {
        setOtpResendText('')
      }, 4000)
    }
  }

  return (
    <div className='flex w-full h-screen bg-primary-blue'>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div className="flex flex-col">
          <div className="p-32">
            <h1 className='text-2xl text-center text-black leading-normal'>Please enter the OTP sent to your email ending with ***********{emailInfo.email.slice(+emailInfo.email.length - 15)} and verify that its you</h1>
          </div>
        </div>
      </div>
      <div className="w-full bg-white mr-0 rounded-l-3xl overflow-hidden">
        <div className="flex justify-center items-end p-8 text-center h-1/3 lg:hidden">
          <label htmlFor="">Please enter the OTP sent to your email ending with '****{emailInfo.email.slice(+emailInfo.email.length - 15)} and verify that its you</label>
        </div>
        <div className="flex justify-center lg:items-end lg:pb-9 items-start mt-3 h-1/3 lg:h-2/4 ">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              className='border-2 border-gray-400 w-12 h-12 md:w-14 md:h-14 m-0.5 md:m-2.5 md:pl-5 pl-4 text-2xl'
              maxLength={1}
              type='text'
              autoFocus={index === 0}
              ref={(ref) => (inputRefs.current[index] = ref as HTMLInputElement)}
              onKeyUp={(event) => handleOTPInput(index, event)}
            />
          ))}

        </div>
        <div className="lg:flex lg:justify-center lg:items-start lg:h-2/3">
          <form onSubmit={checkOtp}>
            <div className="text-center h-1/2 lg:h-1/3">
              <div className="h-14">
                <h1 className='text-red-600 text-xl font-medium'>{commonError}</h1>
                <h1 className='text-green-600 text-xl font-medium'>{otpResendText}</h1>
              
              </div>
             {waiToSendOtp? <p className='text-lg  w-80'>Try again after {otpTimer} seconds</p> : <p className='text-lg w-80'><span>didn't recieve otp ?? </span><span onClick={resendOtpFn} className='text-blue-500 hover:text-blue-800 active:scale-[.98] active:duration-75 transition-all cursor-pointer'> resend OTP</span></p>}
              <button type='submit' className='text-white mt-5 bg-secondary-blue p-3 w-3/6 lg:w-5/6 text-base font-medium ml-2 hover:scale-[1.02] rounded-lg active:scale-[.98] active:duration-75 transition-all'>Verify</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserEmailVerify