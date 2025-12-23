import { db } from '@/lib/mockDb';

/**
 * GET /api/rooms/[id]
 * Get a specific room by ID
 */
export async function GET(request, { params }) {
  try {
    const room = db.rooms.getById(params.id);

    if (!room) {
      return Response.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: room });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/rooms/[id]
 * Update a room (Admin only)
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const room = db.rooms.getById(params.id);

    if (!room) {
      return Response.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    const updatedRoom = db.rooms.update(params.id, {
      ...room,
      ...body,
      updatedAt: new Date()
    });

    return Response.json({ success: true, data: updatedRoom });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/rooms/[id]
 * Delete a room (Admin only)
 */
export async function DELETE(request, { params }) {
  try {
    const room = db.rooms.getById(params.id);

    if (!room) {
      return Response.json(
        { success: false, error: 'Room not found' },
        { status: 404 }
      );
    }

    db.rooms.delete(params.id);

    return Response.json({ success: true, message: 'Room deleted' });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
