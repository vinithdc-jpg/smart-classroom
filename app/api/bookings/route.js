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
    if (!body.roomId || !body.bookingDate || !body.startTime || !body.endTime) {
      return Response.json(
        {
          success: false,
          error: 'Room ID, date, start time, and end time are required'
        },
        { status: 400 }
      );
    }

    // Check for conflicts
    const conflicts = db.bookings.checkConflict(
      body.roomId,
      body.bookingDate,
      body.startTime,
      body.endTime
    );

    if (conflicts.length > 0) {
      return Response.json(
        {
          success: false,
          error: 'Time slot is already booked',
          conflicts
        },
        { status: 409 }
      );
    }

    const newBooking = db.bookings.create({
      ...body,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return Response.json(
      { success: true, data: newBooking },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
