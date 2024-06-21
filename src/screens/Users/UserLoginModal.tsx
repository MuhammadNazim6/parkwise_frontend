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
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useCommonLoginMutation } from "@/redux/slices/commonSlice";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from "../../redux/slices/authSlice";
import { Loader } from '../../components/Common/BootstrapElems'



function UserLoginModal({ isOpen, onClose , url}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('')
  const [commonError, setCommonError] = useState('')
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [commonLogin, { isLoading }] = useCommonLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setEmailError('')
      setCommonError('')
      const emailRegex = /^\S+@\S+\.\S+$/;
      const passwordRegex =
        /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;

      if (!email.match(emailRegex) || !password.match(passwordRegex)) {
        if (!email) {
          setEmailError('Email is required')
        } else if (!email.match(emailRegex)) {
          setEmailError('Enter a valid email')
        }
        if (!password) {
          setCommonError('Password is required')
        } else if (!password.match(passwordRegex)) {
          setCommonError('Incorrect username or password')
        }
      } else {
        const formData = {
          email,
          password,
        };

        const res = await commonLogin(formData).unwrap()
        if (res.success) {
          if (res.data.role === 'user') {
            dispatch(setCredentials({ ...res.data }));
            localStorage.setItem('token', res.token)
            onClose()
            url ?  navigate(url) : null;
          } else {
            setCommonError('Incorrect username or password')
          }
        } else {
          setCommonError('Incorrect username or password')
        }
      }
    } catch (err) {
      console.log('Error catched while logging in ');

    }
  };



  return (
    <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className='ml-10'>
        <ModalBody p={8} my={20}>
          <form onSubmit={submitHandler}>
            <div className="h-24">
              <label className="text-lg font-medium tracking-wide">Email</label>
              <input
                className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent h-12"
                placeholder="Enter your email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-400 pl-2">{emailError}</p>}
            </div>

            <div className="mt-2 h-24">
              <label className="text-lg font-medium tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 bg-transparent h-12"
                  placeholder="Enter your password"
                  type={showPassword ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute text-sm inset-y-7 right-2 flex items-center px-2 text-gray-500"
                >
                  {showPassword ? (< FaEye />) : (<FaEyeSlash />)}
                </button>
              </div>
              {commonError && <p className="text-red-400 pl-2 text-sm">{commonError}</p>}
            </div>

            <div className="mt-2 h-12">
            <Link to="/login/forgotPassword">
              {" "}
              <button
                type="button"

                className="font-medium text-base text-secondary-blue hover:scale-[1.02]"
              >
                Forgot password?
              </button>
            </Link>
            </div>

            <div className="mt-4 gap-y-4 flex justify-center items-center">
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out rounded-xl bg-secondary-blue text-white text-lg font-bold w-11/12 h-11"
                >
                  Sign in
                </button>
              )}

            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UserLoginModal