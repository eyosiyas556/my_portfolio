import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await query('SELECT * FROM testimonials ORDER BY created_at DESC');
    return NextResponse.json(testimonials);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { quote, author, role, avatar, password } = await request.json();

    if (password !== 'eyosi@&123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!quote || !author || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await query(
      'INSERT INTO testimonials (quote, author, role, avatar) VALUES ($1, $2, $3, $4) RETURNING *',
      [quote, author, role, avatar || '']
    );

    return NextResponse.json(result[0] || { success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT: Edit / Update existing testimonial
export async function PUT(request: Request) {
  try {
    const { id, quote, author, role, avatar, password } = await request.json();

    if (password !== 'eyosi@&123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id || !quote || !author || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await query(
      'UPDATE testimonials SET quote = $1, author = $2, role = $3, avatar = $4 WHERE id = $5 RETURNING *',
      [quote, author, role, avatar || '', id]
    );

    return NextResponse.json(result[0] || { success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const password = request.headers.get('x-admin-password');

    if (password !== 'eyosi@&123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await query('DELETE FROM testimonials WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}