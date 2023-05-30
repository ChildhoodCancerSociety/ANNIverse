import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const teams = await prisma.team.findMany({
    include: { users: true, meetings: true, tasks: true },
  });
  NextResponse.json({ teams });
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const { name, description } = data;

  const team = await prisma.team.create({
    data: {
      name,
      description,
    },
  });

  NextResponse.json({ team });
};
