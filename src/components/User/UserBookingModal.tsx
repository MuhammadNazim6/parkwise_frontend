import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import Paypal from '@/components/User/Paypal';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import { LiaRupeeSignSolid } from "react-icons/lia";
import Lottie from 'lottie-react'
import bookedAnim from '../../assets/Animation/bookedAnim.json'
import { RootState } from '@/redux/store';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import { ReactPdfTicket } from '@/components/Common/ReactPdf';

function UserBookingModal({ isOpen, setBookingModalOpen, lotDetails, selectedSlots, date, checkAvailabilty }) {
  const [services, setServices] = useState({ airPressure: false, waterService: false, evCharging: false })
  const [totalAmount, setTotalAmount] = useState(null)
  const [afterPayment, setAfterPayment] = useState(false)

  useEffect(() => {
    calculateAmount()
  })

  const { bookingData } = useSelector((state: RootState) => state.booking);

  const calculateAmount = () => {
    let serviceCharge = 0;
    if (services.airPressure) {
      serviceCharge += lotDetails.airPressureCheckPrice
    }
    if (services.waterService) {
      serviceCharge += lotDetails.waterServicePrice
    }
    if (services.evCharging) {
      serviceCharge += lotDetails.evChargeFacilityPrice
    }
    setTotalAmount((selectedSlots.size * lotDetails.pricePerHour) + serviceCharge)
  }

  const addRemoveService = (service) => {
    setServices((prev) => ({ ...prev, [service]: !prev[service] }))
    calculateAmount()
  }

  const onClose = () => {
    setServices({ airPressure: false, waterService: false, evCharging: false })
    setAfterPayment(false)
    setBookingModalOpen(false)
  }

  return (
    <>
      <Modal onClose={onClose} size={'lg'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent className='h-content min-h-[50vh]'>
          <ModalHeader>{afterPayment ? `Booking Successful` : `Booking`}</ModalHeader>
          <ModalCloseButton />
          {afterPayment ? (
            <>
              <div className="flex justify-center">
                <Lottie animationData={bookedAnim} className='w-2/3' />
              </div>
              <div className="flex justify-center">
                <p className="text-blue-500 font-semibold">Your slots have been booked</p>
              </div>
              <div className="max-w-md mx-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-8 m-7 text-sm">
                <div className="mx-8 flex justify-between items-center">
                  <p className="font-medium">Slots booked:</p>
                  <p className="text-sm font-medium">{bookingData.selectedSlots.length}</p>
                </div>
                <div className="mx-8 mt-4 flex justify-between items-center">
                  <p className="font-medium">Time of bookings:</p>
                  <div className="text-sm">
                    {Array.from(bookingData.selectedSlots).map((slot, index) => (
                      <p key={index} className="p-1 font-medium">{slot}</p>
                    ))}
                  </div>
                </div>
                <div className="mx-8 mt-4 flex justify-between items-center">
                  <p className="font-medium">Services chosen:</p>
                  <div className="text-sm">
                    <p> {bookingData.servicesUsed.airPressure ? 'Air pressure' : null}</p>
                    <p> {bookingData.servicesUsed.waterService ? 'Water service' : null}</p>
                    <p> {bookingData.servicesUsed.evCharging ? 'Ev charging' : null}</p>
                  </div>
                </div>
                <div className="mx-8 mt-4 flex justify-between items-center">
                  <p className="font-medium">Total amount:</p>
                  <p className="text-sm font-medium">Rs: {bookingData.amount}</p>
                </div>
                {bookingData && (<div className='flex justify-center'>
                  <PDFDownloadLink document={<ReactPdfTicket bookingData={bookingData} />} fileName="somename.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download ticket!')}
                  </PDFDownloadLink>
                </div>)}
              </div>
            </>
          ) : (<>
            <ModalBody>
              Select services:
              <Stack spacing={5} direction='row'>
                {lotDetails && (<CheckboxGroup>
                  {lotDetails.airPressureCheckPrice ? (<Checkbox className='m-3' value='airPressure' colorScheme='green' isChecked={services.airPressure} onChange={(event) => addRemoveService(event.target.value)}>
                    Air pressure
                  </Checkbox>) : null}
                  {lotDetails.waterServicePrice ? (<Checkbox className='m-3' value='waterService' colorScheme='green' isChecked={services.waterService} onChange={(event) => addRemoveService(event.target.value)}>
                    Water service
                  </Checkbox>) : null}
                  {lotDetails.evChargeFacilityPrice ? (<Checkbox className='m-3' value='evCharging' colorScheme='green' isChecked={services.evCharging} onChange={(event) => addRemoveService(event.target.value)}>
                    Ev charging
                  </Checkbox>) : null}
                </CheckboxGroup>)}
              </Stack>
            </ModalBody>
            <div className="flex justify-evenly items-center">
              <p className='flex items-center justify-center text-xl font-bold'><LiaRupeeSignSolid /> <span>{totalAmount}.00</span></p>
              <Paypal services={services} selectedSlots={selectedSlots} totalAmount={totalAmount} date={date} checkAvailabilty={checkAvailabilty} setAfterPayment={setAfterPayment} />
            </div>
          </>)}
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserBookingModal