import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// Set Axios Base URL from Environment Variable (for Vercel)
console.log('[DEBUG] VITE_API_URL:', import.meta.env.VITE_API_URL);
if (import.meta.env.VITE_API_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
} else {
  console.error('[CRITICAL] VITE_API_URL is missing! Requests will fail.');
}

import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
