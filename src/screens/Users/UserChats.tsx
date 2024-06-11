import React, { useState, useRef } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
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




function UserChats() {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const { isOpen, onToggle } = useDisclosure()
  const users = [
    {
      name: 'Sabith muhammad',
      message: 'Wanna grab a coffee???',
      avatar: 'https://bit.ly/tioluwani-kolawole',
    },
    {
      name: 'John Doe',
      message: 'Hey, how are you?',
      avatar: 'https://bit.ly/tioluwani-kolawole',
    },
    {
      name: 'Jane Smith',
      message: 'Are you coming to the meeting?',
      avatar: 'https://bit.ly/ryan-florence',
    },
    {
      name: 'Alex Johnson',
      message: 'Let’s catch up later!',
      avatar: 'https://bit.ly/kent-c-dodds',
    },
    {
      name: 'Emily Davis',
      message: 'Good morning!',
      avatar: 'https://bit.ly/prosper-baba',
    },
    {
      name: 'Michael Brown',
      message: 'Have you seen the latest movie?',
      avatar: 'https://bit.ly/sage-adebayo',
    },
    {
      name: 'Sophia Wilson',
      message: 'What time is the party?',
      avatar: 'https://bit.ly/andrew-codes',
    },
    {
      name: 'David Garcia',
      message: 'How was your weekend?',
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      name: 'Emma Martinez',
      message: 'I love your new profile picture!',
      avatar: 'https://bit.ly/code-beast',
    },
    {
      name: 'William Anderson',
      message: 'Let’s go for a hike!',
      avatar: 'https://bit.ly/ken-wheeler',
    },
    {
      name: 'Olivia Taylor',
      message: 'Happy birthday!',
      avatar: 'https://bit.ly/tim-neuenschwander',
    },
  ];

  const isFullScreen = useBreakpointValue({ base: true, md: false });
  const { isOpen: isOpenDrawer, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure()
  const btnRef = useRef()

  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev)
  }

  return (
    <div className='flex w-full'>
      <div className='w-full md:w-5/12'>
        <div className="flex w-full">
          <div className="flex justify-between p-4 w-full bg-blue-50 z-10 md:w-full">
            <div className="flex w-2/3 space-x-2">
              <Wrap>
                <WrapItem>
                  <Avatar name='Muhammad Nazim' src='https://bit.ly/tioluwani-kolawole' />
                </WrapItem>
              </Wrap>
              <div className="w-2/3 font-medium">Welcome Back,<p className='text-[16px] font-semibold'> Nazim!</p></div>
            </div>
            <div className="" onClick={onToggle}>
              <div className="rounded-full bg-primary-blue h-11 w-11 flex justify-center items-center text-xl">
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
        <Collapse in={isOpen} animateOpacity className='sticky top-0 z-10 md:w-full'>
          <div className="flex justify-between p-5 w-full bg-blue-50 shadow-lg space-x-3">
            <input type='text' className='w-full h-9 rounded-2xl' placeholder='Search your chat..' />
          </div>
        </Collapse>

        {users.map((user, index) => {
          return (
            <div className="mt-1 w-ful md:w-full lg:w-9/12" onClick={openDrawer}>
              <div className="flex lg:ml-1 w-full xs:w-8/12 sm:w-7/12 md:w-full justify-start">
                <div className="p-3 w-1/5">
                  <Wrap>
                    <WrapItem>
                      <Avatar name={user.name} src='https://bit.ly/tioluwani-kolawole' />
                    </WrapItem>
                  </Wrap>
                </div>
                <div className=" w-3/5 pt-2">
                  <div className="font-semibold">
                    {user.name}
                  </div>
                  <div className="text-sm">
                    {user.message}
                  </div>
                </div>
                {index % 2 == 0 && <div className="p-1 flex justify-center items-center w-1/5">
                  <Badge ml='4' colorScheme='green' className='overflow-hidden'>
                    1
                  </Badge>
                </div>}

                {isFullScreen && <Drawer
                  isOpen={isOpenDrawer}
                  placement='right'
                  onClose={closeDrawer}
                  finalFocusRef={btnRef}
                >
                  {/* <DrawerOverlay /> */}
                  <DrawerContent
                    width={isFullScreen ? '100vw' : 'auto'}
                    height={isFullScreen ? '100vh' : 'auto'}
                    maxWidth={isFullScreen ? '100vw' : '60vw'}
                  >

                    <DrawerHeader className='flex items-center space-x-3'>
                      <IoChevronBackSharp onClick={closeDrawer} className='text-2xl text-gray-600 cursor-pointer' />

                      <Wrap>
                        <WrapItem>
                          <Avatar name='Shohail muhd' src='https://bit.ly/tioluwani-kolawole' />
                        </WrapItem>
                      </Wrap>

                      <div className='flex-grow'>
                        <p className='text-md font-semibold'>Shohail muhd</p>
                        <p className='text-sm text-gray-400 flex items-center'>
                          Active now
                          <span className='h-2 w-2 ml-1 mt-[6px] rounded-full bg-[#5cb63e]'></span>
                        </p>
                      </div>

                      <div className='flex space-x-9 justify-end'>
                        <IoMdCall className='text-2xl cursor-pointer' />
                        <FaVideo className='text-2xl cursor-pointer' />
                      </div>
                    </DrawerHeader>
                    <Divider orientation='horizontal' />
                    <DrawerBody>
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div>
                        <div className="chat-bubble bg-blue-600">Helloooo</div>
                      </div>
                      
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div>
                        <div className="chat-bubble bg-blue-600">It was you who would bring balance to the Force</div>
                      </div>
 
                      <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div>
                       
                        <div className="chat-bubble">I hate you!</div>
                      
                      </div>
                      
                   
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div>
                        <div className="chat-bubble bg-blue-600">It was you who would bring balance to the Force</div>
                      </div>
                    
                      <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div>
                        <div className="chat-header">
                          Anakin
                          <time className="text-xs opacity-50">12:46</time>
                        </div>
                        <div className="chat-bubble">I hate you!</div>
                        <div className="chat-footer opacity-50">
                          Seen at 12:46
                        </div>
                      </div>
                    </DrawerBody>
                    <DrawerFooter>
                      {/* <Button variant='outline' mr={3} onClick={closeDrawer}>
                        Cancel
                      </Button> */}
                      {/* <Button colorScheme='blue'>Save</Button> */}
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>}
              </div>
              <Divider orientation='horizontal' />
            </div>
          )
        })}
      </div>
      <div className="h-screen bg-yellow-300 w-7/12 hidden md:block">
        Hello
      </div>
    </div>
  )
}

export default UserChats