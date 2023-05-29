import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma";

export const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const meetings = await prisma.meeting.findMany({
      include: { users: true, teams: true },
    });
    res.json({ meetings });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  const { title, description, date, time } = data;

  try {
    const meeting = await prisma.meeting.create({
      data: {
        title,
        description,
        date,
        time,
      },
    });
    res.json({ meeting });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
