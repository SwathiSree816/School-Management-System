const express = require("express");
const router = express.Router();
const verifiedUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const { markAttendance, viewAttendance } = require("../controllers/attendanceController");

router.route("/").post(verifiedUser, authorizeRoles("admin", "teacher"), markAttendance).get(verifiedUser, authorizeRoles("admin", "teacher","student","parent"), viewAttendance);

module.exports = router;
