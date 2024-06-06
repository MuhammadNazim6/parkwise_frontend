import React, { useState, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUpdateProvProfileDetailsMutation, useProviderVerificationMutation, useProviderCheckOtpMutation } from '@/redux/slices/providerSlice';
import { setCredentials, setProviderCredentials } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useToast } from "@/components/ui/use-toast"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Lottie from 'lottie-react';
import boxLoader from '../../assets/Animation/boxLoader.json'


function ProEditProfileModal({ isOpen, onClose, profileDetails, setProviderDetails }) {
  const submitBtn = useRef(null);

  const [emailEdit, setEmailEdit] = useState(false)
  const [userEnteredOtp, setUserEnteredOtp] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [changedEmail, setChangedEmail] = useState('')
  const [updateDetails] = useUpdateProvProfileDetailsMutation()
  const [sendOtp] = useProviderVerificationMutation()
  const [checkOtp] = useProviderCheckOtpMutation()
  const dispatch = useDispatch()
  const { toast } = useToast()


  const checkOtpFn = async () => {
    const data = {
      email: changedEmail,
      enteredOtp: userEnteredOtp
    }
    const checked = await checkOtp(data).unwrap()
    if (checked.success) {
      setEmailEdit(false)
      setEmailVerified(true)
      toast({
        title: "Your email has been verified",
        description: "",
      })
      setTimeout(() => {
        submitBtn.current.click()
        setUserEnteredOtp('')
      }, 100);
    } else {
      toast({
        variant: 'destructive',
        title: "Incorrect Otp entered",
        description: "",
      })
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    mobile: Yup.string().required('Phone number is required'),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center ml-24 items-center text-sm">
      <div className="bg-white rounded-lg p-8 modal-box max-w-lg">
        <h2 className="text-xl font-semibold mb-8 text-center">Edit profile details</h2>
        <Formik
          initialValues={{
            name: profileDetails.name,
            email: profileDetails.email,
            mobile: profileDetails.mobile,
            _id: profileDetails._id
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {

            if (profileDetails.email !== values.email) {
              if (!emailVerified) {
                setChangedEmail(values.email)
                setEmailEdit(true)
                const data = {
                  email: values.email,
                  name: profileDetails.name
                }
                const otpSent = await sendOtp(data).unwrap()
                otpSent.success ? (toast({
                  title: "Otp sent successfully",
                  description: "",
                })) : null
                return
              }
            }

            const response = await updateDetails(values).unwrap()
            if (response.success) {
              setSubmitting(false)
              const data = response.data;
              setProviderDetails((prev) => ({ ...prev, name: data.name, email: data.email, mobile: data.mobile }))
              dispatch(setProviderCredentials({ email: data.email, mobile: data.mobile, name: data.name, role: 'provider', id: data._id, approvalStatus: data.approvalStatus }))
              setEmailVerified(false)
              onClose()
              toast({
                title: "Profile have been updated",
                description: "",
              })
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="space-y-6 mt-4 w-full">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <label className="block text-gray-700 font-medium w-1/3 sm:text-right" htmlFor="name">Name:</label>
                  <Field
                    className="block w-full sm:w-2/3 text-gray-900 border border-gray-300 p-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1 sm:ml-[33%]" />

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <label className="block text-gray-700 font-medium w-1/3 sm:text-right" htmlFor="email">Email:</label>
                  <Field
                    className="block w-full sm:w-2/3 text-gray-900 border border-gray-300 p-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 sm:ml-[33%]" />

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <label className="block text-gray-700 font-medium w-1/3 sm:text-right" htmlFor="mobile">Mobile:</label>
                  <Field
                    className="block w-full sm:w-2/3 text-gray-900 border border-gray-300 p-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="mobile"
                    id="mobile"
                  />
                </div>
                <ErrorMessage name="mobile" component="div" className="text-red-500 text-xs mt-1 sm:ml-[33%]" />
              </div>
              {emailEdit ? (<div className="pt-4">
                <div className="flex justify-center p-5">
                  <InputOTP className='' value={userEnteredOtp} onChange={(newValue) => setUserEnteredOtp(newValue)} maxLength={6} >
                    <InputOTPGroup>
                      <InputOTPSlot className='border-gray-400 h-10 w-10' index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot className='border-gray-400 h-10 w-10' index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot className='border-gray-400 h-10 w-10' index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot className='border-gray-400 h-10 w-10' index={3} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot className='border-gray-400 h-10 w-10' index={4} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot className='border-gray-400 h-10 w-10' index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex justify-center space-x-5">
                  <button type="button" className="bg-gray-400 hover:bg-gray-300 text-sm  text-white font-semibold p-2 w-24 rounded transition-colors duration-300" onClick={onClose}>
                    Cancel
                  </button>
                  <button type='button' className='bg-primary-provider hover:bg-secondary-provider text-sm  text-white font-semibold p-2 w-24 rounded transition-colors duration-300' onClick={checkOtpFn}>Verify</button>
                </div>
              </div>) : null}
              {!emailEdit ? (isSubmitting ? (<div className="flex justify-center items-center w-full mt-10">
                <Lottie animationData={boxLoader} className='h-20' />
              </div>) : (<div className='flex justify-center space-x-5 pt-8'>
                <button type="button" className="bg-gray-400 hover:bg-gray-300 text-sm  text-white font-semibold p-2 w-24 rounded transition-colors duration-300" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" ref={submitBtn} className=" bg-primary-provider hover:bg-secondary-provider text-sm  text-white font-semibold p-2 w-24 rounded transition-colors duration-300" disabled={isSubmitting}>
                  Update
                </button>
              </div>)) : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProEditProfileModal

