import React, { useEffect, useRef, useState } from 'react'
import { useBookSlotsMutation } from '@/redux/slices/userApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/redux/store";
import { useParams } from 'react-router-dom';
import { setBookingData } from '@/redux/slices/bookingSlice';
declare global {
  interface Window {
    paypal: any;
  }
}


function Paypal({ services, selectedSlots, totalAmount, date, checkAvailabilty, setAfterPayment }) {
  
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { id } = useParams()
  const dispatch = useDispatch()
  const [paypalInstance, setPaypalInstance] = useState(null)
  const [bookSlots, { isLoading }] = useBookSlotsMutation()
  const paypal = useRef(null)

  useEffect(() => {
    const description = `Booking for services: ${services.airPressure ? 'Air pressure adjustment, ' : null} ${services.waterService ? 'Water service, ' : null}  ${services.evCharging ? 'EV charging' : null}.`;
    const convertedAmount = totalAmount * 0.016

    if (!paypalInstance) {
      const newPaypalInstance = window.paypal.Buttons({
        createOrder: (data: any, actions: any, err: any) => {
          return actions.order.create({
            purchase_units: [{
              description: description,
              amount: {
                currency_code: 'CAD',
                value: convertedAmount,
              },
            }],
          });
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

