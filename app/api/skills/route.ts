import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const ADMIN_PASSWORD = 'eyosi@&123';

// GET: Fetch all skills
export async function GET() {
  try {
    const skills = await query('SELECT * FROM skills ORDER BY category, proficiency_level DESC');
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Add a new skill (Password Protected)
export async function POST(request: Request) {
  try {
    const { name, category, proficiency_level, password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!name || !category || proficiency_level === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await query(
      'INSERT INTO skills (name, category, proficiency_level) VALUES ($1, $2, $3)',
      [name, category, proficiency_level]
    );

    return NextResponse.json({ success: true, message: 'Skill added successfully' });
  } catch (error) {
    console.error('Error adding skill:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Remove a skill by ID (Password Protected via query or body)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    await query('DELETE FROM skills WHERE id = $1', [id]);

    return NextResponse.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}