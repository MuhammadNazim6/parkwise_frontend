import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'toastify-js/src/toastify.css';
import './App.css';
import AppRouter from './routes/AppRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster as HotToast } from 'react-hot-toast';
import { Toaster } from "@/components/ui/toaster"
import { ChakraProvider } from '@chakra-ui/react'
// import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
// export const socket = io('http://localhost:3000');
import toast from 'react-hot-toast';
import { useGetSenderNameMutation } from './redux/slices/commonSlice';
import { useSocket } from './context/SocketProvider';

function App() {

  const { userInfo, providerInfo } = useSelector((state: RootState) => state.auth)
  const [getSenderName] = useGetSenderNameMutation()

  // useEffect(() => {

  //   if (userInfo) {
  //     socket.emit('register', userInfo.id);
  //   } else if (providerInfo) {
  //     socket.emit('register', providerInfo.id);
  //   }

  //   socket.on('notification', async (data) => {
  //     const sender = await getSenderName(data.sender).unwrap()
  //     toast(   
  //       <div className='w-60 m-1'>
  //         <p className="text-xs">New message</p>
  //         <p className="font-semibold text-sm mt-2">{sender.data}</p>
  //         <p className='text-sm'>{data.message}</p>
  //       </div>,
  //       {
  //         style: {
  //           border: '1px solid #67b3fb',
  //           padding: '',
  //           color: '#212020',
  //         },
  //         iconTheme: {
  //           primary: '#212020',
  //           secondary: '#FFFAEE',
  //         },
  //       }
  //     );
  //   })
  //   return () => {
  //     socket.off('notification')
  //     socket.disconnect();
  //   };

  // }, [userInfo, providerInfo, socket])
  
  const socket = useSocket()
  useEffect(() => {

    if (userInfo) {
      socket.emit('register', userInfo.id);
    } else if (providerInfo) {
      socket.emit('register', providerInfo.id);
    }

    socket.on('notification', async (data) => {
      const sender = await getSenderName(data.sender).unwrap()
      toast(   
        <div className='w-60 m-1'>
          <p className="text-xs">New message</p>
          <p className="font-semibold text-sm mt-2">{sender.data}</p>
          <p className='text-sm'>{data.message}</p>
        </div>,
        {
          style: {
            border: '1px solid #67b3fb',
            padding: '',
            color: '#212020',
          },
          iconTheme: {
            primary: '#212020',
            secondary: '#FFFAEE',
          },
        }
      );
    })
    return () => {
      socket.off('notification')
      socket.disconnect();
    };

  }, [userInfo, providerInfo])


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
