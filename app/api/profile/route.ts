import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyChange } from '@/lib/updated';

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile ?? {});
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { full_name, title, bio, profile_image_url, github_url, linkedin_url, telegram_url, instagram_url, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    const existing = await prisma.profile.findFirst();

    const data = { full_name, title, bio, profile_image_url, github_url, linkedin_url, telegram_url, instagram_url };

    if (existing) {
      await prisma.profile.update({ where: { id: existing.id }, data });
    } else {
      await prisma.profile.create({ data });
    }

    notifyChange();
    return NextResponse.json({ success: true, message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Profile POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
