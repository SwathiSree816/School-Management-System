const express = require("express");
const router = express.Router();
const { markAttendance, viewAttendance } = require("../controllers/attendanceController");

router.route("/").post(markAttendance).get(viewAttendance);

module.exports = router;
