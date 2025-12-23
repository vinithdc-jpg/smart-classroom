'use client';

import React from 'react';

/**
 * AdminOverview Component
 * Dashboard overview with key metrics
 */
export default function AdminOverview({ rooms, bookings, floors }) {
  // Calculate statistics
  const totalRooms = rooms.length;
  const activeRooms = rooms.filter((r) => r.isActive).length;
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;

  // Calculate utilization rate
  const utilizationRate = totalRooms > 0
    ? Math.round((confirmedBookings / totalRooms) * 100)
    : 0;

  // Find most booked room
  const mostBooked = rooms.reduce((acc, room) => {
    const count = bookings.filter((b) => b.roomId === room.id).length;
    return count > acc.count ? { room, count } : acc;
  }, { room: null, count: 0 });

  // Get upcoming bookings
  const upcomingBookings = bookings
    .filter((b) => b.status === 'confirmed')
    .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Rooms" value={totalRooms} icon="🏢" color="blue" />
        <MetricCard title="Active Rooms" value={activeRooms} icon="✅" color="green" />
        <MetricCard
          title="Total Bookings"
          value={totalBookings}
          icon="📅"
          color="purple"
        />
        <MetricCard
          title="Utilization Rate"
          value={`${utilizationRate}%`}
          icon="📊"
          color="orange"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Booked Room */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">Most Booked Room</h3>
          {mostBooked.room ? (
            <div className="space-y-2">
              <p className="text-2xl font-bold text-blue-400">
                Room {mostBooked.room.roomNumber}
              </p>
              <p className="text-slate-400">
                Booked {mostBooked.count} times
              </p>
              <p className="text-sm text-slate-500">
                Floor {mostBooked.room.floorNumber} • {mostBooked.room.description}
              </p>
            </div>
          ) : (
            <p className="text-slate-400">No bookings yet</p>
          )}
        </div>

        {/* Booking Status Summary */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4">Booking Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Confirmed</span>
              <span className="text-green-400 font-semibold">{confirmedBookings}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Pending</span>
              <span className="text-yellow-400 font-semibold">
                {bookings.filter((b) => b.status === 'pending').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Cancelled</span>
              <span className="text-red-400 font-semibold">
                {bookings.filter((b) => b.status === 'cancelled').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">Upcoming Bookings</h3>
        {upcomingBookings.length > 0 ? (
          <div className="space-y-3">
            {upcomingBookings.map((booking) => {
              const room = rooms.find((r) => r.id === booking.roomId);
              return (
                <div
                  key={booking.id}
                  className="flex justify-between items-center p-3 bg-slate-700 rounded"
                >
                  <div>
                    <p className="font-medium text-white">
                      Room {room?.roomNumber || 'Unknown'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(booking.bookingDate).toLocaleDateString()} •{' '}
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                    {booking.purpose}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-400">No upcoming bookings</p>
        )}
      </div>

      {/* Floor Summary */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">Floor Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {floors.map((floor) => {
            const floorRooms = rooms.filter((r) => r.floorId === floor.id);
            const floorBookings = bookings.filter((b) =>
              floorRooms.some((r) => r.id === b.roomId)
            );
            return (
              <div key={floor.id} className="p-3 bg-slate-700 rounded">
                <p className="font-semibold text-white">
                  Floor {floor.floorNumber}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {floorRooms.length} rooms
                </p>
                <p className="text-xs text-slate-400">
                  {floorBookings.length} bookings
                </p>
                <div className="mt-2 h-1 bg-slate-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${floorRooms.length > 0
                        ? (floorBookings.length / floorRooms.length) * 100
                        : 0}%`
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * MetricCard Component
 */
function MetricCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-900/30 border-blue-700 text-blue-400',
    green: 'bg-green-900/30 border-green-700 text-green-400',
    purple: 'bg-purple-900/30 border-purple-700 text-purple-400',
    orange: 'bg-orange-900/30 border-orange-700 text-orange-400'
  };

  return (
    <div className={`rounded-lg p-6 border ${colorClasses[color]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}
