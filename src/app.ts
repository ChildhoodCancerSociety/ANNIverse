import express, { NextFunction, Request, Response } from "express";
import prisma from "./prisma";
const app = express();
app.use(express.json);

const router = express.Router();

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if(!req.headers["x-api-key"] || req.headers["x-api-key"] !== "COOL_API_KEY_HERE") {
    res.sendStatus(401);
  }
  next();
};

app.use(authenticate);

router.get("/", (req, res, next) => {
  prisma.user.findMany({ include: { meetings: true } }).then(users => {
    res.json({ users });
  });
});

router.post("/", (req, res, next) => {
  prisma.user.create({ data: {
    ...req.body
  } });
});

app.use("/users", router);

export default app;
