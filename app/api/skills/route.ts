import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyChange } from '@/lib/updated';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { proficiency_level: 'desc' }, { id: 'asc' }],
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

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Skill name is required' }, { status: 400 });
    }
    if (!category || !category.trim()) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const prof = Number(proficiency_level);
    const safeProf = isNaN(prof) ? 80 : Math.max(1, Math.min(100, Math.round(prof)));

    const skill = await prisma.skill.create({
      data: {
        name: name.trim(),
        category: category.trim(),
        proficiency_level: safeProf,
      },
    });

    notifyChange();
    return NextResponse.json({ success: true, message: 'Skill added successfully', skill }, { status: 201 });
  } catch (error) {
    console.error('Skills POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, category, proficiency_level, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Skill name is required' }, { status: 400 });
    }
    if (!category || !category.trim()) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const prof = Number(proficiency_level);
    const safeProf = isNaN(prof) ? 80 : Math.max(1, Math.min(100, Math.round(prof)));

    const skill = await prisma.skill.update({
      where: { id: Number(id) },
      data: {
        name: name.trim(),
        category: category.trim(),
        proficiency_level: safeProf,
      },
    });

    notifyChange();
    return NextResponse.json({ success: true, message: 'Skill updated successfully', skill });
  } catch (error) {
    console.error('Skills PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const password = request.headers.get('x-admin-password') || searchParams.get('password');

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

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
