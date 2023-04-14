import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma";
import withRbac from '@/middlewares/withRbac';

const getTeamById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const team = await prisma.team.findUnique({
    where: { id: String(id) },
    include: { users: true, meetings: true, tasks: true },
  });
  res.json({ team });
};

const updateTeamById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, description } = req.body;
  const team = await prisma.team.update({
    where: { id: String(id) },
    data: { name, description },
    include: { users: true, meetings: true, tasks: true },
  });
  res.json({ team });
};

const deleteTeamById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.team.delete({ where: { id: String(id) } });
  res.status(204).end();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getTeamById(req, res);
      break;
    case 'PUT':
      await withRbac("PM")(updateTeamById)(req, res);
      break;
    case 'DELETE':
      await withRbac("PM")(deleteTeamById)(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
