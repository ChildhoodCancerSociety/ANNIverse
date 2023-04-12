import express from "express";
import next from "next";
import teamRoutes from "./routes/teamsRoutes";

const dev = true; 
// Set to true for development mode, false for production
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();


  app.use("/teams", teamRoutes);

  // Handle all other routes with Next.js
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = 3000; // Default port

  app.listen(port);
});
