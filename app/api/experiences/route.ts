import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyChange } from '@/lib/updated';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({ orderBy: { id: 'desc' } });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Experiences GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { role, company, period, description, type, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!role || !company || !period || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const experience = await prisma.experience.create({
      data: { role, company, period, description, type: type ?? 'Education' },
    });

    notifyChange();
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Experiences POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, role, company, period, description, type, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const experience = await prisma.experience.update({
      where: { id: Number(id) },
      data: { role, company, period, description, type },
    });

    notifyChange();
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Experiences PUT error:', error);
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

    await prisma.experience.delete({ where: { id: Number(id) } });

    notifyChange();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Experiences DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
