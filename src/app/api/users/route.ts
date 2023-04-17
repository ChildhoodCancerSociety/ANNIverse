import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// GET ALL USERS 
const index = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "error!"});
  }
};

// GET INDIVIDUAL USER 
const show = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.id as string;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json ({ error: 'user not found!'}) ;
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({error: 'could not retrieve user!'});
  }
};

// UPDATE INDIVIDUAL USER
const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.id as string;
  const { body } = req;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { ...body },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'could not update user' });
  }
};

// DELETE INDIVIDUAL USER 
const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.id as string;
  try {
    await prisma.user.delete({ where: { id: userId } });
    return res.status(200).json({ message: 'user deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'failed to delete user' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        return show(req, res);
      } else {
        return index(req, res);
      }
    case 'PUT':
      return update(req, res);
    case 'DELETE':
      return deleteUser(req, res);
    default:
      return res.status(400).json({ error: 'Invalid HTTP method' });
  }
}