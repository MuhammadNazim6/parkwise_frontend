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
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { TbSend } from "react-icons/tb";
import { TbSend2 } from "react-icons/tb";
import { useFetchConnectionsMutation, useFetchMessagesMutation, useSendSaveMessageMutation } from '@/redux/slices/commonSlice';
import { useGetLotDetailsMutation } from '@/redux/slices/userApiSlice';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { useSocket } from '@/context/SocketProvider';
import ShortUniqueId from 'short-unique-id';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"


function UserChats() {
  const [searchParams] = useSearchParams();
  const ID = searchParams.get('ID');
  const navigate = useNavigate()

  const SenderReceiverType = Object.freeze({
    USER: 'User',
    PROVIDER: 'Provider'
  });
  const messageType = Object.freeze({
    TEXT: 'text',
  });

  const { isOpen, onToggle } = useDisclosure()
  const [getConnections, { isLoading: getConnectionsLoading }] = useFetchConnectionsMutation()
  const [getMessages, { isLoading: getMessagesLoading }] = useFetchMessagesMutation()
  const [getLotDetails] = useGetLotDetailsMutation()
  const [sendAndSaveMessage] = useSendSaveMessageMutation()

  const [connections, setConnections] = useState([])
  const [filteredConnections, setFilteredConnections] = useState([])
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState([])
  const [receiverId, setReceiverId] = useState('')
  const [receiverDetails, setReceiverDetails] = useState({})
  const [showEmoji, setShowEmoji] = useState(false)

  const [text, setText] = useState('')
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const messagesEndRef = useRef(null);
  const pageEndRef = useRef(null);
  const btnRef = useRef()

  const uid = new ShortUniqueId();

  // Filter function start
  useEffect(() => {
    setFilteredConnections(connections)
  }, [connections])

  useEffect(() => {
    filterFunction(searchText);
  }, [searchText, connections]);
  const filterFunction = (searchText) => {
    const tempConn = connections.filter((c) => {
      return c.secondPersonId.parkingName.toLowerCase().includes(searchText.toLowerCase())
    })
    setFilteredConnections(tempConn)
  }

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }
  // Filter function end

  const isFullScreen = useBreakpointValue({ base: true, md: false });
  const { isOpen: isOpenDrawer, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure()
  const socket = useSocket()

  useEffect(() => {

    socket.on('chatMessage', handleChatMessage);

    socket.emit('register', userInfo.id);
    socket.emit('enterChat', userInfo.id);

    // Cleanup
    return () => {
      socket.off('chatMessage', handleChatMessage);
      socket.emit('exitChat', userInfo.id);
    };
  }, []);

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
            secondPersonType: 'Provider',
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

  useEffect(() => {
    handleFetchConnections()
  }, [])

  const handleFetchConnections = async () => {
    if (ID) {
      setReceiverId(ID)
      handleFetchMessages(ID)
      const recieverProvider = await getLotDetails(ID).unwrap()
      setReceiverDetails(recieverProvider.data)
      openDrawer()
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
    setTimeout(() => {
      scrollToBottomPage()
    }, 200);
  }

  const scrollToBottomChat = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottomPage = () => {
    pageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const enterButtonSend = (e) => {
    e.preventDefault()
    addToMessages()
  }

  const addToMessages = async () => {
    if (text.length) {
      setMessages((prev) => [...prev, { senderId: userInfo.id, recieverId: receiverId, message: text }])
      socket.emit('chatMessage', { sender: userInfo.id, recipient: receiverId, message: text });
      setShowEmoji(false)

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

  // emoji handling
  const handleEmogiClick = (e) => {
    setText((prev) => prev + e.emoji)
  }
  const toggleEmojiModal = () => {
    setShowEmoji(!showEmoji)
  }


  const handleVideoCall = async () => {
    const roomId = uid.rnd()
    socket.emit('startVideoCall', {callerId:userInfo.id, receiverId, roomId});
    navigate(`/user/chats/video-call/${roomId}`)
  }

  return (
    <motion.div initial={{ opacity: 0 }}
    animate={{
      opacity: 1,
      transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
    }} className='flex h-screen w-full md:px-8 lg:px-10 xl:px-20 pt-2'>
      <div className='w-full md:w-5/12 overflow-y-scroll hide-scrollbar rounded-l-xl'>
        <div className="flex w-full sticky top-0 z-10">
          <div className="flex justify-between p-3 w-full bg--200 glass z-10 md:w-full">
            <div className="flex w-2/3 space-x-2">
              <Wrap>
                <WrapItem>
                  <Avatar name={userInfo.name} src='https://bit.ly/tioluwani-kolawole' />
                </WrapItem>
              </Wrap>

              <div className="w-2/3 font-medium">Welcome Back,<p className='text-[16px] font-semibold'> {userInfo.name}!</p></div>
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
        <Collapse in={isOpen} animateOpacity className='sticky bg--200 glass top-0 z-10 md:w-full'>
          <div className="flex justify-between p-5 w-full glass shadow-lg space-x-3">
            <input type='text' value={searchText} onChange={handleSearchTextChange} className='w-full h-9 rounded-2xl' placeholder='Search your chat..' />
          </div>
        </Collapse>

        {filteredConnections.map((user, index) => {
          return (

            <div key={user.secondPersonId._id} className={`flex w-full ${user.secondPersonId._id === receiverId ? 'bg-slate-200' : ''}`} onClick={openDrawer}>
              <div className="flex p-3 w-full cursor-pointer" onClick={() => handleFetchMessages(user.secondPersonId._id)}>
                <div className="flex w-full space-x-2">
                  <Wrap>
                    <WrapItem>
                      <Avatar name={user.secondPersonId.parkingName} src='https://bit.ly/tioluwani-kolawole' />
                    </WrapItem>
                  </Wrap>
                  <div className="w-full text-sm font-semibold mt-2">{user.secondPersonId.parkingName}<p className='text-[11px] font-normal'> {user.lastMessage}</p></div>
                </div>
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
                {/* <IoMdCall className='text-2xl cursor-pointer' /> */}
                <FaVideo onClick={handleVideoCall} className='text-2xl cursor-pointer' />
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
                <input type='text' value={text} onChange={(e) => setText(e.target.value)} className='w-11/12 rounded-lg shadow-xl px-12' />
              </form>
              <BsEmojiSmile onClick={toggleEmojiModal} className='absolute left-10 bottom-6 hover:text-gray-500 active:scale-[1.08] text-2xl transition-opacity cursor-pointer' />

              <div className='absolute left-7 bottom-16'>
                <EmojiPicker open={showEmoji} onEmojiClick={handleEmogiClick} />
              </div>
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
                {/* <IoMdCall className='text-2xl cursor-pointer hover:text-gray-600' /> */}
                <FaVideo onClick={handleVideoCall} className='text-2xl cursor-pointer hover:text-gray-600' />
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
          <div className="fixed bottom-0 right-2  bg-white h-14 rounded-md w-[56%] mr-2">
            <form className='w-full relative' onSubmit={enterButtonSend}>
              <input type='text' value={text} onChange={(e) => setText(e.target.value)} className='px-12 w-11/12 rounded-lg shadow-xl ' />
            </form>
            <BsEmojiSmile onClick={toggleEmojiModal} className='absolute left-3 bottom-6 hover:text-gray-500 active:scale-[1.08] text-2xl transition-opacity cursor-pointer' />

            <div className='absolute left-3 bottom-16'>
              <EmojiPicker open={showEmoji} onEmojiClick={handleEmogiClick} />
            </div>
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
    </motion.div>

  )
}

export default UserChats