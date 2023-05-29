import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma";

export const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const meeting = await prisma.meeting.findUnique({
      where: { id: String(id) },
      include: { users: true, teams: true },
    });
    res.json({ meeting });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const data = req.body;
  const { title, description, date, time } = data;

  try {
    const meeting = await prisma.meeting.update({
      where: { id: String(id) },
      data: {
        title,
        description,
        date,
        time,
      },
      include: { users: true, teams: true },
    });
    res.json({ meeting });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const del = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    await prisma.meeting.delete({ where: { id: String(id) } });
    res.json({ message: "Meeting Deleted!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
