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
      // Submitting the form again
        // if (submitBtn.current) {
        //   submitBtn.current.click();
        // }
    }else{
      toast({
        variant:'destructive',
        title: "Incorrect Otp entered",
        description: "",
      })
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    mobile: Yup.string().required('Phone number is required')
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
              console.log(profileDetails.email);
              console.log(values.email);
              
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
              dispatch(setProviderCredentials(data))
              setEmailVerified(false)
              onClose()
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="flex flex-col justify-between sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-medium" htmlFor="name">Name:</label>
                <Field className="block text-gray-900" type="text" name="name" />
              </div>
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />

              <div className="flex flex-col justify-between sm:flex-row items-center  space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-medium" htmlFor="email">Email:</label>
                <Field className="block text-gray-900" type="email" name="email" />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
              <div className="flex flex-col justify-between sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="block text-gray-700 font-medium" htmlFor="mobile">Phone Number:</label>
                <Field className="block text-gray-900" type="text" name="mobile" />
              </div>
              <ErrorMessage name="mobile" component="div" className="text-red-500 text-xs" />
              {emailEdit ? (<div className="pt-4">
                <p className='flex justify-center'>Enter otp sent to the mail </p>
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
                  <button type='button' className='p-2 btn-link' onClick={checkOtpFn}>Verify</button>
                </div>
                {/* <p className="text-red-500 text-sm text-center">Incorrect otp</p> */}

              </div>) : null}



              <div className='flex justify-center space-x-5 pt-8'>
                <button type="button" className="rounded-md px-4 py-2 bg-primary-provider hover:bg-secondary-provider text-white" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" ref={submitBtn} className="rounded-md px-4 py-2 bg-primary-provider hover:bg-secondary-provider text-white" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProEditProfileModal

