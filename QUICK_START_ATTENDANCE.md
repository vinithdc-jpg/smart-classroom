# 🚀 Quick Start Guide - Attendance Management System

## ⚡ 5-Minute Setup

### Step 1: Start the Application
```bash
npm run dev
```
App will be available at `http://localhost:3000`

---

## 👨‍💼 ADMIN WORKFLOW

### First Time Setup: Create Students

1. **Go to Admin Dashboard**
   - URL: `http://localhost:3000/admin`
   - Click "Student Management" tab

2. **Add Students to a Class**
   - Select Course: **BCA**
   - Select Year: **1st Year**
   - Select Section: **Section A**
   - Click **"+ Add Student"**

3. **Fill Student Details**
   ```
   Name: Alice Johnson
   Roll No: BCA001
   Email: alice@student.com
   ```
   - Click **"✓ Add Student"**

4. **Repeat for More Students**
   - BCA002 - Bob Lee
   - BCA003 - Carlos Ruiz
   - BCA004 - Diana Prince

---

### Mark Attendance

1. **Go to Admin Dashboard → Mark Attendance Tab**

2. **Select Class Details**
   - Course: **BCA**
   - Year: **1st Year**
   - Section: **Section A**
   - Subject: **Data Structures**
   - Date: **Today**

3. **Check Present Students**
   - ✓ Alice Johnson
   - ✓ Bob Lee
   - ☐ Carlos Ruiz (Absent)
   - ✓ Diana Prince

4. **Submit Attendance**
   - Click **"✓ Submit Attendance"**
   - See success message

---

## 👨‍🎓 STUDENT WORKFLOW

### Login to Student Portal

1. **Go to Student Login**
   - URL: `http://localhost:3000/student/login`

2. **Enter Credentials**
   - Roll No: **BCA001**
   - Password: **anything**
   - Click **"🔐 Login"**

3. **View Dashboard**
   - See attendance percentage
   - View history
   - Check by subject

---

## 📊 Example: Complete Workflow

### Day 1: Setup Students

**Admin Dashboard → Student Management**

| Course | Year | Section | Students Created |
|--------|------|---------|------------------|
| BCA | 1st | A | 4 students |
| BCA | 1st | B | 4 students |

---

### Day 2: Mark First Attendance

**Admin Dashboard → Mark Attendance**

1. Select: BCA → 1st Year → Section A → Data Structures → Date
2. Mark: 3 Present, 1 Absent
3. Submit

**Results:**
- Alice (BCA001): 1/1 = 100%
- Bob (BCA002): 1/1 = 100%
- Carlos (BCA003): 0/1 = 0% (Absent)
- Diana (BCA004): 1/1 = 100%

---

### Day 3: Second Class

**Admin Dashboard → Mark Attendance**

1. Same class (BCA → 1st Year → Section A)
2. Different subject: Web Development
3. Mark: All 4 present

**Updated Results:**
- Alice (BCA001): 2/2 = 100%
- Bob (BCA002): 2/2 = 100%
- Carlos (BCA003): 1/2 = 50%
- Diana (BCA004): 2/2 = 100%

---

### Day 3: Student Checks Portal

**Student Portal → `/student/login`**

1. Login as BCA001 (Alice)
2. View Dashboard
   - **Overall: 100%** ✓ Good
   - **Classes: 2 Total**
   - **Present: 2 | Absent: 0**

3. View by Subject:
   - Data Structures: 1/1 (100%)
   - Web Development: 1/1 (100%)

---

## 🎓 Demo Roll Numbers to Use

```
BCA001 - Alice Johnson
BCA002 - Bob Lee
BCA003 - Carlos Ruiz
BCA004 - Diana Prince
BCA005 - Grace Lee
BCA006 - Henry Davis

BSC001 - Ethan Hunt
BSC002 - Fiona Apple
```

All use password: (any value)

---

## 📱 Quick Navigation

### Admin Links:
- Dashboard: `/admin`
- Mark Attendance: `/admin` → "✓ Mark Attendance" tab
- Manage Students: `/admin` → "👥 Student Management" tab

### Student Links:
- Login: `/student/login`
- Dashboard: `/student/dashboard` (after login)

### Home:
- Home Page: `/`

---

## ⚙️ Course & Year Selection

### Courses:
- BCA (Bachelor of Computer Applications)
- BSC (Bachelor of Science)
- BA (Bachelor of Arts)
- BCOM (Bachelor of Commerce)

### Years:
- 1st Year
- 2nd Year
- 3rd Year

### Sections:
- Section A
- Section B

### Subjects (Auto-loaded based on Course & Year):
- Data Structures (BCA Year 1)
- Web Development (BCA Year 1)
- Database Management (BCA Year 2)
- Physics (BSC Year 1)
- Chemistry (BSC Year 1)
- History (BA Year 1)
- Economics (BCOM Year 1)

---

## ✅ Features Checklist

- ✓ Two separate portals (Admin & Student)
- ✓ Course selection (BCA, BSC, BA, BCOM)
- ✓ Year selection (1st, 2nd, 3rd)
- ✓ Section selection (A, B)
- ✓ Subject selection
- ✓ Student list display
- ✓ Attendance marking (Present/Absent)
- ✓ Bulk attendance submission
- ✓ Percentage calculation (100% scale)
- ✓ Roll number management
- ✓ Student creation with unique roll numbers
- ✓ Student login via roll number
- ✓ Student attendance dashboard
- ✓ Subject-wise attendance
- ✓ Attendance history
- ✓ Responsive design
- ✓ API routes

---

## 🔍 Testing Checklist

### Test Attendance Marking:
- [ ] Select all dropdowns
- [ ] Student list loads correctly
- [ ] Check/uncheck attendance
- [ ] Submit works
- [ ] Success message shows

### Test Student Login:
- [ ] Login with valid roll number works
- [ ] Invalid roll number shows error
- [ ] Redirects to dashboard
- [ ] Session persists

### Test Dashboard:
- [ ] All attendance records show
- [ ] Percentage calculates correctly
- [ ] Subject breakdown works
- [ ] History table displays

---

## 💡 Tips

1. **Create multiple classes:** Add students to different courses/years/sections to test complex scenarios

2. **Mark multiple times:** Mark attendance for the same student multiple times to see percentage change

3. **Check calculations:** Verify attendance percentage = (Classes Present / Total Classes) × 100

4. **Test edge cases:** 
   - Student with 0 attendance
   - Student with 100% attendance
   - Same subject multiple dates

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Can't add student | Check all dropdowns are selected |
| Roll number already exists | Use unique roll number like BCA010 |
| No students showing | First add students to the class |
| Attendance not saving | Check all fields are filled |
| Can't login | Use exact roll number from student list |

---

**Ready to use!** 🎉

For detailed documentation, see `ATTENDANCE_SYSTEM_DOCS.md`
