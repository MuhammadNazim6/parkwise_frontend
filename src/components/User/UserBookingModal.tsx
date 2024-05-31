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
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import { LiaRupeeSignSolid } from "react-icons/lia";


function UserBookingModal({ isOpen, setBookingModalOpen, lotDetails, selectedSlots }) {
  const [services, setServices] = useState({ airPressure: false, waterService: false, evCharging: false })
  const [totalAmount, setTotalAmount] = useState(null)

  useEffect(() => {
    console.log('llklklk');
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
  }
  return (
    <>
      <Modal onClose={onClose} size={'lg'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent className='h-1/2'>
          <ModalHeader>Booking</ModalHeader>
          <ModalCloseButton />
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
          <ModalFooter>
            <p className='m-4 flex items-center justify-center text-xl'><LiaRupeeSignSolid /> <span>{totalAmount}.00</span></p>
            <Button className='m-4' >Pay Now</Button>
            <Button className='m-4' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserBookingModal