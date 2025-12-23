'use client';

import React, { useState } from 'react';
import StatusBadge from './StatusBadge';

/**
 * RoomCard Component
 * Displays individual room with status and interactive features
 */
export default function RoomCard({ room, status, bookings, onSelect }) {
  const [showDetails, setShowDetails] = useState(false);

  const getNextAvailableTime = () => {
    if (bookings.length === 0) return '09:00 - 17:00';
    const lastBooking = bookings[bookings.length - 1];
    return `Available after ${lastBooking.endTime}`;
  };

  return (
    <>
      <div
        onClick={() => {
          setShowDetails(true);
          onSelect?.(room);
        }}
        className={`group p-4 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
          status === 'free'
            ? 'border-green-500 bg-slate-800 hover:bg-green-900/20'
            : status === 'occupied'
            ? 'border-red-500 bg-slate-800 hover:bg-red-900/20'
            : 'border-yellow-500 bg-slate-800 hover:bg-yellow-900/20'
        }`}
      >
        {/* Room Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-white">Room {room.roomNumber}</h3>
            <p className="text-xs text-slate-400">{room.location}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Room Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-slate-300">
            <span>👥</span>
            <span>Capacity: {room.capacity}</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-xs bg-slate-700 text-slate-200 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-xs text-slate-400">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Availability Info */}
        <div className="pt-3 border-t border-slate-700">
          <p className="text-xs text-slate-400">
            {status === 'free' ? (
              <span className="text-green-400">✓ Available now</span>
            ) : (
              <span className="text-red-400">✗ {bookings.length} booking(s) today</span>
            )}
          </p>
          <p className="text-xs text-slate-400 mt-1">{getNextAvailableTime()}</p>
        </div>

        {/* Action Button */}
        <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition">
          {status === 'free' ? 'Book Now' : 'View Bookings'}
        </button>
      </div>

      {/* Room Details Modal */}
      {showDetails && (
        <RoomDetailsModal room={room} status={status} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}

/**
 * Room Details Modal Component
 */
function RoomDetailsModal({ room, status, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Room {room.roomNumber}</h2>
            <p className="text-slate-400">{room.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Details Grid */}
        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs text-slate-400 uppercase">Capacity</p>
            <p className="text-white font-medium">{room.capacity} people</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">Location</p>
            <p className="text-white font-medium">{room.location} - Floor {room.floorNumber}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">Status</p>
            <div className="mt-1">
              <StatusBadge status={status} />
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase">Amenities</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {room.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded transition"
          >
            Close
          </button>
          {status === 'free' && (
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition">
              Book Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
