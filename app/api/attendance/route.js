import { NextResponse } from 'next/server';
import { db } from '../../../lib/mockDb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'getByStudent': {
        const studentId = searchParams.get('studentId');
        const attendance = db.attendance.getByStudent(studentId);
        return NextResponse.json({ data: attendance });
      }

      case 'getByClass': {
        const classId = searchParams.get('classId');
        const attendance = db.attendance.getByClass(classId);
        return NextResponse.json({ data: attendance });
      }

      case 'getByFilter': {
        const classId = searchParams.get('classId');
        const subjectId = searchParams.get('subjectId');
        const date = searchParams.get('date');
        
        const attendance = db.attendance.getByFilter({
          classId,
          subjectId,
          date: date ? new Date(date) : null
        });
        return NextResponse.json({ data: attendance });
      }

      case 'calculatePercentage': {
        const studentId = searchParams.get('studentId');
        const classId = searchParams.get('classId');
        const percentage = db.attendance.calculatePercentage(studentId, classId);
        return NextResponse.json({ percentage });
      }

      default: {
        // Default: get all by filter
        const classId = searchParams.get('classId');
        const subjectId = searchParams.get('subjectId');
        const date = searchParams.get('date');

        const results = db.attendance.getByFilter({ classId, subjectId, date });
        return NextResponse.json({ data: results });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, studentId, classId, subjectId, date, isPresent, recordedBy, records } = body;

    switch (action) {
      case 'bulkCreate': {
        // Bulk create multiple attendance records
        const bulkRecords = records.map(record => ({
          studentId: record.studentId,
          classId: record.classId,
          subjectId: record.subjectId,
          date: new Date(record.date),
          isPresent: record.isPresent,
          recordedBy: record.recordedBy || 'admin'
        }));
        
        const created = db.attendance.bulkCreate(bulkRecords);
        return NextResponse.json({ data: created }, { status: 201 });
      }

      case 'create':
      default: {
        // Single attendance record
        if (!studentId || !classId || !subjectId || !date) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Prevent duplicate for same student/class/subject/date
        if (db.attendance.exists({ studentId, classId, subjectId, date })) {
          return NextResponse.json({ error: 'Attendance already recorded for this student on this date' }, { status: 409 });
        }

        const record = db.attendance.create({ 
          studentId, 
          classId, 
          subjectId, 
          date: new Date(date), 
          isPresent: isPresent !== undefined ? isPresent : true,
          recordedBy: recordedBy || 'admin'
        });

        return NextResponse.json({ data: record }, { status: 201 });
      }
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
