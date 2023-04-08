import { Router } from "express";
import { getAllTeams, createTeam, getTeamById, updateTeamById, deleteTeamById } from "../controllers/teamsController";
import rbac from "../middlewares/rbac";

const router = Router();

router.get("/", getAllTeams);
router.post("/", rbac("PM"), createTeam);
router.get("/:teamId", getTeamById);
router.put("/:teamId", rbac("PM"), updateTeamById);
router.delete("/:teamId", rbac("PM"), deleteTeamById);

export default router;