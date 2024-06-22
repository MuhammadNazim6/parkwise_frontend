import React, { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import 'toastify-js/src/toastify.css';
import './App.css';
import AppRouter from './routes/AppRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import toast, { Toaster as HotToast } from 'react-hot-toast';
import { Toaster } from "@/components/ui/toaster"
import { Button, Box, ChakraProvider } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useGetSenderNameMutation } from './redux/slices/commonSlice';
import { useSocket } from './context/SocketProvider';



function App() {
  const { userInfo, providerInfo } = useSelector((state: RootState) => state.auth)
  const [getSenderName] = useGetSenderNameMutation()
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    userInfo ? socket.emit('register', userInfo.id) : socket.emit('register', providerInfo.id)

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
            color: '#212020',
          },
          iconTheme: {
            primary: '#212020',
            secondary: '#FFFAEE',
          },
        }
      );
    })

    socket.on('videoCallNotification', async (data) => {
      toast.custom((t) => (
        <Box
          p={4}
          bg="white"
          border="1px solid #e2e8f0"
          boxShadow="lg"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          maxW="400px"
          mx="auto"
        >
          <Box mb={2} fontWeight="bold">
            Incoming Video Call
          </Box>
          <Box display="flex" justifyContent="space-between" w="100%">
            <Button colorScheme="green" flex="1" onClick={() => handleTakeCall(data)} m={1}>
              Take Call
            </Button>
            <Button colorScheme="red" flex="1" onClick={() => toast.dismiss()} m={1}>
              Cancel Call
            </Button>
          </Box>
        </Box>
      ), {
        duration: 10000,
        position: 'top-center',
      });
    })

    return () => {
      socket.off('notification')
      socket.off('videoCallNotification')
      socket.disconnect();
    };

  }, [userInfo, providerInfo])

  const handleTakeCall = async (data) => {
    toast.dismiss()
    navigate(`/user/chats/video-call/${data.roomId}`)
  }

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <ChakraProvider>
      <GoogleOAuthProvider clientId={clientId}>
        {/* <BrowserRouter> */}
          <HotToast
            position="top-right"
            reverseOrder={false}
          />
          <AppRouter />
          <Toaster />
        {/* </BrowserRouter> */}
      </GoogleOAuthProvider>
    </ChakraProvider>
  )
}

export default App
