// Legacy query helper kept for page.tsx compatibility
// All API routes now use lib/prisma.ts directly
import { prisma } from './prisma';

export async function query(text: string, params?: any[]) {
  const result = await prisma.$queryRawUnsafe(text, ...(params ?? []));
  return result as any[];
}

export { prisma };
