'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/mockDb';

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [classInfo, setClassInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get student from session
    const studentData = sessionStorage.getItem('loggedInStudent');
    
    if (!studentData) {
      router.push('/student/login');
      return;
    }

    const studentObj = JSON.parse(studentData);
    setStudent(studentObj);

    // Get student's class info
    const classData = db.classes.getByFilter({
      courseId: studentObj.courseId,
      year: studentObj.year,
      sectionId: studentObj.sectionId
    })[0];
    
    setClassInfo(classData);

    // Get student's attendance records
    if (classData) {
      const records = db.attendance.getByFilter({
        classId: classData.id
      }).filter(a => a.studentId === studentObj.id);

      setAttendanceData(records);

      // Calculate overall percentage
      if (records.length > 0) {
        const presentCount = records.filter(r => r.isPresent).length;
        const percentage = Math.round((presentCount / records.length) * 100);
        setOverallPercentage(percentage);
      }
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInStudent');
    router.push('/student/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400 text-lg">Loading...</p>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  const course = db.courses.getById(student.courseId);
  const year = db.years.getById(student.year);
  const section = db.sections.getById(student.sectionId);

  // Group attendance by subject
  const attendanceBySubject = {};
  attendanceData.forEach(record => {
    const subject = db.subjects.getById(record.subjectId);
    if (!attendanceBySubject[record.subjectId]) {
      attendanceBySubject[record.subjectId] = {
        subject: subject,
        total: 0,
        present: 0,
        absent: 0,
        percentage: 0
      };
    }
    attendanceBySubject[record.subjectId].total++;
    if (record.isPresent) {
      attendanceBySubject[record.subjectId].present++;
    } else {
      attendanceBySubject[record.subjectId].absent++;
    }
    attendanceBySubject[record.subjectId].percentage = Math.round(
      (attendanceBySubject[record.subjectId].present / attendanceBySubject[record.subjectId].total) * 100
    );
  });

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">📚 Student Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Student Info Card */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">👤 Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-700 rounded p-4">
              <p className="text-slate-400 text-sm">Roll Number</p>
              <p className="text-white text-lg font-semibold">{student.rollNo}</p>
            </div>
            <div className="bg-slate-700 rounded p-4">
              <p className="text-slate-400 text-sm">Name</p>
              <p className="text-white text-lg font-semibold">{student.name}</p>
            </div>
            <div className="bg-slate-700 rounded p-4">
              <p className="text-slate-400 text-sm">Course & Year</p>
              <p className="text-white text-lg font-semibold">{course?.name} - {year?.name}</p>
            </div>
            <div className="bg-slate-700 rounded p-4">
              <p className="text-slate-400 text-sm">Section</p>
              <p className="text-white text-lg font-semibold">{section?.name}</p>
            </div>
          </div>
        </div>

        {/* Overall Attendance */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">📊 Overall Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Percentage Circle */}
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70 * (overallPercentage / 100)} ${2 * Math.PI * 70}`}
                    className={`text-${overallPercentage >= 75 ? 'green' : overallPercentage >= 60 ? 'yellow' : 'red'}-500 transition-all`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-4xl font-bold ${overallPercentage >= 75 ? 'text-green-400' : overallPercentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {overallPercentage}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="bg-slate-700 rounded p-4">
                <p className="text-slate-400 text-sm">Total Classes</p>
                <p className="text-white text-3xl font-bold">{attendanceData.length}</p>
              </div>
              <div className="bg-green-900 rounded p-4">
                <p className="text-green-300 text-sm">Classes Present</p>
                <p className="text-green-400 text-3xl font-bold">
                  {attendanceData.filter(a => a.isPresent).length}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <div className="bg-red-900 rounded p-4">
                <p className="text-red-300 text-sm">Classes Absent</p>
                <p className="text-red-400 text-3xl font-bold">
                  {attendanceData.filter(a => !a.isPresent).length}
                </p>
              </div>
              <div className={`rounded p-4 ${
                overallPercentage >= 75 ? 'bg-green-900' : overallPercentage >= 60 ? 'bg-yellow-900' : 'bg-red-900'
              }`}>
                <p className={`text-sm ${
                  overallPercentage >= 75 ? 'text-green-300' : overallPercentage >= 60 ? 'text-yellow-300' : 'text-red-300'
                }`}>
                  Status
                </p>
                <p className={`text-2xl font-bold ${
                  overallPercentage >= 75 ? 'text-green-400' : overallPercentage >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {overallPercentage >= 75 ? '✓ Good' : overallPercentage >= 60 ? '⚠ Fair' : '✗ Poor'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance by Subject */}
        {Object.keys(attendanceBySubject).length > 0 ? (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">📚 Attendance by Subject</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(attendanceBySubject).map(([subjectId, data]) => (
                <div key={subjectId} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                  <h3 className="text-white font-semibold mb-3">{data.subject?.name}</h3>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300 text-sm">Attendance</span>
                      <span className={`text-sm font-semibold ${
                        data.percentage >= 75 ? 'text-green-400' : 
                        data.percentage >= 60 ? 'text-yellow-400' : 
                        'text-red-400'
                      }`}>
                        {data.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          data.percentage >= 75 ? 'bg-green-500' : 
                          data.percentage >= 60 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="text-slate-400">Total</p>
                      <p className="text-white font-bold">{data.total}</p>
                    </div>
                    <div>
                      <p className="text-green-300">Present</p>
                      <p className="text-green-400 font-bold">{data.present}</p>
                    </div>
                    <div>
                      <p className="text-red-300">Absent</p>
                      <p className="text-red-400 font-bold">{data.absent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-lg p-12 text-center border border-slate-700">
            <p className="text-slate-400 text-lg">No attendance records found yet.</p>
            <p className="text-slate-500 text-sm mt-2">Attendance will be recorded by your instructors.</p>
          </div>
        )}

        {/* Attendance History */}
        {attendanceData.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-6 mt-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">📋 Attendance History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-white">Date</th>
                    <th className="px-4 py-3 text-left text-white">Subject</th>
                    <th className="px-4 py-3 text-center text-white">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {attendanceData
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((record, index) => {
                      const subject = db.subjects.getById(record.subjectId);
                      const date = new Date(record.date);
                      return (
                        <tr key={index} className="hover:bg-slate-700 transition">
                          <td className="px-4 py-3 text-slate-300">
                            {date.toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </td>
                          <td className="px-4 py-3 text-slate-300">{subject?.name}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              record.isPresent
                                ? 'bg-green-900 text-green-300'
                                : 'bg-red-900 text-red-300'
                            }`}>
                              {record.isPresent ? '✓ Present' : '✗ Absent'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
