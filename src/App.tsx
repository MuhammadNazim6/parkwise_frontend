import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import ReactToast from './components/Common/ReactToast';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from './script/toast'
import 'toastify-js/src/toastify.css';
import './App.css';
import AppRouter from './routes/AppRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  // const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId='481027372645-feaf336abblaj6uve6p7plcr377iiirl.apps.googleusercontent.com'>
      <BrowserRouter>
        {/* <ReactToast /> */}
        <AppRouter />
      </BrowserRouter>
    </GoogleOAuthProvider>


  )
}

export default App
