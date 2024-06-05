import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'

function BookingsListModal({ isOpen, onClose }) {
  const sampleBookings = [
    { id: 1, slot: '12:00,12:00,12:00', date: '2024-06-01', amount: '200' },
    { id: 2, slot: '01:00', date: '2024-06-02', amount: '150' },
    { id: 3, slot: '19:00', date: '2024-06-03', amount: '400' },
  ];

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'6xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Booking history</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10} className='min-h-96'>
            <div className="bg-white ">
              <div className="flex items-center p-5 w-full h-12 ">
                <div className="text-gray-700 font-semibold text-lg w-1/5 p-1">Date</div>
                <div className="text-gray-700 font-semibold text-lg w-1/5 p-1">Slots</div>
                <div className="text-gray-700 font-semibold text-lg w-1/5 p-1">Amount</div>
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
                      <div className="text-md text-gray-700 font-semibold p-1 w-1/5 transition-transform hover:text-gray-500 hover:scale-[1.007] ease-in-out duration-300">Cancel</div>
                      <div className="text-md text-gray-700 font-semibold p-1 w-1/5 transition-transform hover:text-gray-500 hover:scale-[1.007] ease-in-out duration-300">Reschedule</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='brown' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BookingsListModal