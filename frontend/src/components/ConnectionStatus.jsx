import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';

const ConnectionStatus = () => {
  const [status, setStatus] = useState('checking'); // checking, connected, error
  const [details, setDetails] = useState('');
  // Force relative path (Proxy) to avoid CORS and Mixed Content
  const effectiveUrl = ''; 
  const target = '/api/ping'; // Always use relative path for Proxy
  const version = "v18 (Proxy Mode)";

  useEffect(() => {
    const checkConnection = async () => {
      // Check for Mixed Content risk immediately
      if (isHttps && apiUrl && apiUrl.startsWith('http:')) {
         setStatus('mixed_content');
         return;
      }

      try {
        await axios.get(target);
        setStatus('connected');
      } catch (err) {
        setStatus('error');
        setDetails(err.message);
      }
    };
    checkConnection();
  }, []);

  if (status === 'checking') return <div className="text-xs text-slate-500 mb-4">Checking connection to Backend...</div>;
  
  if (status === 'connected') return (
    <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 p-2 rounded mb-4">
      <Wifi size={14} />
      <span>Backend Online ({version})</span>
    </div>
  );

  if (status === 'mixed_content') return (
    <div className="flex flex-col gap-1 text-xs text-amber-700 bg-amber-50 p-3 rounded mb-4 border border-amber-200">
      <div className="flex items-center gap-2 font-bold">
        <AlertTriangle size={14} />
        <span>Security Block (Mixed Content)</span>
      </div>
      <div className="ml-5">
        <p>Your site is <b>HTTPS</b> but your API URL is <b>HTTP</b>.</p>
        <p>Browsers block this.</p>
        <p className="mt-1 font-bold">Fix: Change Vercel VITE_API_URL to start with https://</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-1 text-xs text-red-600 bg-red-50 p-3 rounded mb-4 border border-red-200">
      <div className="flex items-center gap-2 font-bold">
        <WifiOff size={14} />
        <span>Backend Disconnected</span>
      </div>
      <div className="ml-5">
        <p>Target: <b>{target}</b> [{version}]</p>
        <p>Error: {details}</p>
        <p className="mt-1 text-[10px] text-slate-500">Using Vercel Proxy to bypass CORS.</p>
      </div>
    </div>
  );
};

export default ConnectionStatus;
