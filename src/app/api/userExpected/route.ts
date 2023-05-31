import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

const prisma = new PrismaClient();

// GET userExpected
export async function GET(request: NextRequest, response: NextResponse) {
    const userExpected = await prisma.userExpected.findMany({
        include: {
            user: {
                select: {
                    email: true,
                }
            }
        }
    });
    return NextResponse.json(userExpected);
}
