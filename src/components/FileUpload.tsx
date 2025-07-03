import React, { useRef, useState } from 'react';
import { Camera, Image, Sparkles, Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const isValidFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return false;
    }
    
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return false;
    }
    
    return true;
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Camera Button */}
      <button
        onClick={triggerFileInput}
        disabled={disabled}
        className="relative p-3 bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-2xl hover:from-purple-500 hover:to-pink-500 transform hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg group"
        title="📸 Take a photo of your homework!"
      >
        <Camera className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center group-hover:animate-spin">
          <Sparkles className="w-2 h-2 text-white" />
        </div>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-200"></div>
      </button>

      {/* Drag & Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileInput}
        className={`relative p-3 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          dragOver
            ? 'border-purple-400 bg-purple-50 scale-105'
            : 'border-purple-300 bg-gradient-to-br from-blue-50 to-purple-50 hover:border-purple-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="📁 Drag & drop your homework photo here!"
      >
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-bold text-purple-600 hidden sm:block">
            {dragOver ? 'Drop here!' : 'Upload'}
          </span>
        </div>
        {dragOver && (
          <div className="absolute inset-0 bg-purple-200 opacity-30 rounded-2xl animate-pulse"></div>
        )}
      </div>
    </div>
  );
};