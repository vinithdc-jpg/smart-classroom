import { NextResponse } from 'next/server';
import { db } from '../../../../lib/mockDb';

export async function POST(request) {
  try {
    const { studentId, newPassword } = await request.json();

    if (!studentId || !newPassword) {
      return NextResponse.json({ error: 'Student ID and new password required' }, { status: 400 });
    }

    // In a real app, verify admin role here
    const success = db.auth.setStudentPassword(studentId, newPassword);
    
    if (success) {
      return NextResponse.json({ 
        message: 'Password set successfully'
      }, { status: 200 });
    }

    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
