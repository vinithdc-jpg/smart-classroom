# 🏗️ System Architecture

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SMART CAMPUS SYSTEM                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐                    ┌──────────────┐       │
│  │ Admin Portal │                    │Student Portal│       │
│  │   (Web)      │                    │   (Web)      │       │
│  ├──────────────┤                    ├──────────────┤       │
│  │- Mark        │                    │- Login       │       │
│  │  Attendance  │                    │- View Status │       │
│  │- Manage      │                    │- Check %     │       │
│  │  Students    │                    │- History     │       │
│  └──────────────┘                    └──────────────┘       │
│         │                                    │               │
│         └────────────────┬───────────────────┘               │
│                          │                                   │
│                   ┌──────▼──────┐                            │
│                   │  API Server │                            │
│                   │ (Next.js)    │                            │
│                   └──────┬──────┘                            │
│                          │                                   │
│              ┌───────────┼───────────┐                       │
│              │           │           │                       │
│         ┌────▼───┐  ┌────▼───┐  ┌───▼────┐                 │
│         │Attendance├─┤Students├──┤Classes │                 │
│         │  APIs   │  │ APIs   │  │ APIs   │                 │
│         └────┬────┘  └────┬───┘  └───┬────┘                 │
│              │            │          │                       │
│              └────────────┼──────────┘                       │
│                           │                                   │
│                   ┌───────▼─────────┐                        │
│                   │  Mock Database  │                        │
│                   │  (In-Memory)    │                        │
│                   │                 │                        │
│                   │ - Courses       │                        │
│                   │ - Years         │                        │
│                   │ - Sections      │                        │
│                   │ - Students      │                        │
│                   │ - Subjects      │                        │
│                   │ - Classes       │                        │
│                   │ - Attendance    │                        │
│                   └─────────────────┘                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### Admin: Marking Attendance Flow

```
┌─────────────────┐
│ Admin Dashboard │
└────────┬────────┘
         │
         ▼
┌──────────────────────────────┐
│ Select Course/Year/Section   │
│ + Subject + Date             │
└────────────┬─────────────────┘
             │
             ▼
     ┌──────────────┐
     │ Load Classes │
     └────────┬─────┘
              │
              ▼
   ┌────────────────────┐
   │ Get Students by    │
   │ Course+Year+Sec    │
   └────────┬───────────┘
            │
            ▼
┌───────────────────────────────┐
│ Display Student List with     │
│ Checkboxes (Present/Absent)   │
└───────────┬─────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ Admin Marks Attendance        │
│ ✓ Present                     │
│ ☐ Absent                      │
└───────────┬─────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ Submit Attendance             │
│ (POST /api/attendance)        │
└───────────┬─────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ Store Records in Database     │
│ {studentId, classId, subject, │
│  date, isPresent, recordedBy} │
└───────────┬─────────────────┘
            │
            ▼
   ┌────────────────┐
   │ Success ✓      │
   └────────────────┘
```

---

### Student: Login & View Attendance Flow

```
┌─────────────────────┐
│ Student Login Page  │
└────────┬────────────┘
         │
         ▼
┌──────────────────────────┐
│ Enter Roll No + Password │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Validate Roll Number     │
│ (GET /api/students)      │
└────────┬─────────────────┘
         │
         ├─ Not Found: Show Error
         │
         └─ Found: Continue
              │
              ▼
   ┌──────────────────┐
   │ Store in Session │
   └────────┬─────────┘
            │
            ▼
┌────────────────────────┐
│ Redirect to Dashboard  │
└────────┬───────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Fetch Attendance Records     │
│ (GET /api/attendance)        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Calculate Statistics         │
│ - Total Classes              │
│ - Classes Present            │
│ - Overall %                  │
│ - By Subject %               │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Display Dashboard            │
│ - Card: Overall %            │
│ - Cards: By Subject          │
│ - Table: History             │
└──────────────────────────────┘
```

---

## 📋 Database Schema

### Collections/Tables

#### 1. Students Collection
```javascript
{
  _id: ObjectId,
  name: String,
  rollNo: String (unique),
  email: String,
  courseId: ObjectId,
  year: Number,
  sectionId: ObjectId,
  createdAt: Date
}
```

#### 2. Attendance Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  classId: ObjectId,
  subjectId: ObjectId,
  date: Date,
  isPresent: Boolean,
  recordedBy: String,
  recordedAt: Date
}
```

#### 3. Classes Collection
```javascript
{
  _id: ObjectId,
  name: String,
  courseId: ObjectId,
  year: Number,
  sectionId: ObjectId,
  createdAt: Date
}
```

#### 4. Courses Collection
```javascript
{
  _id: ObjectId,
  name: String,        // BCA, BSC, BA, BCOM
  fullName: String,
  isActive: Boolean
}
```

#### 5. Years Collection
```javascript
{
  _id: ObjectId,
  name: String,        // 1st Year, 2nd Year, 3rd Year
  number: Number,      // 1, 2, 3
  isActive: Boolean
}
```

#### 6. Sections Collection
```javascript
{
  _id: ObjectId,
  name: String,        // Section A, Section B
  isActive: Boolean
}
```

#### 7. Subjects Collection
```javascript
{
  _id: ObjectId,
  name: String,
  courseId: ObjectId,
  year: Number,
  isActive: Boolean
}
```

---

## 🔌 API Endpoints

### Attendance Endpoints
```
GET  /api/attendance                      - Get by filter
GET  /api/attendance?action=getByStudent  - Get student attendance
GET  /api/attendance?action=getByClass    - Get class attendance
GET  /api/attendance?action=calculatePercentage - Calculate %
POST /api/attendance                      - Create/Bulk create
```

### Student Endpoints
```
GET    /api/students                      - Get all students
GET    /api/students?action=getByRollNo   - Get by roll number
GET    /api/students?action=getByClass    - Get by class
POST   /api/students                      - Create student
PUT    /api/students                      - Update student
DELETE /api/students                      - Delete student
```

### Class Endpoints
```
GET  /api/classes                         - Get all classes
GET  /api/classes?courseId=xxx&year=1    - Get by filter
POST /api/classes                         - Create class
```

### Other Endpoints
```
GET /api/courses                          - Get all courses
GET /api/years                            - Get all years
GET /api/sections                         - Get all sections
GET /api/subjects                         - Get all subjects
GET /api/subjects?courseId=xxx&year=1    - Get by course/year
```

---

## 🧬 State Management

### Admin Component State
```javascript
const [courses, setCourses] = useState([]);
const [years, setYears] = useState([]);
const [sections, setSections] = useState([]);
const [subjects, setSubjects] = useState([]);
const [students, setStudents] = useState([]);
const [attendance, setAttendance] = useState({}); // {studentId: boolean}
const [selectedCourse, setSelectedCourse] = useState('');
const [selectedYear, setSelectedYear] = useState('');
const [selectedSection, setSelectedSection] = useState('');
const [selectedSubject, setSelectedSubject] = useState('');
const [selectedDate, setSelectedDate] = useState('');
```

### Student Dashboard State
```javascript
const [student, setStudent] = useState(null);
const [attendanceData, setAttendanceData] = useState([]);
const [overallPercentage, setOverallPercentage] = useState(0);
const [classInfo, setClassInfo] = useState(null);
const [loading, setLoading] = useState(true);
```

---

## 🔐 Authentication Flow

```
┌─────────────────────┐
│ Student Login Page  │
└────────┬────────────┘
         │
         ▼
┌───────────────────────┐
│ Input: Roll No + Pass │
└────────┬──────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Validate Roll No            │
│ (Query Database)            │
└────────┬────────────────────┘
         │
         ├─ Invalid: Return Error
         │
         └─ Valid: Continue
              │
              ▼
   ┌──────────────────────┐
   │ Store in Session     │
   │ sessionStorage       │
   │ .setItem(            │
   │ 'loggedInStudent',   │
   │ JSON.stringify(data))│
   └────────┬─────────────┘
            │
            ▼
┌────────────────────────────┐
│ Redirect to Dashboard      │
│ /student/dashboard         │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Check Session on Mount     │
│ if !session → Redirect     │
│           Login            │
└────────────────────────────┘
```

---

## 📊 Percentage Calculation Algorithm

```javascript
// Fetch all attendance records for student in class
const records = db.attendance.getByFilter({
  studentId: studentId,
  classId: classId
});

// Count total and present
total = records.length;
presentCount = records.filter(r => r.isPresent).length;

// Calculate percentage
if (total === 0) {
  percentage = 0;
} else {
  percentage = Math.round((presentCount / total) * 100);
}

// Status coding
if (percentage >= 75) {
  status = 'Good' (Green)
} else if (percentage >= 60) {
  status = 'Fair' (Yellow)
} else {
  status = 'Poor' (Red)
}
```

---

## 🔄 Component Hierarchy

```
App
├── Navbar
│   └── Navigation Links
├── Home Page
│   ├── Hero Section
│   ├── Feature Cards
│   └── Footer
├── Admin Page
│   ├── AdminSidebar
│   │   └── Tab Navigation
│   ├── AdminOverview
│   ├── BookingsTable
│   ├── RoomManagement
│   ├── AttendanceMarking
│   │   ├── CourseSelector
│   │   ├── YearSelector
│   │   ├── SectionSelector
│   │   ├── SubjectSelector
│   │   └── StudentAttendanceTable
│   └── StudentRollManagement
│       ├── CourseSelector
│       ├── YearSelector
│       ├── SectionSelector
│       ├── AddStudentForm
│       └── StudentListTable
├── Student Login Page
│   ├── RollNoInput
│   ├── PasswordInput
│   └── LoginButton
└── Student Dashboard
    ├── StudentInfoCard
    ├── OverallAttendanceCard
    │   └── CircleProgressBar
    ├── AttendanceBySubjectCards
    │   ├── ProgressBar
    │   └── Stats
    └── AttendanceHistoryTable
```

---

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                   Deployment Stack                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌────────────────────────────────────────────────┐    │
│  │ CDN (Vercel, Cloudflare)                      │    │
│  │ Static Assets, Images, CSS                    │    │
│  └────────────────┬─────────────────────────────┘    │
│                   │                                    │
│  ┌────────────────▼─────────────────────────────┐    │
│  │ Next.js Server (Vercel/AWS/DigitalOcean)    │    │
│  │ - API Routes                                 │    │
│  │ - Server-side Rendering                     │    │
│  │ - SSG Pages                                 │    │
│  └────────────────┬─────────────────────────────┘    │
│                   │                                    │
│  ┌────────────────▼─────────────────────────────┐    │
│  │ MongoDB/PostgreSQL Database                  │    │
│  │ Collections/Tables                          │    │
│  │ - Students                                  │    │
│  │ - Attendance                                │    │
│  │ - Classes                                   │    │
│  │ - Courses, Years, Sections, Subjects        │    │
│  └─────────────────────────────────────────────┘    │
│                                                           │
│  ┌─────────────────────────────────────────────┐     │
│  │ Redis Cache (Optional)                      │     │
│  │ Session Storage                             │     │
│  │ Rate Limiting                               │     │
│  └─────────────────────────────────────────────┘     │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📈 Scalability Considerations

1. **Database Indexing**
   - Index on studentId + classId
   - Index on rollNo
   - Index on date for queries

2. **Caching**
   - Cache student data
   - Cache class structures
   - Cache subject lists

3. **Pagination**
   - Implement for large attendance tables
   - Lazy load history records

4. **Load Balancing**
   - Horizontal scaling of Next.js servers
   - Multiple database replicas

---

## 🔒 Security Architecture

```
┌─────────────────────────────────────────────────────┐
│                 Security Layers                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│ 1. API Route Security                              │
│    └─ Input validation                             │
│    └─ Rate limiting                                │
│                                                      │
│ 2. Authentication                                   │
│    └─ JWT tokens (Production)                      │
│    └─ Session validation                           │
│                                                      │
│ 3. Authorization                                    │
│    └─ Role-based access (Admin/Student)            │
│    └─ Data ownership checks                        │
│                                                      │
│ 4. Data Protection                                  │
│    └─ HTTPS/TLS encryption                         │
│    └─ Sensitive field encryption                   │
│                                                      │
│ 5. Database Security                                │
│    └─ SQL injection prevention                     │
│    └─ Data validation                              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

**Architecture Diagram Last Updated:** December 27, 2025
