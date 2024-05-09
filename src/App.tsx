import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'toastify-js/src/toastify.css';
import './App.css';
import AppRouter from './routes/AppRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster as HotToast } from 'react-hot-toast';
import { Toaster } from "@/components/ui/toaster"

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId = {clientId}>
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
