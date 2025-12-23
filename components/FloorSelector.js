'use client';

import React, { useState } from 'react';
import StatusBadge from './StatusBadge';

/**
 * FloorSelector Component
 * Allows users to select which floor to view
 */
export default function FloorSelector({ floors, selectedFloor, onFloorChange }) {
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-4 py-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Select Floor</h2>
        <div className="flex flex-wrap gap-2">
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => onFloorChange(floor.id)}
              disabled={!floor.isActive}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFloor === floor.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : floor.isActive
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {floor.emoji || '🏢'} Floor {floor.floorNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
