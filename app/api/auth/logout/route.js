import { NextResponse } from 'next/server';
import { db } from '../../../../lib/mockDb';

export async function POST(request) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value;
    
    if (sessionId) {
      db.auth.logout(sessionId);
    }

    const response = NextResponse.json({ message: 'Logged out' }, { status: 200 });
    response.cookies.delete('sessionId');
    return response;
  } catch (err) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 400 });
  }
}
