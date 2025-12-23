/**
 * Mock Database - In-memory storage for demo
 * In production, replace with MongoDB
 */

// Mock Users
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    department: 'Engineering'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    department: 'Management'
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    department: 'HR'
  }
];

// Mock Floors
export const mockFloors = [
  {
    id: 'floor1',
    floorNumber: 1,
    name: 'First Floor',
    totalRooms: 6,
    isActive: true,
    description: 'Ground Level'
  },
  {
    id: 'floor2',
    floorNumber: 2,
    name: 'Second Floor',
    totalRooms: 6,
    isActive: true,
    description: 'First Level Up'
  },
  {
    id: 'floor3',
    floorNumber: 3,
    name: 'Third Floor',
    totalRooms: 5,
    isActive: true,
    description: 'Executive Level'
  }
];

// Mock Rooms
export const mockRooms = [
  // Floor 1
  {
    id: 'room101',
    roomNumber: '101',
    floorId: 'floor1',
    floorNumber: 1,
    capacity: 10,
    amenities: ['WiFi', 'AC'],
    location: 'Building A',
    isActive: true,
    description: 'Small Meeting Room'
  },
  {
    id: 'room102',
    roomNumber: '102',
    floorId: 'floor1',
    floorNumber: 1,
    capacity: 20,
    amenities: ['WiFi', 'AC', 'Projector'],
    location: 'Building A',
    isActive: true,
    description: 'Medium Conference Room'
  },
  {
    id: 'room103',
    roomNumber: '103',
    floorId: 'floor1',
    floorNumber: 1,
    capacity: 30,
    amenities: ['WiFi', 'AC', 'Projector', 'Whiteboard'],
    location: 'Building A',
    isActive: true,
    description: 'Large Training Room'
  },
  {
    id: 'room104',
    roomNumber: '104',
    floorId: 'floor1',
    floorNumber: 1,
    capacity: 15,
    amenities: ['WiFi', 'AC'],
    location: 'Building A',
    isActive: true,
    description: 'Interview Room'
  },
  {
    id: 'room105',
    roomNumber: '105',
    floorId: 'floor1',
    floorNumber: 1,
    capacity: 8,
    amenities: ['WiFi'],
    location: 'Building A',
    isActive: true,
    description: 'Focus Room'
  },
  {
    id: 'room106',
    roomNumber: '106',
    floorId: 'floor1',
    floorNumber: 1,
    capacity: 25,
    amenities: ['WiFi', 'AC', 'Projector', 'Catering'],
    location: 'Building A',
    isActive: true,
    description: 'Banquet Hall'
  },

  // Floor 2
  {
    id: 'room201',
    roomNumber: '201',
    floorId: 'floor2',
    floorNumber: 2,
    capacity: 12,
    amenities: ['WiFi', 'AC'],
    location: 'Building B',
    isActive: true,
    description: 'Brainstorm Room'
  },
  {
    id: 'room202',
    roomNumber: '202',
    floorId: 'floor2',
    floorNumber: 2,
    capacity: 18,
    amenities: ['WiFi', 'AC', 'Projector'],
    location: 'Building B',
    isActive: true,
    description: 'Team Office'
  },
  {
    id: 'room203',
    roomNumber: '203',
    floorId: 'floor2',
    floorNumber: 2,
    capacity: 6,
    amenities: ['WiFi'],
    location: 'Building B',
    isActive: true,
    description: 'Phone Booth'
  },
  {
    id: 'room204',
    roomNumber: '204',
    floorId: 'floor2',
    floorNumber: 2,
    capacity: 20,
    amenities: ['WiFi', 'AC', 'Projector', 'Whiteboard'],
    location: 'Building B',
    isActive: true,
    description: 'Training Room'
  },
  {
    id: 'room205',
    roomNumber: '205',
    floorId: 'floor2',
    floorNumber: 2,
    capacity: 14,
    amenities: ['WiFi', 'AC'],
    location: 'Building B',
    isActive: false,
    description: 'Under Renovation'
  },
  {
    id: 'room206',
    roomNumber: '206',
    floorId: 'floor2',
    floorNumber: 2,
    capacity: 28,
    amenities: ['WiFi', 'AC', 'Projector', 'Whiteboard', 'Catering'],
    location: 'Building B',
    isActive: true,
    description: 'Board Room'
  },

  // Floor 3
  {
    id: 'room301',
    roomNumber: '301',
    floorId: 'floor3',
    floorNumber: 3,
    capacity: 10,
    amenities: ['WiFi', 'AC'],
    location: 'Building C',
    isActive: true,
    description: 'Executive Meeting Room'
  },
  {
    id: 'room302',
    roomNumber: '302',
    floorId: 'floor3',
    floorNumber: 3,
    capacity: 8,
    amenities: ['WiFi', 'AC', 'Projector'],
    location: 'Building C',
    isActive: true,
    description: 'Director Office'
  },
  {
    id: 'room303',
    roomNumber: '303',
    floorId: 'floor3',
    floorNumber: 3,
    capacity: 16,
    amenities: ['WiFi', 'AC', 'Whiteboard'],
    location: 'Building C',
    isActive: true,
    description: 'Strategy Room'
  },
  {
    id: 'room304',
    roomNumber: '304',
    floorId: 'floor3',
    floorNumber: 3,
    capacity: 5,
    amenities: ['WiFi'],
    location: 'Building C',
    isActive: true,
    description: 'Quiet Zone'
  },
  {
    id: 'room305',
    roomNumber: '305',
    floorId: 'floor3',
    floorNumber: 3,
    capacity: 22,
    amenities: ['WiFi', 'AC', 'Projector', 'Catering'],
    location: 'Building C',
    isActive: true,
    description: 'VIP Lounge'
  }
];

// Mock Bookings
export const mockBookings = [
  {
    id: 'booking1',
    userId: '1',
    roomId: 'room101',
    bookingDate: new Date(2025, 11, 25), // Dec 25, 2025
    startTime: '09:00',
    endTime: '11:00',
    status: 'confirmed',
    purpose: 'Team Meeting',
    participantCount: 5,
    notes: 'Weekly standup'
  },
  {
    id: 'booking2',
    userId: '3',
    roomId: 'room102',
    bookingDate: new Date(2025, 11, 25),
    startTime: '10:00',
    endTime: '12:00',
    status: 'confirmed',
    purpose: 'Interview',
    participantCount: 3,
    notes: 'Candidate interview'
  },
  {
    id: 'booking3',
    userId: '1',
    roomId: 'room201',
    bookingDate: new Date(2025, 11, 26),
    startTime: '14:00',
    endTime: '15:30',
    status: 'confirmed',
    purpose: 'Training',
    participantCount: 8,
    notes: 'New software training'
  }
];

// Database operations (mock)
export const db = {
  users: {
    getAll: () => mockUsers,
    getById: (id) => mockUsers.find(u => u.id === id),
    create: (user) => ({ id: Date.now().toString(), ...user }),
    update: (id, user) => user,
    delete: (id) => true
  },

  floors: {
    getAll: () => mockFloors,
    getById: (id) => mockFloors.find(f => f.id === id),
    create: (floor) => ({ id: Date.now().toString(), ...floor }),
    update: (id, floor) => floor,
    delete: (id) => true
  },

  rooms: {
    getAll: () => mockRooms,
    getByFloor: (floorId) => mockRooms.filter(r => r.floorId === floorId),
    getById: (id) => mockRooms.find(r => r.id === id),
    create: (room) => ({ id: Date.now().toString(), ...room }),
    update: (id, room) => room,
    delete: (id) => true
  },

  bookings: {
    getAll: () => mockBookings,
    getById: (id) => mockBookings.find(b => b.id === id),
    getByRoom: (roomId, date) => {
      return mockBookings.filter(b =>
        b.roomId === roomId &&
        new Date(b.bookingDate).toDateString() === new Date(date).toDateString()
      );
    },
    getByUser: (userId) => mockBookings.filter(b => b.userId === userId),
    create: (booking) => ({
      id: Date.now().toString(),
      createdAt: new Date(),
      ...booking
    }),
    update: (id, booking) => booking,
    delete: (id) => true,
    checkConflict: (roomId, date, startTime, endTime) => {
      return mockBookings.filter(b =>
        b.roomId === roomId &&
        new Date(b.bookingDate).toDateString() === new Date(date).toDateString() &&
        b.status === 'confirmed' &&
        startTime < b.endTime &&
        endTime > b.startTime
      );
    }
  }
};
