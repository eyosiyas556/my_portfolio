import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';
import { notifyChange } from '@/lib/updated';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const password = data.get('password') as string;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Create unique filename to prevent overwriting
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;

    let imageUrl = '';

    // If Vercel Blob token is configured, use cloud storage
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(filename, file, {
        access: 'public',
      });
      imageUrl = blob.url;
    } else {
      // Local development fallback: save to public/uploads
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), 'public/uploads');

      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Directory already exists
      }

      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    notifyChange();

    return NextResponse.json({
      success: true,
      url: imageUrl,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to upload image' }, { status: 500 });
  }
}