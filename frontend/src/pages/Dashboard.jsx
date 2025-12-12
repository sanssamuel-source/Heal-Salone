import React from 'react';
import Layout from '../components/Layout';
import { Activity, MapPin, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-500 font-medium text-sm">{label}</h3>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Reports Submitted" value="12" icon={Activity} color="bg-blue-500" />
        <StatCard label="Active Alerts" value="3" icon={AlertTriangle} color="bg-orange-500" />
        <StatCard label="Verfied Zones" value="5" icon={MapPin} color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900">Recent Health Tips</h3>
            <Link to="#" className="text-sm text-primary-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <Activity className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Malaria Prevention Tips</h4>
                  <p className="text-sm text-slate-500 line-clamp-1">Use insecticide-treated nets every night to protect against mosquito bites.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Feel something wrong?</h3>
            <p className="text-primary-100 mb-6">Report health issues in your community to help us track and prevent outbreaks.</p>
            <Link 
              to="/report" 
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Report Issue <ArrowRight size={18} />
            </Link>
          </div>
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
