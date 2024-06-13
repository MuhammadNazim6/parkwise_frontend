import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'toastify-js/src/toastify.css';
import './App.css';
import AppRouter from './routes/AppRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster as HotToast } from 'react-hot-toast';
import { Toaster } from "@/components/ui/toaster"
import { ChakraProvider } from '@chakra-ui/react'
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
export const socket = io('http://localhost:3000');


function App() {

  const { userInfo, providerInfo } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (userInfo) {
      socket.emit('register', userInfo.id);
    } else if (providerInfo) {
      socket.emit('register', providerInfo.id);
    }

    // socket.emit('chatMessage', { sender: 'Nazim', recipient: '663aa143844fcd3e079b0a1f', message: 'Helllo my dear friends i am user' });
    return () => {
      socket.disconnect();
    };

  }, [userInfo, providerInfo, socket])


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
