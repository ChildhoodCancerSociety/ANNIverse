import express from "express";
import {
  createMeeting,
  deleteMeetingById,
  getAllMeetings,
  getMeetingById,
  updateMeetingById,
} from "../controllers/meetingsController";
import rbac from "../middlewares/rbac";

const router = express.Router();

router.get("/", getAllMeetings);
router.post("/", rbac("PM"), createMeeting);
router.get("/:meetingId", getMeetingById);
router.put("/:meetingId", rbac("PM"), updateMeetingById);
router.delete("/:meetingId", rbac("PM"), deleteMeetingById);

export default router;