'use client';

import React, { useMemo } from 'react';
import RoomCard from './RoomCard';

/**
 * RoomGrid Component
 * Displays rooms for a selected floor in a responsive grid
 */
export default function RoomGrid({ rooms, bookings, selectedFloor, onRoomSelect }) {
  // Calculate room status based on bookings
  const getRoomStatus = (roomId) => {
    const today = new Date();
    const todayString = today.toDateString();

    const roomBookings = bookings.filter((b) => {
      const bookingDate = new Date(b.bookingDate).toDateString();
      return b.roomId === roomId && bookingDate === todayString;
    });

    if (roomBookings.length === 0) return 'free';
    if (roomBookings.some((b) => b.status === 'confirmed')) return 'occupied';
    if (roomBookings.some((b) => b.status === 'pending')) return 'reserved';

    return 'free';
  };

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((r) => r.floorId === selectedFloor && r.isActive)
      .sort((a, b) => a.roomNumber.localeCompare(b.roomNumber));
  }, [rooms, selectedFloor]);

  if (filteredRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-slate-400 text-lg">No rooms available on this floor</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredRooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          status={getRoomStatus(room.id)}
          bookings={bookings.filter((b) => b.roomId === room.id)}
          onSelect={onRoomSelect}
        />
      ))}
    </div>
  );
}
