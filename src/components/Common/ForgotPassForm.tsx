import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { LoaderWhite } from '../../components/Common/BootstrapElems';
import { useCommForgotPasswordMutation, useUserCheckOtpMutation } from '@/redux/slices/userApiSlice';
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
  const [sendOtpCLicked, setSendOtpCLicked] = useState(false)


  const verifyOtp = async () => {
    const formData = {
      email: email,
      enteredOtp: userEnteredOtp
    }
    const checkedOtp = await checkOtp(formData).unwrap()
    if (checkedOtp.success) {
      // OTP CORRECT
      alert('OTP CORRECT')
    } else {
      // INCORRECT OTP
      alert('OTP ININININICORRECT')
    }
  }


  return (
    <div className='bg-white p-10 rounded-lg border-2 border-gray-200 h-2/3 w-5/6 md:w-2/3'>
      <h1 className='text-4xl font-semibold'>Forgot password?</h1>
      {!sendOtpCLicked ? (<p className='font-medium text-lg text-gray-500 tracking-wide'>Dont worry we can help.</p>) : (<p className='font-medium tracking-wide mt-5 text-xl'>Enter otp</p>) }
      <div className='mt-10'>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('Form submitted:', values);
            setEmail(values.email)
            setSubmitting(false);
            // sending request to server for sending otp to the user/provider email 

            const otpSentResponse = await sendForgotPassword(values).unwrap()
            if (otpSentResponse.success) {
              setSendOtpCLicked(true)
            } else {
              // OTP NOT SENT
            }

          }}
        >
          {({ isSubmitting }) => (
            <Form className='bg p-7'>
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
              <div className="flex justify-evenly h-32">
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
                <Link to='/login'><button className='font-medium text-base text-secondary-blue hover:scale-[1.02]'>Back to login</button></Link>
              </div>
              <div className='md:mt-3 flex flex-col gap-y-4 '>
                {sendOtpCLicked ? (waiToSendOtp ? <p className='text-lg  w-80'>Try again after  seconds</p> : <p className='text-lg w-80'><span>didn't recieve otp ?? </span><span className='text-blue-500 hover:text-blue-800 active:scale-[.98] active:duration-75 transition-all cursor-pointer'> resend OTP</span></p>) : null}
                {sendOtpCLicked ? <p onClick={verifyOtp} className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-primary-provider text-white text-lg font-bold w-96 text-center cursor-pointer'>Verify Otp</p> : <button type="submit" disabled={isSubmitting} className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-secondary-provider text-white text-lg font-bold w-96'>{isLoading ? <LoaderWhite /> : 'Send otp'}</button>}
              </div>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
}

export default ForgotPassForm
