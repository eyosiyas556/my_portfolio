import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEFAULT_CONTACT = {
  email: 'eyosiyas@example.com',
  location: 'Adama, Ethiopia',
  availability_status: 'Available for Opportunities',
  phone: '',
};

export async function GET() {
  try {
    const contact = await prisma.contactInfo.findFirst();
    return NextResponse.json(contact ?? DEFAULT_CONTACT);
  } catch (error) {
    console.error('Contact GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, location, availability_status, phone, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    const existing = await prisma.contactInfo.findFirst();
    const data = { email, location, availability_status, phone };

    if (existing) {
      await prisma.contactInfo.update({ where: { id: existing.id }, data });
    } else {
      await prisma.contactInfo.create({ data });
    }

    return NextResponse.json({ success: true, message: 'Contact info updated successfully!' });
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
