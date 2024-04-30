import Toastify from 'toastify-js'

//handles showing toast
export const toast = (type:string, message:string, position = "left"):void => {
  const color =
    type === "error"
      ? "linear-gradient(90deg, rgba(210,24,40,1) 0%, rgba(158,55,50,1) 100%)"
      : "linear-gradient(to right, #00b09b, #185f7b)";

      const toastInstance = Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position, // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: color
        },
      });
    
      toastInstance.showToast() // Call the show method to display the toast
    };
