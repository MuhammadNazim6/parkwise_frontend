import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Common/BootstrapElems';
import { useCommForgotPasswordMutation, useUserCheckOtpMutation } from '@/redux/slices/userApiSlice';
import { useCommonResendOtpMutation } from '@/redux/slices/commonSlice';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

function ForgotPassForm(props) {
  const [sendForgotPassword, { isLoading }] = useCommForgotPasswordMutation()
  const [checkOtp] = useUserCheckOtpMutation()
  const [email, setEmail] = useState('')
  const [userEnteredOtp, setUserEnteredOtp] = useState('')
  const [waiToSendOtp, setWaitToSendOtp] = useState(false)
  const [otpTimer, setOtpTimer] = useState(60)
  const [sendOtpCLicked, setSendOtpCLicked] = useState(false)
  const [resendOtp] = useCommonResendOtpMutation()
  const [commonError, setCommonError] = useState('')
  const [otpResendText, setOtpResendText] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    if (otpTimer === 0) {
      setWaitToSendOtp(false);
      setOtpTimer(60);
    }
  }, [otpTimer])

  const resendOtpFn = async () => {
    setWaitToSendOtp(true)
    const otpInterval = setInterval(() => {
      setOtpTimer(prevTimer => prevTimer - 1)
      if (otpTimer === 0) {
        setWaitToSendOtp(false)
      }
    }, 1000)
    setTimeout(() => {
      clearInterval(otpInterval)
    }, 60000)
    const formData = {
      email
    }
    const otpSendRes = await resendOtp(formData).unwrap()
    if (otpSendRes.success) {
      setCommonError('')
      setOtpResendText('Otp sent successfully')
      setTimeout(() => {
        setOtpResendText('')
      }, 4000)
    }
  }

  const verifyOtp = async () => {
    const formData = {
      email: email,
      enteredOtp: userEnteredOtp
    }
    const checkedOtp = await checkOtp(formData).unwrap()
    if (checkedOtp.success) {
      // OTP CORRECT
      navigate('/login/changePassword', {
        state: { email },
        replace: true,
      });

    } else {
      // INCORRECT OTP
      setCommonError('Incorrect otp entered')
      setTimeout(() => {
        setCommonError('')
      }, 4000)
    }
  }


  return (
    <div className='md:bg-white rounded-lg border-gray-200 w-11/12 md:w-2/3'>
      <div className="flex justify-center">
        <div className="">
          <h1 className='text-4xl font-semibold'>Forgot password?</h1>
          {!sendOtpCLicked ? (<p className='font-medium text-lg text-gray-500 tracking-wide'>Dont worry we can help.</p>) : (<p className='font-medium tracking-wide mt-5 text-xl'>Enter otp</p>)}
          <div className='mt-6'>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setEmail(values.email)
                setSubmitting(false);
                // sending request to server for sending otp to the user/provider email 

                const otpSentResponse = await sendForgotPassword(values).unwrap()
                if (otpSentResponse.success) {
                  setSendOtpCLicked(true)
                } else {
                  console.error('Otp not sent');
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className='pt-8'>
                  {!sendOtpCLicked ? (<div className="h-32">
                    <label htmlFor="email" className='text-lg font-medium tracking-wide mt-5'>Enter your email</label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                      placeholder='Enter your email'
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                  </div>) : null}
                  <div className="flex justify-start h-32">
                    {sendOtpCLicked ? (<div className="">
                      <InputOTP className='' value={userEnteredOtp} onChange={(newValue) => setUserEnteredOtp(newValue)} maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot className='border-gray-400 h-12 w-12' index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className='border-gray-400 h-12 w-12' index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className='border-gray-400 h-12 w-12' index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className='border-gray-400 h-12 w-12' index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className='border-gray-400 h-12 w-12' index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot className='border-gray-400 h-12 w-12' index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>) : null}
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <div className="">
                    </div>
                    {sendOtpCLicked ? null : (<Link to='/login'><button className='font-medium text-base text-secondary-blue hover:scale-[1.02]'>Back to login</button></Link>)}
                  </div>
                  <div className="flex justify-center">
                    <p className='text-red-800 text-xl font-medium'>{commonError}</p>
                    <p className='text-green-600 text-xl font-medium'>{otpResendText}</p>
                  </div>
                  <div className='md:mt-3 flex flex-col gap-y-4 '>
                    {sendOtpCLicked ? (waiToSendOtp ? <p className='text-lg  w-80'>Try again after {otpTimer} seconds</p> : <p className='text-lg w-80'><span>didn't recieve otp ?? </span><span onClick={resendOtpFn} className='text-blue-500 hover:text-blue-800 active:scale-[.98] active:duration-75 transition-all cursor-pointer'> resend OTP</span></p>) : null}
                    {sendOtpCLicked ? <p onClick={verifyOtp} className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-primary-provider text-white text-lg font-bold text-center cursor-pointer'>Verify Otp</p> : (isLoading ? (<div className='flex justify-center'> <Loader /></div>) : (<button type="submit" disabled={isSubmitting} className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-secondary-provider text-white text-lg font-bold mt-2'> Send otp</button>))}
                  </div>
                </Form>
              )}
            </Formik>

          </div>
        </div>
      </div>


    </div>
  )
}

export default ForgotPassForm
