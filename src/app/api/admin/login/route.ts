import { NextResponse } from 'next/server';
import { ADMIN_USERNAME, ADMIN_PASSWORD, signAdminToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = signAdminToken();
      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });

      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
