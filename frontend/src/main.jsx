import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// Set Axios Base URL from Environment Variable (for Vercel)
// Set Axios Base URL
const envUrl = import.meta.env.VITE_API_URL;
console.log('[DEBUG] VITE_API_URL:', envUrl);

// If URL is set and NOT just a slash, use it. Otherwise use relative (Proxy)
if (envUrl && envUrl !== '/') {
  axios.defaults.baseURL = envUrl;
} else {
  console.log('[DEBUG] Using Vercel Proxy (Relative Path)');
  axios.defaults.baseURL = ''; // Use relative path
}

import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
