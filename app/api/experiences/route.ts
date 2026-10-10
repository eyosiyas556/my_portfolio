import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const experiences = await query('SELECT * FROM experiences ORDER BY id DESC');
    return NextResponse.json(experiences);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { role, company, period, description, type, password } = await request.json();

    if (password !== 'eyosi@&123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!role || !company || !period || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await query(
      'INSERT INTO experiences (role, company, period, description, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [role, company, period, description, type || 'Education']
    );

    return NextResponse.json(result[0] || { success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, role, company, period, description, type, password } = await request.json();

    if (password !== 'eyosi@&123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await query(
      'UPDATE experiences SET role = $1, company = $2, period = $3, description = $4, type = $5 WHERE id = $6 RETURNING *',
      [role, company, period, description, type, id]
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

    await query('DELETE FROM experiences WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}