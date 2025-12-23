/**
 * Data Models & Types for Smart Campus Room Allocation System
 * These are TypeScript-like interface definitions
 * Can be converted to Zod schemas for validation
 */

// ============== USER MODEL ==============
export const UserSchema = {
  _id: 'ObjectId',
  name: 'string',
  email: 'string',
  password: 'string (hashed)',
  role: 'enum: "user" | "admin"',
  department: 'string',
  phone: 'string',
  createdAt: 'Date',
  updatedAt: 'Date'
};

// ============== FLOOR MODEL ==============
export const FloorSchema = {
  _id: 'ObjectId',
  floorNumber: 'number', // 1, 2, 3, etc.
  name: 'string', // "First Floor", "Second Floor"
  totalRooms: 'number',
  isActive: 'boolean',
  description: 'string',
  createdAt: 'Date',
  updatedAt: 'Date'
};

// ============== ROOM MODEL ==============
export const RoomSchema = {
  _id: 'ObjectId',
  roomNumber: 'string', // "101", "102", "201", etc.
  floorId: 'ObjectId', // Reference to Floor
  floorNumber: 'number',
  capacity: 'number', // Seating capacity
  amenities: 'string[]', // ["WiFi", "AC", "Projector", "Whiteboard"]
  location: 'string', // "Building A", "Building B"
  isActive: 'boolean',
  description: 'string',
  image: 'string', // URL or base64
  createdAt: 'Date',
  updatedAt: 'Date'
};

// ============== BOOKING MODEL ==============
export const BookingSchema = {
  _id: 'ObjectId',
  userId: 'ObjectId', // Reference to User
  roomId: 'ObjectId', // Reference to Room
  bookingDate: 'Date', // Date without time (midnight UTC)
  startTime: 'string', // "09:00" (HH:mm format)
  endTime: 'string', // "11:00" (HH:mm format)
  status: 'enum: "pending" | "confirmed" | "cancelled" | "completed"',
  purpose: 'string', // "Team Meeting", "Exam", "Interview", etc.
  participantCount: 'number', // Expected attendees
  notes: 'string', // Additional notes
  createdAt: 'Date',
  updatedAt: 'Date'
};

// ============== STATUS ENUM ==============
export const RoomStatus = {
  FREE: 'free',      // 🟢 Green
  OCCUPIED: 'occupied', // 🔴 Red
  RESERVED: 'reserved', // 🟡 Yellow
  DISABLED: 'disabled'  // ⚫ Gray
};

// ============== BOOKING STATUS ==============
export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

// ============== UTILITY TYPES ==============
export const TimeSlot = {
  startTime: 'string', // "09:00"
  endTime: 'string'    // "11:00"
};

export const BookingConflict = {
  exists: 'boolean',
  conflictingBooking: 'Booking | null',
  message: 'string'
};

export const RoomWithStatus = {
  ...RoomSchema,
  status: 'enum: RoomStatus',
  upcomingBookings: 'Booking[]'
};

export const BookingRequest = {
  roomId: 'string',
  bookingDate: 'Date',
  startTime: 'string',
  endTime: 'string',
  purpose: 'string',
  participantCount: 'number',
  notes: 'string'
};

export const ValidationResponse = {
  isAvailable: 'boolean',
  message: 'string',
  conflicts: 'Booking[]'
};
