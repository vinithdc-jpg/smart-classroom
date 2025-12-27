import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');
  const year = searchParams.get('year');

  try {
    if (courseId && year) {
      const subjects = db.subjects.getByCourseAndYear(courseId, parseInt(year));
      return NextResponse.json({ data: subjects });
    } else {
      const subjects = db.subjects.getAll();
      return NextResponse.json({ data: subjects });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
