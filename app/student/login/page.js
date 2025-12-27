'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/mockDb';

export default function StudentLoginPage() {
  const router = useRouter();
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate roll number
      const student = db.students.getByRollNo(rollNo);
      
      if (!student) {
        setError('❌ Roll Number not found. Please check your Roll Number.');
        setLoading(false);
        return;
      }

      // For demo purposes, we're accepting any non-empty password
      // In production, validate against hashed password
      if (!password) {
        setError('❌ Please enter password');
        setLoading(false);
        return;
      }

      // Store student info in sessionStorage for the dashboard
      sessionStorage.setItem('loggedInStudent', JSON.stringify(student));

      // Redirect to student dashboard
      router.push('/student/dashboard');
    } catch (err) {
      setError('❌ An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">📚 Student Portal</h1>
            <p className="text-slate-400">Login to view your attendance</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-900 border border-red-700 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Roll Number Input */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Roll Number
              </label>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                placeholder="e.g., BCA001"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
              <p className="mt-2 text-slate-400 text-xs">
                💡 Enter your Roll Number assigned by your department
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || !rollNo || !password}
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Logging in...' : '🔐 Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-sm text-center">
              Need help? Contact your department office.
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-slate-700 rounded-lg border border-slate-600">
            <p className="text-slate-300 text-xs font-semibold mb-2">📝 Demo Credentials:</p>
            <div className="space-y-1 text-slate-400 text-xs">
              <p>Roll No: <span className="text-blue-300">BCA001</span></p>
              <p>Roll No: <span className="text-blue-300">BSC001</span></p>
              <p>Password: <span className="text-blue-300">Any password</span></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a 
            href="/"
            className="text-slate-400 hover:text-white transition text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
