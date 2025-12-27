'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/mockDb';

export default function AttendanceMarking() {
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Selection states
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setCourses(db.courses.getAll());
    setYears(db.years.getAll());
    setSections(db.sections.getAll());
  }, []);

  // Update subjects when course and year change
  useEffect(() => {
    if (selectedCourse && selectedYear) {
      const courseNum = parseInt(selectedYear);
      const subjectList = db.subjects.getByCourseAndYear(selectedCourse, courseNum);
      setSubjects(subjectList);
      setSelectedSubject('');
    }
  }, [selectedCourse, selectedYear]);

  // Get students for selected class
  useEffect(() => {
    if (selectedCourse && selectedYear && selectedSection) {
      const classData = db.classes.getByFilter({
        courseId: selectedCourse,
        year: parseInt(selectedYear),
        sectionId: selectedSection
      });

      if (classData.length > 0) {
        const classStudents = db.students.getByClass(classData[0].id);
        setStudents(classStudents);
        
        // Initialize attendance state
        const attendanceState = {};
        classStudents.forEach(student => {
          attendanceState[student.id] = true; // default to present
        });
        setAttendance(attendanceState);
      }
    }
  }, [selectedCourse, selectedYear, selectedSection]);

  const handleToggleAttendance = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleSubmitAttendance = () => {
    if (!selectedCourse || !selectedYear || !selectedSection || !selectedSubject) {
      alert('Please select all fields: Course, Year, Section, and Subject');
      return;
    }

    const classData = db.classes.getByFilter({
      courseId: selectedCourse,
      year: parseInt(selectedYear),
      sectionId: selectedSection
    })[0];

    // Create attendance records
    const attendanceRecords = students.map(student => ({
      studentId: student.id,
      classId: classData.id,
      subjectId: selectedSubject,
      date: new Date(selectedDate),
      isPresent: attendance[student.id],
      recordedBy: 'admin'
    }));

    db.attendance.bulkCreate(attendanceRecords);

    setSuccessMessage(`✅ Attendance recorded for ${students.length} students!`);
    setTimeout(() => setSuccessMessage(''), 3000);

    // Reset form
    setAttendance({});
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const getCourseDetails = () => {
    const course = db.courses.getById(selectedCourse);
    const year = db.years.getById(selectedYear);
    const section = db.sections.getById(selectedSection);
    const subject = db.subjects.getById(selectedSubject);

    return {
      courseName: course?.name || '',
      yearName: year?.name || '',
      sectionName: section?.name || '',
      subjectName: subject?.name || ''
    };
  };

  const details = getCourseDetails();
  const presentCount = Object.values(attendance).filter(Boolean).length;

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">📋 Mark Attendance</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-900 text-green-200 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Course Selection */}
        <div>
          <label className="block text-white text-sm font-semibold mb-2">Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        {/* Year Selection */}
        <div>
          <label className="block text-white text-sm font-semibold mb-2">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={!selectedCourse}
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year.id} value={year.id}>{year.name}</option>
            ))}
          </select>
        </div>

        {/* Section Selection */}
        <div>
          <label className="block text-white text-sm font-semibold mb-2">Section</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={!selectedYear}
          >
            <option value="">Select Section</option>
            {sections.map(section => (
              <option key={section.id} value={section.id}>{section.name}</option>
            ))}
          </select>
        </div>

        {/* Subject Selection */}
        <div>
          <label className="block text-white text-sm font-semibold mb-2">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={!selectedYear || subjects.length === 0}
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-white text-sm font-semibold mb-2">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Class Info */}
        {selectedCourse && selectedYear && selectedSection && (
          <div className="flex items-end">
            <div className="text-slate-300 text-sm">
              <span className="font-semibold">Selected Class:</span> {details.courseName} {details.yearName} {details.sectionName}
            </div>
          </div>
        )}
      </div>

      {/* Attendance List */}
      {students.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              Students ({students.length}) - Present: {presentCount}
            </h3>
          </div>

          <div className="bg-slate-700 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-slate-600 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-white">Roll No</th>
                  <th className="px-4 py-3 text-left text-white">Name</th>
                  <th className="px-4 py-3 text-center text-white">Present</th>
                  <th className="px-4 py-3 text-center text-white">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                {students.map(student => (
                  <tr key={student.id} className="hover:bg-slate-600 transition">
                    <td className="px-4 py-3 text-slate-200">{student.rollNo}</td>
                    <td className="px-4 py-3 text-slate-200">{student.name}</td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={attendance[student.id] || false}
                        onChange={() => handleToggleAttendance(student.id)}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        attendance[student.id] 
                          ? 'bg-green-900 text-green-200' 
                          : 'bg-red-900 text-red-200'
                      }`}>
                        {attendance[student.id] ? '✓ Present' : '✗ Absent'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSubmitAttendance}
          disabled={students.length === 0}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✓ Submit Attendance
        </button>
        <button
          onClick={() => {
            setSelectedCourse('');
            setSelectedYear('');
            setSelectedSection('');
            setSelectedSubject('');
            setStudents([]);
            setAttendance({});
          }}
          className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition"
        >
          Clear
        </button>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-slate-600 text-slate-300 text-sm">
        <p className="font-semibold text-white mb-2">📌 Instructions:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Select Course, Year, and Section to load student list</li>
          <li>Choose the Subject being conducted and Date</li>
          <li>Check the checkbox for students who are Present</li>
          <li>Unchecked students will be marked Absent</li>
          <li>Click Submit to save attendance records</li>
        </ul>
      </div>
    </div>
  );
}
