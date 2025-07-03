import React from 'react';
import { Bot, Sparkles, Heart } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 mb-6 animate-fadeIn">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg animate-bounce border-4 border-white relative">
        <Bot className="w-6 h-6 text-white animate-pulse" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
          <Sparkles className="w-2 h-2 text-white" />
        </div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-400 rounded-full flex items-center justify-center animate-pulse">
          <Heart className="w-1.5 h-1.5 text-white fill-current" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-lg rounded-3xl px-5 py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-30 animate-pulse"></div>
        <div className="relative z-10 flex gap-2 items-center">
          <span className="text-purple-600 font-bold text-sm">I'm thinking...</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};