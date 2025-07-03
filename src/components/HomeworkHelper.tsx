import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap, Heart, Star, Sparkles, Zap, Trophy, Rocket, X, Eye, CreditCard, Crown, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { generateHomeworkResponse, fileToBase64 } from '../utils/geminiAI';
import { useApp } from '../contexts/AppContext';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  image?: string;
  imagePreview?: string;
  imageData?: string;
}

export const HomeworkHelper: React.FC = () => {
  const { currentUser, userCredits, setUserCredits, subscription } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "🎉 HEY THERE, SUPERSTAR! I'm your magical AI homework buddy powered by Google's Gemini AI! ✨\n\nI'm here to make homework the BEST part of your day! 🚀 Here's what we can do together:\n\n📸 **Take photos of tricky problems** - I can see and analyze your homework!\n🤔 **Ask me anything about any subject** - Math, Science, English, History, and more!\n🎯 **Get super easy step-by-step explanations** - I'll break everything down!\n🏆 **Celebrate every success together!**\n\n🌈 **I'm specially trained to help with:**\n🧮 Math problems and equations\n📚 Reading comprehension and essays\n🔬 Science experiments and concepts\n🎨 Creative writing and projects\n📊 Data analysis and graphs\n🌍 Geography and history questions\n\n✨ **NEW FEATURES:**\n📱 Upload photos with your camera or drag & drop\n🖼️ I can analyze diagrams, charts, and handwritten work\n📁 Get detailed help with visual problems\n🔍 Step-by-step solutions with clear explanations\n\n**Ready to become a homework hero?** Upload a photo or ask me anything! Let's make learning AMAZING! ⭐✨",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [lastBotMessageId, setLastBotMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const hasUnlimitedAccess = () => {
    return subscription && subscription.status === 'active' && subscription.questionsRemaining === undefined;
  };

  const canAskQuestion = () => {
    return hasUnlimitedAccess() || userCredits > 0;
  };

  const handleSendMessage = async (content: string) => {
    // Check if user can ask questions
    if (!canAskQuestion()) {
      setShowPaymentModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
      imagePreview: imagePreview || undefined,
      imageData: imageData || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentImageData = imageData;
    setImagePreview(null);
    setImageData(null);
    setIsTyping(true);

    // Deduct credit if not on unlimited plan
    if (!hasUnlimitedAccess()) {
      setUserCredits(userCredits - 1);
    }

    try {
      const aiResponse = await generateHomeworkResponse(content, !!currentImageData, currentImageData || undefined);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setLastBotMessageId(botMessage.id);
    } catch (error) {
      console.error('AI Response Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "🤗 Oops! I'm having a tiny technical hiccup! But don't worry - even the smartest AI helpers need a moment sometimes! 🤖✨\n\n🔄 **Let's try again!** Sometimes a simple retry works wonders!\n\n💡 **Quick tips while we wait:**\n• Make sure your question is clear and specific\n• If you uploaded an image, ensure it's clear and well-lit\n• Try breaking complex problems into smaller parts\n\nI'm excited to help you learn! Please try asking your question again! 🚀\n\n**Ready to give it another shot?** I believe in you! ⭐",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Check if user can ask questions
    if (!canAskQuestion()) {
      setShowPaymentModal(true);
      return;
    }

    try {
      // Create image preview
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      
      // Convert to base64 for AI analysis
      const base64Data = await fileToBase64(file);
      setImageData(base64Data);
      
    } catch (error) {
      console.error('File upload error:', error);
      alert('Sorry, there was an error uploading your image. Please try again!');
    }
  };

  const removeImagePreview = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageData(null);
  };

  const handleFeedback = (isPositive: boolean) => {
    setShowFeedbackModal(true);
    // Here you could send feedback to your analytics system
    console.log(`User feedback: ${isPositive ? 'positive' : 'negative'} for message ${lastBotMessageId}`);
  };

  const handleRetryLastQuestion = () => {
    const lastUserMessage = messages.filter(m => !m.isBot).pop();
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  const getAccessStatusMessage = () => {
    if (hasUnlimitedAccess()) {
      return (
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-xl flex items-center gap-2">
          <Crown className="w-3 h-3" />
          <span className="font-bold text-xs">Unlimited ✨</span>
        </div>
      );
    } else if (userCredits > 0) {
      return (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-xl flex items-center gap-2">
          <CreditCard className="w-3 h-3" />
          <span className="font-bold text-xs">{userCredits} Credits</span>
        </div>
      );
    } else {
      return (
        <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-3 py-1 rounded-xl flex items-center gap-2">
          <CreditCard className="w-3 h-3" />
          <span className="font-bold text-xs">No Credits</span>
        </div>
      );
    }
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 via-blue-50 to-green-100 rounded-3xl shadow-xl border-4 border-purple-200 overflow-hidden relative h-[calc(100vh-120px)]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-green-300 rounded-full opacity-20 animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-purple-300 rounded-full opacity-20 animate-float"></div>
        </div>

        {/* Ultra Compact Header */}
        <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 border-b-4 border-yellow-300 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
          <div className="max-w-full mx-auto px-4 py-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg border-2 border-white animate-bounce-gentle">
                  <GraduationCap className="w-5 h-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center animate-spin">
                    <Sparkles className="w-1.5 h-1.5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-black text-white drop-shadow-lg">
                    🌟 AI Homework Helper
                  </h1>
                  <p className="text-xs text-yellow-200 font-bold">Powered by Google Gemini AI! 🚀</p>
                </div>
              </div>
              
              {/* Compact Access Status & Actions */}
              <div className="flex items-center gap-2">
                {getAccessStatusMessage()}
                <button
                  onClick={handleRetryLastQuestion}
                  className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-xl hover:bg-opacity-30 transition-all duration-200 flex items-center gap-1 font-bold text-xs"
                  title="Retry last question"
                >
                  <RotateCcw className="w-3 h-3" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Maximized Chat Container */}
        <div className="flex flex-col h-[calc(100%-60px)] relative z-10">
          {/* Expanded Messages Area - More Space */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
            {messages.map((message, index) => (
              <div key={message.id} className="w-full">
                <ChatMessage
                  message={message.content}
                  isBot={message.isBot}
                  timestamp={message.timestamp}
                  image={message.image || message.imagePreview}
                />
                {/* Feedback buttons for bot messages */}
                {message.isBot && index === messages.length - 1 && !isTyping && (
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={() => handleFeedback(true)}
                      className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl hover:from-green-500 hover:to-emerald-600 transition-all duration-200 flex items-center gap-2 font-bold text-sm shadow-lg transform hover:scale-105"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      This helped me! 😊
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-2xl hover:from-orange-500 hover:to-red-600 transition-all duration-200 flex items-center gap-2 font-bold text-sm shadow-lg transform hover:scale-105"
                    >
                      <ThumbsDown className="w-5 h-5" />
                      I need more help 🤔
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Compact Image Preview */}
          {imagePreview && (
            <div className="px-6 py-3">
              <div className="bg-white rounded-2xl p-4 border-3 border-purple-200 shadow-lg max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-purple-600">📸 Ready for AI Analysis</span>
                  <button
                    onClick={removeImagePreview}
                    className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Homework preview"
                    className="w-full h-32 object-cover rounded-xl border-2 border-purple-200 shadow-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-xl"></div>
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center font-medium">
                  🤖 Ready to analyze! Type your question or send! ✨
                </p>
              </div>
            </div>
          )}

          {/* Compact Input Area */}
          <MessageInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            disabled={isTyping || !canAskQuestion()}
            hasImagePreview={!!imagePreview}
          />
        </div>

        {/* Minimal Footer */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 border-t-2 border-yellow-300 py-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
          <div className="max-w-full mx-auto px-4 relative z-10">
            <p className="text-center text-white font-bold flex items-center justify-center gap-2 text-xs">
              Powered by Google Gemini AI <Heart className="w-3 h-3 text-red-300 fill-current animate-pulse" /> 
              Making learning FUN! <Star className="w-3 h-3 text-yellow-300 fill-current animate-spin" />
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">No Credits Remaining! 💳</h3>
              <p className="text-gray-600 font-medium">Purchase credits or upgrade to continue using the AI homework helper</p>
            </div>

            <div className="space-y-4 mb-6">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  // Navigate to pricing page
                  window.location.hash = '#pricing';
                }}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-2xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              >
                View Pricing Plans ✨
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full bg-gray-400 text-white py-3 rounded-2xl font-bold hover:bg-gray-500 transition-all duration-300"
              >
                Maybe Later
              </button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>💡 <strong>Tip:</strong> Family plans include unlimited questions!</p>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Thank You! 💝</h3>
              <p className="text-gray-600 font-medium">Your feedback helps me become a better homework helper!</p>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-2xl font-bold hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
              >
                Continue Learning! 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};