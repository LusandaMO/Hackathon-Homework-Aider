import React, { useState } from 'react';
import { Bot, User, Star, Sparkles, Eye, X } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
  image?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp, image }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      <div className={`flex gap-4 mb-8 ${isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}>
        {isBot && (
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle border-4 border-white">
            <Bot className="w-7 h-7 text-white" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
        
        <div className={`max-w-[75%] ${isBot ? 'order-2' : 'order-1'}`}>
          <div className={`rounded-3xl px-6 py-5 shadow-lg transform hover:scale-102 transition-all duration-300 ${
            isBot 
              ? 'bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200' 
              : 'bg-gradient-to-br from-green-400 to-blue-500 text-white'
          }`}>
            {image && (
              <div className="mb-4 relative">
                <img 
                  src={image} 
                  alt="Homework" 
                  className="rounded-2xl max-w-full h-auto border-4 border-white shadow-md cursor-pointer hover:opacity-90 transition-opacity duration-200"
                  onClick={() => setShowImageModal(true)}
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
                <button
                  onClick={() => setShowImageModal(true)}
                  className="absolute top-3 right-3 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
                  title="Click to view full size"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className={`text-base leading-relaxed font-medium ${isBot ? 'text-gray-800' : 'text-white'}`}>
              {message.split('\n').map((line, index) => {
                // Handle bold text
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={index} className={index > 0 ? 'mt-3' : ''}>
                    {parts.map((part, partIndex) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={partIndex} className="font-black">
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </div>
            {isBot && (
              <div className="flex gap-1 mt-3">
                <Star className="w-5 h-5 text-yellow-400 fill-current animate-pulse" />
                <Star className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Star className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-3 px-4 font-medium">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {!isBot && (
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center order-2 shadow-lg border-4 border-white animate-pulse">
            <User className="w-7 h-7 text-white" />
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && image && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-4 -right-4 p-3 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={image}
              alt="Homework - Full Size"
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
              onClick={() => setShowImageModal(false)}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-6 py-3 rounded-full text-sm font-medium">
              Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </>
  );
};