import React from 'react';
import { User, GraduationCap, Users, BookOpen } from 'lucide-react';
import { User as UserType, Subscription } from '../types';

interface UserSelectorProps {
  onSelectUser: (user: UserType) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({ onSelectUser }) => {
  const demoUsers: UserType[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'parent',
      credits: 5,
      children: [
        {
          id: 's1',
          name: 'Emma Johnson',
          grade: '3rd Grade',
          class: 'Mrs. Smith\'s Class',
          parentIds: ['1'],
          teacherIds: ['3']
        }
      ]
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      role: 'parent',
      credits: 0,
      subscription: {
        id: 'sub_1',
        userId: '2',
        plan: 'family_monthly',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        price: 500,
        currency: 'KES',
        features: ['Unlimited questions', 'Priority support'],
        questionsRemaining: undefined // Unlimited
      },
      children: [
        {
          id: 's2',
          name: 'Alex Chen',
          grade: '5th Grade',
          class: 'Mr. Davis\'s Class',
          parentIds: ['2'],
          teacherIds: ['4']
        }
      ]
    },
    {
      id: '3',
      name: 'Mrs. Smith',
      email: 'mrs.smith@school.edu',
      role: 'teacher',
      classes: [
        {
          id: 'c1',
          name: '3rd Grade Math',
          grade: '3rd Grade',
          subject: 'Mathematics',
          teacherId: '3',
          students: []
        }
      ]
    },
    {
      id: '4',
      name: 'Mr. Davis',
      email: 'mr.davis@school.edu',
      role: 'teacher',
      classes: [
        {
          id: 'c2',
          name: '5th Grade Science',
          grade: '5th Grade',
          subject: 'Science',
          teacherId: '4',
          students: []
        }
      ]
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'parent':
        return <Users className="w-8 h-8 text-white" />;
      case 'teacher':
        return <GraduationCap className="w-8 h-8 text-white" />;
      default:
        return <BookOpen className="w-8 h-8 text-white" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'parent':
        return 'from-green-400 to-emerald-500';
      case 'teacher':
        return 'from-blue-400 to-indigo-500';
      default:
        return 'from-purple-400 to-pink-500';
    }
  };

  const getSubscriptionBadge = (user: UserType) => {
    if (user.subscription && user.subscription.status === 'active') {
      return (
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <span>👑 {user.subscription.plan.toUpperCase()}</span>
        </div>
      );
    }
    if (user.credits && user.credits > 0) {
      return (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
          {user.credits} Credits
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 via-blue-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white animate-bounce-gentle">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                EduConnect
              </h1>
              <p className="text-xl text-gray-600 font-bold">Parent-Teacher Communication Hub</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 font-medium">
            🌟 Choose your role to get started! 🌟
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {demoUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user)}
              className="bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-200 hover:border-purple-400 cursor-pointer transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${getRoleColor(user.role)} rounded-2xl flex items-center justify-center shadow-lg group-hover:animate-bounce`}>
                  {getRoleIcon(user.role)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                    {getSubscriptionBadge(user)}
                  </div>
                  <p className="text-purple-600 font-semibold capitalize">{user.role}</p>
                </div>
              </div>

              {user.role === 'parent' && user.children && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">👨‍👩‍👧‍👦 Children:</p>
                  {user.children.map((child) => (
                    <div key={child.id} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>{child.name} - {child.grade}</span>
                    </div>
                  ))}
                </div>
              )}

              {user.role === 'teacher' && user.classes && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">📚 Classes:</p>
                  {user.classes.map((cls) => (
                    <div key={cls.id} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>{cls.name}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  Continue as {user.name} ✨
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};