import { NextResponse } from 'next/server';
import { createBooking, getAllBookings } from '@/lib/db';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.fullName.trim()) {
      return NextResponse.json({ error: 'Full Name is required' }, { status: 400 });
    }
    if (!body.whatsappNumber || !body.whatsappNumber.trim()) {
      return NextResponse.json({ error: 'WhatsApp Number is required' }, { status: 400 });
    }
    if (!body.service) {
      return NextResponse.json({ error: 'Service selection is required' }, { status: 400 });
    }
    if (!body.eventDate) {
      return NextResponse.json({ error: 'Event Date is required' }, { status: 400 });
    }

    const booking = createBooking({
      fullName: body.fullName.trim(),
      whatsappNumber: body.whatsappNumber.trim(),
      email: body.email ? body.email.trim() : '',
      service: body.service,
      eventDate: body.eventDate,
      preferredTime: body.preferredTime || '',
      eventLocation: body.eventLocation || '',
      city: body.city || '',
      state: body.state || '',
      numberOfPeople: body.numberOfPeople ? Number(body.numberOfPeople) : 1,
      designPreference: body.designPreference || '',
      bridalPackagePreference: body.bridalPackagePreference || '',
      artistsRequired: body.artistsRequired || '',
      travelRequirement: body.travelRequirement || '',
      additionalMessage: body.additionalMessage || '',
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to process booking request' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const isAdmin = await isAuthenticatedAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = getAllBookings();
    return NextResponse.json({ success: true, bookings });
  } catch (error: unknown) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
