export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'teacher' | 'student';
  avatar?: string;
  children?: Student[];
  classes?: Class[];
  subscription?: Subscription;
  credits?: number;
  paymentHistory?: PaymentRecord[];
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  class: string;
  avatar?: string;
  parentIds: string[];
  teacherIds: string[];
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  subject: string;
  teacherId: string;
  students: Student[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: Attachment[];
  studentId?: string;
  type: 'message' | 'progress_update' | 'announcement' | 'homework_help';
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video';
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number;
  participants: string[];
  studentId?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}

export interface ProgressUpdate {
  id: string;
  studentId: string;
  subject: string;
  grade: string;
  comments: string;
  timestamp: Date;
  teacherId: string;
  attachments?: Attachment[];
}

export interface ReportCard {
  id: string;
  studentId: string;
  studentName: string;
  term: string;
  year: string;
  uploadDate: Date;
  teacherId: string;
  teacherName: string;
  subjects: {
    name: string;
    grade: string;
    percentage: number;
    comments: string;
  }[];
  overallGrade: string;
  overallPercentage: number;
  teacherComments: string;
  principalComments: string;
  fileUrl: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'family_monthly' | 'family_yearly' | 'school_partnership';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  endDate: Date;
  price: number;
  currency: string;
  features: string[];
  questionsRemaining?: number;
  questionsUsed?: number;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  type: 'subscription' | 'credits' | 'pay_per_use';
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billing: 'monthly' | 'yearly' | 'per_use';
  features: string[];
  questionsIncluded?: number;
  popular?: boolean;
  schoolPlan?: boolean;
}