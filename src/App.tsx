import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { UserSelector } from './components/UserSelector';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Messages } from './components/Messages';
import { Meetings } from './components/Meetings';
import { Progress } from './components/Progress';
import { Reports } from './components/Reports';
import { SchoolCalendar } from './components/SchoolCalendar';
import { HomeworkHelper } from './components/HomeworkHelper';
import { Pricing } from './components/Pricing';
import { User } from './types';

const AppContent: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    activeTab, 
    setActiveTab,
    setUserCredits,
    setSubscription
  } = useApp();

  useEffect(() => {
    if (currentUser) {
      // Initialize user credits and subscription from user data
      if (currentUser.credits !== undefined) {
        setUserCredits(currentUser.credits);
      }
      if (currentUser.subscription) {
        setSubscription(currentUser.subscription);
      }
    }
  }, [currentUser, setUserCredits, setSubscription]);

  if (!currentUser) {
    return <UserSelector onSelectUser={setCurrentUser} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'messages':
        return <Messages />;
      case 'meetings':
        return <Meetings />;
      case 'progress':
        return <Progress />;
      case 'reports':
        return <Reports />;
      case 'calendar':
        return <SchoolCalendar />;
      case 'homework-helper':
        return <HomeworkHelper />;
      case 'pricing':
        return <Pricing />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 via-blue-50 to-green-100">
      <Navigation />
      <main className="py-6">
        {renderActiveTab()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;