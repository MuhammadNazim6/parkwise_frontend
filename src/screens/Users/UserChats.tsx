import React, { useState, useRef, useEffect } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from 'react-router-dom';
import { Avatar, AvatarBadge, AvatarGroup, Wrap, WrapItem, Divider, Center, useDisclosure, Collapse, Badge, Button, Input } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue
} from '@chakra-ui/react'
import { IoChevronBackSharp } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { socket } from '@/App';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { TbSend } from "react-icons/tb";
import { TbSend2 } from "react-icons/tb";
import { useFetchConnectionsMutation, useFetchMessagesMutation, useSendSaveMessageMutation } from '@/redux/slices/commonSlice';
import { useGetLotDetailsMutation } from '@/redux/slices/userApiSlice';


function UserChats() {
  const [searchParams] = useSearchParams();
  const ID = searchParams.get('ID');

  const SenderReceiverType = Object.freeze({
    USER: 'User',
    PROVIDER: 'Provider'
  });
  const messageType = Object.freeze({
    TEXT: 'text',
  });

  const [showSearchBar, setShowSearchBar] = useState(false)
  const { isOpen, onToggle } = useDisclosure()
  const [getConnections, { isLoading: getConnectionsLoading }] = useFetchConnectionsMutation()
  const [getMessages, { isLoading: getMessagesLoading }] = useFetchMessagesMutation()
  const [getLotDetails] = useGetLotDetailsMutation()
  const [sendAndSaveMessage] = useSendSaveMessageMutation()

  const [connections, setConnections] = useState([])
  const [messages, setMessages] = useState([])
  const [receiverId, setReceiverId] = useState('')
  const [receiverDetails, setReceiverDetails] = useState({})

  const [text, setText] = useState('')
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const messagesEndRef = useRef(null);
  const pageEndRef = useRef(null);


  useEffect(() => {
    setTimeout(() => {
      scrollToBottomChat()
    }, 500)
    socket.emit('enterChat', userInfo.id);
    // socket.emit('chatMessage', { sender: '6651a376aea6684ffe8262ea3', recipient: '6651a376aea668ffe8262ea3', message: 'Helllo my dear friekknds i am user' });

    socket.on('notification', (data) => {  //chatMessge needed here
      // checking if the sender is in the cinversation
      if (data.sender === receiverId) {
        setMessages((prev) => [...prev, { senderId: data.sender, recieverId: data.recipient, message: data.message }])
        setTimeout(() => {
          scrollToBottomChat()
        }, 100)
        // should update the conversation also
      } else {
        // update the conversation here
      }

    })
    return () => {
      socket.emit('exitChat', userInfo.id);
    }
  }, [])

  useEffect(() => {
    handleFetchConnections()
  }, [])

  const handleFetchConnections = async () => {
    if (ID) {
      setReceiverId(ID)
      handleFetchMessages(ID)
      const recieverProvider = await getLotDetails(ID).unwrap()
      setReceiverDetails(recieverProvider.data)
      const response = await getConnections(userInfo.id).unwrap()
      if (response.success) {
        const connectionExists = response.data.some((user) => user.secondPersonId._id === ID)
        if (!connectionExists) {
          setConnections([{ secondPersonId: { _id: ID, parkingName: recieverProvider.data.parkingName }, secondPersonType: 'Provider', lastMessage: 'dddd', updatedAt: '' }, ...response.data])
        } else {
          setConnections(response.data)
        }
      }
    } else {
      const response = await getConnections(userInfo.id).unwrap()
      if (response.success) setConnections(response.data)
    }
  }

  const reloadConnections = async () => {
    const response = await getConnections(userInfo.id).unwrap()
    if (response.success) setConnections(response.data)
  }


  const handleFetchMessages = async (recieverId) => {
    setReceiverId(recieverId)
    const recieverResponse = await getLotDetails(recieverId).unwrap()
    setReceiverDetails(recieverResponse.data)

    const data = {
      senderId: userInfo.id,
      recieverId: recieverId
    }
    const response = await getMessages(data).unwrap()
    if (response.success) {
      setMessages(response.data)
    }
    scrollToBottomChat()
  }

  const scrollToBottomChat = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const enterButtonSend = (e) => {
    e.preventDefault()
    addToMessages()
  }

  const addToMessages = async () => {
    if (text.length) {
      setMessages((prev) => [...prev, { senderId: userInfo.id, recieverId: '456', message: text }])
      socket.emit('chatMessage', { sender: userInfo.id, recipient: receiverId, message: text });

      const data = {
        senderId: userInfo.id,
        senderType: SenderReceiverType.USER,
        receiverId,
        receiverType: SenderReceiverType.PROVIDER,
        message: text,
        messageType: messageType.TEXT
      }

      const saved = await sendAndSaveMessage(data).unwrap();
      reloadConnections()
      setText('')
    }
    setTimeout(() => {
      scrollToBottomChat()
    })
  }

  const isFullScreen = useBreakpointValue({ base: true, md: false });
  const { isOpen: isOpenDrawer, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure()
  const btnRef = useRef()

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev)
  }

  return (
    <div className='flex h-screen w-full md:px-8 lg:px-10 xl:px-16 pt-2'>
      <div className='w-full md:w-5/12 overflow-y-scroll hide-scrollbar rounded-l-xl'>
        <div className="flex w-full sticky top-0 z-10">
          <div className="flex justify-between p-3 w-full bg--200 glass z-10 md:w-full">
            <div className="flex w-2/3 space-x-2">
              <Wrap>
                <WrapItem>
                  <Avatar name='Muhammad Nazim' src='https://bit.ly/tioluwani-kolawole' />
                </WrapItem>
              </Wrap>
              <div className="w-2/3 font-medium">Welcome Back,<p className='text-[16px] font-semibold'> Nazim!</p></div>
            </div>
            <div className="" onClick={onToggle}>
              <div className="rounded-full bg-primary-blue h-11 w-11 flex justify-center items-center text-xl cursor-pointer">
                <button
                  className={`text-2xl text-white transition-transform ease-in-out ${isOpen ? 'active:animate-spin' : ''}`}
                  onClick={toggleSearchBar}
                >
                  {isOpen ? <IoMdClose /> : <IoSearchOutline className='font-semibold' />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Collapse in={isOpen} animateOpacity className='sticky bg--200 glass top-0 z-10 md:w-full'>
          <div className="flex justify-between p-5 w-full glass shadow-lg space-x-3">
            <input type='text' className='w-full h-9 rounded-2xl' placeholder='Search your chat..' />
          </div>
        </Collapse>

        {connections.map((user, index) => {
          return (
            <div key={user.secondPersonId._id} className={`mt-1 w-ful md:w-full lg:w-9/12  rounded-lg ${user.secondPersonId._id === receiverId ? 'bg-slate-200' : ''}`} onClick={openDrawer} >
              <div className="flex lg:ml-1 w-full xs:w-8/12 sm:w-7/12 md:w-full justify-start bg-yellw-300 cursor-pointer" onClick={() => handleFetchMessages(user.secondPersonId._id)}>
                <div className="p-3 w-1/5">
                  <Wrap>
                    <WrapItem>
                      <Avatar name={user.secondPersonId.parkingName} src='https://bit.ly/tioluwani-kolawole' />
                    </WrapItem>
                  </Wrap>
                </div>
                <div className=" w-3/5 pt-2">
                  <div className="font-semibold">
                    {user.secondPersonId.parkingName}
                  </div>
                  <div className="text-sm">
                    {user.lastMessage}
                  </div>
                </div>
                {/* {index % 2 == 0 && <div className="p-1 flex justify-center items-center w-1/5">
                  <Badge ml='4' colorScheme='green' className='overflow-hidden'>
                    1
                  </Badge>
                </div>} */}

              </div>
              <Divider orientation='horizontal' />
            </div>
          )
        })}

        {/* DRAWER */}
        {isFullScreen && <Drawer
          isOpen={isOpenDrawer}
          placement='right'
          onClose={closeDrawer}
          finalFocusRef={btnRef}
        >
          {/* <DrawerOverlay /> */}
          {receiverId && <DrawerContent
            width={isFullScreen ? '100vw' : 'auto'}
            height={isFullScreen ? '100vh' : 'auto'}
            maxWidth={isFullScreen ? '100vw' : '60vw'}
          >

            <DrawerHeader className='flex items-center space-x-3'>
              <IoChevronBackSharp onClick={closeDrawer} className='text-2xl text-gray-600 cursor-pointer' />

              <Wrap>
                <WrapItem>
                  <Avatar size={'sm'} name={receiverDetails.parkingName} src='https://bit.ly/tioluwani-kolawole' />
                </WrapItem>
              </Wrap>

              <div className='flex-grow'>
                <p className='text-md font-semibold'>{receiverDetails.parkingName}</p>
                <p className='text-xs text-gray-700 flex items-center'>
                  Active now
                  <span className='h-2 w-2 ml-2 mt-[1px] rounded-full bg-[#5cb63e]'></span>
                </p>
              </div>

              <div className='flex space-x-9 justify-end'>
                <IoMdCall className='text-2xl cursor-pointer' />
                <FaVideo className='text-2xl cursor-pointer' />
              </div>
            </DrawerHeader>
            <Divider orientation='horizontal' />
            <DrawerBody>
              {messages.map((msg) => {
                return (
                  <>
                    <div className={`chat ${msg.senderId === userInfo.id ? 'chat-end' : 'chat-start'} mt-2 `}>
                      <div className={`chat-bubble rounded-lg shadow-xl text-sm  text-white ${msg.senderId === userInfo.id ? 'bg-blue-500' : 'bg-blue-800'}`}>{msg.message}</div>
                    </div>
                  </>
                )
              })}
              <div className='h-4' ref={messagesEndRef} />

            </DrawerBody>
              <div className="fixed bottom-0 right-0 bg-white h-14 rounded-md w-full">
                <form className='w-full ml-7 relative' onSubmit={enterButtonSend}>
                  <input type='text' value={text} onChange={(e) => setText(e.target.value)} className='w-11/12 rounded-lg shadow-xl ' />
                </form>
                <TbSend2 className={`absolute right-10 bottom-6 text-2xl transition-opacity cursor-pointer ${!text.length ? 'opacity-0' : 'opacity-100'}`}
                />
                <TbSend onClick={addToMessages} className={`absolute right-10  bottom-6 text-2xl transition-opacity cursor-pointer ${text.length ? 'opacity-0' : 'opacity-100'}`}
                />
              </div>
            <DrawerFooter>
            </DrawerFooter>
          </DrawerContent>}
        </Drawer>}
      </div>

      {receiverId ?
        (<div className="w-7/12 hidden md:block overflow-y-scroll hide-scrollbar outline outline-slate-200 outline-1 rounded-r-xl max-h-[700px]">
          <div className="bg-blue-200 shadow-lg glass w-full sticky top-0 z-10">
            <div className='flex items-center space-x-3 p-4 '>

              <Wrap>
                <WrapItem>
                  <Avatar size={'sm'} name={receiverDetails.parkingName} src='https://bit.ly/tioluwani-kolawole' />
                </WrapItem>
              </Wrap>

              <div className='flex-grow'>
                <p className='text-md font-semibold'>{receiverDetails.parkingName}</p>
                <p className='text-xs text-gray-700 flex items-center'>
                  Active now
                  <span className='h-2 w-2 ml-2 mt-[1px] rounded-full bg-[#5cb63e]'></span>
                </p>
              </div>

              <div className='flex space-x-9 justify-end'>
                <IoMdCall className='text-2xl cursor-pointer' />
                <FaVideo className='text-2xl cursor-pointer' />
              </div>
            </div>
          </div>

          <div className="p-5">
            {messages.map((msg) => {
              return (
                <>
                  <div className={`chat ${msg.senderId === userInfo.id ? 'chat-end' : 'chat-start'} mt-2 `}>
                    <div className={`chat-bubble rounded-lg  shadow-xl text-sm  text-white ${msg.senderId === userInfo.id ? 'bg-blue-500' : 'bg-blue-800'}`}>{msg.message}</div>
                  </div>
                </>
              )
            })}
            <div className='h-4' ref={messagesEndRef} />
          </div>
          <div className="fixed bottom-0 right-0 bg-white h-14 rounded-md w-7/12">
            <form className='w-full ml-3 relative' onSubmit={enterButtonSend}>
              <input type='text' value={text} onChange={(e) => setText(e.target.value)} className='w-11/12 rounded-lg shadow-xl ' />
            </form>
            <TbSend2 className={`absolute right-20 bottom-6 text-2xl transition-opacity cursor-pointer ${!text.length ? 'opacity-0' : 'opacity-100'}`}
            />
            <TbSend onClick={addToMessages} className={`absolute right-20 bottom-6 text-2xl transition-opacity cursor-pointer ${text.length ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
          <div ref={pageEndRef} />
        </div>) :
        (
          <div className="w-7/12 hidden md:block overflow-y-scroll hide-scrollbar outline outline-slate-300 outline-1 rounded-r-xl max-h-[700px]">
            <div className="flex justify-center items-center bg-gray-100 h-full">
              <div className="">
                <p className='text-center text-2xl text-gray-800'>Chat for Parkwise </p>
                <p className='text-center text-lg text-gray-500'> Get in contact with the parking providers </p>
              </div>
            </div>
          </div>
        )
      }
    </div>

  )
}

export default UserChats