import app from "./app";
import db from "./models/db";
import { Meeting } from "./models/Meeting";
import { Task } from "./models/Task";
import { Team } from "./models/Team";
import { User } from "./models/User";

async function main() {
  try {
    await db.sync({ force: true }).then(() => {
      console.log('Database synced successfully');
    }).catch((error) => {
      console.error('Error syncing database:', error);
    });
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  app.listen(3000);
}

main();
