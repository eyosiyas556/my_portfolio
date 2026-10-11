import { NextResponse } from 'next/server';
import { getLastUpdated } from '@/lib/updated';


export async function GET() {
  return NextResponse.json(
    { timestamp: getLastUpdated() },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }
  );
}
