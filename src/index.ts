import app from "./app";
import db from "./models/db";

async function main() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  app.listen(3000);
}

main();
