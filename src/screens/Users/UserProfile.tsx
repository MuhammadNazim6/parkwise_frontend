import React, { useEffect, useRef, useState } from 'react'
import { RiImageEditLine } from "react-icons/ri";
import { Formik } from "formik";
import * as Yup from "yup";
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useUpdateProfileMutation, useFetchUserProfilePicMutation, useGetUserDetailsMutation, useFetchUserBookingsCountMutation } from '@/redux/slices/userApiSlice';
import { setCredentials } from '@/redux/slices/authSlice';
import boxLoader from '../../assets/Animation/boxLoader.json'
import profile_icon from '../../assets/Images/profile-icon.jpg'
import { useToast } from "@/components/ui/use-toast"
import BookingsListModal from '@/components/User/profileComponents/BookingsListModal';
import { useDisclosure } from '@chakra-ui/react'
import { useProviderVerificationMutation, useProviderCheckOtpMutation } from '@/redux/slices/providerSlice';
import OtpModal from '@/components/User/profileComponents/userProfileOtpModal';
import { MdOutlinePassword } from "react-icons/md";
import UserChangePassModal from '@/components/User/profileComponents/UserChangePassModal';
import UserWalletModal from '@/components/User/profileComponents/UserWalletModal';
import { motion } from "framer-motion"
import CountUp from "react-countup"




function UserProfile() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const submitBtn = useRef(null);
  const dispatch = useDispatch()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const [editProfile, setEditProfile] = useState(false)
  const [profileImage, setProfileImage] = useState(profile_icon)
  const [userDetails, setUserDetails] = useState()
  const [addedFile, setAddedFile] = useState(null)
  const [changedImage, setChangedImage] = useState(null)
  const profileInputRef = useRef(null)

  const [getProfilePic] = useFetchUserProfilePicMutation()
  const [getUserDetails] = useGetUserDetailsMutation()
  const [getUserBookingsCount] = useFetchUserBookingsCountMutation()
  const { toast } = useToast()
  const { isOpen: isBookingsModalOpen, onOpen: openBookingsModal, onClose: closeBookingsModal } = useDisclosure()
  const { isOpen: isOtpModalOpen, onOpen: openOtpModal, onClose: closeOtpModal } = useDisclosure()
  const { isOpen: isOpenChangePassModal, onOpen: openChangePassModal, onClose: closeChangePassModal } = useDisclosure()
  const { isOpen: isOpenWalletModal, onOpen: openWalletModal, onClose: closeWalletModal } = useDisclosure()

  const [sendOtp, { isLoading: isLoadingOtpSent }] = useProviderVerificationMutation()
  const [checkOtp] = useProviderCheckOtpMutation()
  const [emailEdit, setEmailEdit] = useState(false)
  const [userEnteredOtp, setUserEnteredOtp] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [changedEmail, setChangedEmail] = useState('')
  const [otpErr, setOtpErr] = useState('')
  const [bookingCount, setBookingCount] = useState(0)
  const [bookingsPage, setBookingsPage] = useState(1)

  useEffect(() => {
    fetchUserProfilePic()
    fetchUserDetails()
    fetchBookingsCount()
  }, [userInfo])

  const fetchUserProfilePic = async () => {
    const response = await getProfilePic(userInfo.id).unwrap()
    if (response.success) {
      setProfileImage(response.data)
    }
  }
  const fetchUserDetails = async () => {
    const response = await getUserDetails(userInfo.id).unwrap()
    if (response.success) {
      setUserDetails(response.data)
    }
  }

  const fetchBookingsCount = async () => {
    const response = await getUserBookingsCount(userInfo.id).unwrap()
    if (response.success) {
      setBookingCount(response.data)
    }
  }

  const handleSetEditProfile = () => {
    setChangedImage(null)
    setEditProfile((prev) => !prev)
  }
  const handleProfilePicInput = () => {
    profileInputRef.current.click()
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setAddedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setChangedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

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
      closeOtpModal()
      setUserEnteredOtp('')
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
      setOtpErr('Incorrect otp entered')
      setTimeout(() => {
        setOtpErr('')
      }, 2000);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
      }}>
      <div className="flex justify-center text-lg md:text-2xl font-semibold text-gray-800"><p>My Profile</p></div>
      <div className="flex justify-center mt-8 relative ">
        <img src={changedImage ? changedImage : profileImage} alt="" className='object-cover rounded-full absolute z-10 w-28 h-28' />
        <div className='relative h-28 w-28 bg-blue-200 rounded-full shadow-xl'>
          {editProfile ? (<div className='absolute z-20 bottom-1 right-3 transform bg-white p-1 rounded-full'>
            <RiImageEditLine className="text-blue-500 text-xl cursor-pointer hover:filter hover:text-gray-600 transition duration-300" onClick={handleProfilePicInput} />
            <input type='file' ref={profileInputRef} className='hidden' onChange={handleFileChange} />
          </div>) : null}
        </div>
      </div>
      {editProfile ?
        (
          <>
            <Formik
              initialValues={{
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                mobile: userInfo.mobile != 0 ? userInfo.mobile : ''
              }}
              onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 0));
                if (userInfo.email !== values.email) {
                  if (!emailVerified) {
                    setChangedEmail(values.email)
                    setEmailEdit(true)
                    openOtpModal()
                    const data = {
                      email: values.email,
                      name: userInfo.name
                    }
                    const otpSent = await sendOtp(data).unwrap()
                    otpSent.success ? (toast({
                      title: "Otp sent successfully",
                      description: "",
                    })) : null
                    return
                  }
                }

                const formdata = new FormData()
                formdata.append('id', values.id)
                formdata.append('name', values.name)
                formdata.append('email', values.email)
                formdata.append('mobile', values.mobile)

                if (addedFile) { formdata.append('profile', addedFile) }

                const updated = await updateProfile(formdata).unwrap()
                if (updated.success) {
                  setEmailVerified(false)
                  dispatch(setCredentials({ email: values.email, mobile: values.mobile, name: values.name, role: 'user', id: values.id }))
                  handleSetEditProfile()
                  toast({
                    title: "Profile updated successfully",
                    description: "",
                  })
                } else {
                  toast({
                    variant: "destructive",
                    title: "Some error occured while updating profile",
                    description: "There was a problem with your request.",
                  })
                }
              }}

              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .min(5, "Must be 5 characters or more")
                  .required("Name is required"),
                mobile: Yup.string()
                  .min(10, "Enter a valid mobile number")
                  .max(10, "Enter a valid mobile number")
                  .required("Mobile number is required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
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
                  <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="p-6 rounded-lg lg:w-2/3 w-full ">
                      <FloatingLabelInput label='name' id='name' type='text' value={values.name} onChange={handleChange} errorMsg={errors.name} touched={touched.name} />
                      <FloatingLabelInput label='email' id='email' type='text' value={values.email} onChange={handleChange} errorMsg={errors.email} touched={touched.email} />
                      <FloatingLabelInput label='mobile' id='mobile' type='number' value={values.mobile} onChange={handleChange} errorMsg={errors.mobile} touched={touched.mobile} />

                      {!isLoading ? (
                        <>
                          <div className="flex justify-center mt-8">
                            <button ref={submitBtn} className='btn hover:bg-[#5b87e5a1] w-full bg-primary-blue'>Save</button>
                          </div>
                          <div className="flex justify-center mt-2">
                            <button className='btn w-full btn-outline hover:bg-[#aec2eca1] hover:text-black' onClick={handleSetEditProfile}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-center items-center mt-5">
                          <Lottie animationData={boxLoader} className='w-28' />
                        </div>
                      )}

                    </form>
                  </div>
                )
              }
              }
            </Formik>
          </>
        )
        : (<div className='flex justify-center'>
          <div className="lg:w-2/3 w-full">
            <div className="flex justify-center mt-8">
              <div className='font-bold md:text-3xl text-xl text-gray-800'>{userInfo.name}</div>
            </div>
            <div className="flex justify-center">
              <div className='mt-1 md:text-xl text-gray-800'>{userInfo.email}</div>
            </div>
            <div className="flex justify-center">
              <div className='mt-1 text-lg text-gray-800'>{userInfo.mobile != 0 ? userInfo.mobile : null}</div>
            </div>
            <div className="flex bg-primary-blue justify-between m-4 p-2 rounded-lg shadow-xl">
              <div onClick={openBookingsModal} className='w-1/3 font-extrabold text-center p-4 m-2 rounded-lg hover:text-black text-gray-700'>
                <span className='md:text-2xl cursor-pointer'>
                  <CountUp
                    className='md:text-2xl'
                    end={bookingCount}
                    duration={3}
                    delay={1}
                  />
                </span>
                <p className='text-sm cursor-pointer text-nowrap' >Bookings</p>
              </div>

              <div onClick={openWalletModal} className='w-1/3 font-extrabold text-center p-4 m-2 rounded-lg hover:text-black text-gray-700'>
                <span className='md:text-2xl cursor-pointer'>
                  Rs
                  <CountUp
                    className='ml-1 md:text-2xl'
                    end={userDetails && userDetails.wallet.balance}
                    duration={2}
                    delay={1}
                  />
                </span>
                <p className='text-sm cursor-pointer text-nowrap'>Wallet</p>
              </div>
              <Link to='/user/chats' className='w-1/3 font-extrabold text-center p-4 m-2 rounded-lg hover:text-black text-gray-700'>
                <span className='cursor-pointer'>
                  <CountUp
                    className='md:text-2xl'
                    end={33}
                    duration={4}
                    delay={1}
                  />
                </span>
                <p className='text-sm cursor-pointer text-nowrap'>Messages</p>
              </Link>
            </div>
            <div className="flex bg-gray-100 justify-between m-5 rounded-lg shadow-md transition-transform hover:scale-[1.01] ease-in-out duration-300">
              <div className='w-full text-black flex justify-center items-center space-x-1 p-1 m-2 rounded-lg cursor-pointer' onClick={handleSetEditProfile}><RiImageEditLine /><span className='text-md' >Edit profile</span></div>
            </div>
            <div className="flex bg-gray-100 justify-between m-5 rounded-lg shadow-md transition-transform hover:scale-[1.01] ease-in-out duration-300">
              <div className='w-full text-black flex justify-center items-center space-x-1 p-1 m-2 rounded-lg cursor-pointer' onClick={openChangePassModal}><MdOutlinePassword /><span className='text-md'>Change password</span></div>
            </div>
          </div>
        </div>)}

      {(<BookingsListModal isOpen={isBookingsModalOpen} onClose={closeBookingsModal} userId={userInfo.id} page={bookingsPage} setPage={setBookingsPage} />)}
      <OtpModal isOpen={isOtpModalOpen} onClose={closeOtpModal} userEnteredOtp={userEnteredOtp} setUserEnteredOtp={setUserEnteredOtp} checkOtpFn={checkOtpFn} otpErr={otpErr} isLoadingOtpSent={isLoadingOtpSent} />
      <UserChangePassModal isOpen={isOpenChangePassModal} onClose={closeChangePassModal} userId={userInfo.id} userEmail={userInfo.email} />
      {userDetails && <UserWalletModal isOpen={isOpenWalletModal} onClose={closeWalletModal} wallet={userDetails.wallet} />}
    </motion.div>
  )
}

export default UserProfile


// ________________________


const FloatingLabelInput = ({ label, id, type, value, onChange, errorMsg, touched }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mt-6">
      <input
        type={type}
        id={id}
        className={`block w-full pt-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 peer ${isFocused || value ? 'placeholder-transparent' : ''}`}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        value={value}
      />
      <label
        htmlFor={id}
        className={`absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2.5 peer-focus:left-2.5 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 ${isFocused || value ? 'scale-75 -translate-y-8' : ''}`}
      >
        {label}
      </label>
      {errorMsg && touched && (
        <div className="text-red-500 text-sm m-2">{errorMsg}</div>
      )}
    </div>
  );
};

