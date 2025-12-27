import AttendancePanel from '../../../components/AttendancePanel';
import { db } from '../../../lib/mockDb';

export default function FacultyAttendancePage() {
  const classes = db.classes.getAll();
  const subjects = db.subjects.getAll();
  const students = db.students.getAll();
  const currentUser = { id: '1', role: 'faculty' };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold p-4">Attendance — Faculty</h1>
      <AttendancePanel classes={classes} subjects={subjects} students={students} currentUser={currentUser} />
    </div>
  );
}
