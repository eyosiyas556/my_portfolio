import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const ADMIN_PASSWORD = 'eyosi@&123';

// GET: Publicly fetch contact info (No password required for visitors)
export async function GET() {
  try {
    const result = await query('SELECT * FROM contact_info LIMIT 1');
    if (result.length === 0) {
      return NextResponse.json({
        email: 'eyosiyas@example.com',
        location: 'Adama, Ethiopia',
        availability_status: 'Available for Opportunities',
        phone: ''
      });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Update contact info (Password Protected - Admin only)
export async function POST(request: Request) {
  try {
    const { email, location, availability_status, phone, password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    const existing = await query('SELECT * FROM contact_info LIMIT 1');

    if (existing.length === 0) {
      await query(
        'INSERT INTO contact_info (email, location, availability_status, phone) VALUES ($1, $2, $3, $4)',
        [email, location, availability_status, phone]
      );
    } else {
      await query(
        'UPDATE contact_info SET email = $1, location = $2, availability_status = $3, phone = $4',
        [email, location, availability_status, phone]
      );
    }

    return NextResponse.json({ success: true, message: 'Contact info updated successfully!' });
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}