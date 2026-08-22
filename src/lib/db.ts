import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'hasti_henna_bookings.db');
const db = new Database(dbPath);

// Initialize table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    fullName TEXT NOT NULL,
    whatsappNumber TEXT NOT NULL,
    email TEXT,
    service TEXT NOT NULL,
    eventDate TEXT NOT NULL,
    preferredTime TEXT,
    eventLocation TEXT,
    city TEXT,
    state TEXT,
    numberOfPeople INTEGER,
    designPreference TEXT,
    bridalPackagePreference TEXT,
    artistsRequired TEXT,
    travelRequirement TEXT,
    additionalMessage TEXT,
    status TEXT DEFAULT 'New',
    notes TEXT DEFAULT '',
    createdAt TEXT NOT NULL
  )
`);

export interface BookingRecord {
  id: string;
  fullName: string;
  whatsappNumber: string;
  email?: string;
  service: string;
  eventDate: string;
  preferredTime?: string;
  eventLocation?: string;
  city?: string;
  state?: string;
  numberOfPeople?: number;
  designPreference?: string;
  bridalPackagePreference?: string;
  artistsRequired?: string;
  travelRequirement?: string;
  additionalMessage?: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes: string;
  createdAt: string;
}

export function createBooking(data: Omit<BookingRecord, 'id' | 'status' | 'notes' | 'createdAt'>): BookingRecord {
  const id = 'BK-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  const createdAt = new Date().toISOString();
  const status = 'New';
  const notes = '';

  const stmt = db.prepare(`
    INSERT INTO bookings (
      id, fullName, whatsappNumber, email, service, eventDate, preferredTime,
      eventLocation, city, state, numberOfPeople, designPreference,
      bridalPackagePreference, artistsRequired, travelRequirement,
      additionalMessage, status, notes, createdAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?
    )
  `);

  stmt.run(
    id,
    data.fullName,
    data.whatsappNumber,
    data.email || '',
    data.service,
    data.eventDate,
    data.preferredTime || '',
    data.eventLocation || '',
    data.city || '',
    data.state || '',
    data.numberOfPeople || 1,
    data.designPreference || '',
    data.bridalPackagePreference || '',
    data.artistsRequired || '',
    data.travelRequirement || '',
    data.additionalMessage || '',
    status,
    notes,
    createdAt
  );

  return {
    ...data,
    id,
    status,
    notes,
    createdAt,
  };
}

export function getAllBookings(): BookingRecord[] {
  const stmt = db.prepare(`SELECT * FROM bookings ORDER BY createdAt DESC`);
  return stmt.all() as BookingRecord[];
}

export function updateBooking(id: string, updates: { status?: string; notes?: string }): boolean {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (updates.status !== undefined) {
    fields.push('status = ?');
    values.push(updates.status);
  }
  if (updates.notes !== undefined) {
    fields.push('notes = ?');
    values.push(updates.notes);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const stmt = db.prepare(`UPDATE bookings SET ${fields.join(', ')} WHERE id = ?`);
  const result = stmt.run(...values);
  return result.changes > 0;
}

export function deleteBooking(id: string): boolean {
  const stmt = db.prepare(`DELETE FROM bookings WHERE id = ?`);
  const result = stmt.run(id);
  return result.changes > 0;
}

export default db;
