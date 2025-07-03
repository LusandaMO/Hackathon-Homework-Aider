import React, { useState } from 'react';
import { 
  TrendingUp, 
  Star, 
  Award, 
  BookOpen, 
  Calculator,
  Beaker,
  Palette,
  Globe,
  Target,
  Trophy,
  Heart,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Progress: React.FC = () => {
  const { currentUser, selectedStudent, setSelectedStudent } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock student data
  const students = [
    {
      id: 's1',
      name: 'Emma Johnson',
      grade: '3rd Grade',
      avatar: '👧',
      overallGrade: 'A-',
      subjects: [
        {
          name: 'Mathematics',
          icon: Calculator,
          grade: 'A',
          progress: 92,
          color: 'from-blue-400 to-indigo-500',
          recentActivities: [
            'Completed multiplication tables assessment - 95%',
            'Mastered fractions basics',
            'Excellent problem-solving skills shown'
          ]
        },
        {
          name: 'Reading',
          icon: BookOpen,
          grade: 'A-',
          progress: 88,
          color: 'from-green-400 to-emerald-500',
          recentActivities: [
            'Read 5 chapter books this month',
            'Improved reading comprehension',
            'Great vocabulary expansion'
          ]
        },
        {
          name: 'Science',
          icon: Beaker,
          grade: 'B+',
          progress: 85,
          color: 'from-purple-400 to-pink-500',
          recentActivities: [
            'Excellent science fair project',
            'Shows curiosity about experiments',
            'Good understanding of basic concepts'
          ]
        },
        {
          name: 'Art',
          icon: Palette,
          grade: 'A',
          progress: 95,
          color: 'from-orange-400 to-red-500',
          recentActivities: [
            'Creative and imaginative artwork',
            'Excellent use of colors',
            'Shows artistic talent'
          ]
        }
      ]
    },
    {
      id: 's2',
      name: 'Alex Chen',
      grade: '5th Grade',
      avatar: '👦',
      overallGrade: 'B+',
      subjects: [
        {
          name: 'Science',
          icon: Beaker,
          grade: 'A',
          progress: 94,
          color: 'from-purple-400 to-pink-500',
          recentActivities: [
            'Outstanding science project presentation',
            'Shows deep understanding of concepts',
            'Excellent lab work'
          ]
        },
        {
          name: 'Mathematics',
          icon: Calculator,
          grade: 'B',
          progress: 82,
          color: 'from-blue-400 to-indigo-500',
          recentActivities: [
            'Improving in algebra basics',
            'Needs practice with word problems',
            'Good effort in homework'
          ]
        }
      ]
    }
  ];

  const currentStudent = selectedStudent ? students.find(s => s.id === selectedStudent.id) : students[0];

  const getGradeColor = (grade: string) => {
    switch (grade.charAt(0)) {
      case 'A':
        return 'from-green-400 to-emerald-500';
      case 'B':
        return 'from-blue-400 to-indigo-500';
      case 'C':
        return 'from-yellow-400 to-orange-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const filteredSubjects = selectedSubject === 'all' 
    ? currentStudent?.subjects 
    : currentStudent?.subjects.filter(s => s.name.toLowerCase() === selectedSubject);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white animate-bounce-gentle">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Student Progress 📊</h2>
              <p className="text-xl text-purple-200 font-bold">
                Track amazing learning journeys! ✨
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Trophy className="w-8 h-8 text-yellow-300 fill-current animate-pulse" />
          <Star className="w-8 h-8 text-yellow-300 fill-current animate-pulse" />
          <Heart className="w-8 h-8 text-pink-300 fill-current animate-pulse" />
        </div>
      </div>

      {/* Student Selector */}
      {currentUser?.role === 'parent' && currentUser.children && currentUser.children.length > 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-purple-200">
          <h3 className="text-xl font-black text-gray-800 mb-4">Select Student 👨‍👩‍👧‍👦</h3>
          <div className="flex gap-4">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent({
                  id: student.id,
                  name: student.name,
                  grade: student.grade,
                  class: '',
                  parentIds: [],
                  teacherIds: []
                })}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  currentStudent?.id === student.id
                    ? 'border-purple-400 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-3xl">{student.avatar}</div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.grade}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Student Overview */}
      {currentStudent && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{currentStudent.avatar}</div>
              <div>
                <h3 className="text-3xl font-black text-gray-800">{currentStudent.name}</h3>
                <p className="text-lg text-gray-600 font-semibold">{currentStudent.grade}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold text-gray-700">Overall Grade:</span>
                  <div className={`px-4 py-2 bg-gradient-to-r ${getGradeColor(currentStudent.overallGrade)} rounded-2xl`}>
                    <span className="text-white font-black text-lg">{currentStudent.overallGrade}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center animate-bounce-gentle">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subject Filter */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-200">
        <h3 className="text-xl font-black text-gray-800 mb-4">Filter by Subject 📚</h3>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-4 py-2 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
              selectedSubject === 'all'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Subjects ✨
          </button>
          {currentStudent?.subjects.map((subject) => (
            <button
              key={subject.name}
              onClick={() => setSelectedSubject(subject.name.toLowerCase())}
              className={`px-4 py-2 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                selectedSubject === subject.name.toLowerCase()
                  ? `bg-gradient-to-r ${subject.color} text-white`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <subject.icon className="w-4 h-4" />
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSubjects?.map((subject) => {
          const Icon = subject.icon;
          return (
            <div
              key={subject.name}
              className="bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${subject.color} rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-gray-800">{subject.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-600">Current Grade:</span>
                      <div className={`px-3 py-1 bg-gradient-to-r ${getGradeColor(subject.grade)} rounded-xl`}>
                        <span className="text-white font-black">{subject.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-gray-800">{subject.progress}%</div>
                  <div className="text-sm font-bold text-gray-600">Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-gray-700">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-1000 ease-out relative`}
                    style={{ width: `${subject.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div>
                <h5 className="text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Recent Achievements
                </h5>
                <div className="space-y-2">
                  {subject.recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">{activity}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-yellow-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-gray-800">Achievement Badges 🏆</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Math Master', icon: Calculator, earned: true, color: 'from-blue-400 to-indigo-500' },
            { name: 'Reading Star', icon: BookOpen, earned: true, color: 'from-green-400 to-emerald-500' },
            { name: 'Science Explorer', icon: Beaker, earned: false, color: 'from-purple-400 to-pink-500' },
            { name: 'Creative Artist', icon: Palette, earned: true, color: 'from-orange-400 to-red-500' }
          ].map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.name}
                className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                  badge.earned
                    ? `bg-gradient-to-br ${badge.color} text-white border-white shadow-lg`
                    : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${badge.earned ? 'animate-bounce-gentle' : ''}`} />
                <p className="text-sm font-bold">{badge.name}</p>
                {badge.earned && (
                  <div className="mt-2">
                    <Star className="w-4 h-4 mx-auto fill-current animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};