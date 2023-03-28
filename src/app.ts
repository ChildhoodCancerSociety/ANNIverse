import express from "express";
import { User } from "./models/User";

const app = express();

const router = express.Router();

router.use("/users", (req, res, next) => {
  if(req.method === "GET") {
    return User.findAll({ where: { ...req.params } });
  }
});

export default app;
