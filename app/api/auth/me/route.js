import { NextResponse } from 'next/server';
import { db } from '../../../../lib/mockDb';

export async function POST(request) {
  try {
    const { sessionId } = await request.cookies.getAll().reduce((acc, c) => ({ ...acc, [c.name]: c.value }), {});
    
    if (!sessionId) {
      return NextResponse.json({ student: null }, { status: 200 });
    }

    const student = db.auth.getSessionStudent(sessionId);
    return NextResponse.json({ student }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ student: null }, { status: 200 });
  }
}

export async function GET(request) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value;
    
    if (!sessionId) {
      return NextResponse.json({ student: null }, { status: 200 });
    }

    const student = db.auth.getSessionStudent(sessionId);
    return NextResponse.json({ student }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ student: null }, { status: 200 });
  }
}
