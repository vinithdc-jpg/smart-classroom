'use client';

import React, { useState, useEffect } from 'react';
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

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedRoom(null);
          }}
          onBook={handleBooking}
          bookings={bookings}
        />
      )}

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
    </div>
  );
}
