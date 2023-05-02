import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
// import createUser from './seed'

const prisma = new PrismaClient();

// GET ALL USERS
export async function getUsers(_req: Request, _res: Response) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

// GET INDIVIDUAL USER
export async function getUserById(req: Request, _res: Response) {
  const userId = req.query.id as string;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.error();
    }
    return NextResponse.json({ data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

// UPDATE INDIVIDUAL USER
export async function updateUser(req: Request, _res: Response) {
  const userId = req.query.id as string;
  const { body } = req;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { ...body },
    });
    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

// DELETE INDIVIDUAL USER
export async function deleteUser(req: Request, _res: Response) {
  const userId = req.query.id as string;
  try {
    await prisma.user.delete({ where: { id: userId } });
    return NextResponse.json({ data: { message: 'User deleted!' } });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export default async function handler(req: Request, res: Response) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        return getUserById(req, res);
      } else {
        return getUsers(req, res);
      }
    case 'PUT':
      return updateUser(req, res);
    case 'DELETE':
      return deleteUser(req, res);
    default:
      return NextResponse.error();
  }
}