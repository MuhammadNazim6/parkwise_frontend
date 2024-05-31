import React, { useEffect, useRef } from 'react'

function Paypal() {
  const paypal = useRef(null)

  useEffect(()=>{
    window.paypal.Buttons({
      createOrder:(data:any, actions:any,err:any)=>{
        return actions.order.create({
          purchase_units: [{
            description: 'nnnnnnnnn',
            amount: {
              currency_code: 'CAD',
              value: 100.00,
            },
          }],
        });
      },
      onApprove: async(data,actions)=>{
        const order=await actions.order.capture()
        console.log(order)
      },
      onError: (err) => {
        console.log(err);
        
      }
    }).render(paypal.current)
  },[])

  return (
    <div>
      <div ref={paypal}>jjjjjjjjjjjjjjoo</div>
    </div>
  )
}

export default Paypal

interface Window {
  paypal: {
    Buttons: (options: any) => any;  
  };
}