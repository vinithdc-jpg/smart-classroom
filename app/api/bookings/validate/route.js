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
    const conflicts = db.bookings.checkConflict(roomId, bookingDate, startTime, endTime);

    return Response.json({
      success: true,
      data: {
        isAvailable: conflicts.length === 0,
        message:
          conflicts.length === 0
            ? 'Time slot is available'
            : `${conflicts.length} conflict(s) found`,
        conflicts
      }
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
