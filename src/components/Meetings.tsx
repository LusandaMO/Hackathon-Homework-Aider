import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Plus,
  MapPin,
  Star,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Heart
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Meeting } from '../types';

export const Meetings: React.FC = () => {
  const { currentUser, meetings, setMeetings } = useApp();
  const [showNewMeetingForm, setShowNewMeetingForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 30,
    participants: [] as string[]
  });

  // Mock meetings data
  const mockMeetings: Meeting[] = [
    {
      id: '1',
      title: 'Parent-Teacher Conference - Emma Johnson',
      description: 'Discuss Emma\'s progress in mathematics and reading comprehension',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      duration: 30,
      participants: ['1', '3'],
      studentId: 's1',
      status: 'scheduled',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      title: 'Science Project Discussion - Alex Chen',
      description: 'Review Alex\'s science fair project and provide guidance',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      duration: 45,
      participants: ['2', '4'],
      studentId: 's2',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Progress Review - Emma Johnson',
      description: 'Monthly progress review and goal setting',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      duration: 30,
      participants: ['1', '3'],
      studentId: 's1',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'from-blue-400 to-indigo-500';
      case 'completed':
        return 'from-green-400 to-emerald-500';
      case 'cancelled':
        return 'from-red-400 to-pink-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4 text-white" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-white" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-white" />;
      default:
        return <Clock className="w-4 h-4 text-white" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleScheduleMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time) return;

    const meetingDate = new Date(`${newMeeting.date}T${newMeeting.time}`);
    const meeting: Meeting = {
      id: Date.now().toString(),
      title: newMeeting.title,
      description: newMeeting.description,
      date: meetingDate,
      duration: newMeeting.duration,
      participants: newMeeting.participants,
      status: 'scheduled'
    };

    setMeetings([...meetings, meeting]);
    setNewMeeting({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 30,
      participants: []
    });
    setShowNewMeetingForm(false);
  };

  const upcomingMeetings = mockMeetings.filter(m => m.status === 'scheduled' && m.date > new Date());
  const pastMeetings = mockMeetings.filter(m => m.status === 'completed' || m.date < new Date());

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white animate-bounce-gentle">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Meetings & Conferences 📅</h2>
              <p className="text-xl text-blue-200 font-bold">
                Stay connected and collaborate! ✨
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowNewMeetingForm(true)}
            className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-500 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Schedule Meeting
          </button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Star className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
          <Heart className="w-6 h-6 text-pink-300 fill-current animate-pulse" />
        </div>
      </div>

      {/* New Meeting Form */}
      {showNewMeetingForm && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">Schedule New Meeting ✨</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meeting Title 📝</label>
              <input
                type="text"
                value={newMeeting.title}
                onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                placeholder="Parent-Teacher Conference..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Duration (minutes) ⏰</label>
              <select
                value={newMeeting.duration}
                onChange={(e) => setNewMeeting({ ...newMeeting, duration: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Date 📅</label>
              <input
                type="date"
                value={newMeeting.date}
                onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Time ⏰</label>
              <input
                type="time"
                value={newMeeting.time}
                onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description 📋</label>
              <textarea
                value={newMeeting.description}
                onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                placeholder="What would you like to discuss?"
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleScheduleMeeting}
              className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl font-bold hover:from-green-500 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Schedule Meeting ✨
            </button>
            <button
              onClick={() => setShowNewMeetingForm(false)}
              className="bg-gradient-to-br from-gray-400 to-gray-500 text-white px-6 py-3 rounded-2xl font-bold hover:from-gray-500 hover:to-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-gray-800">Upcoming Meetings 🚀</h3>
        </div>

        <div className="grid gap-6">
          {upcomingMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-102"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-black text-gray-800">{meeting.title}</h4>
                    <div className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(meeting.status)} rounded-full flex items-center gap-1`}>
                      {getStatusIcon(meeting.status)}
                      <span className="text-xs font-bold text-white capitalize">{meeting.status}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium mb-3">{meeting.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">{formatDate(meeting.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="font-semibold">{formatTime(meeting.date)} ({meeting.duration} min)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold">{meeting.participants.length} participants</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {meeting.meetingLink && (
                    <button className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:from-green-500 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Join
                    </button>
                  )}
                  <button className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white px-4 py-2 rounded-xl font-bold hover:from-blue-500 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}

          {upcomingMeetings.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-black text-gray-800 mb-2">No Upcoming Meetings</h4>
              <p className="text-gray-600 font-medium">Schedule a meeting to get started! ✨</p>
            </div>
          )}
        </div>
      </div>

      {/* Past Meetings */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-black text-gray-800">Past Meetings 📚</h3>
        </div>

        <div className="space-y-4">
          {pastMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800">{meeting.title}</h4>
                  <p className="text-sm text-gray-600">{formatDate(meeting.date)} at {formatTime(meeting.date)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-bold text-green-600">Completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};