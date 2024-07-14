import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ThemeProvider } from "@material-tailwind/react";
import { SocketProvider } from './context/SocketProvider'
import { BrowserRouter } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <ThemeProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ThemeProvider>
  </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
)
