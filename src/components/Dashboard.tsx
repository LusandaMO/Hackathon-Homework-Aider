import React from 'react';
import { 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Users, 
  Star,
  Trophy,
  Heart,
  Sparkles
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Dashboard: React.FC = () => {
  const { currentUser } = useApp();

  const stats = [
    {
      title: 'Unread Messages',
      value: '5',
      icon: MessageCircle,
      color: 'from-blue-400 to-purple-500',
      bgColor: 'from-blue-50 to-purple-50'
    },
    {
      title: 'Upcoming Meetings',
      value: '2',
      icon: Calendar,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Progress Updates',
      value: '8',
      icon: TrendingUp,
      color: 'from-orange-400 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      title: currentUser?.role === 'parent' ? 'Children' : 'Students',
      value: currentUser?.role === 'parent' ? currentUser?.children?.length.toString() || '0' : '24',
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'message',
      title: 'New message from Mrs. Smith',
      description: 'Emma did great on her math test! 🌟',
      time: '2 hours ago',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      type: 'progress',
      title: 'Progress update available',
      description: 'Weekly reading progress for Alex',
      time: '1 day ago',
      color: 'bg-green-500'
    },
    {
      id: '3',
      type: 'meeting',
      title: 'Meeting scheduled',
      description: 'Parent-teacher conference next week',
      time: '2 days ago',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white animate-bounce-gentle">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">
                Welcome back, {currentUser?.name}! 🎉
              </h2>
              <p className="text-xl text-yellow-200 font-bold">
                {currentUser?.role === 'parent' 
                  ? "Let's check on your child's amazing progress! ✨" 
                  : "Ready to inspire young minds today! 🚀"
                }
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '0.5s' }}>
            <Heart className="w-5 h-5 text-white fill-current" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl p-6 border-4 border-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden`}
            >
              <div className="absolute top-2 right-2">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-black text-gray-800">{stat.value}</p>
                  <p className="text-sm font-bold text-gray-600">{stat.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-gray-800">Recent Activities 🌟</h3>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 transform hover:scale-102"
            >
              <div className={`w-3 h-3 ${activity.color} rounded-full animate-pulse`}></div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{activity.title}</h4>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
          <MessageCircle className="w-8 h-8 mb-3 mx-auto" />
          <h4 className="font-black text-lg">Send Message 💬</h4>
          <p className="text-sm opacity-90">Connect with teachers/parents</p>
        </button>
        
        <button className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
          <Calendar className="w-8 h-8 mb-3 mx-auto" />
          <h4 className="font-black text-lg">Schedule Meeting 📅</h4>
          <p className="text-sm opacity-90">Book a conference</p>
        </button>
        
        <button className="bg-gradient-to-br from-purple-400 to-pink-500 text-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
          <TrendingUp className="w-8 h-8 mb-3 mx-auto" />
          <h4 className="font-black text-lg">View Progress 📊</h4>
          <p className="text-sm opacity-90">Check student updates</p>
        </button>
      </div>
    </div>
  );
};