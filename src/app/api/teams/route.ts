import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma";

export const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        users: {
          select: {
            user: true,
          },
        },
        meetings: true,
        tasks: true,
      },
    });
    res.json({ teams });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Name and description are required " });
  }

  try {
    const team = await prisma.team.create({
      data: {
        name,
        description,
      },
    });
    res.json({ team });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
