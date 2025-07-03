import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Sun,
  Umbrella,
  BookOpen,
  Coffee,
  Heart,
  Sparkles,
  Trophy,
  Gift
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'holiday' | 'term_start' | 'term_end' | 'exam' | 'event' | 'break';
  description?: string;
  color: string;
  icon: React.ComponentType<any>;
}

export const SchoolCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // South African School Calendar 2024
  const events: CalendarEvent[] = [
    // Term 1 2024
    { id: '1', title: 'Term 1 Starts', date: new Date(2024, 0, 17), type: 'term_start', description: 'Welcome back to school! 🎒', color: 'from-green-400 to-emerald-500', icon: BookOpen },
    { id: '2', title: 'Human Rights Day', date: new Date(2024, 2, 21), type: 'holiday', description: 'Public Holiday', color: 'from-red-400 to-pink-500', icon: Heart },
    { id: '3', title: 'Good Friday', date: new Date(2024, 2, 29), type: 'holiday', description: 'Public Holiday', color: 'from-purple-400 to-pink-500', icon: Star },
    { id: '4', title: 'Family Day', date: new Date(2024, 3, 1), type: 'holiday', description: 'Public Holiday', color: 'from-orange-400 to-red-500', icon: Heart },
    { id: '5', title: 'Term 1 Ends', date: new Date(2024, 3, 12), type: 'term_end', description: 'Enjoy your holidays! 🌟', color: 'from-blue-400 to-indigo-500', icon: Sun },

    // Term 2 2024
    { id: '6', title: 'Term 2 Starts', date: new Date(2024, 3, 29), type: 'term_start', description: 'Ready for more learning! 📚', color: 'from-green-400 to-emerald-500', icon: BookOpen },
    { id: '7', title: 'Freedom Day', date: new Date(2024, 3, 27), type: 'holiday', description: 'Public Holiday', color: 'from-yellow-400 to-orange-500', icon: Trophy },
    { id: '8', title: 'Workers Day', date: new Date(2024, 4, 1), type: 'holiday', description: 'Public Holiday', color: 'from-blue-400 to-purple-500', icon: Coffee },
    { id: '9', title: 'Youth Day', date: new Date(2024, 5, 16), type: 'holiday', description: 'Public Holiday - Celebrating our youth! 🎉', color: 'from-pink-400 to-purple-500', icon: Sparkles },
    { id: '10', title: 'Term 2 Ends', date: new Date(2024, 6, 5), type: 'term_end', description: 'Winter holidays begin! ❄️', color: 'from-blue-400 to-indigo-500', icon: Umbrella },

    // Term 3 2024
    { id: '11', title: 'Term 3 Starts', date: new Date(2024, 6, 22), type: 'term_start', description: 'Winter term begins! 🧥', color: 'from-green-400 to-emerald-500', icon: BookOpen },
    { id: '12', title: 'National Womens Day', date: new Date(2024, 7, 9), type: 'holiday', description: 'Public Holiday', color: 'from-purple-400 to-pink-500', icon: Heart },
    { id: '13', title: 'Term 3 Ends', date: new Date(2024, 8, 27), type: 'term_end', description: 'Spring holidays! 🌸', color: 'from-blue-400 to-indigo-500', icon: Sun },

    // Term 4 2024
    { id: '14', title: 'Term 4 Starts', date: new Date(2024, 9, 14), type: 'term_start', description: 'Final term of the year! 🏁', color: 'from-green-400 to-emerald-500', icon: BookOpen },
    { id: '15', title: 'Heritage Day', date: new Date(2024, 8, 24), type: 'holiday', description: 'Public Holiday - Celebrating our heritage! 🇿🇦', color: 'from-orange-400 to-red-500', icon: Star },
    { id: '16', title: 'Day of Reconciliation', date: new Date(2024, 11, 16), type: 'holiday', description: 'Public Holiday', color: 'from-green-400 to-blue-500', icon: Heart },
    { id: '17', title: 'Christmas Day', date: new Date(2024, 11, 25), type: 'holiday', description: 'Merry Christmas! 🎄', color: 'from-red-400 to-green-500', icon: Gift },
    { id: '18', title: 'Day of Goodwill', date: new Date(2024, 11, 26), type: 'holiday', description: 'Public Holiday', color: 'from-blue-400 to-purple-500', icon: Heart },
    { id: '19', title: 'Term 4 Ends', date: new Date(2024, 11, 13), type: 'term_end', description: 'Summer holidays begin! ☀️', color: 'from-blue-400 to-indigo-500', icon: Sun },

    // Special Events
    { id: '20', title: 'Science Fair', date: new Date(2024, 4, 15), type: 'event', description: 'Annual school science fair! 🔬', color: 'from-purple-400 to-pink-500', icon: Sparkles },
    { id: '21', title: 'Sports Day', date: new Date(2024, 8, 10), type: 'event', description: 'Inter-house sports competition! 🏃‍♀️', color: 'from-yellow-400 to-orange-500', icon: Trophy },
    { id: '22', title: 'Art Exhibition', date: new Date(2024, 10, 5), type: 'event', description: 'Student art showcase! 🎨', color: 'from-pink-400 to-purple-500', icon: Star }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white animate-bounce-gentle">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">School Calendar 📅</h2>
              <p className="text-xl text-blue-200 font-bold">
                South African School Terms & Holidays 2024 ✨
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Star className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
          <Heart className="w-6 h-6 text-pink-300 fill-current animate-pulse" />
          <Trophy className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-200">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-3 bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-2xl hover:from-purple-500 hover:to-pink-500 transform hover:scale-110 transition-all duration-200 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-black text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-3 bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-2xl hover:from-purple-500 hover:to-pink-500 transform hover:scale-110 transition-all duration-200 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center py-3 font-bold text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-20"></div>;
              }

              const dayEvents = getEventsForDate(day);
              const hasEvents = dayEvents.length > 0;
              const isSelected = selectedDate?.toDateString() === day.toDateString();
              const isTodayDate = isToday(day);

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`h-20 p-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                    isSelected
                      ? 'border-purple-400 bg-purple-100'
                      : isTodayDate
                      ? 'border-green-400 bg-green-50'
                      : hasEvents
                      ? 'border-blue-300 bg-blue-50 hover:border-blue-400'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <span className={`text-sm font-bold ${
                      isTodayDate ? 'text-green-600' : isSelected ? 'text-purple-600' : 'text-gray-700'
                    }`}>
                      {day.getDate()}
                    </span>
                    <div className="flex-1 flex flex-col gap-1 mt-1">
                      {dayEvents.slice(0, 2).map((event) => {
                        const Icon = event.icon;
                        return (
                          <div
                            key={event.id}
                            className={`text-xs px-1 py-0.5 bg-gradient-to-r ${event.color} text-white rounded-lg flex items-center gap-1 truncate`}
                          >
                            <Icon className="w-2 h-2 flex-shrink-0" />
                            <span className="truncate">{event.title}</span>
                          </div>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 font-bold">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          {selectedDate && (
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-green-200">
              <h4 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-500" />
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
              
              {selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedEvents.map((event) => {
                    const Icon = event.icon;
                    return (
                      <div
                        key={event.id}
                        className={`p-4 bg-gradient-to-r ${event.color} text-white rounded-2xl shadow-lg`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-5 h-5" />
                          <h5 className="font-bold">{event.title}</h5>
                        </div>
                        {event.description && (
                          <p className="text-sm opacity-90">{event.description}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600 font-medium">No events scheduled for this date.</p>
              )}
            </div>
          )}

          {/* Upcoming Events */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
            <h4 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Upcoming Events
            </h4>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {events
                .filter(event => event.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 10)
                .map((event) => {
                  const Icon = event.icon;
                  return (
                    <div
                      key={event.id}
                      className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedDate(event.date)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${event.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-800 text-sm">{event.title}</h5>
                          <p className="text-xs text-gray-600">
                            {event.date.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-200">
            <h4 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-500" />
              Event Types
            </h4>
            
            <div className="space-y-2">
              {[
                { type: 'Term Start/End', color: 'from-green-400 to-emerald-500', icon: BookOpen },
                { type: 'Public Holidays', color: 'from-red-400 to-pink-500', icon: Heart },
                { type: 'School Events', color: 'from-purple-400 to-pink-500', icon: Sparkles },
                { type: 'Special Days', color: 'from-yellow-400 to-orange-500', icon: Trophy }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-4 h-4 bg-gradient-to-r ${item.color} rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-700">{item.type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};