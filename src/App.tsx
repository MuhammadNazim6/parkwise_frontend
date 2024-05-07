import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'toastify-js/src/toastify.css';
import './App.css';
import AppRouter from './routes/AppRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
import { Toaster as HotToast } from 'react-hot-toast';
import { Toaster } from "@/components/ui/toaster"


function App() {

  return (
    <GoogleOAuthProvider clientId='481027372645-feaf336abblaj6uve6p7plcr377iiirl.apps.googleusercontent.com'>
      <BrowserRouter>
        <HotToast
          position="top-right"
          reverseOrder={false}
        />
        <AppRouter />
        <Toaster/>
      </BrowserRouter>
    </GoogleOAuthProvider>


  )
}

export default App
