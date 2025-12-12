import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Bot, LogOut, User } from 'lucide-react';
import useAuthStore from '../store/authStore';
import logo from '../assets/logo.png';

const Layout = ({ children, title }) => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Home', to: '/dashboard' },
    { icon: FilePlus, label: 'Report', to: '/report' },
    { icon: Bot, label: 'AI Helper', to: '/ai' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
           <img src={logo} alt="Heal Salone Logo" className="h-8 w-auto" />
           <h1 className="text-xl font-bold text-slate-900">Heal Salone</h1>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={handleLogout} className="p-2 text-slate-600">
             <LogOut size={20} />
           </button>
        </div>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full">
        <div className="p-6 flex flex-col items-center border-b border-slate-100">
          <img src={logo} alt="Heal Salone Logo" className="h-16 w-auto mb-2" />
          <h1 className="text-xl font-bold text-primary-600">Heal Salone</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around p-2 pb-safe z-10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg text-xs font-medium transition-colors ${
                isActive ? 'text-primary-600' : 'text-slate-500'
              }`
            }
          >
            <item.icon size={24} className="mb-1" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto mb-16 md:mb-0">
        <div className="max-w-4xl mx-auto">
          {title && <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
