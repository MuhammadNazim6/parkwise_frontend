import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'

function ProvBookings() {

  const { isOpen, onOpen: openBookingDetaiolsModal, onClose } = useDisclosure()
  const sampleBookings = [
    { id: 1, slot: '12:00,12:00,12:00', date: '2024-06-01', amount: '200', username: 'nazim' },
    { id: 2, slot: '01:00', date: '2024-06-02', amount: '150', username: 'sabith' },
    { id: 3, slot: '19:00', date: '2024-06-03', amount: '400', username: 'rishal' },
  ];


  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-screen">
          <div className="bg-white ">
            <div className="flex items-center p-5 w-full h-12 ">
              <div className="text-gray-700 font-semibold text-lg w-1/5 p-1">Date</div>
              <div className="text-gray-700 font-semibold text-lg w-1/5 p-1">Slots</div>
              <div className="text-gray-700 font-semibold text-lg w-1/5 p-1">Amount</div>
              <div className="text-gray-700 font-semibold text-lg w-1/5 p-1">User</div>
              {/* <div className="text-gray-700 font-semibold text-lg w-2/5 p-1">Actions</div> */}
            </div>
          </div>
          {(sampleBookings.map((booking) => (
            <div key={booking.id} className="flex bg-gray-100">
              <div className="flex-grow md:w-2/3">
                <div className="bg-white shadow-sm rounded-md p-4 mt-3 cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-md text-gray-700 font-semibold p-1 w-1/5">{booking.date}</div>
                    <div className="ftext-md text-gray-700 font-semibold p-1 w-1/5">{booking.slot}</div>
                    <div className="text-md text-gray-700 font-semibold p-1 w-1/5">{booking.amount}</div>
                    <div className="text-md text-gray-700 font-semibold p-1 w-1/5">{booking.username}</div>
                    <div className="text-md text-gray-700 font-semibold p-1 w-1/5 transition-transform hover:text-gray-500 hover:scale-[1.007] ease-in-out duration-300" onClick={openBookingDetaiolsModal}>View</div>
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'4xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default ProvBookings