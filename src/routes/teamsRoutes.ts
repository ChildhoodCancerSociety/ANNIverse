import express from "express";
import {
  createTeam,
  deleteTeamById,
  getAllTeams,
  getTeamById,
  updateTeamById,
} from "../controllers/teamsController";
import rbac from "../middlewares/rbac";

const router = express.Router();

router.get("/", getAllTeams);
router.post("/", rbac("PM"), createTeam);
router.get("/:teamId", getTeamById);
router.put("/:teamId", rbac("PM"), updateTeamById);
router.delete("/:teamId", rbac("PM"), deleteTeamById);

export default router;
