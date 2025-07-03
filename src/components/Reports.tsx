import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Calendar as CalendarIcon,
  Star,
  Trophy,
  Award,
  BookOpen,
  TrendingUp,
  Sparkles,
  Heart,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ReportCard } from '../types';

export const Reports: React.FC = () => {
  const { currentUser, selectedStudent, setSelectedStudent, reportCards, setReportCards } = useApp();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [newReport, setNewReport] = useState({
    studentId: '',
    term: 'Term 1',
    year: '2024',
    subjects: [] as any[],
    comments: '',
    file: null as File | null
  });

  // Mock report cards data
  const mockReportCards: ReportCard[] = [
    {
      id: '1',
      studentId: 's1',
      studentName: 'Emma Johnson',
      term: 'Term 1',
      year: '2024',
      uploadDate: new Date('2024-03-15'),
      teacherId: '3',
      teacherName: 'Mrs. Smith',
      subjects: [
        { name: 'Mathematics', grade: 'A', percentage: 92, comments: 'Excellent problem-solving skills and mathematical reasoning.' },
        { name: 'English', grade: 'A-', percentage: 88, comments: 'Strong reading comprehension and creative writing abilities.' },
        { name: 'Science', grade: 'B+', percentage: 85, comments: 'Shows great curiosity and understanding of scientific concepts.' },
        { name: 'Art', grade: 'A', percentage: 95, comments: 'Exceptional creativity and artistic expression.' },
        { name: 'Physical Education', grade: 'A-', percentage: 90, comments: 'Great teamwork and physical coordination.' }
      ],
      overallGrade: 'A-',
      overallPercentage: 90,
      teacherComments: 'Emma has shown remarkable progress this term. She is a dedicated student who actively participates in class discussions and helps her peers. Her positive attitude and strong work ethic make her a joy to teach.',
      principalComments: 'Emma continues to excel academically and socially. We are proud of her achievements.',
      fileUrl: '/reports/emma-term1-2024.pdf'
    },
    {
      id: '2',
      studentId: 's1',
      studentName: 'Emma Johnson',
      term: 'Term 2',
      year: '2024',
      uploadDate: new Date('2024-06-20'),
      teacherId: '3',
      teacherName: 'Mrs. Smith',
      subjects: [
        { name: 'Mathematics', grade: 'A', percentage: 94, comments: 'Continued excellence in mathematical concepts and problem-solving.' },
        { name: 'English', grade: 'A', percentage: 91, comments: 'Improved writing skills and excellent reading comprehension.' },
        { name: 'Science', grade: 'A-', percentage: 89, comments: 'Great improvement in scientific inquiry and experimentation.' },
        { name: 'Art', grade: 'A', percentage: 96, comments: 'Outstanding artistic development and creativity.' },
        { name: 'Physical Education', grade: 'A', percentage: 93, comments: 'Excellent leadership skills and sportsmanship.' }
      ],
      overallGrade: 'A',
      overallPercentage: 93,
      teacherComments: 'Emma has continued to excel this term, showing significant improvement in all areas. Her leadership qualities are emerging, and she is becoming a positive role model for her classmates.',
      principalComments: 'Outstanding progress. Emma is a star student who embodies our school values.',
      fileUrl: '/reports/emma-term2-2024.pdf'
    },
    {
      id: '3',
      studentId: 's2',
      studentName: 'Alex Chen',
      term: 'Term 1',
      year: '2024',
      uploadDate: new Date('2024-03-15'),
      teacherId: '4',
      teacherName: 'Mr. Davis',
      subjects: [
        { name: 'Science', grade: 'A', percentage: 94, comments: 'Exceptional understanding of scientific principles and excellent lab work.' },
        { name: 'Mathematics', grade: 'B+', percentage: 82, comments: 'Good mathematical skills, needs practice with complex problem-solving.' },
        { name: 'English', grade: 'B', percentage: 78, comments: 'Solid reading skills, writing could use more development.' },
        { name: 'History', grade: 'A-', percentage: 87, comments: 'Great interest in historical events and excellent research skills.' },
        { name: 'Physical Education', grade: 'B+', percentage: 84, comments: 'Good participation and team spirit.' }
      ],
      overallGrade: 'B+',
      overallPercentage: 85,
      teacherComments: 'Alex shows particular strength in Science and has a natural curiosity about how things work. With continued effort in Mathematics and English, Alex will achieve even greater success.',
      principalComments: 'Alex is a thoughtful student with great potential. Keep up the good work!',
      fileUrl: '/reports/alex-term1-2024.pdf'
    }
  ];

  // Mock students for teacher view
  const students = [
    { id: 's1', name: 'Emma Johnson', grade: '3rd Grade', class: 'Mrs. Smith\'s Class' },
    { id: 's2', name: 'Alex Chen', grade: '5th Grade', class: 'Mr. Davis\'s Class' },
    { id: 's3', name: 'Sophia Williams', grade: '4th Grade', class: 'Ms. Johnson\'s Class' },
    { id: 's4', name: 'Liam Brown', grade: '3rd Grade', class: 'Mrs. Smith\'s Class' }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade.charAt(0)) {
      case 'A':
        return 'from-green-400 to-emerald-500';
      case 'B':
        return 'from-blue-400 to-indigo-500';
      case 'C':
        return 'from-yellow-400 to-orange-500';
      case 'D':
        return 'from-orange-400 to-red-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const handleUploadReport = () => {
    if (!newReport.studentId || !newReport.file) return;

    const reportCard: ReportCard = {
      id: Date.now().toString(),
      studentId: newReport.studentId,
      studentName: students.find(s => s.id === newReport.studentId)?.name || '',
      term: newReport.term,
      year: newReport.year,
      uploadDate: new Date(),
      teacherId: currentUser?.id || '',
      teacherName: currentUser?.name || '',
      subjects: newReport.subjects,
      overallGrade: 'A-',
      overallPercentage: 88,
      teacherComments: newReport.comments,
      principalComments: '',
      fileUrl: URL.createObjectURL(newReport.file)
    };

    setReportCards([...reportCards, reportCard]);
    setNewReport({
      studentId: '',
      term: 'Term 1',
      year: '2024',
      subjects: [],
      comments: '',
      file: null
    });
    setShowUploadForm(false);
  };

  const filteredReports = mockReportCards.filter(report => {
    const termMatch = selectedTerm === 'all' || report.term === selectedTerm;
    const yearMatch = report.year === selectedYear;
    const studentMatch = currentUser?.role === 'parent' 
      ? currentUser.children?.some(child => child.id === report.studentId)
      : true;
    
    return termMatch && yearMatch && studentMatch;
  });

  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
  const years = ['2024', '2023', '2022'];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white animate-bounce-gentle">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Report Cards 📋</h2>
              <p className="text-xl text-indigo-200 font-bold">
                Track academic progress and achievements! ✨
              </p>
            </div>
          </div>
          {currentUser?.role === 'teacher' && (
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-500 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Report Card
            </button>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Trophy className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
          <Star className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
          <Award className="w-6 h-6 text-pink-300 fill-current animate-pulse" />
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && currentUser?.role === 'teacher' && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">Upload Report Card ✨</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Student 👨‍🎓</label>
              <select
                value={newReport.studentId}
                onChange={(e) => setNewReport({ ...newReport, studentId: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium"
              >
                <option value="">Choose a student...</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Term 📅</label>
              <select
                value={newReport.term}
                onChange={(e) => setNewReport({ ...newReport, term: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium"
              >
                {terms.map((term) => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Year 🗓️</label>
              <select
                value={newReport.year}
                onChange={(e) => setNewReport({ ...newReport, year: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Report Card File 📄</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setNewReport({ ...newReport, file: e.target.files?.[0] || null })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Teacher Comments 💬</label>
              <textarea
                value={newReport.comments}
                onChange={(e) => setNewReport({ ...newReport, comments: e.target.value })}
                placeholder="Add your comments about the student's progress..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none font-medium resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleUploadReport}
              className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl font-bold hover:from-green-500 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Upload Report Card ✨
            </button>
            <button
              onClick={() => setShowUploadForm(false)}
              className="bg-gradient-to-br from-gray-400 to-gray-500 text-white px-6 py-3 rounded-2xl font-bold hover:from-gray-500 hover:to-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-200">
        <h3 className="text-xl font-black text-gray-800 mb-4">Filter Reports 🔍</h3>
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Term</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-4 py-2 rounded-2xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none font-medium"
            >
              <option value="all">All Terms</option>
              {terms.map((term) => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded-2xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none font-medium"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-200 hover:border-green-400 transition-all duration-300 transform hover:scale-102"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-gray-800">{report.studentName}</h4>
                  <p className="text-lg text-gray-600 font-semibold">{report.term} {report.year}</p>
                  <p className="text-sm text-gray-500">Uploaded: {report.uploadDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className={`px-6 py-3 bg-gradient-to-r ${getGradeColor(report.overallGrade)} rounded-2xl mb-2`}>
                    <span className="text-white font-black text-2xl">{report.overallGrade}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-600">Overall Grade</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-800">{report.overallPercentage}%</div>
                  <p className="text-sm font-bold text-gray-600">Average</p>
                </div>
              </div>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {report.subjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-gray-800">{subject.name}</h5>
                    <div className={`px-3 py-1 bg-gradient-to-r ${getGradeColor(subject.grade)} rounded-xl`}>
                      <span className="text-white font-black text-sm">{subject.grade}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-full bg-gradient-to-r ${getGradeColor(subject.grade)} rounded-full transition-all duration-1000`}
                        style={{ width: `${subject.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-600">{subject.percentage}%</span>
                  </div>
                  <p className="text-xs text-gray-600">{subject.comments}</p>
                </div>
              ))}
            </div>

            {/* Comments */}
            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-200">
                <h5 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Teacher Comments
                </h5>
                <p className="text-gray-700 font-medium">{report.teacherComments}</p>
              </div>
              {report.principalComments && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border-2 border-yellow-200">
                  <h5 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Principal Comments
                  </h5>
                  <p className="text-gray-700 font-medium">{report.principalComments}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white px-4 py-2 rounded-xl font-bold hover:from-blue-500 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Full Report
              </button>
              <button className="bg-gradient-to-br from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:from-green-500 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-black text-gray-800 mb-2">No Report Cards Found</h4>
            <p className="text-gray-600 font-medium">
              {currentUser?.role === 'teacher' 
                ? 'Upload report cards to get started! ✨' 
                : 'Report cards will appear here once uploaded by teachers! 📚'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};