import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// Set Axios Base URL from Environment Variable (for Vercel)
// Set Axios Base URL
// FORCE RELATIVE PATH to use Vercel Proxy
console.log('[DEBUG] Forcing Proxy Mode (v18)');
axios.defaults.baseURL = '';

import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
