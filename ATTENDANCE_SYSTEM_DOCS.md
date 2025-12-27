# 📚 Smart Campus - Attendance Management & Room Allocation System

A comprehensive full-stack web application for managing student attendance, classroom allocation, and administrative tasks in educational institutions.

## 🎯 System Overview

### Two Main Portals:
1. **Admin Dashboard** - For teachers/administrators
2. **Student Portal** - For students

---

## 👨‍💼 Admin Dashboard Features

### 1. **Mark Attendance**
Located in Admin Dashboard → "Mark Attendance" tab

**Process:**
1. Select **Course** (BCA, BSC, BA, BCOM)
2. Select **Year** (1st Year, 2nd Year, 3rd Year)
3. Select **Section** (Section A or B)
4. Select **Subject** being conducted
5. Select **Date** of the class
6. View student list for that specific class
7. Check ✓ students present, leave unchecked for absent
8. Click **Submit Attendance**

**Features:**
- Real-time student count (Present vs Total)
- Color-coded status badges (Present ✓ / Absent ✗)
- Prevents duplicate entries
- Bulk attendance recording
- Automatic percentage calculation

**Attendance Calculation:**
- Formula: `(Classes Present / Total Classes) × 100 = Percentage`
- Stored per student-subject-class combination
- Historical tracking of all attendance records

---

### 2. **Student Roll Number Management**
Located in Admin Dashboard → "Student Management" tab

**Process:**
1. Select **Course**, **Year**, and **Section**
2. Click **"+ Add Student"**
3. Fill in:
   - Student Name
   - Roll Number (e.g., BCA001)
   - Email
4. Click **"✓ Add Student"**
5. View and manage student list

**Features:**
- Create unique roll numbers per class
- Student email registration
- Delete students if needed
- View all students in a class
- Unique roll number validation (no duplicates allowed)

**Roll Number Format:**
- Example: `BCA001`, `BSC002`, `BA001`
- Format: `Course Code + Sequential Number`

---

### 3. **Additional Admin Features**
- Room Booking Management
- Floor Management
- Analytics Dashboard
- System Overview

---

## 👨‍🎓 Student Portal

### Student Login Page
**URL:** `/student/login`

**Login Process:**
1. Enter your **Roll Number** (e.g., `BCA001`)
2. Enter your **Password** (any password for demo)
3. Click **"🔐 Login"**

**Demo Credentials:**
- Roll No: `BCA001` | Password: Any value
- Roll No: `BSC001` | Password: Any value
- Roll No: `BCA002` | Password: Any value

---

### Student Dashboard Features
**URL:** `/student/dashboard` (After login)

#### 1. **Your Information Card**
Displays:
- Roll Number
- Full Name
- Course & Year
- Section

#### 2. **Overall Attendance Statistics**
Shows:
- **Attendance Percentage** (0-100%)
  - 🟢 ≥75% = Good
  - 🟡 60-74% = Fair
  - 🔴 <60% = Poor
- **Total Classes Attended**
- **Classes Present** (Green badge)
- **Classes Absent** (Red badge)
- **Status Indicator** (Good/Fair/Poor)

#### 3. **Attendance by Subject**
Grid view showing:
- Subject Name
- Attendance Percentage
- Total Classes
- Classes Present
- Classes Absent
- Progress Bar (color-coded)

#### 4. **Attendance History**
Detailed table showing:
- Date of Class
- Subject Name
- Present/Absent Status
- Sortable by date (newest first)

#### 5. **Logout**
Safely logout from student account

---

## 📊 Data Structure

### Models

#### Student Model
```
{
  id: string,
  name: string,
  rollNo: string (unique),
  email: string,
  courseId: string,
  year: number (1-3),
  sectionId: string
}
```

#### Course Model
```
{
  id: string,
  name: string (BCA, BSC, BA, BCOM),
  fullName: string
}
```

#### Attendance Model
```
{
  id: string,
  studentId: string,
  classId: string,
  subjectId: string,
  date: Date,
  isPresent: boolean,
  recordedBy: string (admin),
  recordedAt: Date
}
```

#### Class Model
```
{
  id: string,
  name: string,
  courseId: string,
  year: number,
  sectionId: string
}
```

---

## 🔧 API Endpoints

### Attendance Endpoints
- `GET /api/attendance?action=getByStudent&studentId=xxx`
- `GET /api/attendance?action=getByClass&classId=xxx`
- `POST /api/attendance` - Create/bulk create attendance records

### Student Endpoints
- `GET /api/students`
- `GET /api/students?action=getByRollNo&rollNo=xxx`
- `POST /api/students` - Create student
- `PUT /api/students` - Update student
- `DELETE /api/students` - Delete student

### Class Endpoints
- `GET /api/classes`
- `POST /api/classes` - Create class

### Course/Year/Section Endpoints
- `GET /api/courses`
- `GET /api/years`
- `GET /api/sections`
- `GET /api/subjects`

---

## 🚀 Getting Started

### Installation
```bash
npm install
npm run dev
```

### Access Points
- **Home:** `http://localhost:3000`
- **Admin Dashboard:** `http://localhost:3000/admin`
- **Student Login:** `http://localhost:3000/student/login`

---

## 📋 Workflow Example

### Scenario: Mark Attendance for BCA 1st Year Section A

1. **Admin Access:** Go to `/admin`
2. **Select Tab:** Click "Mark Attendance"
3. **Select Details:**
   - Course: BCA
   - Year: 1st Year
   - Section: Section A
   - Subject: Data Structures
   - Date: Today
4. **View Students:** List shows all BCA 1st Year Section A students
   - BCA001 - Alice Johnson
   - BCA002 - Bob Lee
5. **Mark Attendance:** Check boxes for present students
6. **Submit:** Click "✓ Submit Attendance"

### Student Checks Attendance: 

1. **Student Access:** Go to `/student/login`
2. **Login:** 
   - Roll No: `BCA001`
   - Password: Any value
3. **View Dashboard:** See attendance details
   - Overall: 85% present
   - Data Structures: 4/5 classes (80%)
   - History: All dated records

---

## 🔐 Security Notes

### Current Implementation:
- Mock database (in-memory)
- Session storage for student login
- Basic roll number validation

### Production Recommendations:
- Implement proper authentication (JWT/OAuth)
- Use secure password hashing (bcrypt)
- Add role-based access control (RBAC)
- Use proper database (MongoDB/PostgreSQL)
- Implement audit logging
- Add data encryption

---

## 📱 Responsive Design

The system is fully responsive with:
- Mobile-first design
- Tablet optimization
- Desktop layouts
- Touch-friendly controls

---

## 🎨 Technology Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Mock database (In-memory)
- **State Management:** React Hooks
- **Styling:** Tailwind CSS

---

## 📝 Notes

- All data is stored in memory and will reset on page refresh
- For production, connect to a real database
- Attendance percentage is calculated dynamically
- Students are automatically grouped by class
- Subject-wise attendance tracking is automatic

---

## 🆘 Troubleshooting

### Issue: Can't find student during attendance marking
- **Solution:** Ensure student is added in "Student Management" tab first

### Issue: Roll number not found during login
- **Solution:** Use exact roll number (case-sensitive for display, case-insensitive internally)

### Issue: No attendance records showing
- **Solution:** Mark attendance from admin dashboard first before checking student portal

---

## 📞 Support

For issues or questions, contact the system administrator or development team.

---

**Last Updated:** December 27, 2025

**Version:** 1.0.0
