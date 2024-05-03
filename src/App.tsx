import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactToast from './components/Common/ReactToast';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from './script/toast'
import 'toastify-js/src/toastify.css';
import './App.css';
import AppRouter from './routes/AppRouter';

import LandingPage from './screens/Users/LandingPage';
import Login_Signup from './screens/Users/Login_Signup';
import Login_SignupProvider from './screens/Provider/Login_SignupProvider';
import Login_Admin from './screens/Admin/Login_Admin';
import EmailVerification from './screens/Common/EmailVerification';
import FindSpots from './screens/Users/UserHome';


function App() {
  return (
    <BrowserRouter>
      <ReactToast />
      <AppRouter />
    </BrowserRouter>

  )
}

export default App
