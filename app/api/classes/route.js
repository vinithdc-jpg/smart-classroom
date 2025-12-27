import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');
  const year = searchParams.get('year');
  const sectionId = searchParams.get('sectionId');

  try {
    if (courseId || year || sectionId) {
      const classes = db.classes.getByFilter({
        courseId,
        year: year ? parseInt(year) : null,
        sectionId
      });
      return NextResponse.json({ data: classes });
    } else {
      const classes = db.classes.getAll();
      return NextResponse.json({ data: classes });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, courseId, year, sectionId } = body;

    const classData = db.classes.create({
      name,
      courseId,
      year,
      sectionId
    });

    return NextResponse.json({ data: classData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
