import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch profile info (used on portfolio homepage)
export async function GET() {
  try {
    const rows = await query('SELECT * FROM profile LIMIT 1');
    return NextResponse.json(rows[0] || {});
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST / PUT: Update profile info from Admin Panel
export async function POST(request: Request) {
  try {
    const { 
      full_name, 
      title, 
      bio, 
      profile_image_url, 
      github_url, 
      linkedin_url, 
      telegram_url, 
      instagram_url, 
      password 
    } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    await query(
      `UPDATE profile SET 
        full_name = $1, 
        title = $2, 
        bio = $3, 
        profile_image_url = $4, 
        github_url = $5, 
        linkedin_url = $6, 
        telegram_url = $7, 
        instagram_url = $8,
        updated_at = CURRENT_TIMESTAMP 
       WHERE id = (SELECT id FROM profile LIMIT 1)`,
      [full_name, title, bio, profile_image_url, github_url, linkedin_url, telegram_url, instagram_url]
    );

    return NextResponse.json({ success: true, message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}