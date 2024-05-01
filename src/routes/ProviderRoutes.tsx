import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignupProvider from '../screens/Provider/SignupProvider';
import ForgotPasswordProvider from '../screens/Provider/ForgotPasswordProvider';
import EmailVerifProvider from '../screens/Provider/EmailVerifProvider'

function ProviderRouter() {
  return (
    <Routes>
      <Route path='signup' element={<SignupProvider />} />
      <Route path='forgotpassword' element={<ForgotPasswordProvider />} />
      <Route path='email-verify' element={<EmailVerifProvider/>} />
    </Routes>
  )
}

export default ProviderRouter