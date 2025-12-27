import { NextResponse } from 'next/server';
import { db } from '@/lib/mockDb';

export async function GET(request) {
  try {
    const years = db.years.getAll();
    return NextResponse.json({ data: years });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
