import { NextResponse } from 'next/server';
import { db } from '../../../../lib/mockDb';

export async function POST(request) {
  try {
    const { rollNo, password } = await request.json();

    if (!rollNo || !password) {
      return NextResponse.json({ error: 'Roll Number and Password required' }, { status: 400 });
    }

    const result = db.auth.loginStudent(rollNo, password);
    if (result) {
      const response = NextResponse.json({ 
        student: result.student,
        message: 'Login successful'
      }, { status: 200 });
      
      // Set session cookie
      response.cookies.set('sessionId', result.sessionId, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60
      });
      
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
