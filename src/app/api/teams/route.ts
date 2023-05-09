import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma";


const getAllTeams = async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany({
    include: { users: true, meetings: true, tasks: true },
  });
  NextResponse.json({ teams });
};

const createTeam = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const name  = searchParams.get('name');
  const description  = searchParams.get('description');

  if (name === null) {
    return NextResponse.json({ error: "Name is required" });
  }

  if (description === null) {
    return NextResponse.json({ error: "Description is required" });
  }

  const team = await prisma.team.create({
    data: {
      name,
      description,
    },
  });
  NextResponse.json({ team });
};

const handler = async (req: Request, res: Response) => {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getAllTeams(req, res);
      break;
    case 'POST':
      await createTeam(req, res);
      break;
    default:
      return NextResponse.error();
  }
};

export default handler;
