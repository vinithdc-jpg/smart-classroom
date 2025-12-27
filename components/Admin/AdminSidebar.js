'use client';

import React from 'react';

/**
 * AdminSidebar Component
 * Navigation for admin dashboard
 */
export default function AdminSidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'bookings', label: 'Bookings', icon: '📋' },
    { id: 'rooms', label: 'Rooms', icon: '🏢' },
    { id: 'floors', label: 'Floors', icon: '🏗️' },
    { id: 'attendance', label: 'Mark Attendance', icon: '✓' },
    { id: 'students', label: 'Student Management', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">
      <h2 className="text-lg font-bold text-white mb-6">Admin Menu</h2>
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full text-left px-4 py-3 rounded transition ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
