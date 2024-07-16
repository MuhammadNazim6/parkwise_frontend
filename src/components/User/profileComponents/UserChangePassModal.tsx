import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import { useToast } from "@/components/ui/use-toast"
import { useCheckUserPasswordMutation, useComChangePasswordMutation } from '@/redux/slices/userApiSlice';
import FloatingLabelInput from '@/components/Common/FloatingInput'
import { Formik } from "formik";
import * as Yup from "yup";
import Lottie from 'lottie-react';
import boxLoader from '../../../assets/Animation/boxLoader.json'
import { FaEyeSlash, FaEye } from "react-icons/fa";



const UserChangePassModal = ({ isOpen, onClose, userId, userEmail }) => {
  const [showCurrPass, setShowCurrPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
  const { toast } = useToast()
  const [checkPassword, { isLoading: isCheckLoading }] = useCheckUserPasswordMutation()
  const [changePassword, { isLoading }] = useComChangePasswordMutation()

  const toggleCurrPassVisibility = () => {
    setShowCurrPass(!showCurrPass);
  };
  const toggleConfPassVisibility = () => {
    setShowConfirmPass(!showConfirmPass);
  }
  const toggleNewPassVisibility = () => {
    setShowNewPass(!showNewPass);
  }
  return (
    <div className="">
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your password</ModalHeader>
          <ModalBody pb={3}>
            <Formik
              initialValues={{
                currentPass: '',
                newPass: '',
                confirmPass: '',
              }}
              onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 0));
                const form = {
                  userId: userId,
                  password: values.currentPass
                }
                const passwordChecked = await checkPassword(form).unwrap()
                if (!passwordChecked.success) {
                  toast({
                    variant: "destructive",
                    title: "Entered password is incorrect",
                    description: "Verify your password and try again",
                  })
                  return
                }

                const formData = {
                  email: userEmail,
                  password: values.newPass
                }
                const changedPassword = await changePassword(formData).unwrap()
                if (changedPassword.success) {
                  toast({
                    title: "Your password has been changed successfully",
                    description: "",
                  })
                  onClose()
                } else {
                  toast({
                    variant: "destructive",
                    title: "Unable to update password, try again later",
                    description: "There were some issues",
                  })
                }
              }}

              validationSchema={Yup.object().shape({
                currentPass: Yup.string()
                  .min(4, "Enter a valid password")
                  .required("Current passwords is required"),
                newPass: Yup.string()
                  .matches(passwordRegex, "Password must be at least 6 characters long, contain at least one special character, and contain alphanumeric characters.")
                  .required("Password is required"),
                confirmPass: Yup.string()
                  .oneOf([Yup.ref('newPass'), null], "Passwords must match")
                  .required("Confirm password is required")
              })}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="w-full">

                        <div className="flex justify-between w-full relative">
                          <FloatingLabelInput label='Current password' id='currentPass' type={showCurrPass ? 'text' : 'password'} value={values.currentPass} onChange={handleChange} errorMsg={errors.currentPass} touched={touched.currentPass} />
                          <button
                            type="button"
                            onClick={toggleCurrPassVisibility}
                            className="absolute right-3 top-10 flex justify-center items-center text-xl md:text-2xl text-gray-400"
                          >
                            {showCurrPass ? (<FaEyeSlash />) : (<FaEye />)}
                          </button>
                        </div>

                        <div className="flex justify-between w-full relative">
                          <FloatingLabelInput label='New password' id='newPass' type={showNewPass ? 'text' : 'password'} value={values.newPass} onChange={handleChange} errorMsg={errors.newPass} touched={touched.newPass} />
                          <button
                            type="button"
                            onClick={toggleNewPassVisibility}
                            className="absolute right-3 top-10 flex justify-center items-center text-xl md:text-2xl text-gray-400"
                          >
                            {showNewPass ? (<FaEyeSlash />) : (<FaEye />)}
                          </button>
                        </div>

                        <div className="flex justify-between w-full relative">
                          <FloatingLabelInput label='Confirm password' id='confirmPass' type={showConfirmPass ? 'text' : 'password'} value={values.confirmPass} onChange={handleChange} errorMsg={errors.confirmPass} touched={touched.confirmPass} />
                          <button
                            type="button"
                            onClick={toggleConfPassVisibility}
                            className="absolute right-3 top-10 flex justify-center items-center text-xl md:text-2xl text-gray-400"
                          >
                            {showConfirmPass ? (<FaEyeSlash />) : (<FaEye />)}
                          </button>
                        </div>
                      </div>


                      <div className="flex justify-end">
                        {isCheckLoading || isLoading ? (
                          <div className="flex justify-center items-center w-full mt-10">
                            <Lottie animationData={boxLoader} className='h-20' />
                          </div>

                        ) : (<div className="mt-5">
                          <button type='submit' className='btn bg-primary-blue text-black hover:bg-secondary-provider text-sm font-semibold p-1 m-2 w-24 rounded transition-colors duration-300'>
                            Save
                          </button>
                          <button type='button' onClick={onClose} className='btn bg-gray-400 hover:bg-gray-300 text-sm  text-black font-semibold p-1 m-2 w-24 rounded transition-colors duration-300'>
                            Cancel
                          </button>
                        </div>)}
                      </div>
                    </form>
                  </>
                )
              }
              }
            </Formik>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div >
  )
}

export default UserChangePassModal