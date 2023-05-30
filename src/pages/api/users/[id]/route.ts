import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, response: NextResponse) {
  const paths = request.nextUrl.pathname.split("/");
  const userId = paths[paths.length - 1];
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, NOT: { deletedAt: null } },
    });

    if (!user) {
      return NextResponse.error();
    }
    return NextResponse.json({ data: user });
  } catch (error) {
    return NextResponse.error();
  }
}

// UPDATE INDIVIDUAL USER
export async function PUT(request: NextRequest, response: NextResponse) {
  const paths = request.nextUrl.pathname.split("/");
  const userId = paths[paths.length - 1];
  const body = await request.json();
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    // first we are checking if a user with the given ID is deleted
    if (!user || user.deletedAt) {
      return NextResponse.error();
      // if it doesn't exist, return 404 error
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { ...body },
    });
    // if it does exist, then update the user using update method
    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  const paths = request.nextUrl.pathname.split("/");
  const userId = paths[paths.length - 1];
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });
    return NextResponse.json({ data: { message: "User deleted!" } });
  } catch (error) {
    return NextResponse.error();
  }
}
