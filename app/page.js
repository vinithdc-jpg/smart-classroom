'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FloorSelector from '@/components/FloorSelector';
import RoomGrid from '@/components/RoomGrid';
import BookingModal from '@/components/BookingModal';
import { db, mockFloors, mockRooms, mockBookings } from '@/lib/mockDb';

export default function HomePage() {
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showRoomBooking, setShowRoomBooking] = useState(false);

  // Initialize data
  useEffect(() => {
    setFloors(mockFloors);
    setRooms(mockRooms);
    setBookings(mockBookings);
    // Set first active floor as default
    const firstActive = mockFloors.find((f) => f.isActive);
    if (firstActive) {
      setSelectedFloor(firstActive.id);
    }
  }, []);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowBookingModal(true);
  };

  const handleBooking = (bookingData) => {
    // Create new booking
    const newBooking = db.bookings.create({
      ...bookingData,
      userId: '1',
      status: 'confirmed'
    });

    setBookings((prev) => [...prev, newBooking]);
    setShowBookingModal(false);
    setSelectedRoom(null);

    // Show success message
    setSuccessMessage(`✅ Room ${selectedRoom.roomNumber} booked successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navbar */}
      <Navbar />

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-900/50 border-l-4 border-green-500 px-4 py-3 text-green-400 text-sm animate-pulse">
          {successMessage}
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Welcome to Smart Campus</h2>
              <p className="text-blue-100 text-lg mb-6">
                Manage attendance, allocate classrooms, and track student performance efficiently.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/admin"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                >
                  👨‍💼 Admin Dashboard
                </Link>
                <Link
                  href="/student/login"
                  className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
                >
                  👨‍🎓 Student Login
                </Link>
              </div>
            </div>

            {/* Right side - Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-700 p-4 rounded-lg">
                <p className="text-3xl mb-2">📋</p>
                <p className="text-white font-semibold">Attendance</p>
              </div>
              <div className="bg-blue-700 p-4 rounded-lg">
                <p className="text-3xl mb-2">🏢</p>
                <p className="text-white font-semibold">Room Booking</p>
              </div>
              <div className="bg-blue-700 p-4 rounded-lg">
                <p className="text-3xl mb-2">👥</p>
                <p className="text-white font-semibold">Student Mgmt</p>
              </div>
              <div className="bg-blue-700 p-4 rounded-lg">
                <p className="text-3xl mb-2">📊</p>
                <p className="text-white font-semibold">Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Booking Section */}
      {showRoomBooking && (
        <>
          {/* Floor Selector */}
          {selectedFloor && (
            <FloorSelector
              floors={floors}
              selectedFloor={selectedFloor}
              onFloorChange={setSelectedFloor}
            />
          )}

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                🏢 Room Allocation Dashboard
              </h1>
              <p className="text-slate-400">
                Select a floor and book your preferred meeting room
              </p>
            </div>

            {/* Room Grid */}
            {selectedFloor && (
              <RoomGrid
                rooms={rooms}
                bookings={bookings}
                selectedFloor={selectedFloor}
                onRoomSelect={handleRoomSelect}
              />
            )}
          </main>

          {/* Legend */}
          <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-sm font-medium text-white mb-3">Legend</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-slate-300">Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-slate-300">Occupied</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-slate-300">Reserved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-500 rounded"></div>
                  <span className="text-sm text-slate-300">Unavailable</span>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">System Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Features */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">👨‍💼 Admin Features</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ Mark student attendance by class</li>
              <li>✓ Create roll numbers for students</li>
              <li>✓ Select course, year, and section</li>
              <li>✓ View attendance records</li>
              <li>✓ Calculate attendance percentage</li>
              <li>✓ Manage room bookings</li>
            </ul>
          </div>

          {/* Student Features */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">👨‍🎓 Student Features</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ Login with roll number</li>
              <li>✓ View attendance records</li>
              <li>✓ Check attendance percentage</li>
              <li>✓ Subject-wise attendance</li>
              <li>✓ Attendance history</li>
              <li>✓ Performance tracking</li>
            </ul>
          </div>

          {/* System Features */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">⚙️ System Features</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>✓ Room booking system</li>
              <li>✓ Floor management</li>
              <li>✓ Real-time availability</li>
              <li>✓ Analytics dashboard</li>
              <li>✓ User authentication</li>
              <li>✓ Responsive design</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Smart Campus - Room Allocation & Attendance Management System
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/admin" className="text-blue-400 hover:text-blue-300 text-sm">
              Admin
            </Link>
            <Link href="/student/login" className="text-blue-400 hover:text-blue-300 text-sm">
              Student
            </Link>
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
