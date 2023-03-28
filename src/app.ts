import express from "express";
import { User } from "./models/User";

const app = express();
app.use(express.json)

const router = express.Router();

router.use("/users", (req, res, next) => {
  if(req.method === "GET") {
    User.findAll({ where: { ...req.params } }).then(users => {
      res.json(users);
    });
  }

  else if(req.method === "POST") {
    User.create({ ...req.body })
  }
});

app.use(router);

export default app;
