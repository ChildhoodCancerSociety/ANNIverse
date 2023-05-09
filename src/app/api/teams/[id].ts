import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma";


const getTeamById = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const id  = searchParams.get('id');
  const team = await prisma.team.findUnique({
    where: { id: String(id) },
    include: { users: true, meetings: true, tasks: true },
  });
  NextResponse.json({ team });
};

const updateTeamById = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const id  = searchParams.get('id');
  // const obj = Object.fromEntries(searchParams.entries());
  const name  = searchParams.get('name');;
  const description  = searchParams.get('description');
  
  const data: {
    name?: string ;
    description?: string;
  } = {};

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

const deleteTeamById = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const id  = searchParams.get('id');
  await prisma.team.delete({ where: { id: String(id) } });
  NextResponse.json({ message: "Team Deleted!" });
};

const handler = async (req: Request, res: Response) => {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getTeamById(req, res);
      break;
    case 'PUT':
      await (updateTeamById)(req, res);
      break;
    case 'DELETE':
      await (deleteTeamById)(req, res);
      break;
    default:
      return NextResponse.error();
  }
};

export default handler;
