import app from "./app";
import prisma from "./prisma";

async function main() {
  try {
    await prisma.$connect();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  app.listen(3000);
}

main();