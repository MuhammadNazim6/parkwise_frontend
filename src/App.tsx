import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'toastify-js/src/toastify.css';
import './App.css';
import AppRouter from './routes/AppRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster as HotToast } from 'react-hot-toast';
import { Toaster } from "@/components/ui/toaster"
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <ChakraProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <HotToast
            position="top-right"
            reverseOrder={false}
          />
          <AppRouter />
          <Toaster />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ChakraProvider>
  )
}

export default App
