import React, { useRef } from 'react'
function EmailVerification() {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleOTPInput = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode, target } = event;
    const currentInput = target as HTMLInputElement;

    // To move to next colmn
    if (keyCode >= 48 && keyCode <= 57) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }

    // For Backspace key
    if (keyCode === 8 && currentInput.value === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className='flex w-full h-screen lg:bg-primary-blue'>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center">
        <div className="flex flex-col">
          <div className="p-32">
            <h1 className='text-2xl text-center leading-normal'>Please enter the OTP sent to your email ending with '****z66@gmail.com' and verify that its you</h1>
          </div>
        </div>
      </div>
      <div className="w-full bg-white mr-0 rounded-l-3xl overflow-hidden">
        <div className="flex justify-center items-end p-8 text-center h-1/3 lg:hidden">
          <label htmlFor="">Please enter the OTP sent to your email ending with '****z66@gmail.com' and verify that its you</label>
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
          <div className="text-center h-1/2 lg:h-1/3">
            <p>Try "Resend OTP" if you didn't get it</p>
            <p className='text-blue-500 cursor-pointer hover:text-blue-800 active:scale-[.98] active:duration-75 transition-all'>resend OTP</p>
            <button className='text-gray-800 mt-5 bg-primary-blue p-3 w-3/6 lg:w-5/6 text-base font-medium ml-2 hover:scale-[1.02] rounded-lg active:scale-[.98] active:duration-75 transition-all'>Verify</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification