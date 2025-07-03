import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  Filter, 
  Paperclip, 
  Star,
  Clock,
  CheckCircle,
  User,
  GraduationCap,
  Heart,
  Sparkles
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Message, User as UserType } from '../types';

export const Messages: React.FC = () => {
  const { currentUser, messages, setMessages } = useApp();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: '1',
      participant: {
        id: '3',
        name: 'Mrs. Smith',
        role: 'teacher' as const,
        avatar: '👩‍🏫'
      },
      lastMessage: 'Emma did wonderfully on her math test today! 🌟',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 2,
      studentName: 'Emma Johnson'
    },
    {
      id: '2',
      participant: {
        id: '4',
        name: 'Mr. Davis',
        role: 'teacher' as const,
        avatar: '👨‍🏫'
      },
      lastMessage: 'Alex needs some extra help with the science project',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unreadCount: 0,
      studentName: 'Alex Chen'
    },
    {
      id: '3',
      participant: {
        id: '1',
        name: 'Sarah Johnson',
        role: 'parent' as const,
        avatar: '👩'
      },
      lastMessage: 'Thank you for the progress update!',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      unreadCount: 1,
      studentName: 'Emma Johnson'
    }
  ];

  // Mock messages for selected conversation
  const conversationMessages: Message[] = [
    {
      id: '1',
      senderId: '3',
      receiverId: currentUser?.id || '',
      content: 'Hi! I wanted to share some exciting news about Emma\'s progress in math! 🎉',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: true,
      type: 'message'
    },
    {
      id: '2',
      senderId: currentUser?.id || '',
      receiverId: '3',
      content: 'That\'s wonderful to hear! What specifically has she improved on?',
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
      isRead: true,
      type: 'message'
    },
    {
      id: '3',
      senderId: '3',
      receiverId: currentUser?.id || '',
      content: 'She\'s really mastered multiplication tables and is showing great problem-solving skills! Her test score was 95%! ⭐',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      type: 'progress_update'
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser?.id || '',
      receiverId: selectedConversation,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
      type: 'message'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl border-4 border-purple-200 overflow-hidden h-[calc(100vh-200px)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r-4 border-purple-200 bg-gradient-to-b from-purple-50 to-pink-50">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center animate-bounce-gentle">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-black">Messages 💬</h2>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white bg-opacity-20 border-2 border-white border-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:border-opacity-50"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto h-full">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b-2 border-purple-100 cursor-pointer transition-all duration-300 hover:bg-purple-100 ${
                    selectedConversation === conversation.id ? 'bg-purple-200 border-l-4 border-l-purple-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
                        conversation.participant.role === 'teacher' 
                          ? 'bg-gradient-to-br from-blue-400 to-indigo-500' 
                          : 'bg-gradient-to-br from-green-400 to-emerald-500'
                      }`}>
                        {conversation.participant.role === 'teacher' ? (
                          <GraduationCap className="w-6 h-6 text-white" />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{conversation.unreadCount}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-800 truncate">{conversation.participant.name}</h4>
                        <span className="text-xs text-gray-500">{formatTime(conversation.timestamp)}</span>
                      </div>
                      <p className="text-sm text-purple-600 font-semibold mb-1">Re: {conversation.studentName}</p>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-b-4 border-purple-200">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                      selectedConversationData?.participant.role === 'teacher' 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400' 
                        : 'bg-gradient-to-br from-green-400 to-emerald-400'
                    }`}>
                      {selectedConversationData?.participant.role === 'teacher' ? (
                        <GraduationCap className="w-6 h-6 text-white" />
                      ) : (
                        <User className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-black">{selectedConversationData?.participant.name}</h3>
                      <p className="text-blue-200 font-semibold">
                        About: {selectedConversationData?.studentName} ✨
                      </p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <Star className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
                      <Heart className="w-6 h-6 text-pink-300 fill-current animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-blue-50 to-purple-50">
                  <div className="space-y-4">
                    {conversationMessages.map((message) => {
                      const isOwn = message.senderId === currentUser?.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${isOwn ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                        >
                          {!isOwn && (
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                              <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                          )}
                          
                          <div className={`max-w-[70%] ${isOwn ? 'order-1' : 'order-2'}`}>
                            <div className={`rounded-3xl px-5 py-4 shadow-lg transform hover:scale-105 transition-all duration-300 ${
                              isOwn 
                                ? 'bg-gradient-to-br from-green-400 to-blue-500 text-white' 
                                : 'bg-white border-2 border-purple-200 text-gray-800'
                            }`}>
                              <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                              {message.type === 'progress_update' && (
                                <div className="flex gap-1 mt-2">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
                                  <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: '0.2s' }} />
                                  <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: '0.4s' }} />
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2 px-3 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              {message.isRead && <CheckCircle className="w-3 h-3 text-green-500" />}
                            </p>
                          </div>

                          {isOwn && (
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center order-2 shadow-lg">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-t-4 border-purple-200">
                  <div className="flex items-end gap-3">
                    <button className="p-3 bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-2xl hover:from-purple-500 hover:to-pink-500 transform hover:scale-110 transition-all duration-200 shadow-lg">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    
                    <div className="flex-1 min-h-[50px] border-4 border-purple-200 rounded-3xl bg-white focus-within:border-purple-400 focus-within:shadow-lg transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-50"></div>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message... 💬✨"
                        className="relative z-10 w-full px-5 py-4 resize-none border-none outline-none rounded-3xl placeholder-purple-500 text-gray-800 font-medium bg-transparent"
                        rows={1}
                        style={{ 
                          minHeight: '50px',
                          maxHeight: '128px',
                          overflowY: newMessage.split('\n').length > 3 ? 'scroll' : 'hidden'
                        }}
                      />
                    </div>
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="p-4 bg-gradient-to-br from-green-400 to-blue-500 text-white rounded-3xl hover:from-green-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg group"
                    >
                      <Send className="w-6 h-6" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center group-hover:animate-bounce">
                        <Sparkles className="w-2 h-2 text-white" />
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* No Conversation Selected */
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-2">Select a Conversation 💬</h3>
                  <p className="text-gray-600 font-medium">Choose a conversation to start messaging! ✨</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};