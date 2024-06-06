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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

function OtpModal({ isOpen, onClose, userEnteredOtp, setUserEnteredOtp, checkOtpFn, otpErr }) {

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify your email</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <p className='mt-5 text-center'> Enter otp sent to mail</p>
            <div className="pt-4">
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
              <p className='text-center text-red-700'>{otpErr ? otpErr : null}</p>
              <div className="flex justify-center space-x-5 mt-10">
                <button type="button" className="bg-gray-400 hover:bg-gray-300 text-sm  text-white font-semibold p-2 w-24 rounded transition-colors duration-300" onClick={onClose}>
                  Cancel
                </button>
                <button type='button' className='bg-primary-provider hover:bg-secondary-provider text-sm  text-white font-semibold p-2 w-24 rounded transition-colors duration-300' onClick={checkOtpFn}>Verify</button>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OtpModal