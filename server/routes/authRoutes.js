const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/authController.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(updateUser);
router.route("/deleteUser").delete(deleteUser);

module.exports = router;
