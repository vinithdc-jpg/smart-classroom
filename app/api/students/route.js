import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'getByRollNo': {
        const rollNo = searchParams.get('rollNo');
        const student = db.students.getByRollNo(rollNo);
        if (!student) {
          return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }
        return NextResponse.json({ data: student });
      }

      case 'getByClass': {
        const classId = searchParams.get('classId');
        const students = db.students.getByClass(classId);
        return NextResponse.json({ data: students });
      }

      default: {
        // Get all students
        const students = db.students.getAll();
        return NextResponse.json({ data: students });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, name, rollNo, email, courseId, year, sectionId } = body;

    switch (action) {
      case 'create': {
        // Check if roll number already exists
        if (db.students.getByRollNo(rollNo)) {
          return NextResponse.json({ error: 'Roll number already exists' }, { status: 400 });
        }

        const student = db.students.create({
          name,
          rollNo,
          email,
          courseId,
          year,
          sectionId
        });

        return NextResponse.json({ data: student }, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const student = db.students.update(id, updateData);
    return NextResponse.json({ data: student });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    const success = db.students.delete(id);
    if (!success) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
