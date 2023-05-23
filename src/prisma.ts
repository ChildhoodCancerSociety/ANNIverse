import { PrismaClient, Role } from "@prisma/client";

export { Role };

const prisma = new PrismaClient();
prisma.$connect();

export default prisma;
