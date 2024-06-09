import React, { useEffect, useRef, useState } from 'react'
import { useBookSlotsMutation, useConfirmkSlotAvailabilityMutation } from '@/redux/slices/userApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/redux/store";
import { useParams } from 'react-router-dom';
import { setBookingData } from '@/redux/slices/bookingSlice';
declare global {
  interface Window {
    paypal: any;
  }
}
import { useToast } from "@/components/ui/use-toast"



function Paypal({ services, selectedSlots, totalAmount, date, checkAvailabilty, setAfterPayment ,onModalClose}) {

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { id } = useParams()
  const dispatch = useDispatch()
  const [paypalInstance, setPaypalInstance] = useState(null)
  const [bookSlots, { isLoading }] = useBookSlotsMutation()
  const paypal = useRef(null)
  const [confirmSlotAvailability, { isLoading: confirmSlotLoading }] = useConfirmkSlotAvailabilityMutation()
  const { toast } = useToast()


  const checkLiveSlotAvailablity = async () => {
    const data = {
      slots: Array.from(selectedSlots),
      lotId: id,
      date
    }
    const checked = await confirmSlotAvailability(data).unwrap()
    if (checked.success) {
      if (checked.data.length) {
        toast({
          variant: "destructive",
          title: checked.data.join(', '),
          description: "The above selected slots have already been filled, Kindly Try other slots.",
        })
        return false
      }
    }
    return true
  }

  useEffect(() => {
    const description = `Booking for services: ${services.airPressure ? 'Air pressure adjustment, ' : null} ${services.waterService ? 'Water service, ' : null}  ${services.evCharging ? 'EV charging' : null}.`;
    const convertedAmount = totalAmount * 0.016
    if (!paypalInstance) {
      const newPaypalInstance = window.paypal.Buttons({
        createOrder: async (data: any, actions: any, err: any) => {
          const isAvailable = await checkLiveSlotAvailablity()
          if (isAvailable) {
            return actions.order.create({
              purchase_units: [{
                description: description,
                amount: {
                  currency_code: 'CAD',
                  value: convertedAmount,
                },
              }],
            });
          }else{
            onModalClose()
            checkAvailabilty()
          }

        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          const selectedSlotsArray = Array.from(selectedSlots);

          const bookingDetails = {
            selectedSlots: selectedSlotsArray,
            services: services,
            amount: totalAmount,
            userId: userInfo.id,
            lotId: id,
            bookingDate: date
          }
          const booking = await bookSlots(bookingDetails).unwrap()
          if (booking.success) {
            dispatch(setBookingData(booking.data))
            console.log('Created booking success');
            setAfterPayment(true)
            checkAvailabilty()

          }
        },
        onError: (err) => {
          console.log(err);
        }
      })
      setPaypalInstance(newPaypalInstance);
    }
    // Cleanup
    return () => {
      if (paypalInstance) {
        paypalInstance.close();
        setPaypalInstance(null);
      }
    };
  }, [services, totalAmount, paypalInstance]);
  useEffect(() => {
    if (paypalInstance) {
      paypalInstance.render(paypal.current);
    }
  }, [paypalInstance]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}

export default Paypal

