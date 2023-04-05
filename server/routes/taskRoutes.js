const express = require("express");
const router = express.Router();

const {
  createTask,
  viewTaskList,
} = require("../controllers/taskController.js");

router.route("/viewTaskList").get(viewTaskList);
router.route("/createTask").post(createTask);

module.exports = router;
