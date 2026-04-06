import { db } from '@/lib/mockDb';

/**
 * GET /api/bookings
 * Get all bookings or bookings for current user
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const roomId = searchParams.get('roomId');
    const date = searchParams.get('date');

    let bookings = db.bookings.getAll();

    if (userId) {
      bookings = bookings.filter((b) => b.userId === userId);
    }

    if (roomId) {
      bookings = bookings.filter((b) => b.roomId === roomId);
    }

    if (date) {
      const filterDate = new Date(date).toDateString();
      bookings = bookings.filter(
        (b) => new Date(b.bookingDate).toDateString() === filterDate
      );
    }

    return Response.json({
      success: true,
      data: bookings,
      count: bookings.length
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Create a new booking
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validation
    if (!body.roomId || !body.bookingDate || !body.startTime || !body.endTime || !body.userId) {
      return Response.json({ success: false, error: 'Room ID, date, start time, end time, and userId are required' }, { status: 400 });
    }

    // Basic time validation
    const toMinutes = (t) => {
      const [hh, mm] = String(t).split(':').map(Number);
      if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
      return hh * 60 + mm;
    };

    const s = toMinutes(body.startTime);
    const e = toMinutes(body.endTime);

    if (s === null || e === null || e <= s) {
      return Response.json({ success: false, error: 'Invalid time range: end time must be after start time' }, { status: 400 });
    }

    // Allowed booking window (configurable)
    const ALLOWED_START = toMinutes(body.allowedStart || '07:00');
    const ALLOWED_END = toMinutes(body.allowedEnd || '22:00');

    if (s < ALLOWED_START || e > ALLOWED_END) {
      return Response.json({ success: false, error: `Bookings allowed between ${body.allowedStart || '07:00'} and ${body.allowedEnd || '22:00'}` }, { status: 400 });
    }

    // Check for conflicts with confirmed/pending bookings
    const conflicts = db.bookings.checkConflict(body.roomId, body.bookingDate, body.startTime, body.endTime, { includeStatuses: ['confirmed', 'pending'] });

    if (conflicts.length > 0) {
      return Response.json({ success: false, error: 'Time slot conflicts with existing bookings', conflicts }, { status: 409 });
    }

    // For demo: if requester indicates admin or forceConfirm, auto-confirm; otherwise create as pending
    const isAdmin = body.requesterRole === 'admin' || body.forceConfirm === true;

    const newBooking = db.bookings.create({
      roomId: body.roomId,
      userId: body.userId,
      bookingDate: new Date(body.bookingDate),
      startTime: body.startTime,
      endTime: body.endTime,
      purpose: body.purpose || '',
      participantCount: body.participantCount || 1,
      notes: body.notes || '',
      status: isAdmin ? 'confirmed' : 'pending'
    });

    return Response.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
