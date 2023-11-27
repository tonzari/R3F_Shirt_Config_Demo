import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Canvas.jsx'
import './index.css'
import Overlay from './Overlay.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
  </>
  )
