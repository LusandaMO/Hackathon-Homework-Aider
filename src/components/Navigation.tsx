import React from 'react';
import { 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Bot, 
  Home, 
  Bell,
  Settings,
  LogOut,
  FileText,
  CalendarDays,
  CreditCard,
  Crown
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, userCredits, subscription } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-blue-400 to-purple-500' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, color: 'from-green-400 to-blue-500' },
    { id: 'meetings', label: 'Meetings', icon: Calendar, color: 'from-orange-400 to-red-500' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, color: 'from-purple-400 to-pink-500' },
    { id: 'reports', label: 'Reports', icon: FileText, color: 'from-indigo-400 to-purple-500' },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays, color: 'from-teal-400 to-blue-500' },
    { id: 'homework-helper', label: 'AI Helper', icon: Bot, color: 'from-yellow-400 to-orange-500' },
    { id: 'pricing', label: 'Pricing', icon: CreditCard, color: 'from-pink-400 to-purple-500' },
  ];

  const getSubscriptionBadge = () => {
    if (!subscription || subscription.status !== 'active') return null;
    
    const badgeColors = {
      'family_monthly': 'from-blue-400 to-indigo-500',
      'family_yearly': 'from-purple-400 to-pink-500',
      'school_partnership': 'from-yellow-400 to-orange-500'
    };

    return (
      <div className={`px-2 py-1 bg-gradient-to-r ${badgeColors[subscription.plan] || 'from-green-400 to-emerald-500'} rounded-full flex items-center gap-1`}>
        <Crown className="w-3 h-3 text-white" />
        <span className="text-xs font-bold text-white">
          {subscription.plan === 'family_monthly' ? 'FAMILY' : 
           subscription.plan === 'family_yearly' ? 'FAMILY+' : 
           subscription.plan === 'school_partnership' ? 'SCHOOL' : 'PRO'}
        </span>
      </div>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 border-b-4 border-yellow-300 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Now clickable to go home */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white animate-bounce-gentle hover:scale-110 transition-transform duration-200">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">EduConnect</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-yellow-200 font-semibold">
                  Welcome, {currentUser?.name}! ✨
                </p>
                {getSubscriptionBadge()}
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3 py-3 rounded-2xl font-bold text-xs transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg border-2 border-white`
                      : 'text-white hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:block">{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {/* Credits Display */}
            {currentUser?.role === 'parent' && (
              <div className="bg-white bg-opacity-20 rounded-2xl px-3 py-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-yellow-300" />
                <span className="text-white font-bold text-sm">{userCredits} Credits</span>
              </div>
            )}
            
            <button className="p-3 bg-white bg-opacity-20 rounded-2xl hover:bg-opacity-30 transition-all duration-200 relative">
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>
            <button className="p-3 bg-white bg-opacity-20 rounded-2xl hover:bg-opacity-30 transition-all duration-200">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};