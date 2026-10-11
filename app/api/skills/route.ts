import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyChange } from '@/lib/updated';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { proficiency_level: 'desc' }],
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Skills GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, category, proficiency_level, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!name || !category || proficiency_level === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await prisma.skill.create({ data: { name, category, proficiency_level: Number(proficiency_level) } });

    notifyChange();
    return NextResponse.json({ success: true, message: 'Skill added successfully' });
  } catch (error) {
    console.error('Skills POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    await prisma.skill.delete({ where: { id: Number(id) } });

    notifyChange();
    return NextResponse.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Skills DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
