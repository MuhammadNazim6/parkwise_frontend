import React from 'react'
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
import FloatingLabelInput from '@/components/Common/FloatingInput'
import { Formik } from "formik";
import { useToast } from "@/components/ui/use-toast"
import * as Yup from "yup";
import { useCheckProvPasswordMutation } from '@/redux/slices/providerSlice';
import { useComChangePasswordMutation } from '@/redux/slices/userApiSlice';
import boxLoader from '../../assets/Animation/boxLoader.json'
import Lottie from 'lottie-react';


function ProvChangePassModal({ isOpen, onClose, providerId, provEmail }) {
  const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
  const { toast } = useToast()
  const [checkPassword, { isLoading: isCheckLoading }] = useCheckProvPasswordMutation()
  const [changePassword, { isLoading }] = useComChangePasswordMutation()


  return (
    <div className="">
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <Formik
              initialValues={{
                currentPass: '',
                newPass: '',
                confirmPass: '',
              }}
              onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 0));
                const form = {
                  provId: providerId,
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
                  email: provEmail,
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
                      <div className="">
                        <FloatingLabelInput label='Current password' id='currentPass' type='text' value={values.currentPass} onChange={handleChange} errorMsg={errors.currentPass} touched={touched.currentPass} />
                        <FloatingLabelInput label='New password' id='newPass' type='text' value={values.newPass} onChange={handleChange} errorMsg={errors.newPass} touched={touched.newPass} />
                        <FloatingLabelInput label='Confirm password' id='confirmPass' type='text' value={values.confirmPass} onChange={handleChange} errorMsg={errors.confirmPass} touched={touched.confirmPass} />
                      </div>
                      <div className="flex justify-end">
                        {isCheckLoading || isLoading ? (
                          <div className="flex justify-center items-center w-full mt-10">
                            <Lottie animationData={boxLoader} className='h-20' />
                          </div>

                        ) : (<div className="mt-5">
                          <button type='submit' className='btn bg-primary-provider hover:bg-secondary-provider text-sm  text-white font-semibold p-2 m-2 w-24 rounded transition-colors duration-300'>
                            Save
                          </button>
                          <button type='button' onClick={onClose} className='btn bg-gray-400 hover:bg-gray-300 text-sm  text-white font-semibold p-2 m-2 w-24 rounded transition-colors duration-300'>
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

export default ProvChangePassModal


