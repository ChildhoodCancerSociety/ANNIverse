import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma";
import withRbac from '@/middlewares/withRbac';

const getAllTeams = async (req: NextApiRequest, res: NextApiResponse) => {
  const teams = await prisma.team.findMany({
    include: { users: true, meetings: true, tasks: true },
  });
  res.json({ teams });
};

const createTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description } = req.body;
  const team = await prisma.team.create({
    data: { name, description },
  });
  res.json({ team });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getAllTeams(req, res);
      break;
    case 'POST':
      await withRbac("PM")(createTeam)(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
