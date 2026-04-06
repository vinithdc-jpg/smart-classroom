import { db } from '@/lib/mockDb';

/**
 * POST /api/bookings/validate
 * Check if a time slot is available
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const { roomId, bookingDate, startTime, endTime } = body;

    // Validation
    if (!roomId || !bookingDate || !startTime || !endTime) {
      return Response.json(
        {
          success: false,
          error: 'Room ID, date, start time, and end time are required'
        },
        { status: 400 }
      );
    }

    // Check for conflicts
    const conflicts = db.bookings.checkConflict(roomId, bookingDate, startTime, endTime, { includeStatuses: ['confirmed', 'pending'] });

    // If unavailable, suggest next available slot of same duration (step 15 min)
    const toMinutes = (t) => {
      const [hh, mm] = String(t).split(':').map(Number);
      return hh * 60 + mm;
    };

    const toHHMM = (m) => {
      const hh = String(Math.floor(m / 60)).padStart(2, '0');
      const mm = String(m % 60).padStart(2, '0');
      return `${hh}:${mm}`;
    };

    const duration = toMinutes(endTime) - toMinutes(startTime);
    const ALLOWED_START = toMinutes(body.allowedStart || '07:00');
    const ALLOWED_END = toMinutes(body.allowedEnd || '22:00');

    let suggestion = null;
    if (conflicts.length > 0) {
      const step = 15; // minutes
      for (let candidate = toMinutes(startTime) + step; candidate + duration <= ALLOWED_END; candidate += step) {
        const candStart = toHHMM(candidate);
        const candEnd = toHHMM(candidate + duration);
        const cconf = db.bookings.checkConflict(roomId, bookingDate, candStart, candEnd, { includeStatuses: ['confirmed', 'pending'] });
        if (cconf.length === 0) {
          suggestion = { startTime: candStart, endTime: candEnd };
          break;
        }
      }
    }

    return Response.json({
      success: true,
      data: {
        isAvailable: conflicts.length === 0,
        message: conflicts.length === 0 ? 'Time slot is available' : `${conflicts.length} conflict(s) found`,
        conflicts,
        suggestion
      }
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
