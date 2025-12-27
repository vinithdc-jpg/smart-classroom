'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/mockDb';

export default function StudentRollManagement() {
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Selection states
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  // New student form
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: ''
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setCourses(db.courses.getAll());
    setYears(db.years.getAll());
    setSections(db.sections.getAll());
  }, []);

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
      } else {
        setStudents([]);
      }
    } else {
      setStudents([]);
    }
  }, [selectedCourse, selectedYear, selectedSection]);

  const handleAddStudent = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.rollNo || !formData.email) {
      setErrorMessage('Please fill all fields');
      return;
    }

    // Check if roll number already exists
    if (db.students.getByRollNo(formData.rollNo)) {
      setErrorMessage('Roll number already exists!');
      return;
    }

    const classData = db.classes.getByFilter({
      courseId: selectedCourse,
      year: parseInt(selectedYear),
      sectionId: selectedSection
    })[0];

    // Add new student
    const newStudent = db.students.create({
      name: formData.name,
      rollNo: formData.rollNo,
      email: formData.email,
      courseId: selectedCourse,
      year: parseInt(selectedYear),
      sectionId: selectedSection
    });

    setStudents(prev => [...prev, newStudent]);
    setFormData({ name: '', rollNo: '', email: '' });
    setShowForm(false);
    setErrorMessage('');
    setSuccessMessage(`✅ Student ${formData.name} added successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      db.students.delete(studentId);
      setStudents(prev => prev.filter(s => s.id !== studentId));
      setSuccessMessage('✅ Student deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const getCourseDetails = () => {
    const course = db.courses.getById(selectedCourse);
    const year = db.years.getById(selectedYear);
    const section = db.sections.getById(selectedSection);

    return {
      courseName: course?.name || '',
      yearName: year?.name || '',
      sectionName: section?.name || ''
    };
  };

  const details = getCourseDetails();

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">👥 Student Roll Number Management</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-900 text-green-200 rounded-lg">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-900 text-red-200 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      </div>

      {/* Class Info and Add Button */}
      {selectedCourse && selectedYear && selectedSection && (
        <div className="flex justify-between items-center mb-6 p-4 bg-slate-700 rounded-lg">
          <div>
            <p className="text-slate-300 text-sm">
              <span className="font-semibold text-white">Selected Class:</span> {details.courseName} {details.yearName} {details.sectionName}
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? '✕ Cancel' : '+ Add Student'}
          </button>
        </div>
      )}

      {/* Add Student Form */}
      {showForm && selectedCourse && selectedYear && selectedSection && (
        <div className="mb-6 p-4 bg-slate-700 rounded-lg border border-slate-600">
          <h3 className="text-lg font-semibold text-white mb-4">Add New Student</h3>
          <form onSubmit={handleAddStudent}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Student Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 bg-slate-600 text-white border border-slate-500 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Roll No (e.g., BCA001)"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="px-4 py-2 bg-slate-600 text-white border border-slate-500 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 bg-slate-600 text-white border border-slate-500 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              ✓ Add Student
            </button>
          </form>
        </div>
      )}

      {/* Students List */}
      {selectedCourse && selectedYear && selectedSection && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Total Students: {students.length}
          </h3>

          {students.length > 0 ? (
            <div className="bg-slate-700 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-slate-600 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-white">Roll No</th>
                    <th className="px-4 py-3 text-left text-white">Student Name</th>
                    <th className="px-4 py-3 text-left text-white">Email</th>
                    <th className="px-4 py-3 text-center text-white">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-slate-600 transition">
                      <td className="px-4 py-3 text-white font-semibold">{student.rollNo}</td>
                      <td className="px-4 py-3 text-slate-200">{student.name}</td>
                      <td className="px-4 py-3 text-slate-200">{student.email}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-slate-700 rounded-lg p-6 text-center text-slate-400">
              <p>No students in this class yet. Add students to get started!</p>
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-slate-600 text-slate-300 text-sm">
        <p className="font-semibold text-white mb-2">📌 Instructions:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Select a Course, Year, and Section to manage students</li>
          <li>Click 'Add Student' to add new students with unique Roll Numbers</li>
          <li>Roll Numbers must be unique across all students</li>
          <li>Students use their Roll Numbers to login to the student portal</li>
          <li>You can delete students if needed</li>
        </ul>
      </div>
    </div>
  );
}
