import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Public users send a message
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET: Admin fetches all messages
export async function GET() {
  try {
    const messages = await query('SELECT * FROM messages ORDER BY created_at DESC');
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Admin deletes a message by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    await query('DELETE FROM messages WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}