'use client';

import React, { useState } from 'react';

/**
 * RoomManagement Component
 * Add, edit, and delete rooms
 */
export default function RoomManagement({ rooms, floors, onDeleteRoom, onAddRoom }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    floorId: floors[0]?.id || '',
    capacity: 20,
    amenities: [],
    location: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.roomNumber.trim()) return;

    onAddRoom({
      ...formData,
      floorNumber: parseInt(
        floors.find((f) => f.id === formData.floorId)?.floorNumber || 1
      ),
      isActive: true
    });

    // Reset form
    setFormData({
      roomNumber: '',
      floorId: floors[0]?.id || '',
      capacity: 20,
      amenities: [],
      location: '',
      description: ''
    });
    setShowForm(false);
  };

  const amenityOptions = ['WiFi', 'AC', 'Projector', 'Whiteboard', 'Catering', 'Parking'];

  return (
    <div className="space-y-6">
      {/* Add Room Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded transition font-medium"
        >
          + Add New Room
        </button>
      )}

      {/* Add Room Form */}
      {showForm && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Add New Room</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Room Number *
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  placeholder="e.g., 101"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Floor *</label>
                <select
                  name="floorId"
                  value={formData.floorId}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  {floors.map((floor) => (
                    <option key={floor.id} value={floor.id}>
                      Floor {floor.floorNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Building A"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Description</label>
              <input
                type="text"
                name="description"
                placeholder="e.g., Conference Room"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-1 rounded transition text-sm ${
                      formData.amenities.includes(amenity)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition"
              >
                Add Room
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Rooms List */}
      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">Rooms ({rooms.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700 border-b border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Floor
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Amenities
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
              {rooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {room.roomNumber}
                  </td>
                  <td className="px-6 py-4 text-slate-300">Floor {room.floorNumber}</td>
                  <td className="px-6 py-4 text-slate-300">{room.capacity} people</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 2).map((a) => (
                        <span
                          key={a}
                          className="text-xs bg-slate-700 text-slate-200 px-2 py-1 rounded"
                        >
                          {a}
                        </span>
                      ))}
                      {room.amenities.length > 2 && (
                        <span className="text-xs text-slate-400">
                          +{room.amenities.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        room.isActive ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {room.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 transition">
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDeleteRoom(room.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rooms.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-slate-400">No rooms available</p>
          </div>
        )}
      </div>
    </div>
  );
}
