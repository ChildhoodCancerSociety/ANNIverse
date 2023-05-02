import { PrismaClient } from '@prisma/client';
import { Hina_Mincho } from "next/font/google";
import { measureMemory } from "vm";

const prisma = new PrismaClient();

export default async function createUser() {
  const newUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'SoftwareDev',
    },
  })
  console.log(newUser)
}