'use client';

import React from 'react';

/**
 * StatusBadge Component
 * Displays room status with appropriate color
 */
export default function StatusBadge({ status }) {
  const statusConfig = {
    free: {
      bg: 'bg-green-500',
      text: 'text-white',
      label: 'Free',
      emoji: '🟢'
    },
    occupied: {
      bg: 'bg-red-500',
      text: 'text-white',
      label: 'Occupied',
      emoji: '🔴'
    },
    reserved: {
      bg: 'bg-yellow-500',
      text: 'text-white',
      label: 'Reserved',
      emoji: '🟡'
    },
    disabled: {
      bg: 'bg-gray-500',
      text: 'text-white',
      label: 'Unavailable',
      emoji: '⚫'
    }
  };

  const config = statusConfig[status] || statusConfig.free;

  return (
    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
}
