import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  const authenticated = await isAuthenticatedAdmin();
  if (authenticated) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
