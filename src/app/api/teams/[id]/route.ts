import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/prisma";

//Next.js has a feature where it automatically associates these exported functions with the corresponding HTTP method. This works only if the function name is lowercase and matches the HTTP method name.

export const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const team = await prisma.team.findUnique({
      where: { id: String(id) },
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
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json({ team });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const data = req.body;
  const { name, description } = data;

  if (!name && !description) {
    return res.status(400).json({ message: "No data to update." });
  }

  try {
    const team = await prisma.team.update({
      where: { id: String(id) },
      data,
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
    res.json({ team });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//del for DELETE requests (because delete is a reserved keyword in JavaScript)
export const del = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await prisma.team.delete({ where: { id: String(id) } });
    res.json({ message: "Team Deleted!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
