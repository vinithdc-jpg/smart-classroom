import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function GET(request) {
  try {
    const sections = db.sections.getAll();
    return NextResponse.json({ data: sections });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
