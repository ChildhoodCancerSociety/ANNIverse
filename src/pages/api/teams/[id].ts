import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const team = await prisma.team.findUnique({
    where: { id: String(id) },
    include: { users: true, meetings: true, tasks: true },
  });
  NextResponse.json({ team });
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const { id, name, description } = data;

  if (name !== null) {
    data.name = name;
  }

  if (description !== null) {
    data.description = description;
  }

  const team = await prisma.team.update({
    where: { id: String(id) },
    data,
    include: { users: true, meetings: true, tasks: true },
  });
  NextResponse.json({ team });
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await prisma.team.delete({ where: { id: String(id) } });
  NextResponse.json({ message: "Team Deleted!" });
};
