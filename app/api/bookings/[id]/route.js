import { db } from '@/lib/mockDb';

/**
 * GET /api/bookings/[id]
 * Get booking details
 */
export async function GET(request, { params }) {
  try {
    const booking = db.bookings.getById(params.id);

    if (!booking) {
      return Response.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: booking });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/bookings/[id]
 * Update a booking (Admin only)
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const booking = db.bookings.getById(params.id);

    if (!booking) {
      return Response.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Admin actions: approve / reject / override
    if (body.action === 'approve') {
      const result = db.bookings.approve(params.id, { override: !!body.override });
      if (!result) return Response.json({ success: false, error: 'Booking not found' }, { status: 404 });
      if (!result.success) {
        return Response.json({ success: false, error: 'Conflicts exist', conflicts: result.conflicts }, { status: 409 });
      }
      return Response.json({ success: true, data: result.booking });
    }

    if (body.action === 'reject') {
      const updated = db.bookings.update(params.id, { ...booking, status: 'cancelled' });
      return Response.json({ success: true, data: updated });
    }

    // default: update metadata
    const updatedBooking = db.bookings.update(params.id, {
      ...booking,
      ...body,
      updatedAt: new Date()
    });

    return Response.json({ success: true, data: updatedBooking });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bookings/[id]
 * Cancel a booking
 */
export async function DELETE(request, { params }) {
  try {
    const booking = db.bookings.getById(params.id);

    if (!booking) {
      return Response.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Mark as cancelled instead of deleting
    const cancelledBooking = db.bookings.update(params.id, {
      ...booking,
      status: 'cancelled',
      updatedAt: new Date()
    });

    return Response.json({
      success: true,
      message: 'Booking cancelled',
      data: cancelledBooking
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
