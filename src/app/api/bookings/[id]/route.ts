import { NextResponse } from 'next/server';
import { updateBooking, deleteBooking } from '@/lib/db';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const success = updateBooking(id, {
      status: body.status,
      notes: body.notes,
    });

    if (!success) {
      return NextResponse.json({ error: 'Booking not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Booking updated' });
  } catch (error: unknown) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const success = deleteBooking(id);

    if (!success) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Booking deleted' });
  } catch (error: unknown) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
