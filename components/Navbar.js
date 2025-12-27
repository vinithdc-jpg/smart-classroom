'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user] = useState({ name: 'John Doe', role: 'user' });

  return (
    <nav className="bg-slate-800 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition">
            <div className="text-2xl font-bold text-blue-400">🏢</div>
            <div>
              <h1 className="text-xl font-bold text-white">Smart Campus</h1>
              <p className="text-xs text-slate-400">Room Allocation System</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-400 hover:text-white transition text-sm">
              Home
            </Link>
            <Link href="/admin" className="text-slate-400 hover:text-white transition text-sm">
              Admin Dashboard
            </Link>
            <Link href="/student/login" className="text-slate-400 hover:text-white transition text-sm">
              Student Portal
            </Link>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <button className="text-sm text-slate-400 hover:text-white transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
