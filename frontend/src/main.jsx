import { Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <Fragment>
    <ToastContainer
      autoClose={2000}
      position='top-center'
    />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Fragment>
)
