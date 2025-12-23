'use client';

import React, { useState } from 'react';

/**
 * BookingsTable Component
 * Displays and manages all bookings
 */
export default function BookingsTable({ bookings, rooms, onDeleteBooking }) {
  const [filter, setFilter] = useState('all');

  const getRoomName = (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? `Room ${room.roomNumber}` : 'Unknown Room';
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const statusColor = {
    confirmed: 'text-green-400',
    pending: 'text-yellow-400',
    cancelled: 'text-red-400',
    completed: 'text-blue-400'
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden">
      {/* Header with Filters */}
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Booking Management</h2>
        <div className="flex flex-wrap gap-2">
          {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded transition ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700 border-b border-slate-600">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Room
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Time
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Purpose
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-slate-700 hover:bg-slate-700/50 transition"
              >
                <td className="px-6 py-4 text-white font-medium">
                  {getRoomName(booking.roomId)}
                </td>
                <td className="px-6 py-4 text-slate-300">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-slate-300">
                  {booking.startTime} - {booking.endTime}
                </td>
                <td className="px-6 py-4 text-slate-300">{booking.purpose}</td>
                <td className={`px-6 py-4 font-medium capitalize ${statusColor[booking.status]}`}>
                  {booking.status}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="text-blue-400 hover:text-blue-300 transition">
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDeleteBooking(booking.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    🗑️ Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <div className="p-6 text-center">
          <p className="text-slate-400">No bookings found</p>
        </div>
      )}
    </div>
  );
}
