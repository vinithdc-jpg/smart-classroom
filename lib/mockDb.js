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
export const mockBookings = [];

// Mock Courses
export const mockCourses = [
  { id: 'course1', name: 'BCA', fullName: 'Bachelor of Computer Applications' },
  { id: 'course2', name: 'BSC', fullName: 'Bachelor of Science' },
  { id: 'course3', name: 'BA', fullName: 'Bachelor of Arts' },
  { id: 'course4', name: 'BCOM', fullName: 'Bachelor of Commerce' }
];

// Mock Years
export const mockYears = [
  { id: 'year1', name: '1st Year', number: 1 },
  { id: 'year2', name: '2nd Year', number: 2 },
  { id: 'year3', name: '3rd Year', number: 3 }
];

// Mock Sections
export const mockSections = [
  { id: 'sec1', name: 'Section A' },
  { id: 'sec2', name: 'Section B' }
];

// Mock Subjects
export const mockSubjects = [
  { id: 'sub1', name: 'Data Structures', courseId: 'course1', year: 1 },
  { id: 'sub2', name: 'Web Development', courseId: 'course1', year: 1 },
  { id: 'sub3', name: 'Database Management', courseId: 'course1', year: 2 },
  { id: 'sub4', name: 'Physics', courseId: 'course2', year: 1 },
  { id: 'sub5', name: 'Chemistry', courseId: 'course2', year: 1 },
  { id: 'sub6', name: 'History', courseId: 'course3', year: 1 },
  { id: 'sub7', name: 'Economics', courseId: 'course4', year: 1 }
];

// Mock Students
export const mockStudents = [
  { id: 's1', name: 'Alice Johnson', rollNo: 'BCA001', courseId: 'course1', year: 1, sectionId: 'sec1', email: 'alice@student.com', password: 'password123' },
  { id: 's2', name: 'Bob Lee', rollNo: 'BCA002', courseId: 'course1', year: 1, sectionId: 'sec1', email: 'bob@student.com', password: 'password123' },
  { id: 's3', name: 'Carlos Ruiz', rollNo: 'BCA003', courseId: 'course1', year: 1, sectionId: 'sec2', email: 'carlos@student.com', password: 'password123' },
  { id: 's4', name: 'Diana Prince', rollNo: 'BCA004', courseId: 'course1', year: 1, sectionId: 'sec2', email: 'diana@student.com', password: 'password123' },
  { id: 's5', name: 'Ethan Hunt', rollNo: 'BSC001', courseId: 'course2', year: 1, sectionId: 'sec1', email: 'ethan@student.com', password: 'password123' },
  { id: 's6', name: 'Fiona Apple', rollNo: 'BSC002', courseId: 'course2', year: 1, sectionId: 'sec2', email: 'fiona@student.com', password: 'password123' },
  { id: 's7', name: 'Grace Lee', rollNo: 'BCA005', courseId: 'course1', year: 2, sectionId: 'sec1', email: 'grace@student.com', password: 'password123' },
  { id: 's8', name: 'Henry Davis', rollNo: 'BCA006', courseId: 'course1', year: 2, sectionId: 'sec2', email: 'henry@student.com', password: 'password123' }
];

// Mock Classes (Course + Year + Section combinations)
export const mockClasses = [
  { id: 'class1', name: 'BCA 1st Year Section A', courseId: 'course1', year: 1, sectionId: 'sec1' },
  { id: 'class2', name: 'BCA 1st Year Section B', courseId: 'course1', year: 1, sectionId: 'sec2' },
  { id: 'class3', name: 'BCA 2nd Year Section A', courseId: 'course1', year: 2, sectionId: 'sec1' },
  { id: 'class4', name: 'BCA 2nd Year Section B', courseId: 'course1', year: 2, sectionId: 'sec2' },
  { id: 'class5', name: 'BSC 1st Year Section A', courseId: 'course2', year: 1, sectionId: 'sec1' },
  { id: 'class6', name: 'BSC 1st Year Section B', courseId: 'course2', year: 1, sectionId: 'sec2' }
];

// Mock Attendance
export const mockAttendance = [
  // { id, studentId, classId, subjectId, date, isPresent, recordedBy, recordedAt }
];

// Mock Sessions (simple in-memory session store)
export const mockSessions = [];

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
    create: (booking) => {
      const id = Date.now().toString();
      const record = {
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: booking.status || 'pending',
        ...booking
      };
      mockBookings.push(record);
      return record;
    },
    update: (id, booking) => {
      const idx = mockBookings.findIndex(b => b.id === id);
      if (idx === -1) return null;
      mockBookings[idx] = { ...mockBookings[idx], ...booking, updatedAt: new Date() };
      return mockBookings[idx];
    },
    delete: (id) => true,
    // Improved conflict detection using minutes comparison
    checkConflict: (roomId, date, startTime, endTime, { includeStatuses = ['confirmed'] } = {}) => {
      const toMinutes = (t) => {
        if (typeof t === 'number') return t;
        const [hh, mm] = String(t).split(':').map(Number);
        return hh * 60 + mm;
      };

      const s = toMinutes(startTime);
      const e = toMinutes(endTime);

      return mockBookings.filter(b => {
        if (b.roomId !== roomId) return false;
        if (new Date(b.bookingDate).toDateString() !== new Date(date).toDateString()) return false;
        if (!includeStatuses.includes(b.status)) return false;
        const bs = toMinutes(b.startTime);
        const be = toMinutes(b.endTime);
        return s < be && e > bs; // overlap
      });
    },

    // Admin helper: approve booking (optionally override conflicts)
    approve: (id, { override = false } = {}) => {
      const booking = mockBookings.find(b => b.id === id);
      if (!booking) return null;
      // Find conflicting confirmed bookings
      const conflicts = mockBookings.filter(b =>
        b.roomId === booking.roomId &&
        new Date(b.bookingDate).toDateString() === new Date(booking.bookingDate).toDateString() &&
        b.id !== booking.id &&
        b.status === 'confirmed' &&
        (function() {
          const toM = t => { const [hh, mm] = t.split(':').map(Number); return hh*60+mm; };
          return toM(booking.startTime) < toM(b.endTime) && toM(booking.endTime) > toM(b.startTime);
        })()
      );

      if (conflicts.length > 0 && !override) {
        return { success: false, conflicts };
      }

      // If override, cancel conflicting bookings
      if (override && conflicts.length > 0) {
        conflicts.forEach(c => {
          c.status = 'cancelled';
          c.updatedAt = new Date();
        });
      }

      booking.status = 'confirmed';
      booking.updatedAt = new Date();
      return { success: true, booking };
    },

    // Utility to mark expired bookings based on current time
    expirePastBookings: (now = new Date()) => {
      mockBookings.forEach(b => {
        const bookingDate = new Date(b.bookingDate);
        if (new Date(bookingDate.toDateString()) < new Date(now.toDateString())) {
          // past date
          if (b.status === 'confirmed' || b.status === 'pending') b.status = 'expired';
        } else if (new Date(bookingDate.toDateString()).toDateString() === new Date(now.toDateString())) {
          const toM = t => { const [hh, mm] = t.split(':').map(Number); return hh*60+mm; };
          const endM = toM(b.endTime);
          const nowM = now.getHours()*60 + now.getMinutes();
          if (nowM >= endM && (b.status === 'confirmed' || b.status === 'pending')) {
            b.status = 'completed';
          }
        }
      });
    }
    },

  attendance: {
    getAll: () => mockAttendance,
    getByStudent: (studentId) => mockAttendance.filter(a => a.studentId === studentId),
    getByClass: (classId) => mockAttendance.filter(a => a.classId === classId),
    getByFilter: ({ classId, subjectId, date }) => {
      return mockAttendance.filter(a => {
        if (classId && a.classId !== classId) return false;
        if (subjectId && a.subjectId !== subjectId) return false;
        if (date && new Date(a.date).toDateString() !== new Date(date).toDateString()) return false;
        return true;
      });
    },
    create: (entry) => {
      const id = Date.now().toString();
      const record = { id, ...entry, recordedAt: new Date() };
      mockAttendance.push(record);
      return record;
    },
    bulkCreate: (entries) => {
      const records = entries.map(entry => ({
        id: Date.now().toString() + Math.random(),
        ...entry,
        recordedAt: new Date()
      }));
      mockAttendance.push(...records);
      return records;
    },
    exists: ({ studentId, classId, subjectId, date }) => {
      return mockAttendance.some(a =>
        a.studentId === studentId &&
        a.classId === classId &&
        a.subjectId === subjectId &&
        new Date(a.date).toDateString() === new Date(date).toDateString()
      );
    },
    calculatePercentage: (studentId, classId) => {
      const records = mockAttendance.filter(a => 
        a.studentId === studentId && a.classId === classId
      );
      if (records.length === 0) return 0;
      const presentCount = records.filter(a => a.isPresent).length;
      return Math.round((presentCount / records.length) * 100);
    }
  },

  courses: {
    getAll: () => mockCourses,
    getById: (id) => mockCourses.find(c => c.id === id)
  },

  years: {
    getAll: () => mockYears,
    getById: (id) => mockYears.find(y => y.id === id)
  },

  sections: {
    getAll: () => mockSections,
    getById: (id) => mockSections.find(s => s.id === id)
  },

  subjects: {
    getAll: () => mockSubjects,
    getByCourseAndYear: (courseId, year) => mockSubjects.filter(s => s.courseId === courseId && s.year === year),
    getById: (id) => mockSubjects.find(s => s.id === id)
  },

  students: {
    getAll: () => mockStudents,
    getByClass: (classId) => {
      const classData = mockClasses.find(c => c.id === classId);
      if (!classData) return [];
      return mockStudents.filter(s => 
        s.courseId === classData.courseId && 
        s.year === classData.year && 
        s.sectionId === classData.sectionId
      );
    },
    getById: (id) => mockStudents.find(s => s.id === id),
    getByRollNo: (rollNo) => mockStudents.find(s => s.rollNo === rollNo),
    create: (student) => {
      const id = `s${Date.now()}`;
      const newStudent = { id, ...student };
      mockStudents.push(newStudent);
      return newStudent;
    },
    update: (id, student) => {
      const index = mockStudents.findIndex(s => s.id === id);
      if (index !== -1) {
        mockStudents[index] = { ...mockStudents[index], ...student };
        return mockStudents[index];
      }
      return null;
    },
    delete: (id) => {
      const index = mockStudents.findIndex(s => s.id === id);
      if (index !== -1) {
        mockStudents.splice(index, 1);
        return true;
      }
      return false;
    }
  },

  classes: {
    getAll: () => mockClasses,
    getById: (id) => mockClasses.find(c => c.id === id),
    getByFilter: ({ courseId, year, sectionId }) => {
      return mockClasses.filter(c => {
        if (courseId && c.courseId !== courseId) return false;
        if (year && c.year !== year) return false;
        if (sectionId && c.sectionId !== sectionId) return false;
        return true;
      });
    },
    create: (classData) => {
      const id = `class${Date.now()}`;
      const newClass = { id, ...classData };
      mockClasses.push(newClass);
      return newClass;
    }
  },

  auth: {
    loginStudent: (rollNo, password) => {
      const student = mockStudents.find(s => s.rollNo === rollNo && s.password === password);
      if (student) {
        const sessionId = Math.random().toString(36).substring(7);
        mockSessions.push({
          sessionId,
          studentId: student.id,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
        return { student: { id: student.id, name: student.name, rollNo: student.rollNo, email: student.email }, sessionId };
      }
      return null;
    },
    getSessionStudent: (sessionId) => {
      const session = mockSessions.find(s => s.sessionId === sessionId && s.expiresAt > new Date());
      if (session) {
        const student = mockStudents.find(s => s.id === session.studentId);
        return student ? { id: student.id, name: student.name, rollNo: student.rollNo, email: student.email } : null;
      }
      return null;
    },
    setStudentPassword: (studentId, newPassword) => {
      const student = mockStudents.find(s => s.id === studentId);
      if (student) {
        student.password = newPassword;
        return true;
      }
      return false;
    },
    logout: (sessionId) => {
      const index = mockSessions.findIndex(s => s.sessionId === sessionId);
      if (index !== -1) {
        mockSessions.splice(index, 1);
        return true;
      }
      return false;
    }
  }
};
