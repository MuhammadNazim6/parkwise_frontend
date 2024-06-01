import React, { useEffect, useRef } from 'react'
import { useBookSlotsMutation } from '@/redux/slices/userApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { useParams } from 'react-router-dom';

function Paypal({ services, selectedSlots, totalAmount, date, onClose, checkAvailabilty }) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();


  const [bookSlots, { isLoading }] = useBookSlotsMutation()
  const paypal = useRef(null)

  useEffect(() => {

    console.log(date);

    const description = `Booking for services: ${services.airPressure ? 'Air pressure adjustment, ' : null} ${services.waterService ? 'Water service, ' : null}  ${services.evCharging ? 'EV charging' : null}.`;
    const convertedAmount = totalAmount * 0.016
    window.paypal.Buttons({
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

        console.log(order);

        const selectedSlotsArray = Array.from(selectedSlots);

        const bookingDetails = {
          selectedSlots: selectedSlotsArray,
          services,
          amount: totalAmount,
          userId: userInfo.id,
          lotId: id,
          bookingDate: date
        }
        console.log(bookingDetails);

        const booking = await bookSlots(bookingDetails).unwrap()
        if (booking.success) {
          console.log('Created booking success');
          onClose()
          checkAvailabilty()
        }
      },
      onError: (err) => {
        console.log(err);
      }
    }).render(paypal.current)
  }, [])

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}

export default Paypal

interface Window {
  paypal: {
    Buttons: (options: any) => any;
  };
}