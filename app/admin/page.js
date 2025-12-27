'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import BookingsTable from '@/components/Admin/BookingsTable';
import RoomManagement from '@/components/Admin/RoomManagement';
import AdminOverview from '@/components/Admin/AdminOverview';
import AttendanceMarking from '@/components/Admin/AttendanceMarking';
import StudentRollManagement from '@/components/Admin/StudentRollManagement';
import { mockFloors, mockRooms, mockBookings } from '@/lib/mockDb';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize data
  useEffect(() => {
    setFloors(mockFloors);
    setRooms(mockRooms);
    setBookings(mockBookings);
    setLoading(false);
  }, []);

  const handleDeleteRoom = (roomId) => {
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
  };

  const handleDeleteBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      )
    );
  };

  const handleAddRoom = (newRoom) => {
    setRooms((prev) => [...prev, { id: `room${Date.now()}`, ...newRoom }]);
  };

  const handleAddFloor = (newFloor) => {
    setFloors((prev) => [...prev, { id: `floor${Date.now()}`, ...newFloor }]);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      {/* Mobile Menu Button */}
      <div className="md:hidden bg-slate-800 border-b border-slate-700 px-4 py-3 flex justify-between items-center">
        <h2 className="text-white font-semibold text-sm">Admin Menu</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-slate-700 rounded transition text-white"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Collapsible on mobile */}
        {sidebarOpen && (
          <div className="bg-slate-800 border-b md:border-b-0 md:border-r border-slate-700 p-6 md:w-64 md:min-h-screen w-full">
            <AdminSidebar activeTab={activeTab} onTabChange={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }} />
          </div>
        )}
        
        {/* Fallback for desktop sidebar */}
        <div className="hidden md:block md:w-64 md:bg-slate-800 md:border-r md:border-slate-700 md:p-6">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-slate-400">Loading...</p>
            </div>
          ) : (
            <>
              {/* Page Header */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                  ⚙️ Admin Dashboard
                </h1>
                <p className="text-slate-400 text-sm md:text-base">
                  Manage rooms, bookings, and system settings
                </p>
              </div>

              {/* Content based on active tab */}
              {activeTab === 'overview' && (
                <AdminOverview rooms={rooms} bookings={bookings} floors={floors} />
              )}

              {activeTab === 'bookings' && (
                <BookingsTable
                  bookings={bookings}
                  rooms={rooms}
                  onDeleteBooking={handleDeleteBooking}
                />
              )}

              {activeTab === 'rooms' && (
                <RoomManagement
                  rooms={rooms}
                  floors={floors}
                  onDeleteRoom={handleDeleteRoom}
                  onAddRoom={handleAddRoom}
                />
              )}

              {activeTab === 'attendance' && (
                <AttendanceMarking />
              )}

              {activeTab === 'students' && (
                <StudentRollManagement />
              )}

              {activeTab === 'floors' && (
                <div className="bg-slate-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Floor Management</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {floors.map((floor) => (
                      <div
                        key={floor.id}
                        className="bg-slate-700 p-4 rounded-lg border border-slate-600"
                      >
                        <h3 className="text-lg font-semibold text-white">
                          Floor {floor.floorNumber}
                        </h3>
                        <p className="text-slate-400 text-sm mb-3">{floor.description}</p>
                        <div className="space-y-1 text-sm text-slate-300 mb-3">
                          <p>Total Rooms: {floor.totalRooms}</p>
                          <p>
                            Status:{' '}
                            <span
                              className={
                                floor.isActive
                                  ? 'text-green-400'
                                  : 'text-red-400'
                              }
                            >
                              {floor.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </p>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded transition text-sm">
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
                    + Add New Floor
                  </button>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="bg-slate-800 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">📊 Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Peak Booking Hours</p>
                      <p className="text-2xl font-bold text-white mt-2">09:00 - 11:00</p>
                    </div>
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Most Booked Room</p>
                      <p className="text-2xl font-bold text-white mt-2">
                        {rooms.length > 0
                          ? `Room ${rooms[0].roomNumber}`
                          : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Utilization Rate</p>
                      <p className="text-2xl font-bold text-green-400 mt-2">78%</p>
                    </div>
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm">Total Bookings</p>
                      <p className="text-2xl font-bold text-white mt-2">
                        {bookings.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
