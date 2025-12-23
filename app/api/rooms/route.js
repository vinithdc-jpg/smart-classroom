import { db } from '@/lib/mockDb';

/**
 * GET /api/rooms
 * Get all rooms or rooms for a specific floor
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const floorId = searchParams.get('floorId');

    const rooms = floorId ? db.rooms.getByFloor(floorId) : db.rooms.getAll();

    return Response.json({
      success: true,
      data: rooms,
      count: rooms.length
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/rooms
 * Create a new room (Admin only)
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validation
    if (!body.roomNumber || !body.floorId) {
      return Response.json(
        { success: false, error: 'Room number and floor are required' },
        { status: 400 }
      );
    }

    const newRoom = db.rooms.create({
      ...body,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return Response.json(
      { success: true, data: newRoom },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
