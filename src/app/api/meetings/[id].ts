import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma";
import withRbac from '@/middlewares/withRbac';

const getMeetingById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const meeting = await prisma.meeting.findUnique({
    where: { id: String(id) },
    include: { users: true, teams: true },
  });
  res.json({ meeting });
};

const updateMeetingById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { title, description, date, time } = req.body;
  const meeting = await prisma.meeting.update({
    where: { id: String(id) },
    data: { title, description, date, time },
    include: { users: true, teams: true },
  });
  res.json({ meeting });
};

const deleteMeetingById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await prisma.meeting.delete({ where: { id: String(id) } });
  res.status(204).end();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getMeetingById(req, res);
      break;
    case 'PUT':
      await withRbac("PM")(updateMeetingById)(req, res);
      break;
    case 'DELETE':
      await withRbac("PM")(deleteMeetingById)(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
