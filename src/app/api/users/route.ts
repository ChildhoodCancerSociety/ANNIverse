import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server'

const prisma = new PrismaClient();

// GET ALL USERS
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const users = await prisma.user.findMany({
      where: { deleted: false }
      // the above will only retrieve non-deleted users
    });
    console.log(users)
    return NextResponse.json({ data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}




