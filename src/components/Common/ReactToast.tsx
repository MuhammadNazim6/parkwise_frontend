import React from 'react'
import { ToastContainer } from 'react-toastify';

function ReactToast() {


  const toastOptions = {
    position: 'top-left',
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const containerStyles = {
    border: 'solid #ccc',
    borderRadius: '8px',
    // backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '1px',
  };

  return (
    <ToastContainer style={containerStyles} {...toastOptions}/>
  )
}

export default ReactToast