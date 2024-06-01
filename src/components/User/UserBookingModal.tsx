import React, { useEffect, useState } from 'react'
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
import Paypal from '@/components/User/Paypal';
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import { LiaRupeeSignSolid } from "react-icons/lia";


function UserBookingModal({ isOpen, setBookingModalOpen, lotDetails, selectedSlots, date, checkAvailabilty }) {
  const [services, setServices] = useState({ airPressure: false, waterService: false, evCharging: false })
  const [totalAmount, setTotalAmount] = useState(null)
  const [afterPayment, setAfterPayment] = useState(false)

  useEffect(() => {
    calculateAmount()
  })

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
    setBookingModalOpen(false)
    setAfterPayment(true)
  }


  return (
    <>
      <Modal onClose={onClose} size={'lg'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent className='h-content min-h-[50vh]'>

          <ModalHeader>{afterPayment ? `Booking Successful` : `Booking`}</ModalHeader>
          <ModalCloseButton />

          {!afterPayment ? (
            <div className="">
             Helooo
            </div>
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
              <Paypal services={services} selectedSlots={selectedSlots} totalAmount={totalAmount} date={date} onClose={onClose} checkAvailabilty={checkAvailabilty} />
            </div>
          </>)}


        </ModalContent>
      </Modal>
    </>
  )
}

export default UserBookingModal