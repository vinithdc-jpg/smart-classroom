import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function GET(request) {
  try {
    const courses = db.courses.getAll();
    return NextResponse.json({ data: courses });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
