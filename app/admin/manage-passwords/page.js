'use client';
import { useState, useEffect } from 'react';
import { db } from '../../../lib/mockDb';

export default function AdminPasswordPage() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allStudents = db.students.getAll();
    setStudents(allStudents);
  }, []);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!selectedStudent) {
      setError('Please select a student');
      return;
    }

    if (!newPassword) {
      setError('Please enter a password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/students/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent,
          newPassword: newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        const student = students.find(s => s.id === selectedStudent);
        setMessage(`✓ Password set for ${student.name} (${student.rollNo})`);
        setNewPassword('');
        setConfirmPassword('');
        setSelectedStudent('');
      } else {
        setError(data.error || 'Failed to set password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Student Password Management</h1>
      <p className="text-gray-600 mb-6">Set or reset student login passwords</p>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSetPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="">-- Choose a student --</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.rollNo})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Setting Password...' : 'Set Password'}
          </button>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h2 className="font-semibold text-gray-800 mb-2">All Students</h2>
        <div className="space-y-2">
          {students.map(student => (
            <div key={student.id} className="flex justify-between text-sm text-gray-700">
              <span>{student.name}</span>
              <span className="font-mono text-gray-500">{student.rollNo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
