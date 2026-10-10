import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch all projects
export async function GET() {
  try {
    const projects = await query('SELECT * FROM projects ORDER BY created_at DESC');
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Add a new project
export async function POST(request: Request) {
  try {
    const { title, slug, description, tech_stack, github_url, live_url, image_url, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!title || !slug || !description) {
      return NextResponse.json({ error: 'Title, slug, and description are required' }, { status: 400 });
    }

    const techArray = typeof tech_stack === 'string' 
      ? tech_stack.split(',').map((t: string) => t.trim()) 
      : tech_stack;

    await query(
      `INSERT INTO projects (title, slug, description, tech_stack, github_url, live_url, image_url, featured) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)`,
      [title, slug, description, techArray, github_url, live_url, image_url]
    );

    return NextResponse.json({ success: true, message: 'Project added successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update an existing project
export async function PUT(request: Request) {
  try {
    const { id, title, slug, description, tech_stack, github_url, live_url, image_url, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!id || !title || !slug || !description) {
      return NextResponse.json({ error: 'ID, title, slug, and description are required' }, { status: 400 });
    }

    const techArray = typeof tech_stack === 'string' 
      ? tech_stack.split(',').map((t: string) => t.trim()) 
      : tech_stack;

    await query(
      `UPDATE projects 
       SET title = $1, slug = $2, description = $3, tech_stack = $4, github_url = $5, live_url = $6, image_url = $7 
       WHERE id = $8`,
      [title, slug, description, techArray, github_url, live_url, image_url, id]
    );

    return NextResponse.json({ success: true, message: 'Project updated successfully!' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Remove a project by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const password = request.headers.get('x-admin-password');

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await query('DELETE FROM projects WHERE id = \$1', [id]);

    return NextResponse.json({ success: true, message: 'Project deleted successfully!' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}