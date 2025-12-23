'use client';

import React, { useState, useEffect } from 'react';

/**
 * BookingModal Component
 * Handles room booking with date/time selection and conflict validation
 */
export default function BookingModal({ room, isOpen, onClose, onBook, bookings }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '11:00',
    purpose: '',
    participantCount: 1,
    notes: ''
  });

  const [conflict, setConflict] = useState(null);
  const [error, setError] = useState('');

  // Check for booking conflicts
  useEffect(() => {
    if (!formData.date || !formData.startTime || !formData.endTime) return;

    const roomBookings = bookings.filter((b) => {
      const bookingDate = new Date(b.bookingDate).toISOString().split('T')[0];
      return b.roomId === room.id && bookingDate === formData.date && b.status === 'confirmed';
    });

    const hasConflict = roomBookings.some((b) => {
      return formData.startTime < b.endTime && formData.endTime > b.startTime;
    });

    if (hasConflict) {
      const conflictingBooking = roomBookings.find(
        (b) => formData.startTime < b.endTime && formData.endTime > b.startTime
      );
      setConflict({
        exists: true,
        booking: conflictingBooking,
        message: `⚠️ Conflict with booking from ${conflictingBooking.startTime} to ${conflictingBooking.endTime}`
      });
    } else {
      setConflict({ exists: false });
    }
  }, [formData.date, formData.startTime, formData.endTime, room.id, bookings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.purpose.trim()) {
      setError('Please enter booking purpose');
      return;
    }

    if (formData.participantCount < 1 || formData.participantCount > room.capacity) {
      setError(`Participant count should be between 1 and ${room.capacity}`);
      return;
    }

    if (formData.startTime >= formData.endTime) {
      setError('End time must be after start time');
      return;
    }

    if (conflict?.exists) {
      setError('This time slot is already booked. Please choose another time.');
      return;
    }

    // Submit booking
    onBook({
      roomId: room.id,
      bookingDate: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      purpose: formData.purpose,
      participantCount: parseInt(formData.participantCount),
      notes: formData.notes
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Book Room {room.roomNumber}</h2>
            <p className="text-slate-400 text-sm mt-1">{room.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-xs text-slate-400 uppercase font-medium mb-1">
              📅 Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Start Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 uppercase font-medium mb-1">
                🕐 Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* End Time */}
            <div>
              <label className="block text-xs text-slate-400 uppercase font-medium mb-1">
                🕑 End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Conflict Warning */}
          {conflict?.exists && (
            <div className="bg-red-900/50 border border-red-600 rounded px-3 py-2">
              <p className="text-red-400 text-sm">{conflict.message}</p>
            </div>
          )}

          {/* Purpose */}
          <div>
            <label className="block text-xs text-slate-400 uppercase font-medium mb-1">
              📝 Purpose
            </label>
            <input
              type="text"
              name="purpose"
              placeholder="e.g., Team Meeting, Training, Interview"
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Participant Count */}
          <div>
            <label className="block text-xs text-slate-400 uppercase font-medium mb-1">
              👥 Participant Count
            </label>
            <input
              type="number"
              name="participantCount"
              min="1"
              max={room.capacity}
              value={formData.participantCount}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-slate-400 mt-1">
              Room capacity: {room.capacity} people
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs text-slate-400 uppercase font-medium mb-1">
              📌 Notes (Optional)
            </label>
            <textarea
              name="notes"
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={handleInputChange}
              rows="2"
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-600 rounded px-3 py-2">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={conflict?.exists}
              className={`flex-1 font-medium py-2 rounded transition ${
                conflict?.exists
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {conflict?.exists ? 'Cannot Book' : 'Book Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
