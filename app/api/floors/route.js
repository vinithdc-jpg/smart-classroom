import { db } from '@/lib/mockDb';

/**
 * GET /api/floors
 * Get all floors
 */
export async function GET(request) {
  try {
    const floors = db.floors.getAll();

    return Response.json({
      success: true,
      data: floors,
      count: floors.length
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/floors
 * Create a new floor (Admin only)
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validation
    if (body.floorNumber === undefined) {
      return Response.json(
        { success: false, error: 'Floor number is required' },
        { status: 400 }
      );
    }

    const newFloor = db.floors.create({
      ...body,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return Response.json(
      { success: true, data: newFloor },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
