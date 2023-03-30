import express, { NextFunction, Request, Response } from "express";

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

});

router.post("/", (req, res, next) => {

});

app.use("/users", router);

export default app;
