import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma";
import withRbac from '@/middlewares/withRbac';

const getAllMeetings = async (req: NextApiRequest, res: NextApiResponse) => {
  const meetings = await prisma.meeting.findMany({
    include: { users: true, teams: true },
  });
  res.json({ meetings });
};

const createMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, date, time } = req.body;
  const meeting = await prisma.meeting.create({
    data: { title, description, date, time },
  });
  res.json({ meeting });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case 'GET':
      await getAllMeetings(req, res);
      break;
    case 'POST':
      await withRbac("PM")(createMeeting)(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
