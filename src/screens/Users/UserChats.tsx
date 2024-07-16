import React, { useState, useRef, useEffect } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from 'react-router-dom';
import { Avatar, AvatarBadge, AvatarGroup, Wrap, WrapItem, Divider, useDisclosure, Collapse } from '@chakra-ui/react'
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
import no_messagesImg from '../../assets/Images/no_messagesImg.png'



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
          setConnections([{ secondPersonId: { _id: ID, parkingName: recieverProvider.data.parkingName }, secondPersonType: 'Provider', lastMessage: '', updatedAt: '' }, ...response.data])
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
      setMessages((prev) => [...prev, { senderId: userInfo.id, recieverId: receiverId, message: text, updatedAt: Date.now() }])
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
    socket.emit('startVideoCall', { callerId: userInfo.id, receiverId, roomId });
    navigate(`/user/chats/video-call/${roomId}`)
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
        transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }
      }} className='flex h-screen w-full md:px-8 lg:px-10 xl:px-20 pt-2'>
      <div className='w-full md:w-5/12 overflow-y-scroll hide-scrollbar rounded-l-xl border border-gray-100'>
        <div className="flex w-full sticky top-0 z-10">
          <div className="flex justify-between p-3 w-full z-10 md:w-full">
            <div className="flex w-2/3 space-x-2">
              <Wrap>
                <WrapItem>
                  <Avatar name={userInfo.name} src='https://bit.ly/tioluwani-kolawole' />
                </WrapItem>
              </Wrap>

              <div className="w-2/3">Welcome Back,<p className='font-semibold text-sm md:text-[16px]'> {userInfo.name}!</p></div>
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
        <Collapse in={isOpen} animateOpacity className='sticky bg--200 glass bg-blue-50 top-0 z-10 md:w-full'>
          <div className="flex justify-between p-5 w-full shadow-lg space-x-3">
            <input type='text' value={searchText} onChange={handleSearchTextChange} className='w-full h-9 rounded-2xl border-gray-400' placeholder='Search your chat..' />
          </div>
        </Collapse>

        {filteredConnections.length ? (filteredConnections.map((user, index) => {
          return (

            <div key={user.secondPersonId._id} className={`flex w-full border-b border-slate-100 ${user.secondPersonId._id === receiverId ? 'bg-slate-200' : ''}`} onClick={openDrawer}>
              <div className="flex p-3 w-full cursor-pointer" onClick={() => handleFetchMessages(user.secondPersonId._id)}>
                <div className="flex w-full space-x-2">
                  <Wrap>
                    <WrapItem>
                      <Avatar name={user.secondPersonId.parkingName} src='https://bit.ly/tioluwani-kolawole' />
                    </WrapItem>
                  </Wrap>
                  <div className="w-full text-sm font-semibold mt-2 capitalize">
                    <div className="flex justify-between">
                      <p>{user.secondPersonId.parkingName}</p>
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
          (
            <div className="flex justify-center items-start mt-24">
              <img src={no_messagesImg} className='h-60 opacity-75' />
            </div>
          )

        }

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
              <IoChevronBackSharp onClick={closeDrawer} className='text-2xl text-gray-500 cursor-pointer' />

              <Wrap>
                <WrapItem>
                  <Avatar size={'sm'} name={receiverDetails.parkingName} src='https://bit.ly/tioluwani-kolawole' />
                </WrapItem>
              </Wrap>

              <div className='flex-grow'>
                <p className='text-sm font-semibold capitalize'>{receiverDetails.parkingName}</p>
                <p className='text-xs text-gray-700 flex items-center'>
                  Active now
                  <span className='h-2 w-2 ml-2 mt-[1px] rounded-full bg-[#5cb63e]'></span>
                </p>
              </div>

              <div className='flex space-x-9 justify-end'>
                <FaVideo onClick={handleVideoCall} className='text-xl cursor-pointer' />
              </div>
            </DrawerHeader>
            <Divider orientation='horizontal' />
            <DrawerBody>
              {messages.map((msg) => {
                return (
                  <>
                    <div className={`chat ${msg.senderId === userInfo.id ? 'chat-end' : 'chat-start'} mt-2 relative`}>
                      {msg.senderId === userInfo.id && (<time className="text-xs opacity-50 absolute z-10 text-white right-5 bottom-2">{calculateTime(msg.updatedAt)}</time>)}
                      <div className={`chat-bubble rounded-lg shadow-xl text-sm text-white ${msg.senderId === userInfo.id ? 'bg-blue-500' : 'bg-blue-800'}`}><span className='mr-10'>{msg.message}</span></div>
                    </div>
                  </>
                )
              })}
              <div className='h-4' ref={messagesEndRef} />

            </DrawerBody>
            <div className="fixed bottom-0 right-0 bg-white h-14 rounded-md w-full">
              <form className='w-full mx-5 relative' onSubmit={enterButtonSend}>
                <input type='text' value={text} onChange={(e) => setText(e.target.value)} className='w-11/12 rounded-lg shadow-xl px-12' />
              </form>
              <BsEmojiSmile onClick={toggleEmojiModal} className='absolute left-8 bottom-6 hover:text-gray-500 active:scale-[1.08] text-2xl transition-opacity cursor-pointer' />

              <div className='absolute left-7 bottom-16'>
                <EmojiPicker open={showEmoji} onEmojiClick={handleEmogiClick} />
              </div>
              <TbSend2 className={`absolute right-6 xs:right-9 sm:right-12 bottom-6 text-2xl transition-opacity cursor-pointer ${!text.length ? 'opacity-0' : 'opacity-100'}`}
              />
              <TbSend onClick={addToMessages} className={`absolute right-6 xs:right-9 sm:right-12 bottom-6 text-2xl transition-opacity cursor-pointer ${text.length ? 'opacity-0' : 'opacity-100'}`}
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
                <p className='text-md font-semibold capitalize'>{receiverDetails.parkingName}</p>
                <p className='text-xs text-gray-700 flex items-center'>
                  Active now
                  <span className='h-2 w-2 ml-2 mt-[1px] rounded-full bg-[#5cb63e]'></span>
                </p>
              </div>

              <div className='flex space-x-9 justify-end'>
                <FaVideo onClick={handleVideoCall} className='text-2xl cursor-pointer hover:text-gray-600' />
              </div>
            </div>
          </div>

          <div className="p-5">
            {messages.map((msg) => {
              return (
                <>
                  <div className={`chat ${msg.senderId === userInfo.id ? 'chat-end' : 'chat-start'} mt-2 relative`}>
                    {msg.senderId === userInfo.id && (<time className="text-xs opacity-50 absolute z-10 text-white right-5 bottom-2">{calculateTime(msg.updatedAt)}</time>)}
                    <div className={`chat-bubble rounded-lg shadow-xl text-sm text-white ${msg.senderId === userInfo.id ? 'bg-blue-500' : 'bg-blue-800'}`}><span className='mr-12'>{msg.message}</span></div>
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
            <TbSend2 className={`absolute md:right-14 lg:right-16 xl:right-20 bottom-6 text-2xl transition-opacity cursor-pointer ${!text.length ? 'opacity-0' : 'opacity-100'}`}
            />
            <TbSend onClick={addToMessages} className={`absolute md:right-14 lg:right-16 xl:right-20 bottom-6 text-2xl transition-opacity cursor-pointer ${text.length ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
          <div ref={pageEndRef} />
        </div>) :
        (
          <div className="w-7/12 hidden md:block overflow-y-scroll hide-scrollbar outline outline-slate-200 outline-1 rounded-r-xl max-h-[700px]">
            <div className="flex justify-center items-center bg-gray-50 h-full">
              <div className="">
                <p className='text-center text-2xl text-gray-500 font-sans'>Chat for Parkwise </p>
                <p className='text-center text-md text-gray-500 font-sans'> Get in contact with the parking providers </p>
              </div>
            </div>
          </div>
        )
      }
    </motion.div>

  )
}

export default UserChats