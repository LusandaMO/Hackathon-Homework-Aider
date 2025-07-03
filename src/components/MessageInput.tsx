import React, { useState } from 'react';
import { Send, Zap } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (file: File) => void;
  disabled?: boolean;
  hasImagePreview?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  onFileUpload, 
  disabled,
  hasImagePreview = false
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    } else if (hasImagePreview && !message.trim()) {
      // Send default message with image
      onSendMessage("Can you help me with this homework problem? 📸✨");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Compact Photo Upload Tips */}
      {!hasImagePreview && (
        <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 border-t border-purple-200">
          <p className="text-xs text-purple-700 font-semibold text-center">
            💡 Upload clear photos for best AI help! ✨
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-3 p-4">
        <FileUpload onFileSelect={onFileUpload} disabled={disabled} />
        
        <div className="flex-1 min-h-[45px] max-h-24 border-3 border-purple-200 rounded-2xl bg-white focus-within:border-purple-400 focus-within:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-40"></div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={hasImagePreview ? "Ask about your photo! 📸" : "Ask homework question! 🤔"}
            disabled={disabled}
            className="relative z-10 w-full px-4 py-3 resize-none border-none outline-none rounded-2xl placeholder-purple-500 text-gray-800 font-medium bg-transparent text-base"
            rows={1}
            style={{ 
              minHeight: '45px',
              maxHeight: '96px',
              overflowY: message.split('\n').length > 2 ? 'scroll' : 'hidden'
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={(!message.trim() && !hasImagePreview) || disabled}
          className="relative p-3 bg-gradient-to-br from-green-400 to-blue-500 text-white rounded-2xl hover:from-green-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg group"
        >
          <Send className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center group-hover:animate-bounce">
            <Zap className="w-2 h-2 text-white" />
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-200"></div>
        </button>
      </form>

      {/* Compact Help Text */}
      <div className="px-4 pb-2">
        <p className="text-xs text-gray-600 text-center">
          📱 Drag & drop images or type questions! 
          {hasImagePreview && " 🎉 Ready to analyze!"}
        </p>
      </div>
    </div>
  );
};