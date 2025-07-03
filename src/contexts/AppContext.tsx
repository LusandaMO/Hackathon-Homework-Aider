import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Student, Message, Meeting, ProgressUpdate, ReportCard, Subscription, PaymentRecord } from '../types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  meetings: Meeting[];
  setMeetings: (meetings: Meeting[]) => void;
  progressUpdates: ProgressUpdate[];
  setProgressUpdates: (updates: ProgressUpdate[]) => void;
  reportCards: ReportCard[];
  setReportCards: (reportCards: ReportCard[]) => void;
  userCredits: number;
  setUserCredits: (credits: number) => void;
  subscription: Subscription | null;
  setSubscription: (subscription: Subscription | null) => void;
  paymentHistory: PaymentRecord[];
  setPaymentHistory: (history: PaymentRecord[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState<Message[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>([]);
  const [reportCards, setReportCards] = useState<ReportCard[]>([]);
  const [userCredits, setUserCredits] = useState(0);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        selectedStudent,
        setSelectedStudent,
        activeTab,
        setActiveTab,
        messages,
        setMessages,
        meetings,
        setMeetings,
        progressUpdates,
        setProgressUpdates,
        reportCards,
        setReportCards,
        userCredits,
        setUserCredits,
        subscription,
        setSubscription,
        paymentHistory,
        setPaymentHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};