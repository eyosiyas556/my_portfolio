import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { created_at: 'desc' } });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, slug, description, tech_stack, github_url, live_url, image_url, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!title || !slug || !description) {
      return NextResponse.json({ error: 'Title, slug, and description are required' }, { status: 400 });
    }

    const techArray: string[] = typeof tech_stack === 'string'
      ? tech_stack.split(',').map((t: string) => t.trim())
      : tech_stack ?? [];

    const project = await prisma.project.create({
      data: { title, slug, description, tech_stack: techArray, github_url, live_url, image_url, featured: true },
    });

    return NextResponse.json({ success: true, message: 'Project added successfully!', project }, { status: 201 });
  } catch (error) {
    console.error('Projects POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, slug, description, tech_stack, github_url, live_url, image_url, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!id || !title || !slug || !description) {
      return NextResponse.json({ error: 'ID, title, slug, and description are required' }, { status: 400 });
    }

    const techArray: string[] = typeof tech_stack === 'string'
      ? tech_stack.split(',').map((t: string) => t.trim())
      : tech_stack ?? [];

    await prisma.project.update({
      where: { id: Number(id) },
      data: { title, slug, description, tech_stack: techArray, github_url, live_url, image_url },
    });

    return NextResponse.json({ success: true, message: 'Project updated successfully!' });
  } catch (error) {
    console.error('Projects PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

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

    await prisma.project.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true, message: 'Project deleted successfully!' });
  } catch (error) {
    console.error('Projects DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
