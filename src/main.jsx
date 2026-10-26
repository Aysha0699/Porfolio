
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initLiquidTouch } from './utils/LiquidTouch.js'

initLiquidTouch("button, .btn, .icon-btn, .chip, .pcard > article, .acard, .dtile, [data-liquid]")

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
