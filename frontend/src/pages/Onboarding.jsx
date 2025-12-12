import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import logo from '../assets/logo.png';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center mb-4">
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-primary-500/10">
            <img src={logo} alt="Heal Salone Logo" className="h-24 w-auto" />
          </div>
        </div>
        
        <div>
           <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
             Heal Salone
           </h1>
           <p className="text-xl text-slate-600">
             Youth-led health innovation for a stronger Sierra Leone.
           </p>
        </div>

        <div className="grid gap-6 mt-12 text-left">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm flex items-start gap-4 hover:bg-white hover:shadow-md transition-all">
            <div className="bg-emerald-100 p-2 rounded-lg">
               <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Official Health Data</h3>
              <p className="text-sm text-slate-600">Trusted reports verified by the Ministry of Health.</p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm flex items-start gap-4 hover:bg-white hover:shadow-md transition-all">
            <div className="bg-blue-100 p-2 rounded-lg">
               <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">AI Health Assistant</h3>
              <p className="text-sm text-slate-600">Smart answers to your health questions, 24/7.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-3">
          <Button onClick={() => navigate('/signup')} className="w-full text-lg py-3 shadow-lg shadow-primary-500/20">
            Get Started
          </Button>
          <Button variant="ghost" onClick={() => navigate('/login')} className="w-full">
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
