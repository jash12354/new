import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'hasti-henna-admin-super-secret-key-2025';
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'HastiHenna@2025';

export interface AdminPayload {
  username: string;
  role: 'admin';
}

export function signAdminToken(): string {
  return jwt.sign({ username: ADMIN_USERNAME, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    if (decoded && decoded.role === 'admin') {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  return verifyAdminToken(token) !== null;
}
