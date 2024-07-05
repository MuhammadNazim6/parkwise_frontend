import React, { useState, useRef, useEffect } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Avatar, AvatarBadge, AvatarGroup, Wrap, WrapItem, Divider, Center, useDisclosure, Collapse, Badge, Button, Input } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  useBreakpointValue
} from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom';
import { IoChevronBackSharp } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { motion } from "framer-motion"
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { TbSend } from "react-icons/tb";
import { TbSend2 } from "react-icons/tb";
import { useFetchConnectionsMutation, useFetchMessagesMutation, useSendSaveMessageMutation } from '@/redux/slices/commonSlice';
import { useGetUserDetailsMutation } from '@/redux/slices/userApiSlice';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { useSocket } from '@/context/SocketProvider';
import no_messagesImg from '../../assets/Images/no_messagesImg.png'
import { MdChatBubbleOutline } from "react-icons/md";




function ProvChats() {
  const { providerInfo } = useSelector((state: RootState) => state.auth)
  const [searchParams] = useSearchParams();
  const userParamsId = searchParams.get('ID');


  const { isOpen, onToggle } = useDisclosure()
  const [receiverId, setReceiverId] = useState('')
  const [receiverDetails, setReceiverDetails] = useState({})


  const { isOpen: isOpenDrawer, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure()
  const btnRef = useRef()

  const isMdAndBelow = useBreakpointValue({ base: true, md: true, lg: true });
  const isAboveMd = useBreakpointValue({ lg: true });
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([])
  const [connections, setConnections] = useState([])
  const [filteredConnections, setFilteredConnections] = useState([])
  const [searchText, setSearchText] = useState('');
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [isOnline, setIsOnline] = useState(false)


  const SenderReceiverType = Object.freeze({
    USER: 'User',
    PROVIDER: 'Provider'
  });
  const messageType = Object.freeze({
    TEXT: 'text',
  });

  const [getConnections, { isLoading: getConnectionsLoading }] = useFetchConnectionsMutation()
  const [getMessages, { isLoading: getMessagesLoading }] = useFetchMessagesMutation()
  const [getUserDetails] = useGetUserDetailsMutation()
  const [sendAndSaveMessage] = useSendSaveMessageMutation()

  // Filter function start
  useEffect(() => {
    setFilteredConnections(connections)
  }, [connections])

  useEffect(() => {
    filterFunction(searchText);
  }, [searchText, connections]);
  const filterFunction = (searchText) => {
    const tempConn = connections.filter((c) => {
      return c.secondPersonId.name.toLowerCase().includes(searchText.toLowerCase())
    })
    setFilteredConnections(tempConn)
  }

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }
  // Filter function end
  const socket = useSocket()

  useEffect(() => {
    socket.on('chatMessage', handleChatMessage);
    socket.emit('register', providerInfo.id);
    socket.emit('enterChat', providerInfo.id);

    // Cleanup
    return () => {
      socket.off('chatMessage', handleChatMessage);
      socket.emit('exitChat', providerInfo.id);
    };
  }, []);

  useEffect(() => {
    loadConnections()
  }, [])

  const handleChatMessage = (data) => {

    setMessages((prevMsgs) => {
      if (data.sender !== receiverId) {
        console.log('Message is from the current receiver');
        const updatedMessages = [
          ...prevMsgs,
          { senderId: data.sender, receiverId: data.recipient, message: data.message },
        ];
        setTimeout(() => {
          scrollToBottomChat();
        }, 100);
        return updatedMessages;
      }
      return prevMsgs;
    });

    setConnections((prevConnections) => {
      const connectionExists = prevConnections.some((user) => {
        return user.secondPersonId._id === data.sender;
      });

      if (!connectionExists) {
        return [
          {
            secondPersonId: { _id: data.sender, name: 'SAHAD' },
            secondPersonType: 'User',
            lastMessage: data.message,
            updatedAt: new Date().toISOString(),
          },
          ...prevConnections,
        ];
      } else {
        return prevConnections.map((user) =>
          user.secondPersonId._id === data.sender
            ? { ...user, lastMessage: data.message, updatedAt: new Date().toISOString() }
            : user
        );
      }
    });
  };

  const loadConnections = async () => {
    if (userParamsId) {
      setReceiverId(userParamsId)
      handleFetchMessages(userParamsId)
      const receiverUser = await getUserDetails(userParamsId).unwrap()
      setReceiverDetails(receiverUser.data)
      openDrawer()
      const response = await getConnections(providerInfo.id).unwrap()
      if (response.success) {
        const connectionExists = response.data.some((user) => user.secondPersonId._id === userParamsId)
        if (!connectionExists) {
          setConnections([{ secondPersonId: { _id: userParamsId, name: receiverUser.data.name }, secondPersonType: 'User', lastMessage: '', updatedAt:new Date() }, ...response.data])
        } else {
          setConnections(response.data)
        }
      }
    } else {
      const response = await getConnections(providerInfo.id).unwrap()
      if (response.success) setConnections(response.data)
    }
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
      setMessages((prev) => [...prev, { senderId: providerInfo.id, recieverId: receiverId, message: text }])
      socket.emit('chatMessage', { sender: providerInfo.id, recipient: receiverId, message: text });
      setShowEmoji(false)

      const data = {
        senderId: providerInfo.id,
        senderType: SenderReceiverType.PROVIDER,
        receiverId,
        receiverType: SenderReceiverType.USER,
        message: text,
        messageType: messageType.TEXT
      }
      const saved = await sendAndSaveMessage(data).unwrap();
      loadConnections()
      setText('')
    }
    setTimeout(() => {
      scrollToBottomChat()
    })
  }

  const handleFetchMessages = async (recieverId) => {
    setReceiverId(recieverId)
    const recieverResponse = await getUserDetails(recieverId).unwrap()
    setReceiverDetails(recieverResponse.data)

    const data = {
      senderId: providerInfo.id,
      recieverId: recieverId
    }
    const response = await getMessages(data).unwrap()
    if (response.success) {
      setMessages(response.data)
    }
    scrollToBottomChat()
  }

  // emoji handling
  const handleEmogiClick = (e) => {
    setText((prev) => prev + e.emoji)
  }
  const toggleEmojiModal = () => {
    setShowEmoji(!showEmoji)
  }

  const calculateTime = (time) => {
    const today = new Date()
    const dateToCheck = new Date(time)
    if (dateToCheck.getFullYear() === today.getFullYear() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getDate() === today.getDate()) {
      return (dateToCheck.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    } else {
      return dateToCheck.toLocaleDateString()
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.1, duration: 0.2, ease: 'easeIn' }
      }} className="sm:ml-64">
      <div className="p-4 mb-8 rounded-lgborder-gray-700 h-screen flex">
        <div className='w-full lg:w-1/2 xl:w-1/3 rounded-xl overflow-y-scroll scroll-smooth hide-scrollbar h-screen border'>
          <div className="flex w-full sticky top-0 z-10">
            <div className="flex justify-between p-3 w-full bg--200 glass z-10 md:w-full">
              <div className="flex w-2/3 space-x-2">
                <Wrap>
                  <WrapItem>
                    <Avatar name={providerInfo.name} src='https://bit.ly/tioluwani-kolawole' />
                  </WrapItem>
                </Wrap>
                <div className="w-2/3 font-medium">Welcome Back,<p className='text-[12px] font-semibold'> {providerInfo.name}!</p></div>
              </div>
              <div className="" onClick={onToggle}>
                <div className="rounded-full bg-primary-blue h-11 w-11 flex justify-center items-center text-xl cursor-pointer">
                  <button
                    className={`text-2xl text-white transition-transform ease-in-out ${isOpen ? 'active:animate-spin' : ''}`}
                  >
                    {isOpen ? <IoMdClose /> : <IoSearchOutline className='font-semibold' />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Collapse in={isOpen} animateOpacity className='sticky top-0 z-10 md:w-full'>
            <div className="flex justify-between p-5 w-full glass shadow-lg space-x-3">
              <input value={searchText} onChange={handleSearchTextChange} type='text' className='w-full h-9 rounded-2xl text-sm' placeholder='Search your chat..' />
            </div>
          </Collapse>

          {filteredConnections.length ? (filteredConnections.map((user, index) => {
            return (
              <div key={'user.secondPersonId._id'} className={`flex w-full rounded-lg cursor-pointer ${user.secondPersonId._id === receiverId ? 'bg-blue-100' : ''}`} onClick={openDrawer}  >
                <div className="flex p-3 w-full cursor-pointer" onClick={() => handleFetchMessages(user.secondPersonId._id)}>
                  <div className="flex w-full space-x-2">
                    <Wrap>
                      <WrapItem>
                        <Avatar name={user.secondPersonId.name} src='https://bit.ly/tioluwani-kolawole' />
                      </WrapItem>
                    </Wrap>
                    <div className="w-full text-sm font-semibold mt-2 capitalize">
                      <div className="flex justify-between">
                        <p>{user.secondPersonId.name}</p>
                      </div>
                      <p className='text-[12px] font-normal text-gray-700'> {user.lastMessage}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start bg-grady-500 p-4">
                  <p className='text-[12px] font-normal text-gray-600'> {calculateTime(user.updatedAt)}</p>
                </div>
              </div>

            )
          })) :
            (<div className="flex justify-center items-start mt-24">
              <img src={no_messagesImg} className='h-60 opacity-75' />
            </div>)}


          {/* DRAWER */}
          {isMdAndBelow && <Drawer
            isOpen={isOpenDrawer}
            placement='right'
            onClose={closeDrawer}
            finalFocusRef={btnRef}
          >
            {/* <DrawerOverlay /> */}
            {receiverId && <DrawerContent
              width={isMdAndBelow ? '100vw' : 'auto'}
              height={isMdAndBelow ? '100vh' : 'auto'}
              maxWidth={isMdAndBelow && isAboveMd ? '50vw' : '100vw'}
            >
              <DrawerHeader className='flex items-center space-x-3'>
                <IoChevronBackSharp onClick={closeDrawer} className='text-2xl text-gray-600 cursor-pointer' />
                <Wrap>
                  <WrapItem>
                    <Avatar size={'sm'} name={receiverDetails.name} src='https://bit.ly/tioluwani-kolawole' />
                  </WrapItem>
                </Wrap>

                <div className='flex-grow'>
                  <p className='text-md font-semibold'>{receiverDetails.name}</p>
                  <p className='text-xs text-gray-700 flex items-center'>
                    {isOnline ? 'Online' : 'Offline'}
                    <span className={`h-2 w-2 ml-2 mt-[4px] rounded-full ${isOnline ? 'bg-[#5cb63e]' : 'bg-[#b3b4b3]'}`}></span>
                  </p>
                </div>

                <div className='flex space-x-9 justify-end'>
                  {/* <IoMdCall className='text-2xl cursor-pointer' /> */}
                  <FaVideo className='text-xl cursor-pointer' />
                </div>
              </DrawerHeader>
              <Divider orientation='horizontal' />
              <DrawerBody>
                {messages.map((msg) => {
                  return (
                    <>
                      <div className={`chat ${msg.senderId === providerInfo.id ? 'chat-end' : 'chat-start'} mt-2 `}>
                        <div className={`chat-bubble rounded-lg shadow-xl text-sm  text-white ${msg.senderId === providerInfo.id ? 'bg-blue-500' : 'bg-blue-800'}`}>{msg.message}</div>
                      </div>
                    </>
                  )
                })}
                <div className='h-4' ref={messagesEndRef} />

              </DrawerBody>
              <div className="fixed bottom-0 right-0 bg-white h-14 rounded-md w-full">
                <BsEmojiSmile onClick={toggleEmojiModal} className='absolute left-10 z-10 bottom-6 hover:text-gray-500 active:scale-[1.08] text-2xl transition-opacity cursor-pointer' />

                <div className='absolute left-10 bottom-16'>
                  <EmojiPicker open={showEmoji} onEmojiClick={handleEmogiClick} />
                </div>
                <form className='w-full ml-7 relative' onSubmit={enterButtonSend}>
                  <input type='text' value={text} onChange={(e) => setText(e.target.value)} className='px-10  w-11/12 rounded-lg shadow-xl ' />
                </form>
                <TbSend2 className={`absolute right-12 bottom-6 text-2xl transition-opacity cursor-pointer ${!text.length ? 'opacity-0' : 'opacity-100'}`}
                />
                <TbSend onClick={addToMessages} className={`absolute right-12  bottom-6 text-2xl transition-opacity cursor-pointer ${text.length ? 'opacity-0' : 'opacity-100'}`}
                />
              </div>
              <DrawerFooter>
              </DrawerFooter>
            </DrawerContent>}
          </Drawer>}
        </div>

        <div className="lg:w-1/2 xl:w-2/3 flex flex-col justify-center items-center">
          <MdChatBubbleOutline className='text-6xl text-gray-500' />
          <p className='text-sm text-gray-500'> No conversation selected</p>
        </div>
      </div>
    </motion.div>

  )
}

export default ProvChats