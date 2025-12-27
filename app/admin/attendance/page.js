import AttendancePanel from '../../../components/AttendancePanel';
import { db } from '../../../lib/mockDb';

export default function AdminAttendancePage() {
  const classes = db.classes.getAll();
  const subjects = db.subjects.getAll();
  const students = db.students.getAll();
  const currentUser = { id: '2', role: 'admin' };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold p-4">Attendance — Admin</h1>
      <AttendancePanel classes={classes} subjects={subjects} students={students} currentUser={currentUser} />
    </div>
  );
}
