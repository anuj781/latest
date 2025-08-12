import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // ✅ Tailwind directives must be in this file
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
