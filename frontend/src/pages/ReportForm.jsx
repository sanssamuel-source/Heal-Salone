import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import { Camera, MapPin } from 'lucide-react';
import axios from 'axios';

const ReportForm = () => {
  const [formData, setFormData] = useState({ symptoms: '', mood: '', photoUrl: '' }); // Simplified
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Stub API call
      // await axios.post('/api/health', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Mock delay
      alert('Report submitted successfully!');
      setFormData({ symptoms: '', mood: '', photoUrl: '' });
    } catch (error) {
      alert('Failed to submit report');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="New Health Report">
      <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">How are you feeling?</label>
            <textarea
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[120px]"
              placeholder="Describe your symptoms or observations..."
              required
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Mood (Optional)"
              placeholder="e.g. Anxious, Tired"
              value={formData.mood}
              onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
            />
            {/* Location stub */}
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <button type="button" className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
                <MapPin size={18} />
                Get Current Location
              </button>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-2">Photo Evidence</label>
             <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer">
               <Camera className="w-8 h-8 mb-2" />
               <p className="text-sm">Click to upload or take a photo</p>
             </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ReportForm;
