import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyChange } from '@/lib/updated';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { created_at: 'desc' } });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Testimonials GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { quote, author, role, avatar, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!quote || !author || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: { quote, author, role, avatar: avatar ?? '' },
    });

    notifyChange();
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Testimonials POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, quote, author, role, avatar, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id || !quote || !author || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: Number(id) },
      data: { quote, author, role, avatar: avatar ?? '' },
    });

    notifyChange();
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Testimonials PUT error:', error);
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
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await prisma.testimonial.delete({ where: { id: Number(id) } });

    notifyChange();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Testimonials DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
